#!/usr/bin/env python
"""
Test script to verify database connection and check for articles in the database.
Run this script from the Django project root directory.
"""
import os
import sys
import django
from django.db import connections
from django.db.utils import OperationalError

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blog_backend.settings")
django.setup()

# Now we can import Django models
from articles.models import Article, Section

def test_database_connection():
    """Test if we can connect to the database"""
    db_conn = connections['default']
    try:
        db_conn.cursor()
        print("✅ Successfully connected to the database!")
        
        # Get database details
        db_settings = connections.databases['default']
        print(f"Database name: {db_settings['NAME']}")
        print(f"Database user: {db_settings['USER']}")
        print(f"Database host: {db_settings['HOST'] or 'localhost'}")
        
        return True
    except OperationalError as e:
        print(f"❌ Could not connect to the database: {e}")
        return False

def check_articles():
    """Check if there are any articles in the database"""
    try:
        article_count = Article.objects.count()
        print(f"Found {article_count} articles in the database")
        
        if article_count == 0:
            print("⚠️ No articles found in the database!")
            
            # Check if sections exist
            section_count = Section.objects.count()
            print(f"Found {section_count} sections in the database")
            
            if section_count > 0:
                print("Sections found but no articles. This suggests the database structure exists but no content.")
            else:
                print("No sections found either. This suggests the database might be empty or tables not created.")
        else:
            # Show some article details
            print("\nSample articles:")
            for article in Article.objects.all()[:5]:  # Show up to 5 articles
                print(f"- {article.title} (section: {article.section.name if article.section else 'None'})")
    except Exception as e:
        print(f"❌ Error checking articles: {e}")

if __name__ == "__main__":
    print("=== Testing Database Connection ===")
    if test_database_connection():
        print("\n=== Checking Articles ===")
        check_articles()
    print("\nTest completed.")
