#!/usr/bin/env python
"""
Script to import existing JSON content into the Django database.
Run this after setting up the Django project and running migrations.
"""
import os
import json
import shutil
import django
from datetime import datetime
from pathlib import Path

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
django.setup()

# Now we can import Django models
from articles.models import Article, Section, Tag

def import_content():
    """Import all JSON content from the content directory into the Django database"""
    print("Starting content import...")
    
    # Path to the content directory
    content_dir = Path(__file__).resolve().parent.parent / 'content' / 'library'
    media_dir = Path(__file__).resolve().parent / 'media'
    
    # Make sure media directory exists
    if not os.path.exists(media_dir):
        os.makedirs(media_dir)
    
    # Get all section directories
    section_dirs = [d for d in os.listdir(content_dir) if os.path.isdir(os.path.join(content_dir, d))]
    
    for section_name in section_dirs:
        print(f"Processing section: {section_name}")
        
        # Create section in database
        section, created = Section.objects.get_or_create(
            slug=section_name,
            defaults={'name': section_name.capitalize()}
        )
        
        # Create section directory in media if it doesn't exist
        section_media_dir = os.path.join(media_dir, section_name)
        if not os.path.exists(section_media_dir):
            os.makedirs(section_media_dir)
        
        # Process all JSON files in the section directory
        section_dir = os.path.join(content_dir, section_name)
        json_files = [f for f in os.listdir(section_dir) if f.endswith('.json')]
        
        for json_file in json_files:
            file_path = os.path.join(section_dir, json_file)
            slug = json_file.replace('.json', '')
            
            print(f"  Processing article: {slug}")
            
            try:
                # Load JSON content
                with open(file_path, 'r', encoding='utf-8') as f:
                    article_data = json.load(f)
                
                # Parse date
                try:
                    article_date = datetime.strptime(article_data.get('date', '2025-01-01'), '%Y-%m-%d').date()
                except ValueError:
                    article_date = datetime.now().date()
                
                # Create or update article
                article, created = Article.objects.update_or_create(
                    slug=slug,
                    section=section,
                    defaults={
                        'title': article_data.get('title', ''),
                        'author': article_data.get('author', 'Toshi'),
                        'date': article_date,
                        'excerpt': article_data.get('excerpt', ''),
                        'content': article_data.get('content', '')
                    }
                )
                
                # Handle image
                image_filename = article_data.get('image')
                if image_filename:
                    # Source image path
                    source_image_path = os.path.join(content_dir, section_name, image_filename)
                    
                    # Destination image path
                    dest_image_path = os.path.join(section_media_dir, image_filename)
                    
                    # Store the image path as a string
                    article.image = os.path.join(section_name, image_filename)
                    article.save()
                    
                    # Copy the image file if it exists
                    if os.path.exists(source_image_path):
                        try:
                            shutil.copy2(source_image_path, dest_image_path)
                            print(f"    Copied image: {image_filename}")
                        except Exception as e:
                            print(f"    Error copying image {image_filename}: {str(e)}")
                
                # Handle tags
                tags = article_data.get('tags', [])
                for tag_name in tags:
                    if tag_name:
                        tag, _ = Tag.objects.get_or_create(name=tag_name)
                        article.tags.add(tag)
                
                print(f"    {'Created' if created else 'Updated'} article: {article.title}")
                
            except Exception as e:
                print(f"    Error processing {json_file}: {str(e)}")
    
    print("Content import completed!")

if __name__ == "__main__":
    import_content()
