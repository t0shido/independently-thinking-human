from django.db import models
from django.utils import timezone
import json


class Visitor(models.Model):
    """
    Track unique visitors to the site
    """
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    first_visit = models.DateTimeField(auto_now_add=True)
    last_visit = models.DateTimeField(auto_now=True)
    visit_count = models.IntegerField(default=1)
    
    # Geographic data (populated from IP lookup)
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, blank=True)
    
    # Device info
    device_type = models.CharField(max_length=50, blank=True)  # mobile, desktop, tablet
    browser = models.CharField(max_length=100, blank=True)
    os = models.CharField(max_length=100, blank=True)
    
    class Meta:
        ordering = ['-last_visit']
        indexes = [
            models.Index(fields=['ip_address']),
            models.Index(fields=['last_visit']),
        ]
    
    def __str__(self):
        return f"{self.ip_address} - {self.city}, {self.country}"


class PageView(models.Model):
    """
    Track individual page views
    """
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE, related_name='page_views')
    url = models.CharField(max_length=500)
    referrer = models.CharField(max_length=500, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Request details
    method = models.CharField(max_length=10, default='GET')
    status_code = models.IntegerField(null=True, blank=True)
    response_time = models.FloatField(null=True, blank=True)  # in milliseconds
    
    # Article-specific tracking
    article_section = models.CharField(max_length=50, blank=True)
    article_slug = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['timestamp']),
            models.Index(fields=['url']),
            models.Index(fields=['article_section', 'article_slug']),
        ]
    
    def __str__(self):
        return f"{self.visitor.ip_address} - {self.url} - {self.timestamp}"


class DailyStats(models.Model):
    """
    Aggregated daily statistics for performance
    """
    date = models.DateField(unique=True)
    unique_visitors = models.IntegerField(default=0)
    total_page_views = models.IntegerField(default=0)
    
    # Top pages (stored as JSON)
    top_pages = models.JSONField(default=dict)
    
    # Geographic breakdown (stored as JSON)
    countries = models.JSONField(default=dict)
    cities = models.JSONField(default=dict)
    
    # Device breakdown
    mobile_visitors = models.IntegerField(default=0)
    desktop_visitors = models.IntegerField(default=0)
    tablet_visitors = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = "Daily statistics"
    
    def __str__(self):
        return f"{self.date} - {self.unique_visitors} visitors, {self.total_page_views} views"


class ArticleStats(models.Model):
    """
    Track statistics for individual articles
    """
    section = models.CharField(max_length=50)
    slug = models.CharField(max_length=200)
    
    # Counters
    total_views = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)
    
    # Engagement metrics
    avg_time_on_page = models.FloatField(null=True, blank=True)  # in seconds
    bounce_rate = models.FloatField(null=True, blank=True)  # percentage
    
    # Timestamps
    first_view = models.DateTimeField(auto_now_add=True)
    last_view = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-total_views']
        unique_together = ['section', 'slug']
        verbose_name_plural = "Article statistics"
    
    def __str__(self):
        return f"{self.section}/{self.slug} - {self.total_views} views"
