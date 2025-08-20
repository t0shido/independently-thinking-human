# Database Synchronization Guide

## Overview

This guide explains how to synchronize content from your local development database to the production server using the GitLab CI/CD pipeline. The synchronization process is designed to update specific content tables (`articles_article`, `articles_category`, `articles_tag`) without affecting user data or system tables.

## How It Works

The database synchronization process follows a two-step approach:

1. **Local Dump Creation**: You create a SQL dump file of specific content tables from your local database
2. **Server-Side Application**: The GitLab CI/CD pipeline uploads and applies this dump to the production database

This approach was chosen because GitLab runners cannot directly access your local database, so we use a pre-created dump file that gets committed to the repository.

## Prerequisites

- Local PostgreSQL database with content to synchronize
- Access to the GitLab repository
- Proper GitLab CI/CD environment variables configured

## Step-by-Step Process

### 1. Create Local Database Dump

Run the following command in your terminal to create a dump of the content tables:

```bash
pg_dump -h localhost -U toshi -t articles_article -t articles_category -t articles_tag independently_thinking_human > django_backend/content_dump.sql
```

This command:
- Connects to your local PostgreSQL database
- Extracts only the specified content tables
- Saves the output to `django_backend/content_dump.sql`

### 2. Commit and Push the Dump File

```bash
git add django_backend/content_dump.sql
git commit -m "Update content dump for synchronization"
git push origin main
git push gitlab main  # Make sure to push to GitLab to trigger the pipeline
```

### 3. Run the Database Sync Job

1. Go to your GitLab project: `gitlab.com/t0shido-group/independently-thinking-human`
2. Navigate to CI/CD > Pipelines
3. Find the latest pipeline that was triggered by your push
4. Manually trigger the `sync:database` job by clicking the play button

### 4. Monitor the Synchronization

The job will:
- Create a backup of the production database before making any changes
- Apply your content dump to update articles, categories, and tags
- Synchronize media files from your local environment to production

You can monitor the progress in the job logs.

## What Gets Synchronized

1. **Database Tables**:
   - `articles_article`: All article content
   - `articles_category`: Category information
   - `articles_tag`: Content tags

2. **Media Files**:
   - All files in the `django_backend/media/` directory

## Troubleshooting

### Common Issues

1. **Missing Dump File**:
   ```
   ❌ Content dump file not found at django_backend/content_dump.sql
   ```
   **Solution**: Create the dump file locally as described in step 1.

2. **SQL Errors During Application**:
   ```
   ERROR: relation "articles_article" already exists
   ERROR: duplicate key value violates unique constraint
   ```
   **Note**: These are normal when applying a dump to an existing database and can usually be ignored as long as the job completes successfully.

3. **Permission Issues**:
   If you see permission errors, ensure the PostgreSQL user has proper access rights on the production server.

## Best Practices

1. **Always create a fresh dump** before synchronizing to ensure you're pushing the latest content
2. **Review the dump file** before committing to ensure no sensitive data is included
3. **Check the job logs** after synchronization to verify everything was applied correctly
4. **Test the production site** after synchronization to ensure content appears as expected

## Technical Details

The database synchronization job is defined in `.gitlab-ci.yml` and uses:
- Alpine Linux as the base image
- SSH for secure server access
- PostgreSQL's native tools (`pg_dump` and `psql`) for database operations
- `rsync` for media file synchronization

---

*This guide is part of the Independently Thinking Human project documentation. Last updated: August 18, 2025.*
