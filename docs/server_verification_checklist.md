# Server Verification Checklist

This document provides a step-by-step checklist to verify if your server is properly configured for the CI/CD pipeline deployment. Run through these checks to ensure everything is set up correctly.

## 1. Server Access Verification

### SSH Access
```bash
# Test SSH connection to your server
ssh your-username@your-server-ip

# If using a deployment user
ssh deploy@your-server-ip
```

✅ You should be able to log in without password (using SSH key)

## 2. System Software Verification

### Check Operating System
```bash
# Check OS version
cat /etc/os-release
```

✅ Should show Ubuntu 20.04 or newer (or your chosen Linux distribution)

### Check Required Packages
```bash
# Check Python version
python3 --version
```

✅ Should show Python 3.8 or newer

```bash
# Check Nginx installation
nginx -v
```

✅ Should show Nginx version information

```bash
# Check PostgreSQL installation
psql --version
```

✅ Should show PostgreSQL version information

## 3. Web Server Configuration

### Check Nginx Status
```bash
# Check if Nginx is running
sudo systemctl status nginx
```

✅ Should show "active (running)"

### Check Nginx Configuration
```bash
# Test Nginx configuration
sudo nginx -t
```

✅ Should show "syntax is ok" and "test is successful"

### Check Site Configuration
```bash
# Check if your site configuration exists
ls -la /etc/nginx/sites-available/independently-thinking-human
ls -la /etc/nginx/sites-enabled/independently-thinking-human
```

✅ Both files should exist

Alternatively (conf.d layout)

Some systems use `conf.d` instead of the `sites-available/sites-enabled` pattern. In that case, verify a single config file exists in `conf.d`:

```bash
ls -la /etc/nginx/conf.d/independently-thinking-human.conf
```

✅ The file should exist if you’re using the `conf.d` approach

## 4. Database Verification

### Check PostgreSQL Status
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql
```

✅ Should show "active (running)"

### Check Database Existence
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# List databases
\l

# Check if your user exists
\du

# Exit PostgreSQL
\q
```

✅ Should show your database "independently_thinking_human" and user "django_user"

## 5. Application Environment

### Check Directory Structure
```bash
# Check if application directories exist
ls -la /var/www/independently-thinking-human/
ls -la /var/www/independently-thinking-human/frontend/
ls -la /var/www/independently-thinking-human/backend/
```

✅ All directories should exist

### Check File Permissions
```bash
# Check directory ownership
ls -la /var/www/independently-thinking-human/
```

✅ Should show www-data as owner or your deployment user in the www-data group

### Check Python Virtual Environment
```bash
# Check if virtual environment exists
ls -la /var/www/independently-thinking-human/backend/venv/
```

✅ Should show the virtual environment directory

## 6. Application Server

### Check Gunicorn Status
```bash
# Check if Gunicorn service exists
ls -la /etc/systemd/system/gunicorn.service

# Check if Gunicorn is running
sudo systemctl status gunicorn
```

✅ Service file should exist and status should show "active (running)"

### Check Gunicorn Socket
```bash
# Check if Gunicorn socket exists
ls -la /run/gunicorn.sock
```

✅ Socket file should exist

## 7. SSL Configuration (If Using HTTPS)

### Check SSL Certificates
```bash
# Check if certificates exist
ls -la /etc/letsencrypt/live/your-domain.com/
```

✅ Should show certificate files if using Let's Encrypt

## 8. Environment Variables

### Check Django Environment File
```bash
# Check if .env file exists
ls -la /var/www/independently-thinking-human/backend/.env

# View .env file content (if you have permission)
cat /var/www/independently-thinking-human/backend/.env
```

✅ File should exist and contain necessary environment variables

## 9. Deployment User Permissions

### Check Sudo Permissions
```bash
# Check if deployment user can restart services
sudo -l -U deploy
```

✅ Should show that the user can restart gunicorn and nginx

## 10. GitLab CI/CD Variables

These can't be checked directly on the server, but you should verify in your GitLab project:

1. Go to your GitLab project
2. Navigate to Settings > CI/CD > Variables
3. Check if the following variables exist:
   - `SSH_PRIVATE_KEY`
   - `SSH_KNOWN_HOSTS`
   - `PRODUCTION_USER`
   - `PRODUCTION_SERVER`
   - `PRODUCTION_PATH`

## 11. Network Configuration

### Check Firewall Status
```bash
# Check if firewall allows HTTP/HTTPS
sudo ufw status
```

✅ Should show that ports 80 and 443 are allowed

### Check Domain Configuration
```bash
# Check if your domain resolves to your server
nslookup your-domain.com
```

✅ Should show your server's IP address

## 12. Test Deployment Manually

To verify the complete setup, you can try a manual deployment:

```bash
# On your local machine, build the frontend
cd /path/to/your/project
npm run build

# Copy files to server
scp -r dist/* deploy@your-server-ip:/var/www/independently-thinking-human/frontend/

# SSH into server
ssh deploy@your-server-ip

# Restart services
sudo systemctl restart gunicorn
sudo systemctl restart nginx

# Check for errors
sudo journalctl -u gunicorn -n 50
sudo tail -f /var/log/nginx/error.log
```

✅ Services should restart without errors and the site should be accessible

## Final Verification

Visit your website in a browser:
- http://your-domain.com (or https:// if using SSL)

✅ Your website should load correctly

If all checks pass, your server is properly configured for the CI/CD pipeline!

---

## Troubleshooting Common Issues

### 1. Permission Denied
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/independently-thinking-human
sudo chmod -R 755 /var/www/independently-thinking-human
```

### 2. Services Won't Start
```bash
# Check detailed logs
sudo journalctl -u gunicorn -n 100
sudo journalctl -u nginx -n 100
```

### 3. Database Connection Issues
```bash
# Check PostgreSQL is listening
sudo netstat -tuln | grep 5432
```

### 4. Static Files Not Found
```bash
# Check if static files exist
ls -la /var/www/independently-thinking-human/backend/staticfiles/
```

### 5. SSL Certificate Issues
```bash
# Renew certificates
sudo certbot renew --dry-run
```
