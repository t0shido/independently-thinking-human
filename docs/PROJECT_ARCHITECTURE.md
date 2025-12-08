# Independently Thinking Human - Project Architecture

## 🗺️ High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              YOUR COMPUTER                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  /Users/toshi/Desktop/Projects/Coding/independently_thinking_human  │   │
│  │                                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │   │
│  │  │   Frontend   │  │   Backend    │  │   Config & Deployment    │  │   │
│  │  │   (React)    │  │   (Django)   │  │   (GitLab CI/CD)         │  │   │
│  │  │   src/       │  │django_backend│  │   .gitlab-ci.yml         │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    │ git push gitlab main                    │
│                                    ▼                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GITLAB                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  CI/CD Pipeline (.gitlab-ci.yml)                                    │   │
│  │                                                                      │   │
│  │  1. frontend:build  →  npm ci && npm run build  →  dist/            │   │
│  │  2. backend:build   →  pip install && collectstatic                 │   │
│  │  3. deploy:production (manual trigger)  →  SSH to Lightsail         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    │ SSH + rsync                             │
│                                    ▼                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AWS LIGHTSAIL SERVER                                 │
│                         (Ubuntu Linux)                                       │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  /home/ubuntu/independently_thinking_human/                         │   │
│  │                                                                      │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │   │
│  │  │frontend_dist│    │django_backend│   │      PostgreSQL         │ │   │
│  │  │  (built     │    │  (Django    │    │  (Database)             │ │   │
│  │  │   React)    │    │   API)      │    │                         │ │   │
│  │  └─────────────┘    └─────────────┘    └─────────────────────────┘ │   │
│  │        │                   │                       │               │   │
│  │        └───────────────────┴───────────────────────┘               │   │
│  │                            │                                        │   │
│  │                     ┌──────┴──────┐                                │   │
│  │                     │   Nginx     │                                │   │
│  │                     │(Web Server) │                                │   │
│  │                     └──────┬──────┘                                │   │
│  │                            │                                        │   │
│  └────────────────────────────┼────────────────────────────────────────┘   │
│                               │                                              │
│                               ▼                                              │
│                    https://independently-thinking-human.com                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Local Project Structure

```
independently_thinking_human/
│
├── 📂 src/                          # FRONTEND (React + Vite)
│   ├── main.jsx                     # Entry point
│   ├── App.jsx                      # Main app component, routing
│   ├── config.js                    # API URLs, sections config
│   │
│   ├── 📂 pages/
│   │   ├── Library.jsx              # Shows articles by section
│   │   └── Admin.jsx                # Admin interface (not Django admin)
│   │
│   ├── 📂 components/
│   │   ├── LibraryPost.jsx          # Single article display
│   │   ├── MobileNav.jsx            # Mobile navigation
│   │   └── LibraryMobileNav.jsx     # Library section mobile nav
│   │
│   └── 📂 utils/
│       ├── api.js                   # API calls (getArticles, createArticle, etc.)
│       ├── libraryLoader.js         # Fetches & caches articles
│       └── imageUtils.js            # Image URL helpers
│
├── 📂 django_backend/               # BACKEND (Django REST API)
│   ├── manage.py                    # Django CLI
│   ├── requirements.txt             # Python dependencies
│   ├── .env                         # Environment variables (not in git)
│   │
│   ├── 📂 blog_backend/             # Django project settings
│   │   ├── settings.py              # Database, CORS, logging config
│   │   ├── urls.py                  # URL routing (/api/, /admin/)
│   │   └── wsgi.py                  # WSGI entry point for Gunicorn
│   │
│   ├── 📂 articles/                 # Django app for articles
│   │   ├── models.py                # Article, Section, Tag models
│   │   ├── views.py                 # API endpoints (list, create, update, delete)
│   │   ├── serializers.py           # JSON serialization
│   │   ├── urls.py                  # /api/articles/... routes
│   │   └── admin.py                 # Django admin configuration
│   │
│   └── 📂 media/                    # Uploaded images
│       ├── mindset/
│       ├── politics/
│       └── ...
│
├── 📂 content/                      # Static content (favicon, home page)
│   └── home/
│
├── 📂 nginx/                        # Nginx configuration
│   └── independently-thinking-human.conf
│
├── 📂 systemd/                      # Linux service files
│   ├── gunicorn.service             # Django/Gunicorn service
│   └── gunicorn.socket              # Socket for Nginx → Gunicorn
│
├── 📂 scripts/                      # Helper scripts
│   ├── setup_postgres.sh            # Database setup
│   └── health_check.py              # Server health check
│
├── .gitlab-ci.yml                   # CI/CD pipeline definition
├── vite.config.js                   # Vite build configuration
├── package.json                     # Node.js dependencies
└── server.cjs                       # Legacy Node.js server (NOT USED in prod)
```

