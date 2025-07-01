# Independently Thinking Human Blog

A personal blog built with React and Vite, featuring articles on various topics including technology, economics, politics, and mindset. The blog includes a content management system that allows for easy uploading of new pictures and articles that automatically get displayed on the website.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In a separate terminal, start the backend server
node server.js
```

## Deployment

This project can be deployed to any standard Node.js hosting environment.

### 1. Build the Project

```bash
# Install dependencies
npm install

# Build the production version
npm run build
```

This will create a `dist` folder with the production build.

### 2. Deploy to a Hosting Service

You can deploy this application to any hosting service that supports Node.js applications, such as:

- AWS Lightsail
- Heroku
- Vercel
- Netlify
- DigitalOcean

#### Example: Basic Server Setup

1. Transfer the build files to your server
2. Install dependencies on the server
3. Start the server with:

```bash
# Set to production mode
export NODE_ENV=production

# Start the server
node server.js
```

### 3. Server Configuration

If using Nginx as a reverse proxy, a basic configuration would be:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Persistent Storage

Ensure your content directory is properly backed up or stored in a persistent location on your server.

This will create a `dist` folder with the production build.

### 2. Deploy to Lightsail

1. Upload the contents of the `dist` folder to your Lightsail instance using SFTP or SCP

```bash
scp -r dist/* user@your-lightsail-ip:/path/to/your/web/directory
```

2. Configure your Lightsail instance to serve the static files

If using Apache, make sure your virtual host configuration points to the directory where you uploaded the files.

If using Nginx, a typical configuration would be:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/your/web/directory;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Restart your web server

```bash
sudo service nginx restart  # For Nginx
# OR
sudo service apache2 restart  # For Apache
```

## Project Structure

- `src/`: React components and application code
- `content/`: Blog articles and assets
- `public/`: Static assets

# Updated on Sat May 31 00:00:03 CEST 2025
