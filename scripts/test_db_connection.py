#!/usr/bin/env python3
import os
import psycopg2
import urllib.parse
from dotenv import load_dotenv

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    print('Testing database connection')
    try:
        # Get DATABASE_URL from environment
        db_url = os.environ.get('DATABASE_URL')
        if not db_url:
            print('ERROR: DATABASE_URL environment variable not found')
            print('Current working directory:', os.getcwd())
            print('Environment variables loaded from .env file:', load_dotenv())
            return
            
        # Parse the URL
        parsed = urllib.parse.urlparse(db_url)
        host = str(parsed.hostname)
        port = str(parsed.port)
        dbname = parsed.path[1:]
        username = parsed.username
        password = parsed.password if parsed.password else '[EMPTY]'
        print(f'Host: {host}, Port: {port}, DB: {dbname}')
        print(f'Username: {username}, Password: {"[SET]" if password and password != "[EMPTY]" else "[NOT SET]"}')
        
        # Test connection
        conn = psycopg2.connect(db_url)
        print('Connection successful!')
        conn.close()
    except Exception as e:
        print(f'Connection error: {e}')

if __name__ == "__main__":
    main()
