#!/bin/bash
# Automated PostgreSQL setup script for CI/CD deployment

set -e  # Exit on any error

# Get database credentials from environment or generate secure ones
DB_NAME="${DB_NAME:-independently_thinking_human}"
DB_USER="${DB_USER:-app_user}"
DB_PASSWORD="${DB_PASSWORD:-$(openssl rand -base64 32)}"

echo "=== PostgreSQL Automated Setup ==="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "Installing PostgreSQL..."
    sudo apt-get update -qq
    sudo apt-get install -y postgresql postgresql-contrib
    sudo systemctl enable postgresql
fi

# Ensure PostgreSQL is running
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create application database and user
echo "Setting up database and user..."
sudo -u postgres psql <<EOF
-- Create database if it doesn't exist
SELECT 'CREATE DATABASE $DB_NAME' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

-- Create user if it doesn't exist
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '$DB_USER') THEN
      CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
   ELSE
      ALTER USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
   END IF;
END
\$\$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
ALTER USER $DB_USER CREATEDB;
EOF

# Configure pg_hba.conf for secure authentication
echo "Configuring PostgreSQL authentication..."
PG_HBA_PATH=$(sudo -u postgres psql -t -c "SHOW hba_file;" | xargs)

# Backup original configuration
sudo cp "$PG_HBA_PATH" "$PG_HBA_PATH.backup.$(date +%Y%m%d_%H%M%S)"

# Add secure authentication rule for our app user
if ! sudo grep -q "host.*$DB_NAME.*$DB_USER.*127.0.0.1/32.*md5" "$PG_HBA_PATH"; then
    echo "host    $DB_NAME    $DB_USER    127.0.0.1/32    md5" | sudo tee -a "$PG_HBA_PATH"
fi

# Reload PostgreSQL configuration
sudo systemctl reload postgresql

# Test connection
echo "Testing database connection..."
PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h localhost -d "$DB_NAME" -c "SELECT 'Database setup successful!' as status;"

# Output connection details (for CI/CD variables)
echo ""
echo "=== Database Configuration Complete ==="
echo "Database Name: $DB_NAME"
echo "Database User: $DB_USER"
echo "Database URL: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
echo ""
echo "Add this to your GitLab CI/CD variables:"
echo "DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
