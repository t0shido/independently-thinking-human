#!/usr/bin/env python3
import os
import sys
import django
from dotenv import load_dotenv

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    print('Checking Django settings')
    try:
        # Add the project directory to the Python path
        sys.path.append(os.getcwd())
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
        django.setup()
        
        from django.conf import settings
        db_settings = settings.DATABASES['default']
        print(f'Django DATABASE settings: {db_settings["ENGINE"]} {db_settings["HOST"]} {db_settings["PORT"]}')
        
        # Print more detailed information
        print(f'Database name: {db_settings.get("NAME", "[Not set]")}')
        print(f'Database user: {db_settings.get("USER", "[Not set]")}')
        print(f'Password set: {"Yes" if db_settings.get("PASSWORD") else "No"}')
        
        # Print environment variables
        print(f'DATABASE_URL environment variable: {"Set" if os.environ.get("DATABASE_URL") else "Not set"}')
    except Exception as e:
        print(f'Error checking Django settings: {e}')
        print(f'Current working directory: {os.getcwd()}')
        print(f'Python path: {sys.path}')

if __name__ == "__main__":
    main()
