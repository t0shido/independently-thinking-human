from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Article, Section, Tag
from .serializers import ArticleSerializer
import os
from django.conf import settings
from django.utils.text import slugify
from datetime import date

class ArticleViewSet(viewsets.ViewSet):
    """
    ViewSet for handling article operations.
    Implements endpoints that match the Express.js backend.
    """
    
    def list(self, request, section=None):
        """
        Get all articles from a specific section
        Endpoint: GET /api/articles/:section
        """
        if section:
            section_obj = get_object_or_404(Section, slug=section)
            articles = Article.objects.filter(section=section_obj)
            serializer = ArticleSerializer(articles, many=True, context={'request': request})
            return Response(serializer.data)
        return Response({"error": "Section parameter required"}, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self, request):
        """
        Create a new article
        Endpoint: POST /api/articles
        """
        title = request.data.get('title')
        author = request.data.get('author')
        section_name = request.data.get('section')
        content = request.data.get('content')
        excerpt = request.data.get('excerpt', '')
        tags_text = request.data.get('tags', '')
        
        # Parse tags from comma-separated string
        tags = [tag.strip() for tag in tags_text.split(',')] if tags_text else []
        
        # Validate required fields
        if not all([title, author, section_name, content]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create section
        section, _ = Section.objects.get_or_create(
            slug=section_name,
            defaults={'name': section_name.capitalize()}
        )
        
        # Create slug from title
        slug = slugify(title)
        
        # Create article
        article = Article.objects.create(
            title=title,
            slug=slug,
            author=author,
            date=date.today(),
            excerpt=excerpt,
            content=content,
            section=section
        )
        
        # Handle image upload
        if 'image' in request.FILES:
            article.image = request.FILES['image']
            article.save()
        
        # Add tags
        for tag_name in tags:
            if tag_name.strip():
                tag, _ = Tag.objects.get_or_create(name=tag_name.strip())
                article.tags.add(tag)
        
        serializer = ArticleSerializer(article, context={'request': request})
        return Response({
            "message": "Article created successfully",
            "slug": slug,
            "article": serializer.data
        }, status=status.HTTP_201_CREATED)
    
    def update(self, request, section=None, slug=None):
        """
        Update an existing article
        Endpoint: PUT /api/articles/:section/:slug
        """
        if not section or not slug:
            return Response({"error": "Section and slug parameters required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get article
        section_obj = get_object_or_404(Section, slug=section)
        article = get_object_or_404(Article, section=section_obj, slug=slug)
        
        # Update fields
        title = request.data.get('title')
        author = request.data.get('author')
        content = request.data.get('content')
        excerpt = request.data.get('excerpt')
        tags_text = request.data.get('tags')
        
        # Validate required fields
        if not all([title, author, content]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update article
        article.title = title
        article.author = author
        article.content = content
        if excerpt:
            article.excerpt = excerpt
        
        # Handle image upload
        if 'image' in request.FILES:
            # Delete old image if it exists
            if article.image:
                if os.path.isfile(article.image.path):
                    os.remove(article.image.path)
            article.image = request.FILES['image']
        
        article.save()
        
        # Update tags if provided
        if tags_text:
            # Clear existing tags
            article.tags.clear()
            # Add new tags
            tags = [tag.strip() for tag in tags_text.split(',')]
            for tag_name in tags:
                if tag_name:
                    tag, _ = Tag.objects.get_or_create(name=tag_name)
                    article.tags.add(tag)
        
        serializer = ArticleSerializer(article, context={'request': request})
        return Response({
            "message": "Article updated successfully",
            "article": serializer.data
        })
    
    def destroy(self, request, section=None, slug=None):
        """
        Delete an article
        Endpoint: DELETE /api/articles/:section/:slug
        """
        if not section or not slug:
            return Response({"error": "Section and slug parameters required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get article
        section_obj = get_object_or_404(Section, slug=section)
        article = get_object_or_404(Article, section=section_obj, slug=slug)
        
        # Delete image if it exists
        if article.image:
            if os.path.isfile(article.image.path):
                os.remove(article.image.path)
        
        # Delete article
        article.delete()
        
        return Response({"message": "Article deleted successfully"})
