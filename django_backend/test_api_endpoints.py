#!/usr/bin/env python
"""
Test script to verify API endpoints are working correctly.
Run this script from the Django project root directory.
"""
import os
import sys
import json
import requests
import django
from urllib.parse import urljoin

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blog_backend.settings")
django.setup()

# Import Django settings to get the allowed hosts
from django.conf import settings

def get_base_url():
    """Determine the base URL for API testing"""
    # Try to use the first allowed host, or default to localhost
    if settings.ALLOWED_HOSTS:
        host = settings.ALLOWED_HOSTS[0]
        if host == '*':
            host = 'localhost'
    else:
        host = 'localhost'
    
    # Use 8000 as the default port for Django development server
    return f"http://{host}:8000"

def test_api_endpoint(endpoint, method="GET", data=None):
    """Test if an API endpoint is accessible"""
    base_url = get_base_url()
    url = urljoin(base_url, endpoint)
    
    print(f"\nTesting {method} {url}")
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, timeout=5)
        elif method.upper() == "POST":
            response = requests.post(url, json=data, timeout=5)
        else:
            print(f"❌ Unsupported method: {method}")
            return False
        
        print(f"Status code: {response.status_code}")
        
        if response.status_code >= 200 and response.status_code < 300:
            print("✅ Endpoint is accessible")
            try:
                json_response = response.json()
                print(f"Response data: {json.dumps(json_response, indent=2)[:500]}...")
            except ValueError:
                print(f"Response (not JSON): {response.text[:200]}...")
            return True
        else:
            print(f"❌ Endpoint returned error status: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"❌ Could not connect to {url}")
        return False
    except requests.exceptions.Timeout:
        print(f"❌ Request to {url} timed out")
        return False
    except Exception as e:
        print(f"❌ Error testing endpoint: {e}")
        return False

def test_articles_api():
    """Test the articles API endpoints"""
    # Test the articles list endpoint for a section
    # You might need to adjust the section name based on your data
    test_api_endpoint("api/articles/news/")
    
    # Test the admin endpoint (should require authentication)
    test_api_endpoint("admin/")

if __name__ == "__main__":
    print("=== Testing API Endpoints ===")
    test_articles_api()
    print("\nAPI tests completed.")
