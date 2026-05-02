from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Article, Section, Tag
from .serializers import ArticleSerializer
import os
import logging
from django.conf import settings
from datetime import date

# Set up logger
logger = logging.getLogger(__name__)

class ArticleViewSet(viewsets.ViewSet):
    """
    ViewSet for handling article operations.
    Implements endpoints that match the Express.js backend.
    
    SECURITY: Write operations (create, update, delete) require authentication.
    """
    # Require authentication for write operations
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def list(self, request, section=None):
        """
        Get all articles from a specific section
        Endpoint: GET /api/articles/:section
        """
        logger.debug(f"API CALL: list articles - section={section}")

        if section:
            try:
                section_obj = get_object_or_404(Section, slug=section)
                logger.debug(f"Database: Found section {section} with ID {section_obj.id}")
                
                articles = (
                    Article.objects
                    .filter(section=section_obj)
                    .select_related('section')
                    .prefetch_related('tags')
                )
                logger.debug(f"Database: Retrieved articles from section {section}")
                
                serializer = ArticleSerializer(articles, many=True, context={'request': request})
                return Response(serializer.data)
            except Exception as e:
                logger.error(f"Error retrieving articles for section {section}: {str(e)}")
                return Response({"error": f"Error retrieving articles: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        logger.warning("API Error: Section parameter required but not provided")
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
        
        # Create article (model auto-generates a unique slug from title)
        article = Article.objects.create(
            title=title,
            author=author,
            date=date.today(),
            excerpt=excerpt,
            content=content,
            section=section
        )
        slug = article.slug
        
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
