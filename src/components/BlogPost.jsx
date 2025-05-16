import React from 'react';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css';

export const BlogPost = ({ post }) => {
  if (!post) return null;

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-metadata">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          <span className="author">By {post.author}</span>
          <div className="tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="blog-post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};
