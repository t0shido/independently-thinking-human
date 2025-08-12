#!/bin/bash

# GitLab CI/CD Variables Setup Script
# This script helps you prepare the values for GitLab CI/CD variables

echo "=== GitLab CI/CD Variables Setup ==="
echo ""

echo "1. SERVER CONNECTION VARIABLES:"
echo "   SSH_PRIVATE_KEY: Copy your private SSH key (cat ~/.ssh/id_rsa)"
echo "   SSH_KNOWN_HOSTS: Run 'ssh-keyscan YOUR_SERVER_IP' to get this"
echo "   PRODUCTION_USER: ubuntu"
echo "   PRODUCTION_SERVER: Your server IP or domain"
echo "   PRODUCTION_PATH: /home/ubuntu/independently_thinking_human"
echo ""

echo "2. DJANGO ENVIRONMENT VARIABLES:"
echo "   DJANGO_SECRET_KEY: $(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')"
echo "   DEBUG: false"
echo "   DJANGO_ALLOWED_HOSTS: your-domain.com,www.your-domain.com"
echo "   CSRF_TRUSTED_ORIGINS: https://your-domain.com,https://www.your-domain.com"
echo "   CORS_ALLOWED_ORIGINS: https://your-domain.com,https://www.your-domain.com"
echo "   DATABASE_URL: postgresql://username:password@localhost:5432/independently_thinking_human"
echo ""

echo "3. NEXT STEPS:"
echo "   - Go to GitLab Project → Settings → CI/CD → Variables"
echo "   - Add each variable above with appropriate values"
echo "   - Make sure to mark sensitive variables as 'Masked' and 'Protected'"
echo "   - Update database password on your server"
echo "   - Push code and run pipeline"
echo ""

echo "4. GENERATE SSH KNOWN_HOSTS:"
read -p "Enter your server IP/domain to generate SSH_KNOWN_HOSTS: " server_address
if [ ! -z "$server_address" ]; then
    echo "SSH_KNOWN_HOSTS value:"
    ssh-keyscan "$server_address" 2>/dev/null
fi
