#!/bin/bash
# Deployment verification script
# Run this after deployment to verify everything is working

set -e

echo "🔍 Verifying deployment..."
echo "=========================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're on the server
if [ ! -f "/home/ubuntu/independently_thinking_human/django_backend/.env" ]; then
    echo -e "${RED}❌ Not running on production server or deployment incomplete${NC}"
    exit 1
fi

cd /home/ubuntu/independently_thinking_human

echo "1. Checking services..."
services=("postgresql" "gunicorn" "nginx")
for service in "${services[@]}"; do
    if systemctl is-active --quiet "$service"; then
        echo -e "   ✅ $service is ${GREEN}running${NC}"
    else
        echo -e "   ❌ $service is ${RED}not running${NC}"
    fi
done

echo ""
echo "2. Checking database connection..."
cd django_backend
if ./venv/bin/python -c "
import os
import django
from django.core.management import execute_from_command_line
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
django.setup()
from django.db import connection
cursor = connection.cursor()
cursor.execute('SELECT 1')
print('Database connection successful')
"; then
    echo -e "   ✅ Database ${GREEN}connected${NC}"
else
    echo -e "   ❌ Database ${RED}connection failed${NC}"
fi

echo ""
echo "3. Checking web server response..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
    echo -e "   ✅ Web server ${GREEN}responding${NC}"
else
    echo -e "   ❌ Web server ${RED}not responding${NC}"
fi

echo ""
echo "4. Checking file permissions..."
if [ -r "django_backend/.env" ] && [ -x "django_backend/venv/bin/python" ]; then
    echo -e "   ✅ File permissions ${GREEN}correct${NC}"
else
    echo -e "   ❌ File permissions ${RED}incorrect${NC}"
fi

echo ""
echo "5. Checking logs for errors..."
if journalctl -u gunicorn --since "5 minutes ago" | grep -i error; then
    echo -e "   ⚠️  Found ${YELLOW}errors${NC} in Gunicorn logs"
else
    echo -e "   ✅ No recent errors in ${GREEN}Gunicorn logs${NC}"
fi

echo ""
echo "=========================="
echo -e "🎉 Deployment verification ${GREEN}complete${NC}!"
echo ""
echo "Your application should be accessible at:"
echo "http://$(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_SERVER_IP')"
