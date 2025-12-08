#!/usr/bin/env python
"""
Script to add a new article to the local database.
Run from django_backend directory: python add_article.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_backend.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from articles.models import Article, Section, Tag

# Article data
article_data = {
    "title": "The Moment You Stop Running",
    "slug": "the-moment-you-stop-running",
    "author": "Toshi",
    "date": "2025-12-08",
    "section": "mindset",
    "image": "mindset/gratitude.png",
    "excerpt": "Every human searches for happiness, yet most of us are taught to look for it in the wrong place. The real foundation of happiness is much simpler - it's gratitude.",
    "content": """# The Moment You Stop Running

Every human searches for happiness, yet most of us are taught to look for it in the wrong place. From childhood, we learn to believe that happiness will finally arrive _after_ the next achievement - after we get the degree, land the job, upgrade the car, or move to a better apartment. So we run from goal to goal, always reaching for something just out of sight. Maybe you know that feeling: you check one achievement off your list, and instead of feeling fulfilled, your mind instantly replaces it with another target. "What's next?" becomes the soundtrack of your life.

There's nothing wrong with ambition. But when you chase your goals from a place of emptiness - hoping success will fill the gap - you create a quiet, persistent sense of lack. Suddenly your happiness depends on the next promotion, the next purchase, the next relationship. Your mind keeps whispering, "I'll be happy when..." And with that mindset, happiness always stays in the future - never here, never now.

## The Foundation of Happiness

One of the real foundations of happiness is much simpler - it's gratitude. Not the polite "thanks" you offer out of habit, but the kind of gratitude that sinks into your chest and reminds you that your life is happening _right now_.

Gratitude doesn't shrink your dreams; it just stops you from abandoning the present while you chase the future. It brings happiness out of the "someday" and plants it into "today." And when you feel full instead of lacking, working toward your goals becomes much easier.

## Gratitude as Practice

And like going to the gym, it's a practice. You have to train it - especially on the days when nothing goes as planned: your inbox explodes, your patience runs thin, your bills pile up, or you're running on four hours of sleep. Gratitude on those days is hard, but that's exactly when the real growth happens. It's the repetition, the consistency, the choice to practice even when life feels messy that makes gratitude start paying off.

## The Science Behind Gratitude

What makes gratitude so powerful is that it doesn't just shift your outlook - it literally shifts your biology. Scientists can measure what happens in the body when you practice it regularly. Gratitude increases dopamine and serotonin, your mind's natural "feel-good" chemicals. It lowers cortisol, the stress hormone that keeps you stuck in fight-or-flight mode. Brain scans even show that consistent gratitude strengthens the neural pathways responsible for emotional balance and resilience. In other words: the benefits aren't just philosophical - they're physical. That's why people who practice gratitude sleep better, feel calmer, and recover faster from stress.

## A Shift in Perspective

These physical changes don't stay hidden in the background - they begin to shape how you experience your everyday life. When you practice gratitude long enough, something subtle but profound shifts. Happiness stops being a finish line. It becomes a lens. You still dream big, but now you're rooted instead of restless. You want more, but you're no longer starving for it. You move through life with a softer heart, clearer perspective, and a deeper appreciation for the ordinary moments.

## Start Here

If happiness feels far away, the answer isn't to chase harder. It's to pause. Breathe. Notice one small thing you're grateful for - your warm cup of coffee, the morning sunlight on your floor, a message from a friend, or simply your own breath. Not because your life is perfect, but because there is always something here worth appreciating.

Happiness doesn't live in the future. It grows in the moments when you slow down long enough to see what's already in front of you - and that simple shift can quietly change everything.""",
    "tags": ["gratitude", "happiness", "mindset", "self-improvement"]
}

def add_article():
    # Get or create section
    section, _ = Section.objects.get_or_create(
        slug=article_data["section"],
        defaults={"name": article_data["section"].title()}
    )
    
    # Create or update article
    article, created = Article.objects.update_or_create(
        slug=article_data["slug"],
        defaults={
            "title": article_data["title"],
            "author": article_data["author"],
            "date": article_data["date"],
            "excerpt": article_data["excerpt"],
            "content": article_data["content"],
            "section": section,
            "image": article_data["image"],
        }
    )
    
    # Add tags
    for tag_name in article_data["tags"]:
        tag, _ = Tag.objects.get_or_create(name=tag_name)
        tag.articles.add(article)
    
    action = "Created" if created else "Updated"
    print(f"✅ {action} article: {article.title}")
    print(f"   Section: {section.name}")
    print(f"   Slug: {article.slug}")
    print(f"   Image: {article.image}")
    print(f"   Tags: {', '.join(article_data['tags'])}")

if __name__ == "__main__":
    add_article()
