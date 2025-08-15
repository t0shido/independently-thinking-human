# 🚀 Fully Automated GitLab CI/CD Deployment

This project features a **zero-configuration deployment pipeline** that automatically sets up your entire production environment with a single pipeline run.

## ✨ What Gets Automated

- ✅ **System Setup**: Installs PostgreSQL, Nginx, Python, and all dependencies
- ✅ **Database**: Creates secure database with auto-generated credentials
- ✅ **Security**: Configures secure authentication and environment variables
- ✅ **Services**: Sets up and starts systemd services (Gunicorn, Nginx)
- ✅ **SSL Ready**: Nginx configuration ready for SSL certificates
- ✅ **Zero Downtime**: Proper service management and restarts

## 🔑 Required GitLab CI/CD Variables

### Server Connection (Required)
```
SSH_PRIVATE_KEY: Your private SSH key content (mark as Masked & Protected)
SSH_KNOWN_HOSTS: Output of `ssh-keyscan YOUR_SERVER_IP`
PRODUCTION_SERVER: Your server IP address or domain
```

### Django Security (Required)
```
DJANGO_SECRET_KEY: Secure random key (mark as Masked & Protected)
DJANGO_ALLOWED_HOSTS: your-server-ip,your-domain.com
CSRF_TRUSTED_ORIGINS: http://your-server-ip,https://your-domain.com
```

### Optional Overrides
```
PRODUCTION_USER: ubuntu (default)
PRODUCTION_PATH: /home/ubuntu/independently_thinking_human (default)
```

## 🚀 Quick Setup

1. **Generate SSH Key Pair** (if you don't have one):
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
   ```

2. **Add Public Key to Server**:
   ```bash
   ssh-copy-id ubuntu@YOUR_SERVER_IP
   ```

3. **Run Setup Script**:
   ```bash
   chmod +x setup-gitlab-variables.sh
   ./setup-gitlab-variables.sh
   ```

4. **Add Variables to GitLab**:
   - Go to: GitLab Project → Settings → CI/CD → Variables
   - Add all required variables from the script output
   - Mark sensitive variables as "Masked" and "Protected"

5. **Deploy**:
   - Push to `main` branch
   - Go to CI/CD → Pipelines
   - Manually trigger the `deploy:production` job
   - Wait for completion (5-10 minutes)
   - Access your app at `http://YOUR_SERVER_IP`

## 🔒 Security Features Applied

- ✅ **Removed hardcoded credentials** from all files
- ✅ **Secure database setup** with auto-generated passwords
- ✅ **Environment-based configuration** (no .env in Git)
- ✅ **API authentication** (IsAuthenticatedOrReadOnly)
- ✅ **Security headers** in Nginx configuration
- ✅ **Proper file permissions** and service isolation
- ✅ **PostgreSQL authentication** with md5 encryption

## 🏗️ Architecture

```
Internet → Nginx (Port 80/443) → Gunicorn (Unix Socket) → Django App
                ↓
            Static Files (/static/)
            Media Files (/media/)
            Frontend SPA (/)
                ↓
            PostgreSQL Database
```

## 📁 Project Structure

```
├── .gitlab-ci.yml          # Automated CI/CD pipeline
├── django_backend/         # Django API backend
│   ├── blog_backend/       # Django project settings
│   └── requirements.txt    # Python dependencies
├── src/                    # Frontend React/Vue source
├── dist/                   # Built frontend (auto-generated)
├── nginx.conf              # Nginx configuration
├── systemd/                # Systemd service files
│   └── gunicorn.service    # Gunicorn service configuration
└── scripts/                # Setup and deployment scripts
```

## 🔧 Manual Commands (if needed)

### Check Service Status
```bash
sudo systemctl status gunicorn
sudo systemctl status nginx
sudo systemctl status postgresql
```

### View Logs
```bash
sudo journalctl -u gunicorn -f
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
sudo systemctl restart gunicorn
sudo systemctl reload nginx
```

### Database Access
```bash
# Connection details are in /home/ubuntu/independently_thinking_human/django_backend/.env
sudo -u postgres psql independently_thinking_human
```

## 🆘 Troubleshooting

### Pipeline Fails
1. Check GitLab CI/CD variables are set correctly
2. Verify SSH key has access to server
3. Ensure server has sudo access for the user

### App Not Accessible
1. Check if services are running: `sudo systemctl status gunicorn nginx`
2. Verify firewall allows HTTP: `sudo ufw allow 80`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### Database Issues
1. Check PostgreSQL status: `sudo systemctl status postgresql`
2. Verify database exists: `sudo -u postgres psql -l`
3. Check Django migrations: `cd django_backend && ./venv/bin/python manage.py showmigrations`

## 🌐 Adding SSL/HTTPS

After initial deployment, add SSL with Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

Then update your GitLab variables:
```
DJANGO_ALLOWED_HOSTS: your-domain.com,www.your-domain.com
CSRF_TRUSTED_ORIGINS: https://your-domain.com,https://www.your-domain.com
```

## 📈 Scaling & Production

- **Database**: Consider managed PostgreSQL for production
- **Static Files**: Use CDN for static/media files
- **Monitoring**: Add application monitoring (Sentry, etc.)
- **Backup**: Implement automated database backups
- **Load Balancing**: Add multiple app servers behind load balancer

---

**🎉 Enjoy your fully automated deployment pipeline!**
