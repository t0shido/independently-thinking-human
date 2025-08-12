# GitLab CI/CD Setup Guide - Independently Thinking Human

## Overview
This guide resolves the CI/CD pipeline issues identified in the project tracker and sets up automated deployment for your Django + React application.

## Issues Resolved
1. ✅ Incomplete GitLab CI file (deploy script was cut off)
2. ✅ Django settings updated to use environment variables
3. ✅ Gunicorn service file path corrections
4. 🔧 Database connection issues (requires server-side configuration)
5. 🔧 GitLab CI/CD variables setup (requires GitLab configuration)

## Required GitLab CI/CD Variables

Navigate to your GitLab project → Settings → CI/CD → Variables and add the following:

### Server Connection Variables
```
SSH_PRIVATE_KEY          # Your private SSH key for server access
SSH_KNOWN_HOSTS         # Server's SSH fingerprint
PRODUCTION_USER         # Server username (likely 'ubuntu')
PRODUCTION_SERVER       # Server IP or domain
PRODUCTION_PATH         # Deployment path (e.g., '/home/ubuntu/independently_thinking_human')
```

### Django Environment Variables
```
DJANGO_SECRET_KEY       # Strong secret key for Django
DEBUG                   # Set to 'false' for production
DJANGO_ALLOWED_HOSTS    # Your domain(s), comma-separated
CSRF_TRUSTED_ORIGINS    # Trusted origins for CSRF, comma-separated
CORS_ALLOWED_ORIGINS    # Allowed CORS origins, comma-separated
DATABASE_URL            # PostgreSQL connection string
```

## Database URL Format
```
DATABASE_URL=postgresql://username:password@localhost:5432/independently_thinking_human
```

## Server-Side Setup Required

### 1. Update Database Password on Server
Choose one of these methods:

#### Option A: Update systemd environment file
```bash
# Create or edit environment file
sudo nano /etc/systemd/system/gunicorn.service.d/env.conf

# Add the new DATABASE_URL
[Service]
Environment=DATABASE_URL=postgresql://username:NEW_PASSWORD@127.0.0.1:5432/independently_thinking_human

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

#### Option B: Use project .env file (recommended)
```bash
# Edit the .env file in your Django backend directory
nano /home/ubuntu/independently_thinking_human/django_backend/.env

# Add/update DATABASE_URL
DATABASE_URL=postgresql://username:NEW_PASSWORD@127.0.0.1:5432/independently_thinking_human

# Restart gunicorn
sudo systemctl restart gunicorn
```

### 2. Update Gunicorn Service File
Copy the updated `gunicorn.service` file to your server:

```bash
# On your server
sudo cp /home/ubuntu/independently_thinking_human/gunicorn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl restart gunicorn
```

### 3. Verify Services
```bash
# Check gunicorn status
sudo systemctl status gunicorn

# Check nginx status
sudo systemctl status nginx

# Check database connection
cd /home/ubuntu/independently_thinking_human/django_backend
source venv/bin/activate
python manage.py check --database default
```

## Deployment Process

### 1. Push to GitLab
```bash
git add .
git commit -m "Fix CI/CD pipeline configuration"
git push origin main
```

### 2. Run Pipeline
1. Go to your GitLab project → CI/CD → Pipelines
2. The pipeline will run automatically on push to main
3. The deploy job is set to `manual` - click "Play" to deploy

### 3. Monitor Deployment
Watch the pipeline logs for any errors. Common issues:
- SSH connection problems
- Missing environment variables
- Database connection failures
- Permission issues

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection on server
psql -h localhost -U username -d independently_thinking_human

# Check Django database settings
cd /home/ubuntu/independently_thinking_human/django_backend
source venv/bin/activate
python manage.py shell
>>> from django.db import connection
>>> connection.ensure_connection()
```

### Service Issues
```bash
# Check gunicorn logs
journalctl -u gunicorn -n 50 --no-pager

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### File Permissions
```bash
# Fix ownership if needed
sudo chown -R ubuntu:www-data /home/ubuntu/independently_thinking_human/
sudo chmod -R 755 /home/ubuntu/independently_thinking_human/
```

## Security Notes

1. **Never commit secrets** - All sensitive data is now in environment variables
2. **Rotate SSH keys** regularly
3. **Use strong database passwords**
4. **Keep server updated**
5. **Monitor logs** for suspicious activity

## Next Steps

1. Set up the GitLab CI/CD variables listed above
2. Update the database password on your server
3. Push the updated code to GitLab
4. Run the pipeline and deploy manually
5. Verify the application is working correctly
6. Set up monitoring and log rotation (as noted in project tracker)

## Pipeline Stages

- **Lint**: Code quality checks for frontend and backend
- **Test**: Run test suites for both applications  
- **Build**: Create production builds and artifacts
- **Deploy**: Manual deployment to production server

The deploy stage is manual to prevent accidental deployments. Click the "Play" button in GitLab to deploy after reviewing the build artifacts.
