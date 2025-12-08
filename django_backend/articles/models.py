from django.db import models
import os
from django.utils.text import slugify

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
    IMAGE_POSITION_CHOICES = [
        ('after_paragraph_1', 'After 1st paragraph'),
        ('after_paragraph_2', 'After 2nd paragraph'),
        ('after_paragraph_3', 'After 3rd paragraph'),
        ('top', 'At the top'),
        ('bottom', 'At the bottom'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.CharField(max_length=100)
    date = models.DateField()
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    section = models.ForeignKey(Section, related_name='articles', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=article_image_path, null=True, blank=True)
    image_position = models.CharField(
        max_length=20,
        choices=IMAGE_POSITION_CHOICES,
        default='after_paragraph_2',
        help_text='Where to display the image in the article'
    )
    
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
