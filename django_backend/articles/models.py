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
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.CharField(max_length=100)
    date = models.DateField()
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    section = models.ForeignKey(Section, related_name='articles', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=article_image_path, null=True, blank=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or 'article'
            slug = base_slug
            counter = 2
            qs = Article.objects.exclude(pk=self.pk) if self.pk else Article.objects.all()
            while qs.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

class Tag(models.Model):
    """
    Represents tags that can be associated with articles
    """
    name = models.CharField(max_length=50, unique=True)
    articles = models.ManyToManyField(Article, related_name='tags')
    
    def __str__(self):
        return self.name
