from django.urls import path
from .views import ArticleViewSet

# Define URL patterns for the articles app
urlpatterns = [
    # Get all articles from a section
    path('articles/<str:section>/', ArticleViewSet.as_view({
        'get': 'list'
    }), name='article-list'),
    
    # Create a new article
    path('articles/', ArticleViewSet.as_view({
        'post': 'create'
    }), name='article-create'),
    
    # Update an existing article
    path('articles/<str:section>/<str:slug>/', ArticleViewSet.as_view({
        'put': 'update',
        'delete': 'destroy'
    }), name='article-detail'),
]
