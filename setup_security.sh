#!/bin/bash

# Security Setup Script for Independently Thinking Human Blog
# This script helps set up the secure authentication system

set -e  # Exit on error

echo "🔒 Security Setup for Independently Thinking Human Blog"
echo "========================================================"
echo ""

# Check if we're in the right directory
if [ ! -d "django_backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

cd django_backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/upgrade dependencies
echo "📦 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "📝 Creating .env from template..."
    
    if [ -f "env.template" ]; then
        cp env.template .env
        echo "✅ Created .env file from template"
        echo "⚠️  Please edit .env and set your environment variables"
    else
        echo "❌ Error: env.template not found"
        exit 1
    fi
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Check if superuser exists
echo ""
echo "👤 Admin User Setup"
echo "==================="
echo ""
echo "Do you want to create a Django superuser? (y/n)"
read -r create_user

if [ "$create_user" = "y" ] || [ "$create_user" = "Y" ]; then
    echo ""
    echo "Please enter admin credentials:"
    python manage.py createsuperuser
    echo ""
    echo "✅ Superuser created successfully!"
else
    echo "⏭️  Skipping superuser creation"
    echo "   You can create one later with: python manage.py createsuperuser"
fi

echo ""
echo "✅ Security setup complete!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Review and update .env file with your settings"
echo "2. Start the Django backend: cd django_backend && source venv/bin/activate && python manage.py runserver"
echo "3. Start the frontend: npm run dev"
echo "4. Enable admin route in src/App.jsx (follow SECURITY_FIXES.md)"
echo "5. Test login at http://localhost:5173/admin"
echo ""
echo "📖 For more information, see SECURITY_FIXES.md"
echo ""
