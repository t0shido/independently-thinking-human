import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import mirrorImage from '../../content/library/mindset/mirror.png';
import purposeImage from '../../content/library/mindset/purpose.png';
import cornerstoneImage from '../../content/library/politics/cornerstone.png';
import empireCyclesImage from '../../content/library/economics/economics_one.png';
import technologyImage from '../../content/library/technology/technology_one.png';
import './LibraryPost.css';

export const LibraryPost = ({ post, isPreview = false, section }) => {
  if (!post) return null;

  if (isPreview) {
    return (
      <Link to={`/library/${section}/${post.slug}`} className={`book-card horizontal ${isMobile ? 'mobile-view' : ''}`}>
        <div className="book-cover">
          {post.image ? (
            <img 
              src={`/content/library/${section}/${post.image}`}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : post.title === "The Wave and the Ocean" ? (
            <img 
              src={`/content/library/${section}/wave.png`}
              alt="The Wave and the Ocean"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : post.title === "The Mirror of the Mind" ? (
            <img 
              src={mirrorImage}
              alt="Mindset"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : null}
          {!post.image && post.title === "Finding Direction" && (
            <img 
              src={purposeImage}
              alt="Direction"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && post.title === "Into Uncharted Territory" && (
            <img 
              src={technologyImage}
              alt="Technology"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && post.title === "The Cornerstone of Politics" && (
            <img 
              src={cornerstoneImage}
              alt="Politics"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && (post.title === "The Rise and Fall of Empires: Economic Cycles That Shape History" || post.title === "Dawn of a New Order") && (
            <img 
              src={empireCyclesImage}
              alt="Economics"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
        </div>
        <div className="card-content">
          <h3>{post.title}</h3>
          <p className="description">{post.excerpt}</p>
          <p className="author">By {post.author}</p>
          {!isMobile && <p className="category">{post.tags?.join(', ')}</p>}
        </div>
      </Link>
    );
  }

  // Full article view
  const contentLines = post.content.split('\n');
  const contentWithoutTitle = contentLines.slice(2).join('\n');
  const paragraphs = contentWithoutTitle.split('\n\n');
  const beforeImage = paragraphs.slice(0, 2).join('\n\n');
  const afterImage = paragraphs.slice(2).join('\n\n');

  return (
    <article className={`library-post ${isMobile ? 'mobile-view' : ''}`}>
      <div className="library-post-content">
        <h1>{post.title}</h1>
        
        <ReactMarkdown>{beforeImage}</ReactMarkdown>
        
        <div className="library-post-image">
          {post.image ? (
            <img 
              src={`/content/library/${section}/${post.image}`}
              alt={post.title}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : post.title === "The Wave and the Ocean" ? (
            <img 
              src={`/content/library/${section}/wave.png`}
              alt="The Wave and the Ocean"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : post.title === "The Mirror of the Mind" ? (
            <img 
              src={mirrorImage}
              alt="Mindset"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : null}
          {post.title === "Finding Direction" && !post.image && (
            <img 
              src={purposeImage}
              alt="Direction"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && post.title === "Into Uncharted Territory" && (
            <img 
              src={technologyImage}
              alt="Technology"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && post.title === "The Cornerstone of Politics" && (
            <img 
              src={cornerstoneImage}
              alt="Politics"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
          {!post.image && (post.title === "The Rise and Fall of Empires: Economic Cycles That Shape History" || post.title === "Dawn of a New Order") && (
            <img 
              src={empireCyclesImage}
              alt="Economics"
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          )}
        </div>

        <ReactMarkdown>{afterImage}</ReactMarkdown>

        <div className="metadata">
          <p className="author">By {post.author}</p>
          <p className="date">{post.date}</p>
          <p className="tags">Categories: {post.tags?.join(', ')}</p>
        </div>
      </div>
    </article>
  );
};
