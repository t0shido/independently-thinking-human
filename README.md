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

## Deployment to AWS Lightsail with Docker

This project is configured to be deployed on AWS Lightsail using Docker. The setup includes both the React frontend and Express backend in a single container.

### 1. Prerequisites

- AWS account with access to Lightsail
- AWS CLI installed and configured
- Docker and Docker Compose installed locally

### 2. Build and Test Docker Container Locally

```bash
# Build and start the container locally
docker-compose up --build

# Access the application at http://localhost:80
```

### 3. Deploy to AWS Lightsail

#### 3.1 Create a Lightsail Container Service

1. Log in to the AWS Management Console
2. Navigate to Lightsail
3. Click on "Container services" in the left navigation
4. Click "Create container service"
5. Choose your preferred AWS Region
6. Select a plan (Micro or Small is usually sufficient)
7. Name your service (e.g., "independently-thinking-human")
8. Click "Create container service"

#### 3.2 Push Your Docker Image to Lightsail

```bash
# Get the push commands from Lightsail console
# Navigate to your container service > Deployments > Push container images

# Example commands (replace with actual commands from console):
aws lightsail push-container-image --service-name independently-thinking-human --label blog-container --image independently_thinking_human:latest
```

#### 3.3 Deploy the Container

1. In the Lightsail console, navigate to your container service
2. Click on "Deployments" > "Create your first deployment"
3. Select the container image you pushed
4. Configure the container entry point as `node server.js`
5. Set the port to `3002`
6. Add the following environment variables:
   - `NODE_ENV=production`
7. Click "Add open ports" and add port 80 (HTTP)
8. Click "Create deployment"

#### 3.4 Configure Persistent Storage

1. In the Lightsail console, navigate to your container service
2. Click on "Storage"
3. Click "Create storage"
4. Set the mount point to `/app/content`
5. Set an appropriate storage size (e.g., 5 GB)
6. Click "Create storage"
7. Create a new deployment to apply the storage configuration

### 4. Access Your Deployed Blog

Once the deployment is complete, you can access your blog using the public domain provided by Lightsail. You can also configure a custom domain by following the instructions in the Lightsail console.

### 5. Updating Your Deployment

To update your deployment with new code:

```bash
# Build a new Docker image locally
docker-compose build

# Push the new image to Lightsail
aws lightsail push-container-image --service-name independently-thinking-human --label blog-container --image independently_thinking_human:latest

# Create a new deployment in the Lightsail console using the updated image
```

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

