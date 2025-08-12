# Independently Thinking Human - Project Tracker

## Project Overview
- **Project Name**: Independently Thinking Human
- **Project Path**: `/Users/toshi/Desktop/Projects/Coding/independently_thinking_human/`
- **Description**: A full-stack application with a philosophical focus on balancing between Order and Chaos while navigating through Life's Complexities
- **Last Updated**: August 12, 2025

## Project Structure

### Frontend (React-Vite)
- Entry point: `index.html` and `src/main.jsx`
- Navigation: React Router
- Key Pages:
  - Home: Introduction with philosophical content
  - Library: Content browsing and reading
  - Data: (Coming soon) Data analysis and visualizations
  - Contact: (Coming soon) Contact information and form
  - Admin: Content management

### Backend (Django)
- Main directory: `django_backend/`
- Apps:
  - `articles`: Content management
- Database: PostgreSQL
- Content import functionality: `import_content.py`

### Deployment
- Nginx configurations
- CI/CD setup scripts
- AWS Lightsail deployment scripts
- Gunicorn service files

## Completed Tasks
| Date | Task | Description | Status |
|------|------|-------------|--------|
| 2025-08-12 | Nginx routing finalized | Serve SPA at `/` from `/home/ubuntu/independently_thinking_human/frontend_dist`; proxy Django API under `/api/` to Gunicorn socket; keep `/static/` and `/media/` aliases; HTTPS with Let’s Encrypt. | Done |
| 2025-08-12 | CI/CD: frontend build + deploy | `frontend:build` produces `dist/`; deploy job rsyncs `${FRONTEND_DIR}/dist/` to `/home/ubuntu/independently_thinking_human/frontend_dist`. | Done |
| 2025-08-12 | CI/CD: backend deploy | Deploy job rsyncs `django_backend/` to `/home/ubuntu/independently_thinking_human/django_backend`, ensures dirs, sets up venv, installs requirements, runs `collectstatic` and `migrate`, restarts Gunicorn and reloads Nginx. | Done |
| 2025-08-12 | Documentation update | Added `conf.d` alternative in Server Verification Checklist; clarified symlinks vs conf.d. | Done |

## In-Progress Tasks
| Task | Description | Status | Notes |
|------|-------------|--------|-------|
| Gunicorn unit verification | Confirm systemd service name and socket path match Nginx (`gunicorn.sock`). | In progress | Update CI restart command if service name differs. |
| SSL issuance check | Ensure Certbot certs exist for domain and are auto-renewed. | In progress | `sudo certbot certificates` and renewal timer. |

## Planned Tasks
| Priority | Task | Description | Notes |
|----------|------|-------------|-------|
| High | Add automatic Nginx config deploy | Optionally push `nginx.conf` from CI to `/etc/nginx/...` and reload. | Guarded by manual approval. |
| Medium | Observability | Add basic monitoring/log rotation and error alerting. | journalctl/logrotate |
| Medium | Security hardening | Review headers, firewall, and DB access. | UFW rules, fail2ban |

## Technical Notes
- React with Vite for frontend
- Django with PostgreSQL for backend
- Mobile-responsive design implemented
- Content structure uses JSON files in the content directory

## Issues and Challenges
| Issue | Description | Status | Solution |
|-------|-------------|--------|----------|
| | | | |

## Resources
- Project GitHub repository: (Add link if available)
- Design assets: Located in `src/assets/`
- Content files: Located in `content/`

## Environment Setup
- Node.js and npm for frontend
- Python with virtual environment for Django backend
- PostgreSQL database

## Deployment Process
1. Frontend (SPA)
   - CI `frontend:build`: `npm ci && npm run build` → `${FRONTEND_DIR}/dist/`.
   - Deploy: rsync `${FRONTEND_DIR}/dist/` → `/home/ubuntu/independently_thinking_human/frontend_dist`.
   - Nginx serves `/` with `try_files $uri /index.html`.
2. Backend (Django)
   - Deploy: rsync `django_backend/` → `/home/ubuntu/independently_thinking_human/django_backend`.
   - Server: create dirs `{staticfiles,media}`, venv, `pip install -r requirements.txt`.
   - Django: `python manage.py collectstatic --noinput` and `python manage.py migrate --noinput`.
   - Services: restart Gunicorn, reload Nginx.
3. Database
   - PostgreSQL running; app uses either `postgres` or least-privileged `django_user`.

---

*This document serves as a continuous reference for the Independently Thinking Human project. Update it regularly as tasks are completed and new features are implemented.*
