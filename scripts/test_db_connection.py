#!/usr/bin/env python3
import os
import psycopg2
import urllib.parse

def main():
    print('Testing database connection')
    try:
        db_url = os.environ['DATABASE_URL']
        parsed = urllib.parse.urlparse(db_url)
        host = str(parsed.hostname)
        port = str(parsed.port)
        dbname = parsed.path[1:]
        print(f'Host: {host}, Port: {port}, DB: {dbname}')
        
        conn = psycopg2.connect(db_url)
        print('Connection successful!')
        conn.close()
    except Exception as e:
        print(f'Connection error: {e}')

if __name__ == "__main__":
    main()
