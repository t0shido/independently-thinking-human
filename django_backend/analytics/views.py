from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count, Sum, Avg
from django.utils import timezone
from datetime import timedelta
from .models import Visitor, PageView, DailyStats, ArticleStats


@staff_member_required
def analytics_dashboard(request):
    """
    Main analytics dashboard view
    """
    # Time ranges
    today = timezone.now().date()
    last_7_days = today - timedelta(days=7)
    last_30_days = today - timedelta(days=30)
    
    # Overall statistics
    total_visitors = Visitor.objects.count()
    total_page_views = PageView.objects.count()
    
    # Recent statistics (last 7 days)
    recent_visitors = Visitor.objects.filter(last_visit__gte=last_7_days).count()
    recent_page_views = PageView.objects.filter(timestamp__gte=last_7_days).count()
    
    # Top articles
    top_articles = ArticleStats.objects.order_by('-total_views')[:10]
    
    # Recent visitors with details
    recent_visitor_list = Visitor.objects.order_by('-last_visit')[:20]
    
    # Geographic breakdown
    countries = Visitor.objects.values('country').annotate(
        count=Count('id')
    ).order_by('-count')[:10]
    
    cities = Visitor.objects.values('city', 'country').annotate(
        count=Count('id')
    ).order_by('-count')[:10]
    
    # Device breakdown
    devices = Visitor.objects.values('device_type').annotate(
        count=Count('id')
    ).order_by('-count')
    
    # Browser breakdown
    browsers = Visitor.objects.values('browser').annotate(
        count=Count('id')
    ).order_by('-count')[:5]
    
    # Daily stats for chart (last 30 days)
    daily_stats = DailyStats.objects.filter(
        date__gte=last_30_days
    ).order_by('date')
    
    # Top pages (last 7 days)
    top_pages = PageView.objects.filter(
        timestamp__gte=last_7_days
    ).values('url').annotate(
        count=Count('id')
    ).order_by('-count')[:10]
    
    context = {
        'total_visitors': total_visitors,
        'total_page_views': total_page_views,
        'recent_visitors': recent_visitors,
        'recent_page_views': recent_page_views,
        'top_articles': top_articles,
        'recent_visitor_list': recent_visitor_list,
        'countries': countries,
        'cities': cities,
        'devices': devices,
        'browsers': browsers,
        'daily_stats': daily_stats,
        'top_pages': top_pages,
    }
    
    return render(request, 'analytics/dashboard.html', context)
