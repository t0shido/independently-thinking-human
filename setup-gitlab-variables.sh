#!/bin/bash

# GitLab CI/CD Variables Setup Script for Fully Automated Deployment
# This script helps you prepare the values for GitLab CI/CD variables

echo "🚀 === FULLY AUTOMATED GITLAB CI/CD SETUP === 🚀"
echo ""
echo "This setup requires ZERO manual server configuration!"
echo "Just set these GitLab variables and run the pipeline."
echo ""

echo "🔑 1. REQUIRED GITLAB CI/CD VARIABLES:"
echo ""

echo "📡 SERVER CONNECTION (Required):"
echo "   SSH_PRIVATE_KEY: Your private SSH key content"
echo "   SSH_KNOWN_HOSTS: Run 'ssh-keyscan YOUR_SERVER_IP' to get this"
echo "   PRODUCTION_SERVER: Your server IP address or domain"
echo ""

echo "🔐 DJANGO SECURITY (Required):"
echo "   DJANGO_SECRET_KEY: $(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())' 2>/dev/null || echo 'GENERATE_YOUR_OWN_SECRET_KEY')"
echo "   DJANGO_ALLOWED_HOSTS: your-server-ip,your-domain.com"
echo "   CSRF_TRUSTED_ORIGINS: http://your-server-ip,https://your-domain.com"
echo ""

echo "⚙️ OPTIONAL OVERRIDES (Use defaults if not set):"
echo "   PRODUCTION_USER: ubuntu (default)"
echo "   PRODUCTION_PATH: /home/ubuntu/independently_thinking_human (default)"
echo ""

echo "🎯 2. WHAT THE PIPELINE DOES AUTOMATICALLY:"
echo "   ✅ Installs all system dependencies (PostgreSQL, Nginx, Python)"
echo "   ✅ Creates secure database with random password"
echo "   ✅ Configures PostgreSQL authentication"
echo "   ✅ Sets up Python virtual environment"
echo "   ✅ Runs Django migrations"
echo "   ✅ Configures Nginx and systemd services"
echo "   ✅ Starts all services automatically"
echo ""

echo "📋 3. SETUP STEPS:"
echo "   1. Go to GitLab Project → Settings → CI/CD → Variables"
echo "   2. Add the REQUIRED variables above"
echo "   3. Mark SSH_PRIVATE_KEY and DJANGO_SECRET_KEY as 'Masked' and 'Protected'"
echo "   4. Push your code to main branch"
echo "   5. Go to CI/CD → Pipelines and manually trigger the deploy job"
echo "   6. Your app will be live at http://YOUR_SERVER_IP"
echo ""

echo "🔧 4. GENERATE SSH KNOWN_HOSTS:"
read -p "Enter your server IP/domain to generate SSH_KNOWN_HOSTS: " server_address
if [ ! -z "$server_address" ]; then
    echo ""
    echo "Add this as SSH_KNOWN_HOSTS variable:"
    echo "----------------------------------------"
    ssh-keyscan "$server_address" 2>/dev/null
    echo "----------------------------------------"
fi

echo ""
echo "🎉 THAT'S IT! No manual server setup required!"
echo "The pipeline handles everything automatically."
