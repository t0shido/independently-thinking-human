# Django Backend for Independently Thinking Human

This Django backend provides a database-driven approach for the Independently Thinking Human blog, using PostgreSQL for robust data storage and Django's powerful ORM and admin interface.

## Setup Instructions

### 1. Set up PostgreSQL

```bash
# Install PostgreSQL (if not already installed)
# On macOS with Homebrew:
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
psql -c 'CREATE DATABASE independently_thinking_human;'
```

### 2. Create and activate a virtual environment

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in `django_backend/`.

For local development, use values similar to:

```
DEBUG=True
DJANGO_SECRET_KEY=dev-only-secret-key
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=
DB_NAME=independently_thinking_human
DB_USER=your_local_db_user
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
```

For production, copy `env.template` and set `DEBUG=False` with real values for `DJANGO_SECRET_KEY`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`.

### 5. Run migrations

```bash
python manage.py makemigrations articles
python manage.py migrate
```

### 4. Create a superuser (for admin access)

```bash
python manage.py createsuperuser
```

### 5. Import existing content

```bash
python import_content.py
```

### 6. Run the development server

```bash
python manage.py runserver 8000
```

The server will be available at http://127.0.0.1:8000/

## API Endpoints

The following API endpoints are available, matching the Express.js backend:

- `GET /api/articles/:section` - Get all articles from a specific section
- `POST /api/articles` - Create a new article
- `PUT /api/articles/:section/:slug` - Update an existing article
- `DELETE /api/articles/:section/:slug` - Delete an article

## Admin Interface

Django provides a powerful admin interface for managing content. Access it at:

http://localhost:3001/admin/

## Media Files

Media files (images) are stored in the `media` directory and served at `/media/`.
