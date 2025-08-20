#!/bin/bash
# Script to push changes to GitLab

# Set variables
GITLAB_URL="https://gitlab.com/t0shido-group/independently-thinking-human.git"
BRANCH="main"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
  echo "Error: Not in a git repository"
  exit 1
fi

# Check if we have uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "Committing changes..."
  git add .
  git commit -m "Fix Gunicorn service to create logs directory before starting"
fi

# Check if GitLab remote exists
if ! git remote | grep -q "gitlab"; then
  echo "Adding GitLab remote..."
  git remote add gitlab $GITLAB_URL
fi

# Push to GitLab
echo "Pushing to GitLab..."
git push gitlab $BRANCH

echo "Done!"
