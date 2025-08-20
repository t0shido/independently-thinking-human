# Deployment Instructions for Logging Changes

## Overview
This document provides instructions for deploying the enhanced logging configuration to help diagnose issues with database connections and API communication in the Independently Thinking Human application.

## 1. Server-side Changes

### 1.1 Update Django Settings
Deploy the updated `settings.py` with the new logging configuration:

```bash
cd /home/ubuntu/independently_thinking_human/django_backend
git pull  # Pull the latest changes from GitLab
```

### 1.2 Create Log Directories
Create directories for logs:

```bash
# Create log directories
mkdir -p /home/ubuntu/independently_thinking_human/django_backend/logs
chmod 755 /home/ubuntu/independently_thinking_human/django_backend/logs
chown ubuntu:www-data /home/ubuntu/independently_thinking_human/django_backend/logs
```

### 1.3 Update Gunicorn Service Configuration
Deploy the updated Gunicorn service file:

```bash
# Copy the updated service file
sudo cp /home/ubuntu/independently_thinking_human/systemd/gunicorn.service /etc/systemd/system/

# Reload systemd to recognize changes
sudo systemctl daemon-reload

# Restart Gunicorn
sudo systemctl restart gunicorn.socket gunicorn.service
```

## 2. Testing the Deployment

### 2.1 Test Database Connection
Run the database connection test script:

```bash
cd /home/ubuntu/independently_thinking_human/django_backend
source venv/bin/activate
python test_database_connection.py
```

### 2.2 Test API Endpoints
Run the API endpoint test script:

```bash
cd /home/ubuntu/independently_thinking_human/django_backend
source venv/bin/activate
python test_api_endpoints.py
```

### 2.3 Test Frontend API Calls
Install dependencies and run the frontend API test:

```bash
cd /home/ubuntu/independently_thinking_human
npm install node-fetch  # If not already installed
node test_frontend_api.js
```

## 3. Monitoring Logs

### 3.1 Django Application Logs
```bash
# View Django application logs
tail -f /home/ubuntu/independently_thinking_human/django_backend/django_debug.log

# View database query logs
tail -f /home/ubuntu/independently_thinking_human/django_backend/db_queries.log
```

### 3.2 Gunicorn Logs
```bash
# View Gunicorn access logs
tail -f /home/ubuntu/independently_thinking_human/django_backend/logs/gunicorn-access.log

# View Gunicorn error logs
tail -f /home/ubuntu/independently_thinking_human/django_backend/logs/gunicorn-error.log
```

### 3.3 System Logs
```bash
# View Gunicorn service logs
sudo journalctl -u gunicorn.service -f

# View Gunicorn socket logs
sudo journalctl -u gunicorn.socket -f
```

## 4. Troubleshooting

### 4.1 Common Issues

#### No Articles Showing
If the API returns no articles:
1. Check database connection using `test_database_connection.py`
2. Verify the database name in `.env` is `independently_thinking_human`
3. Check if articles exist in the database:
   ```bash
   sudo -u postgres psql -d independently_thinking_human -c "SELECT COUNT(*) FROM articles_article;"
   ```

#### API Connection Issues
If frontend can't connect to backend:
1. Check CORS settings in Django `settings.py`
2. Verify the frontend is using the correct API URL
3. Check Gunicorn and Nginx logs for errors

#### Permission Issues
If you encounter permission errors:
```bash
# Fix permissions for log files
sudo chown -R ubuntu:www-data /home/ubuntu/independently_thinking_human/django_backend/logs
sudo chmod -R 755 /home/ubuntu/independently_thinking_human/django_backend/logs
```
