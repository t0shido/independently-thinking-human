from django.contrib import admin
from django.utils.html import format_html
from .models import Visitor, PageView, DailyStats, ArticleStats


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ['ip_address', 'city_country', 'device_type', 'browser', 'visit_count', 'first_visit', 'last_visit']
    list_filter = ['device_type', 'browser', 'country', 'first_visit', 'last_visit']
    search_fields = ['ip_address', 'city', 'country']
    readonly_fields = ['first_visit', 'last_visit', 'visit_count']
    
    def city_country(self, obj):
        if obj.city and obj.country:
            return f"{obj.city}, {obj.country}"
        elif obj.country:
            return obj.country
        return "-"
    city_country.short_description = "Location"


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ['timestamp', 'visitor_ip', 'url', 'article_info', 'status_code', 'response_time_display']
    list_filter = ['timestamp', 'status_code', 'article_section']
    search_fields = ['url', 'visitor__ip_address', 'article_slug']
    readonly_fields = ['timestamp', 'visitor', 'url', 'referrer', 'response_time']
    date_hierarchy = 'timestamp'
    
    def visitor_ip(self, obj):
        return obj.visitor.ip_address
    visitor_ip.short_description = "IP Address"
    
    def article_info(self, obj):
        if obj.article_section and obj.article_slug:
            return f"{obj.article_section}/{obj.article_slug}"
        elif obj.article_section:
            return obj.article_section
        return "-"
    article_info.short_description = "Article"
    
    def response_time_display(self, obj):
        if obj.response_time:
            return f"{obj.response_time:.0f}ms"
        return "-"
    response_time_display.short_description = "Response Time"


@admin.register(DailyStats)
class DailyStatsAdmin(admin.ModelAdmin):
    list_display = ['date', 'unique_visitors', 'total_page_views', 'device_breakdown', 'avg_views_per_visitor']
    list_filter = ['date']
    readonly_fields = ['date', 'unique_visitors', 'total_page_views', 'top_pages', 'countries', 'cities']
    date_hierarchy = 'date'
    
    def device_breakdown(self, obj):
        return f"📱 {obj.mobile_visitors} | 💻 {obj.desktop_visitors} | 📲 {obj.tablet_visitors}"
    device_breakdown.short_description = "Devices"
    
    def avg_views_per_visitor(self, obj):
        if obj.unique_visitors > 0:
            return f"{obj.total_page_views / obj.unique_visitors:.1f}"
        return "0"
    avg_views_per_visitor.short_description = "Avg Views/Visitor"


@admin.register(ArticleStats)
class ArticleStatsAdmin(admin.ModelAdmin):
    list_display = ['article_path', 'total_views', 'unique_visitors', 'engagement_display', 'last_view']
    list_filter = ['section', 'last_view']
    search_fields = ['slug', 'section']
    readonly_fields = ['first_view', 'last_view', 'total_views', 'unique_visitors']
    
    def article_path(self, obj):
        return f"{obj.section}/{obj.slug}"
    article_path.short_description = "Article"
    
    def engagement_display(self, obj):
        parts = []
        if obj.avg_time_on_page:
            parts.append(f"⏱️ {obj.avg_time_on_page:.0f}s")
        if obj.bounce_rate is not None:
            parts.append(f"↩️ {obj.bounce_rate:.0f}%")
        return " | ".join(parts) if parts else "-"
    engagement_display.short_description = "Engagement"
