import time
import re
from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin
from .models import Visitor, PageView, ArticleStats
from .utils import get_client_ip, parse_user_agent, get_geo_data


class AnalyticsMiddleware(MiddlewareMixin):
    """
    Middleware to track visitor analytics
    """
    
    # Paths to exclude from tracking
    EXCLUDED_PATHS = [
        r'^/admin/',
        r'^/static/',
        r'^/media/',
        r'^/favicon\.ico$',
        r'^/robots\.txt$',
        r'\.php$',
        r'\.env$',
        r'/\.git/',
        r'/wp-',
    ]
    
    def should_track(self, path):
        """Check if this path should be tracked"""
        for pattern in self.EXCLUDED_PATHS:
            if re.search(pattern, path):
                return False
        return True
    
    def process_request(self, request):
        """Store request start time"""
        request._analytics_start_time = time.time()
        return None
    
    def process_response(self, request, response):
        """Track the request after response is generated"""
        
        # Only track successful GET requests to relevant paths
        if not self.should_track(request.path):
            return response
        
        if request.method != 'GET':
            return response
        
        # Skip if status code indicates error or bot
        if response.status_code >= 400:
            return response
        
        try:
            # Get visitor information
            ip_address = get_client_ip(request)
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            
            # Skip known bots
            bot_patterns = ['bot', 'crawler', 'spider', 'scraper']
            if any(pattern in user_agent.lower() for pattern in bot_patterns):
                return response
            
            # Get or create visitor
            visitor, created = Visitor.objects.get_or_create(
                ip_address=ip_address,
                defaults={
                    'user_agent': user_agent,
                }
            )
            
            # Update visitor info
            if not created:
                visitor.visit_count += 1
                visitor.last_visit = timezone.now()
                visitor.save(update_fields=['visit_count', 'last_visit'])
            else:
                # For new visitors, get geo data and device info
                device_info = parse_user_agent(user_agent)
                visitor.device_type = device_info.get('device_type', '')
                visitor.browser = device_info.get('browser', '')
                visitor.os = device_info.get('os', '')
                
                # Get geographic data (async in production)
                geo_data = get_geo_data(ip_address)
                if geo_data:
                    visitor.country = geo_data.get('country_name', '')
                    visitor.city = geo_data.get('city', '')
                    visitor.region = geo_data.get('region', '')
                
                visitor.save()
            
            # Calculate response time
            response_time = None
            if hasattr(request, '_analytics_start_time'):
                response_time = (time.time() - request._analytics_start_time) * 1000  # ms
            
            # Extract article info if applicable
            article_section = ''
            article_slug = ''
            
            # Check if this is an article page
            if '/library/' in request.path:
                parts = request.path.strip('/').split('/')
                if len(parts) >= 2:
                    article_section = parts[1] if len(parts) > 1 else ''
                    article_slug = parts[2] if len(parts) > 2 else ''
            
            # Check if this is an API call for articles
            elif '/api/articles/' in request.path:
                parts = request.path.strip('/').split('/')
                if len(parts) >= 3:
                    article_section = parts[2]
            
            # Create page view record
            page_view = PageView.objects.create(
                visitor=visitor,
                url=request.path,
                referrer=request.META.get('HTTP_REFERER', ''),
                method=request.method,
                status_code=response.status_code,
                response_time=response_time,
                article_section=article_section,
                article_slug=article_slug,
            )
            
            # Update article stats if applicable
            if article_section and article_slug:
                article_stats, _ = ArticleStats.objects.get_or_create(
                    section=article_section,
                    slug=article_slug,
                )
                article_stats.total_views += 1
                article_stats.save(update_fields=['total_views', 'last_view'])
        
        except Exception as e:
            # Don't let analytics errors break the site
            print(f"Analytics error: {e}")
            pass
        
        return response
