#!/bin/bash
# Setup script for deploying Independently Thinking Human on AWS Lightsail
# Run this on your Lightsail Ubuntu instance

echo "==== Setting up Independently Thinking Human on AWS Lightsail ===="

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
sudo apt install -y git curl build-essential nginx

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Create app directory if cloning from GitHub
echo "Setting up application directory..."
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/independently-thinking-human.git
cd independently-thinking-human

# Install app dependencies
echo "Installing app dependencies..."
npm ci

# Build the app
echo "Building the application..."
npm run build

# Setup Nginx
echo "Configuring Nginx..."
sudo cp lightsail-nginx.conf /etc/nginx/sites-available/independently-thinking-human
sudo ln -sf /etc/nginx/sites-available/independently-thinking-human /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Setup systemd service
echo "Setting up systemd service..."
sudo cp independently-thinking-human.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable independently-thinking-human.service
sudo systemctl start independently-thinking-human.service

# Install PM2 as an alternative option
echo "Installing PM2 (optional process manager)..."
sudo npm install -g pm2
pm2 start server.js --name independently-thinking-human
pm2 startup
pm2 save

# Get service status
echo "==== Setup Complete! ===="
echo "Service status:"
sudo systemctl status independently-thinking-human.service

echo "You can now access your application at http://YOUR_LIGHTSAIL_IP"
echo "To configure HTTPS, run: sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx"
