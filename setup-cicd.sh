#!/bin/bash
# Setup script for CI/CD on AWS Lightsail
# Run this on your Lightsail Ubuntu instance

echo "==== Setting up CI/CD for Independently Thinking Human on AWS Lightsail ===="

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
sudo apt install -y git curl build-essential nginx python3-venv python3-dev postgresql postgresql-contrib libpq-dev

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# Create app directory
echo "Setting up application directory..."
mkdir -p /home/ubuntu/independently-thinking-human
cd /home/ubuntu/independently-thinking-human

# Setup GitHub deploy key (if not already done)
echo "Setting up GitHub deploy key..."
if [ ! -f ~/.ssh/id_rsa ]; then
  ssh-keygen -t rsa -b 4096 -C "lightsail-deploy-key" -f ~/.ssh/id_rsa -N ""
  echo "Add this public key to your GitHub repository deploy keys:"
  cat ~/.ssh/id_rsa.pub
  echo ""
  echo "Press Enter after you've added the key to GitHub..."
  read
fi

# Install Gunicorn
echo "Installing Gunicorn..."
pip3 install gunicorn

# Setup Gunicorn service
echo "Setting up Gunicorn service..."
sudo cp /home/ubuntu/independently-thinking-human/gunicorn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable gunicorn.service

# Setup Nginx
echo "Configuring Nginx..."
sudo cp /home/ubuntu/independently-thinking-human/production-nginx.conf /etc/nginx/sites-available/independently-thinking-human
sudo ln -sf /etc/nginx/sites-available/independently-thinking-human /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Setup systemd service for Node.js (alternative to PM2)
echo "Setting up systemd service for Node.js..."
sudo cp /home/ubuntu/independently-thinking-human/independently-thinking-human.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable independently-thinking-human.service

# Create .env file for Django
echo "Creating .env file for Django..."
cat > /home/ubuntu/independently-thinking-human/django_backend/.env << EOL
# Django settings
SECRET_KEY=$(python3 -c 'import random; print("".join(random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)))')
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com

# Database settings
DATABASE_URL=postgresql://toshi:@localhost:5432/independently_thinking_human

# Media settings
MEDIA_URL=/media/
EOL

echo "==== CI/CD Setup Complete! ===="
echo "Next steps:"
echo "1. Update the domain name in production-nginx.conf"
echo "2. Add the following secrets to your GitHub repository:"
echo "   - LIGHTSAIL_HOST: Your Lightsail instance IP"
echo "   - LIGHTSAIL_USER: ubuntu (or your username)"
echo "   - LIGHTSAIL_KEY: Your private SSH key"
echo "   - ALLOWED_HOSTS: comma-separated list of allowed hosts"
echo "3. Push to your main branch to trigger the deployment"
