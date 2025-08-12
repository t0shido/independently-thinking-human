"""
Custom PostgreSQL database backend for Django using py-postgresql instead of psycopg2
"""
from django.db.backends.postgresql.base import (
    DatabaseWrapper as PostgreSQLDatabaseWrapper,
    DatabaseFeatures as PostgreSQLDatabaseFeatures,
    DatabaseOperations as PostgreSQLDatabaseOperations,
    DatabaseClient as PostgreSQLDatabaseClient,
    DatabaseCreation as PostgreSQLDatabaseCreation,
    DatabaseSchemaEditor as PostgreSQLDatabaseSchemaEditor,
)
import postgresql as pg

class DatabaseFeatures(PostgreSQLDatabaseFeatures):
    pass

class DatabaseOperations(PostgreSQLDatabaseOperations):
    pass

class DatabaseClient(PostgreSQLDatabaseClient):
    pass

class DatabaseCreation(PostgreSQLDatabaseCreation):
    pass

class DatabaseSchemaEditor(PostgreSQLDatabaseSchemaEditor):
    pass

class DatabaseWrapper(PostgreSQLDatabaseWrapper):
    """
    PostgreSQL database backend that uses py-postgresql instead of psycopg2
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
            'password': settings_dict['PASSWORD'] or '',
            'database': settings_dict['NAME'] or 'postgres',
        }
        
        return conn_params
    
    def get_new_connection(self, conn_params):
        """Connect to the database."""
        connection = pg.open(
            host=conn_params['host'],
            port=conn_params['port'],
            user=conn_params['user'],
            password=conn_params['password'],
            database=conn_params['database'],
        )
        return connection
    
    def init_connection_state(self):
        """Initialize connection state."""
        pass  # No need to set timezone or isolation level with py-postgresql
    
    def create_cursor(self, name=None):
        """Create a cursor for the connection."""
        return self.connection.cursor()
