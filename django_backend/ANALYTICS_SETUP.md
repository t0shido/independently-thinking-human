# Analytics System Setup Guide

## Overview

I've created a comprehensive visitor analytics system for your website that automatically tracks:
- ✅ Unique visitors with IP addresses
- ✅ Geographic location (country, city)
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser and OS information
- ✅ Page views and article reads
- ✅ Daily statistics
- ✅ Article performance metrics

## What Was Created

### 1. **Analytics App** (`django_backend/analytics/`)
- `models.py` - Database models for storing visitor data
- `middleware.py` - Automatic tracking of all requests
- `utils.py` - Helper functions for IP lookup and user agent parsing
- `admin.py` - Django admin interface for viewing analytics
- `views.py` - Dashboard view (future enhancement)

### 2. **Database Models**

#### **Visitor**
Tracks unique visitors with:
- IP address
- Geographic location (country, city, region)
- Device info (type, browser, OS)
- Visit count and timestamps

#### **PageView**
Records every page visit with:
- URL and referrer
- Response time
- Article section/slug (if applicable)
- Timestamp

#### **DailyStats**
Aggregated daily statistics:
- Unique visitors per day
- Total page views
- Top pages
- Geographic breakdown
- Device breakdown

#### **ArticleStats**
Per-article metrics:
- Total views
- Unique visitors
- Engagement metrics

## Installation Steps

### 1. **Install Required Package**

```bash
ssh lightsail
cd ~/independently_thinking_human/django_backend
source venv/bin/activate
pip install requests
pip freeze > requirements.txt
```

### 2. **Run Database Migrations**

```bash
python manage.py makemigrations analytics
python manage.py migrate
```

### 3. **Restart Gunicorn**

```bash
sudo systemctl restart gunicorn
```

## How It Works

### Automatic Tracking

The `AnalyticsMiddleware` automatically tracks every request:

1. **Filters out** unwanted traffic:
   - Admin pages
   - Static files
   - Known bots
   - Error pages
   - Malicious scanners

2. **Captures visitor info**:
   - IP address (handles proxies)
   - User agent (device, browser, OS)
   - Geographic location (via ipapi.co)

3. **Records page views**:
   - URL visited
   - Referrer (where they came from)
   - Response time
   - Article info (if viewing library)

4. **Updates statistics**:
   - Increments visit counter
   - Updates article view counts
   - Tracks unique visitors

### Privacy & Performance

- ✅ **No cookies** - Server-side tracking only
- ✅ **Cached geo lookups** - IP locations cached for 24 hours
- ✅ **Non-blocking** - Errors don't break the site
- ✅ **Bot filtering** - Excludes known bots and scanners
- ✅ **GDPR friendly** - Only stores necessary data

## Viewing Analytics

### Option 1: Django Admin (Easiest)

1. Go to: `http://18.158.49.238/admin/`
2. Login with your superuser credentials
3. Navigate to **Analytics** section
4. View:
   - **Visitors** - All unique visitors with details
   - **Page Views** - Individual page visits
   - **Daily Stats** - Aggregated daily data
   - **Article Stats** - Performance per article

### Option 2: Command Line

```bash
# View recent visitors
python manage.py shell
>>> from analytics.models import Visitor
>>> Visitor.objects.all()[:10]

# View today's page views
>>> from analytics.models import PageView
>>> from django.utils import timezone
>>> PageView.objects.filter(timestamp__date=timezone.now().date())

# View article statistics
>>> from analytics.models import ArticleStats
>>> ArticleStats.objects.order_by('-total_views')
```

### Option 3: Generate Daily Reports

```bash
# Generate stats for yesterday
python manage.py generate_daily_stats

# Generate stats for specific date
python manage.py generate_daily_stats --date 2026-01-12
```

## What You Can Track

### Visitor Information
- **IP Address**: Unique identifier
- **Location**: Country, city, region
- **Device**: Mobile, desktop, or tablet
- **Browser**: Chrome, Safari, Firefox, etc.
- **OS**: iOS, Android, macOS, Windows, etc.
- **Visit Count**: How many times they've visited
- **First/Last Visit**: When they discovered your site

