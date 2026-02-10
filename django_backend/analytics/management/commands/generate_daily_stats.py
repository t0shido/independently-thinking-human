from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db.models import Count, Q
from datetime import timedelta
from analytics.models import Visitor, PageView, DailyStats
from collections import Counter


class Command(BaseCommand):
    help = 'Generate daily statistics from visitor data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--date',
            type=str,
            help='Date to generate stats for (YYYY-MM-DD). Defaults to yesterday.',
        )

    def handle(self, *args, **options):
        # Determine which date to process
        if options['date']:
            from datetime import datetime
            target_date = datetime.strptime(options['date'], '%Y-%m-%d').date()
        else:
            target_date = (timezone.now() - timedelta(days=1)).date()
        
        self.stdout.write(f"Generating stats for {target_date}...")
        
        # Get all page views for this date
        page_views = PageView.objects.filter(
            timestamp__date=target_date
        ).select_related('visitor')
        
        if not page_views.exists():
            self.stdout.write(self.style.WARNING(f"No page views found for {target_date}"))
            return
        
        # Calculate statistics
        unique_visitors = page_views.values('visitor').distinct().count()
        total_page_views = page_views.count()
        
        # Top pages
        top_pages_data = page_views.values('url').annotate(
            count=Count('id')
        ).order_by('-count')[:10]
        top_pages = {item['url']: item['count'] for item in top_pages_data}
        
        # Geographic breakdown
        countries_data = page_views.values('visitor__country').annotate(
            count=Count('visitor', distinct=True)
        ).order_by('-count')
        countries = {item['visitor__country']: item['count'] for item in countries_data if item['visitor__country']}
        
        cities_data = page_views.values('visitor__city').annotate(
            count=Count('visitor', distinct=True)
        ).order_by('-count')
        cities = {item['visitor__city']: item['count'] for item in cities_data if item['visitor__city']}
        
        # Device breakdown
        mobile_visitors = page_views.filter(visitor__device_type='mobile').values('visitor').distinct().count()
        desktop_visitors = page_views.filter(visitor__device_type='desktop').values('visitor').distinct().count()
        tablet_visitors = page_views.filter(visitor__device_type='tablet').values('visitor').distinct().count()
        
        # Create or update daily stats
        daily_stats, created = DailyStats.objects.update_or_create(
            date=target_date,
            defaults={
                'unique_visitors': unique_visitors,
                'total_page_views': total_page_views,
                'top_pages': top_pages,
                'countries': countries,
                'cities': cities,
                'mobile_visitors': mobile_visitors,
                'desktop_visitors': desktop_visitors,
                'tablet_visitors': tablet_visitors,
            }
        )
        
        action = "Created" if created else "Updated"
        self.stdout.write(
            self.style.SUCCESS(
                f"{action} daily stats for {target_date}: "
                f"{unique_visitors} visitors, {total_page_views} page views"
            )
        )
