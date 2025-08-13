#!/usr/bin/env python3
import os
import sys
import django

def main():
    try:
        sys.path.append('.')
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
        django.setup()
        from django.conf import settings
        engine = settings.DATABASES['default']['ENGINE']
        host = settings.DATABASES['default']['HOST']
        port = settings.DATABASES['default']['PORT']
        print(f'Django DATABASE settings: {engine} {host} {port}')
    except Exception as e:
        print(f'Error checking Django settings: {e}')

if __name__ == "__main__":
    main()