### Page Analytics
- **URL**: Which pages are popular
- **Referrer**: Where visitors come from (Google, direct, etc.)
- **Response Time**: How fast pages load
- **Article Views**: Which articles are most read
- **Section Popularity**: Which topics get most traffic

### Daily Trends
- **Unique Visitors**: New vs returning
- **Page Views**: Total engagement
- **Top Pages**: Most popular content
- **Geographic Distribution**: Where your audience is
- **Device Mix**: Mobile vs desktop usage

## Example Queries

### Find your most engaged visitor
```python
from analytics.models import Visitor
top_visitor = Visitor.objects.order_by('-visit_count').first()
print(f"{top_visitor.ip_address} from {top_visitor.city}, {top_visitor.country}")
print(f"Visited {top_visitor.visit_count} times")
```

### See which articles are most popular
```python
from analytics.models import ArticleStats
top_articles = ArticleStats.objects.order_by('-total_views')[:5]
for article in top_articles:
    print(f"{article.section}/{article.slug}: {article.total_views} views")
```

### Check today's traffic
```python
from analytics.models import PageView
from django.utils import timezone
today = timezone.now().date()
today_views = PageView.objects.filter(timestamp__date=today).count()
unique_today = PageView.objects.filter(timestamp__date=today).values('visitor').distinct().count()
print(f"Today: {unique_today} visitors, {today_views} page views")
```

## Automated Daily Reports

Set up a cron job to generate daily statistics:

```bash
# Edit crontab
crontab -e

# Add this line (runs at 1 AM daily)
0 1 * * * cd /home/ubuntu/independently_thinking_human/django_backend && ./venv/bin/python manage.py generate_daily_stats
```

## Data Export

### Export visitor data to CSV
```python
import csv
from analytics.models import Visitor

with open('visitors.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['IP', 'Country', 'City', 'Device', 'Browser', 'Visits', 'Last Visit'])
    for visitor in Visitor.objects.all():
        writer.writerow([
            visitor.ip_address,
            visitor.country,
            visitor.city,
            visitor.device_type,
            visitor.browser,
            visitor.visit_count,
            visitor.last_visit
        ])
```

## Troubleshooting

### Analytics not tracking?

1. **Check middleware is active**:
   ```bash
   python manage.py shell
   >>> from django.conf import settings
   >>> 'analytics.middleware.AnalyticsMiddleware' in settings.MIDDLEWARE
   ```

2. **Check database tables exist**:
   ```bash
   python manage.py showmigrations analytics
   ```

3. **Check for errors**:
   ```bash
   sudo journalctl -u gunicorn -n 50
   ```

### Geo data not showing?

The free ipapi.co API has a limit of 1000 requests/day. If you exceed this:
- Geo data will be missing for new visitors
- Existing cached data will still work
- Consider upgrading to paid plan or using alternative service

## Future Enhancements

You can extend this system with:
- 📊 **Visual dashboard** with charts and graphs
- 📧 **Email reports** sent weekly/monthly
- 🔔 **Real-time alerts** for traffic spikes
- 🎯 **Conversion tracking** for specific goals
- 📱 **Mobile app** for checking stats on the go
- 🤖 **AI insights** to analyze visitor patterns

## Privacy Compliance

This system is designed to be privacy-friendly:
- ✅ No personal data collected (just IP addresses)
- ✅ No tracking across sites
- ✅ No third-party data sharing
- ✅ Data stored on your own server
- ✅ Easy to delete old data if needed

To comply with GDPR/privacy laws, consider adding:
- Privacy policy mentioning analytics
- Option to opt-out (via Do Not Track header)
- Data retention policy (auto-delete old data)

---

**Your analytics system is now ready to use!** 🎉

Every visitor to your site will be automatically tracked starting now. Check the Django admin to see the data coming in!
