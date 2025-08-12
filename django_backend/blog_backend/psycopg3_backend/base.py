"""
Custom PostgreSQL database backend for Django using psycopg3 instead of psycopg2
"""
import psycopg
from django.db.backends.postgresql.base import (
    DatabaseWrapper as PostgreSQLDatabaseWrapper,
)

class DatabaseWrapper(PostgreSQLDatabaseWrapper):
    """
    PostgreSQL database backend that uses psycopg3 instead of psycopg2
    """
    
    def get_connection_params(self):
        """Return a dict of parameters suitable for creating a database connection."""
        settings_dict = self.settings_dict
        # None may be used to connect to the default 'postgres' db
        if settings_dict['NAME'] == '':
            raise ValueError(
                "settings.DATABASES is improperly configured. "
                "Please supply the NAME value."
            )
        
        conn_params = {
            'host': settings_dict['HOST'] or 'localhost',
            'port': settings_dict['PORT'] or 5432,
            'user': settings_dict['USER'] or 'postgres',
            'dbname': settings_dict['NAME'] or 'postgres',
        }
        
        if settings_dict['PASSWORD']:
            conn_params['password'] = settings_dict['PASSWORD']
            
        return conn_params
    
    def get_new_connection(self, conn_params):
        """Connect to the database."""
        connection = psycopg.connect(**conn_params)
        return connection
    
    def init_connection_state(self):
        """Initialize connection state."""
        pass  # No need to set timezone or isolation level with psycopg3
    
    def create_cursor(self, name=None):
        """Create a cursor for the connection."""
        return self.connection.cursor()
