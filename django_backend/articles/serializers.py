from rest_framework import serializers
from .models import Article, Section, Tag

class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model"""
    class Meta:
        model = Tag
        fields = ['name']

class SectionSerializer(serializers.ModelSerializer):
    """Serializer for the Section model"""
    class Meta:
        model = Section
        fields = ['name', 'slug']

class ArticleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Article model
    Formats the response to match the existing Express.js API
    """
    tags = serializers.SerializerMethodField()
    section = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    
    class Meta:
        model = Article
        fields = ['title', 'slug', 'author', 'date', 'excerpt', 'content', 'section', 'tags', 'image', 'image_position']
    
    def get_tags(self, obj):
        """Return tags as a list of strings to match Express.js API format"""
        return [tag.name for tag in obj.tags.all()]
    
    def to_representation(self, instance):
        """
        Customize the output format to match the Express.js API
        """
        representation = super().to_representation(instance)
        
        # Format the image path if it exists
        if representation['image']:
            # Keep the full path as stored in the database
            # This allows proper media URL construction
            pass  # No modification needed
        
        return representation
