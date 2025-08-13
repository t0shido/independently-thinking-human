#!/usr/bin/env python3
import os
from dotenv import load_dotenv

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    db_url = os.environ.get('DATABASE_URL', 'Not found')
    masked_url = db_url
    if '@' in db_url:
        parts = db_url.split('@')
        masked_url = '[CREDENTIALS_MASKED]@' + parts[1]
    print('DATABASE_URL: ' + masked_url)
    
    # Debug info if DATABASE_URL is not found
    if db_url == 'Not found':
        print('ERROR: DATABASE_URL environment variable not found')
        print('Current working directory:', os.getcwd())
        print('Environment variables loaded from .env file:', load_dotenv())

if __name__ == "__main__":
    main()
