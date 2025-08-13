#!/usr/bin/env python3
import os

def main():
    db_url = os.environ.get('DATABASE_URL', 'Not found')
    masked_url = db_url
    if '@' in db_url:
        parts = db_url.split('@')
        masked_url = '[CREDENTIALS_MASKED]@' + parts[1]
    print('DATABASE_URL: ' + masked_url)

if __name__ == "__main__":
    main()
