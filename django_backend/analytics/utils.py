import re
import requests
from django.core.cache import cache


def get_client_ip(request):
    """
    Get the client's IP address from the request
    Handles proxies and load balancers
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def parse_user_agent(user_agent):
    """
    Parse user agent string to extract device, browser, and OS info
    Simple implementation - can be enhanced with user-agents library
    """
    result = {
        'device_type': 'desktop',
        'browser': 'Unknown',
        'os': 'Unknown',
    }
    
    user_agent_lower = user_agent.lower()
    
    # Detect device type
    if 'mobile' in user_agent_lower or 'android' in user_agent_lower:
        result['device_type'] = 'mobile'
    elif 'tablet' in user_agent_lower or 'ipad' in user_agent_lower:
        result['device_type'] = 'tablet'
    
    # Detect browser
    if 'chrome' in user_agent_lower and 'edg' not in user_agent_lower:
        result['browser'] = 'Chrome'
    elif 'safari' in user_agent_lower and 'chrome' not in user_agent_lower:
        result['browser'] = 'Safari'
    elif 'firefox' in user_agent_lower:
        result['browser'] = 'Firefox'
    elif 'edg' in user_agent_lower:
        result['browser'] = 'Edge'
    
    # Detect OS
    if 'windows' in user_agent_lower:
        result['os'] = 'Windows'
    elif 'mac os' in user_agent_lower or 'macos' in user_agent_lower:
        result['os'] = 'macOS'
    elif 'iphone' in user_agent_lower or 'ipad' in user_agent_lower:
        result['os'] = 'iOS'
    elif 'android' in user_agent_lower:
        result['os'] = 'Android'
    elif 'linux' in user_agent_lower:
        result['os'] = 'Linux'
    
    return result


def get_geo_data(ip_address):
    """
    Get geographic data for an IP address
    Uses ipapi.co free API with caching
    """
    # Skip private/local IPs
    if ip_address.startswith('127.') or ip_address.startswith('192.168.') or ip_address.startswith('10.'):
        return None
    
    # Check cache first (cache for 24 hours)
    cache_key = f'geo_{ip_address}'
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data
    
    try:
        # Free API - limited to 1000 requests per day
        response = requests.get(
            f'https://ipapi.co/{ip_address}/json/',
            timeout=2  # Don't wait too long
        )
        
        if response.status_code == 200:
            data = response.json()
            
            # Cache the result
            cache.set(cache_key, data, 86400)  # 24 hours
            
            return data
    except Exception as e:
        print(f"Error fetching geo data for {ip_address}: {e}")
    
    return None


def is_bot(user_agent):
    """
    Check if the user agent appears to be a bot
    """
    bot_patterns = [
        'bot', 'crawler', 'spider', 'scraper',
        'googlebot', 'bingbot', 'yahoo', 'baidu',
        'yandex', 'duckduckbot', 'facebookexternalhit',
        'slackbot', 'twitterbot', 'whatsapp', 'linkedinbot',
        'pingdombot', 'uptimerobot', 'applebot', 'semrushbot',
        'ahrefsbot', 'mj12bot', 'dotbot', 'blexbot',
        'seznambot', 'petalbot'
    ]
    
    user_agent_lower = user_agent.lower()
    return any(pattern in user_agent_lower for pattern in bot_patterns)
