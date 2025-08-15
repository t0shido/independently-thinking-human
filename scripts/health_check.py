#!/usr/bin/env python3
"""
Health check script for the independently thinking human application.
Verifies all components are working correctly.
"""

import os
import sys
import requests
import psycopg2
from urllib.parse import urlparse

def check_database():
    """Check database connectivity."""
    try:
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            return False, "DATABASE_URL not set"
        
        parsed = urlparse(database_url)
        conn = psycopg2.connect(
            host=parsed.hostname,
            port=parsed.port or 5432,
            user=parsed.username,
            password=parsed.password,
            database=parsed.path[1:]  # Remove leading slash
        )
        conn.close()
        return True, "Database connection successful"
    except Exception as e:
        return False, f"Database connection failed: {str(e)}"

def check_django():
    """Check Django application."""
    try:
        # Try to import Django and check if it can start
        import django
        from django.core.management import execute_from_command_line
        
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
        django.setup()
        
        return True, "Django application loads successfully"
    except Exception as e:
        return False, f"Django check failed: {str(e)}"

def check_web_server():
    """Check if web server is responding."""
    try:
        response = requests.get('http://localhost', timeout=5)
        if response.status_code == 200:
            return True, "Web server responding"
        else:
            return False, f"Web server returned status {response.status_code}"
    except Exception as e:
        return False, f"Web server check failed: {str(e)}"

def main():
    """Run all health checks."""
    print("🏥 Running health checks...")
    print("=" * 50)
    
    checks = [
        ("Database", check_database),
        ("Django", check_django),
        ("Web Server", check_web_server),
    ]
    
    all_passed = True
    
    for name, check_func in checks:
        try:
            success, message = check_func()
            status = "✅ PASS" if success else "❌ FAIL"
            print(f"{name:15} {status} - {message}")
            if not success:
                all_passed = False
        except Exception as e:
            print(f"{name:15} ❌ FAIL - Unexpected error: {str(e)}")
            all_passed = False
    
    print("=" * 50)
    if all_passed:
        print("🎉 All health checks passed!")
        sys.exit(0)
    else:
        print("⚠️  Some health checks failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
