from django.db import models
import os
from django.utils.text import slugify
# Note: Using CharField instead of ImageField to avoid Pillow dependency

class Section(models.Model):
    """
    Represents a section/category for articles (e.g., mindset, politics, economics)
    """
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

def article_image_path(instance, filename):
    """
    Define where article images are stored:
    media/section_slug/filename
    """
    return os.path.join(instance.section.slug, filename)

class Article(models.Model):
    """
    Represents a blog article with all its content and metadata
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.CharField(max_length=100)
    date = models.DateField()
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    section = models.ForeignKey(Section, related_name='articles', on_delete=models.CASCADE)
    # Using CharField instead of ImageField to avoid Pillow dependency
    image = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Tag(models.Model):
    """
    Represents tags that can be associated with articles
    """
    name = models.CharField(max_length=50, unique=True)
    articles = models.ManyToManyField(Article, related_name='tags')
    
    def __str__(self):
        return self.name