---

## 🔄 Data Flow: How a User Sees an Article

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  USER'S BROWSER                                                              │
│                                                                              │
│  1. User visits https://independently-thinking-human.com/library/mindset    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  NGINX (Port 443 - HTTPS)                                                    │
│                                                                              │
│  Routes based on URL path:                                                   │
│                                                                              │
│  /                    →  Serve frontend_dist/index.html (React SPA)         │
│  /library/*           →  Serve frontend_dist/index.html (React handles it)  │
│  /api/*               →  Proxy to Gunicorn (Django)                         │
│  /admin/*             →  Proxy to Gunicorn (Django Admin)                   │
│  /static/*            →  Serve django_backend/staticfiles/                  │
│  /media/*             →  Serve django_backend/media/                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                 ▼
┌─────────────────────────────┐    ┌─────────────────────────────────────────┐
│  FRONTEND (React SPA)       │    │  BACKEND (Django via Gunicorn)          │
│                             │    │                                          │
│  Library.jsx loads          │    │  Receives: GET /api/articles/mindset/   │
│  ↓                          │    │  ↓                                       │
│  libraryLoader.js           │    │  articles/urls.py routes to views.py    │
│  ↓                          │    │  ↓                                       │
│  api.js calls:              │    │  ArticleViewSet.list()                  │
│  GET /api/articles/mindset/ │───▶│  ↓                                       │
│                             │    │  Query PostgreSQL database              │
│                             │    │  ↓                                       │
│  Receives JSON array        │◀───│  Return JSON via serializers.py         │
│  ↓                          │    │                                          │
│  Renders article cards      │    └─────────────────────────────────────────┘
│                             │                      │
└─────────────────────────────┘                      ▼
                                   ┌─────────────────────────────────────────┐
                                   │  POSTGRESQL DATABASE                     │
                                   │                                          │
                                   │  Tables:                                 │
                                   │  - articles_article (title, content...) │
                                   │  - articles_section (mindset, politics) │
                                   │  - articles_tag                         │
                                   │  - auth_user (admin users)              │
                                   │                                          │
                                   └─────────────────────────────────────────┘
```

---

## 🖥️ Server Architecture (Lightsail)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AWS LIGHTSAIL INSTANCE                                                      │
│  IP: (your server IP)                                                        │
│  User: ubuntu                                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SYSTEMD SERVICES (managed by Linux)                                │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │   │
│  │  │ nginx.service   │  │gunicorn.socket  │  │ postgresql.service  │ │   │
│  │  │                 │  │       +         │  │                     │ │   │
│  │  │ Listens on      │  │gunicorn.service │  │ Database server     │ │   │
│  │  │ ports 80, 443   │  │                 │  │ port 5432           │ │   │
│  │  │                 │  │ Django app      │  │                     │ │   │
│  │  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘ │   │
│  │           │                    │                       │           │   │
│  │           │    Unix Socket     │                       │           │   │
│  │           │ /run/gunicorn/socket                       │           │   │
│  │           │                    │                       │           │   │
│  │           └────────────────────┴───────────────────────┘           │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  FILE SYSTEM                                                         │   │
│  │                                                                      │   │
│  │  /home/ubuntu/independently_thinking_human/                         │   │
│  │  ├── frontend_dist/          # Built React app (served by Nginx)    │   │
│  │  │   ├── index.html                                                 │   │
│  │  │   └── assets/                                                    │   │
│  │  │                                                                   │   │
│  │  └── django_backend/         # Django application                   │   │
│  │      ├── .env                # DATABASE_URL, SECRET_KEY, etc.       │   │
│  │      ├── venv/               # Python virtual environment           │   │
│  │      ├── media/              # Uploaded images                      │   │
│  │      ├── staticfiles/        # Django static files                  │   │
│  │      └── logs/               # Gunicorn logs                        │   │
│  │                                                                      │   │
│  │  /etc/nginx/sites-enabled/                                          │   │
│  │  └── independently-thinking-human.conf                              │   │
│  │                                                                      │   │
│  │  /etc/systemd/system/                                               │   │
│  │  ├── gunicorn.service                                               │   │
│  │  └── gunicorn.socket                                                │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Flow (GitLab CI/CD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  YOU: git push gitlab main                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  GITLAB CI/CD PIPELINE                                                       │
│                                                                              │
│  Stage 1: BUILD (automatic)                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  frontend:build                    backend:build                     │   │
│  │  ├── npm ci                        ├── pip install -r requirements  │   │
│  │  ├── npm run build                 ├── python manage.py collectstatic│   │
│  │  └── Artifact: dist/               └── python manage.py check       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                     │                                        │
│                                     ▼                                        │
│  Stage 2: DEPLOY (manual trigger required)                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  deploy:production                                                   │   │
│  │  ├── SSH into Lightsail server                                      │   │
│  │  ├── Run auto_deploy.sh:                                            │   │
│  │  │   ├── Install system packages (postgres, nginx, python)          │   │
│  │  │   ├── Create database & user                                     │   │
│  │  │   └── Configure pg_hba.conf                                      │   │
│  │  ├── rsync frontend_dist/ to server                                 │   │
│  │  ├── rsync django_backend/ to server                                │   │
│  │  ├── Run app_deploy.sh:                                             │   │
│  │  │   ├── Create Python venv                                         │   │
│  │  │   ├── pip install requirements                                   │   │
│  │  │   ├── Create .env file                                           │   │
│  │  │   ├── python manage.py migrate                                   │   │
│  │  │   ├── python manage.py collectstatic                             │   │
│  │  │   ├── Configure Nginx                                            │   │
│  │  │   ├── Configure systemd services                                 │   │
│  │  │   └── Restart gunicorn & nginx                                   │   │
│  │  └── Done!                                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Stage 3: SYNC (manual, optional)                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  sync:database                                                       │   │
│  │  ├── Upload content_dump.sql                                        │   │
│  │  ├── Load into PostgreSQL (OVERWRITES existing data!)               │   │
│  │  └── Sync media files                                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Key Configuration Files

### 1. Frontend API Configuration (`src/config.js`)

```javascript
const config = {
  api: {
    baseUrl: (() => {
      if (window.location.hostname === 'localhost') {
        return 'http://127.0.0.1:8000/api';  // Local development
      }
      return '/api';  // Production (relative URL)
    })(),
  }
};
```

**What this means:**
- In development: Frontend calls `http://127.0.0.1:8000/api/articles/...`
- In production: Frontend calls `/api/articles/...` (same domain, Nginx proxies it)

---

### 2. Django Database Configuration (`django_backend/blog_backend/settings.py`)

```python
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {'default': dj_database_url.parse(DATABASE_URL)}
else:
    # Local development fallback
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'independently_thinking_human',
            'USER': 'toshi',
            'HOST': 'localhost',
        }
    }
```

**What this means:**
- On server: Uses `DATABASE_URL` from `.env` file
- Locally: Connects to your local PostgreSQL as user `toshi`

---

### 3. Nginx Configuration (`nginx/independently-thinking-human.conf`)

```nginx
server {
    listen 443 ssl;
    server_name independently-thinking-human.com;

    # Frontend (React SPA)
    root /home/ubuntu/independently_thinking_human/frontend_dist;
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API → Django
    location /api/ {
        proxy_pass http://unix:/run/gunicorn/socket;
    }

    # Admin → Django
    location /admin/ {
        proxy_pass http://unix:/run/gunicorn/socket;
    }

    # Static files
    location /static/ {
        alias /home/ubuntu/independently_thinking_human/django_backend/staticfiles/;
    }

    # Media files (uploaded images)
    location /media/ {
        alias /home/ubuntu/independently_thinking_human/django_backend/media/;
    }
}
```

**What this means:**
- `/` → Serves React app
- `/api/*` → Proxies to Django via Unix socket
- `/media/*` → Serves uploaded images directly

---

### 4. Gunicorn Service (`systemd/gunicorn.service`)

```ini
[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/independently_thinking_human/django_backend
EnvironmentFile=/home/ubuntu/independently_thinking_human/django_backend/.env
ExecStart=/home/ubuntu/.../venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/run/gunicorn/socket \
          blog_backend.wsgi:application
```

**What this means:**
- Runs Django via Gunicorn with 3 worker processes
- Listens on a Unix socket (not a TCP port)
- Loads environment variables from `.env`

---

## 🐛 Common Failure Points

### 1. Frontend shows "No articles" but API has data

```
SYMPTOM: Website shows empty, but /api/articles/mindset/ returns JSON

CHECK: Browser console for errors
CAUSE: Frontend error handling silently returns empty array
FIX: Check src/utils/libraryLoader.js catch block
```

### 2. API returns 502 Bad Gateway

```
SYMPTOM: /api/* returns 502 error

CHECK: 
  sudo systemctl status gunicorn.service
  sudo systemctl status gunicorn.socket
  ls -la /run/gunicorn/socket

CAUSE: Gunicorn crashed or socket is stale
FIX: sudo systemctl restart gunicorn.socket gunicorn.service
```

### 3. API returns 500 Internal Server Error

```
SYMPTOM: /api/* returns 500 error

CHECK:
  tail -100 /home/ubuntu/.../django_backend/logs/gunicorn-error.log
  sudo journalctl -u gunicorn.service --since "1 hour ago"

CAUSE: Usually database connection error
FIX: Check .env has correct DATABASE_URL
```

### 4. Images not loading

```
SYMPTOM: Articles show but images are broken

CHECK:
  ls -la /home/ubuntu/.../django_backend/media/
  curl https://independently-thinking-human.com/media/mindset/wave.png

CAUSE: 
  - Files missing from media/
  - Nginx not configured to serve /media/
  - Image path in database is wrong

FIX: Check Nginx config and media directory
```

### 5. Database is empty after deploy

```
SYMPTOM: API returns [] for all sections

CHECK:
  sudo -u postgres psql independently_thinking_human \
    -c "SELECT COUNT(*) FROM articles_article;"

CAUSE: 
  - sync:database job ran with old/empty dump
  - Database was recreated without importing data

FIX: Re-import content or restore from backup
```

---

## 🔍 Debugging Commands (SSH to Server)

```bash
# Check all services
sudo systemctl status nginx gunicorn.socket gunicorn.service postgresql

# Check Gunicorn logs
tail -100 /home/ubuntu/independently_thinking_human/django_backend/logs/gunicorn-error.log

# Check Nginx logs
sudo tail -100 /var/log/nginx/error.log

# Test API directly (bypassing Nginx)
curl --unix-socket /run/gunicorn/socket http://localhost/api/articles/mindset/

# Check database
sudo -u postgres psql independently_thinking_human -c "SELECT COUNT(*) FROM articles_article;"

# Check .env file
cat /home/ubuntu/independently_thinking_human/django_backend/.env

# Restart everything
sudo systemctl restart gunicorn.socket gunicorn.service nginx
```

---

## 📊 Database Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PostgreSQL Database: independently_thinking_human                           │
│                                                                              │
│  ┌─────────────────────┐       ┌─────────────────────────────────────────┐ │
│  │  articles_section   │       │  articles_article                       │ │
│  │                     │       │                                          │ │
│  │  id (PK)            │◀──────│  id (PK)                                │ │
│  │  name               │   FK  │  title                                  │ │
│  │  slug               │       │  slug                                   │ │
│  │                     │       │  author                                 │ │
│  └─────────────────────┘       │  date                                   │ │
│                                │  excerpt                                │ │
│                                │  content                                │ │
│                                │  section_id (FK) ───────────────────────┘ │
│                                │  image                                  │ │
│                                │                                          │ │
│                                └──────────────────┬──────────────────────┘ │
│                                                   │                         │
│                                                   │ M:N                     │
│                                                   ▼                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  articles_tag                                                        │   │
│  │                                                                      │   │
│  │  id (PK)                                                            │   │
│  │  name                                                               │   │
│  │  articles (ManyToMany → articles_article)                           │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  auth_user (Django built-in)                                        │   │
│  │                                                                      │   │
│  │  id, username, email, password, is_superuser, ...                   │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 Environment Variables

### GitLab CI/CD Variables (Settings → CI/CD → Variables)

| Variable | Purpose |
|----------|---------|
| `SSH_PRIVATE_KEY` | SSH key to connect to Lightsail |
| `SSH_KNOWN_HOSTS` | Server fingerprint |
| `PRODUCTION_SERVER` | Server IP address |
| `DJANGO_SECRET_KEY` | Django security key |
| `DJANGO_ALLOWED_HOSTS` | Allowed domains |
| `CSRF_TRUSTED_ORIGINS` | CSRF protection |
| `DATABASE_PASSWORD` | PostgreSQL password (optional) |

### Server `.env` File (`django_backend/.env`)

```env
DJANGO_SECRET_KEY='...'
DJANGO_ALLOWED_HOSTS='independently-thinking-human.com,IP'
CSRF_TRUSTED_ORIGINS='https://independently-thinking-human.com'
DEBUG=False
DATABASE_URL='postgresql://app_user:PASSWORD@localhost:5432/independently_thinking_human'
```

---

## ✅ Health Check Checklist

When something breaks, check in this order:

1. **Can you reach the site?** → DNS / Lightsail instance running?
2. **Does the homepage load?** → Nginx serving frontend?
3. **Do API calls work?** → Gunicorn running? Socket exists?
4. **Does the database have data?** → PostgreSQL running? Data imported?
5. **Are images loading?** → Media files exist? Nginx serving /media/?

---

*Last updated: December 2025*
</CodeContent>
</invoke>
