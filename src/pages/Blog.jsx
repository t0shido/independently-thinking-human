import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPosts, getPostBySlug } from '../utils/blogLoader';
import { BlogPost } from '../components/BlogPost';
import './Blog.css';

const BlogList = ({ posts }) => (
  <div className="blog-list">
    {posts.map(post => (
      <article key={post.slug} className="blog-preview">
        <h2>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="blog-preview-metadata">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          <span className="author">By {post.author}</span>
        </div>
        <p className="excerpt">{post.excerpt}</p>
        <div className="tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </article>
    ))}
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);

      if (slug) {
        const post = await getPostBySlug(slug);
        setCurrentPost(post);
      } else {
        setCurrentPost(null);
      }
    };

    loadPosts();
  }, [slug]);

  if (slug && currentPost) {
    return <BlogPost post={currentPost} />;
  }

  return (
    <div className="blog-page">
      <header className="blog-header">
        <h1>Blog</h1>
        <p>Exploring the balance between order and chaos in our lives</p>
      </header>
      <BlogList posts={posts} />
    </div>
  );
};

export default Blog;
