# Server Setup Guide for CI/CD Pipeline

This document outlines all the prerequisites and server configurations needed before your GitLab CI/CD pipeline can successfully deploy your Independently Thinking Human project.

## 1. Server Requirements

### Hardware Recommendations
- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 20GB+ SSD
- **Network**: Stable internet connection with public IP or domain

### Operating System
- Ubuntu 20.04 LTS or newer (recommended)
- Other Linux distributions should work but may require adjustments to commands

## 2. Base Software Installation

### System Packages
```bash
# Update package lists
sudo apt update
sudo apt upgrade -y

# Install required packages
sudo apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib git curl
```

### Python Setup
```bash
# Install Python dependencies
sudo apt install -y python3-dev libpq-dev build-essential
```

These packages are essential for building Python extensions:
- **python3-dev**: Header files and libraries for Python development, needed to compile Python extensions
- **libpq-dev**: PostgreSQL development library, required for the psycopg2 database adapter
- **build-essential**: Includes gcc, make and other build tools needed for compiling source code

### Node.js (Optional on server if building only in CI)
```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## 3. Database Setup

### PostgreSQL Configuration
```bash
# Create database and user
sudo -u postgres psql -c "CREATE DATABASE independently_thinking_human;"
sudo -u postgres psql -c "CREATE USER django_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "ALTER ROLE django_user SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE django_user SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE django_user SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE independently_thinking_human TO django_user;"
```

## 4. Web Server Setup

### Nginx Configuration
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/independently-thinking-human

# Add the following configuration (adjust as needed)
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location /static/ {
        alias /var/www/independently-thinking-human/backend/staticfiles/;
    }

    location /media/ {
        alias /var/www/independently-thinking-human/backend/media/;
    }

    location / {
        root /var/www/independently-thinking-human/frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://unix:/run/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /admin/ {
        proxy_pass http://unix:/run/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/independently-thinking-human /etc/nginx/sites-enabled/  # Creates a symbolic link to enable the site
sudo nginx -t  # Tests the Nginx configuration for syntax errors
sudo systemctl restart nginx  # Restarts Nginx to apply the new configuration
```

### SSL Setup (Recommended)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 5. Application Directory Structure

### Create Directory Structure
```bash
# Create application directories
sudo mkdir -p /var/www/independently-thinking-human/frontend
sudo mkdir -p /var/www/independently-thinking-human/backend
sudo mkdir -p /var/www/independently-thinking-human/backend/media
sudo mkdir -p /var/www/independently-thinking-human/backend/staticfiles

# Set permissions
sudo chown -R $USER:$USER /var/www/independently-thinking-human
```

## 6. Gunicorn Setup

### Create Virtual Environment
```bash
# Create and activate virtual environment
cd /var/www/independently-thinking-human/backend
python3 -m venv venv
source venv/bin/activate

# Create a placeholder requirements file (will be overwritten by deployment)
echo "django>=4.0,<5.0" > requirements.txt
echo "gunicorn>=20.0,<21.0" >> requirements.txt
echo "psycopg2-binary>=2.9,<3.0" >> requirements.txt
pip install -r requirements.txt
```

### Create Gunicorn Service
```bash
# Create Gunicorn service file
sudo nano /etc/systemd/system/gunicorn.service

# Add the following content (adjust paths as needed)
[Unit]
Description=gunicorn daemon for Independently Thinking Human
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/independently-thinking-human/backend
ExecStart=/var/www/independently-thinking-human/backend/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          blog_backend.wsgi:application

[Install]
WantedBy=multi-user.target

# Enable and start the service
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
```

## 7. File Permissions

### Set Proper Permissions
```bash
# Set ownership for web server access
sudo chown -R www-data:www-data /var/www/independently-thinking-human
sudo chmod -R 755 /var/www/independently-thinking-human

# Make sure your deployment user has access
sudo usermod -a -G www-data $USER
```

## 8. SSH Setup for CI/CD

### Create Deployment User (Optional but Recommended)
```bash
# Create a deployment user
sudo adduser deploy
sudo usermod -a -G www-data deploy

# Add to sudoers with limited permissions
sudo visudo
# Add the line:
# deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart gunicorn, /bin/systemctl restart nginx
```

### Set Up SSH Keys
```bash
# Generate SSH key pair on your local machine if you don't have one
ssh-keygen -t ed25519 -C "gitlab-ci-deployment"

# Copy public key to server
ssh-copy-id deploy@your-server-ip

# Get the private key content (to add to GitLab CI/CD variables)
cat ~/.ssh/id_ed25519
```

### Get SSH Known Hosts
```bash
# Get SSH known hosts entry (to add to GitLab CI/CD variables)
ssh-keyscan -H your-server-ip
```

## 9. Environment Variables

### Create .env File
```bash
# Create .env file for Django
sudo nano /var/www/independently-thinking-human/backend/.env

# Add the following content (adjust as needed)
DEBUG=False
SECRET_KEY=your_secure_secret_key
DATABASE_URL=postgresql://django_user:secure_password@localhost/independently_thinking_human
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

## 10. GitLab CI/CD Variables

In your GitLab project, go to **Settings > CI/CD > Variables** and add:

- `SSH_PRIVATE_KEY`: The content of your private SSH key
- `SSH_KNOWN_HOSTS`: The output from the ssh-keyscan command
- `PRODUCTION_USER`: The username for SSH access (e.g., `deploy`)
- `PRODUCTION_SERVER`: Your server's IP address or domain name
- `PRODUCTION_PATH`: Path to your application directory (e.g., `/var/www/independently-thinking-human`)

## 11. Final Checks

Before your first deployment, verify:

1. Nginx is running: `sudo systemctl status nginx`
2. Gunicorn is running: `sudo systemctl status gunicorn`
3. PostgreSQL is running: `sudo systemctl status postgresql`
4. Directory permissions are correct
5. SSH access works from your local machine
6. All required GitLab CI/CD variables are set

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**:
   - Check file ownership and permissions
   - Verify SSH key setup

2. **502 Bad Gateway**:
   - Check if Gunicorn is running
   - Check Gunicorn socket path in Nginx config

3. **Database Connection Errors**:
   - Verify PostgreSQL is running
   - Check database credentials in .env file

4. **Static Files Not Loading**:
   - Verify paths in Nginx configuration
   - Check if collectstatic ran successfully

### Viewing Logs

```bash
# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Gunicorn logs
sudo journalctl -u gunicorn

# Application logs
sudo tail -f /var/www/independently-thinking-human/backend/logs/app.log
```

---

After completing all these steps, your server should be ready for the CI/CD pipeline to deploy your application successfully.
