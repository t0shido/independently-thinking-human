import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { getSectionPosts } from '../utils/libraryLoader';
import { LibraryPost } from '../components/LibraryPost';
import LibraryMobileNav from '../components/LibraryMobileNav';
import { getImageUrl } from '../utils/imageUtils';
import config from '../config';
import './Library.css';

const LibrarySection = ({ section }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const sectionPosts = await getSectionPosts(section);
        // Sort by date (newest first)
        const reorderedPosts = sectionPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(reorderedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [section]);

  if (loading) {
    return <div className="library-content">
      <div className="loading-message">Loading...</div>
    </div>;
  }

  if (error) {
    return <div className="library-content">
      <div className="error-message">{error}</div>
    </div>;
  }

  if (slug) {
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      return <div className="library-content">
        <div className="error-message">Post not found</div>
      </div>;
    }
    return <LibraryPost post={post} section={section} />;
  }

  if (posts.length === 0) {
    return <div>No posts found in this section.</div>;
  }

  return (
    <div className="overview-grid">
      <div className="featured-section">
        {posts[0] && (
          <Link to={`/library/${section}/${posts[0].slug}`} className="book-card large">
            <div className="book-cover">
              {posts[0].image && (
                <img 
                  src={getImageUrl(posts[0], section)}
                  alt={posts[0].title}
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
              <h2>Featured in {section.charAt(0).toUpperCase() + section.slice(1)}</h2>
              <h3>{posts[0].title}</h3>
              <p className="description">{posts[0].excerpt}</p>
              <p className="author">By {posts[0].author}</p>
              {!isMobile && <p className="category">{posts[0].tags?.join(', ')}</p>}
            </div>
          </Link>
        )}
      </div>
      <div className="secondary-section">
        {posts.slice(1).map(post => (
          <LibraryPost 
            key={post.slug} 
            post={post} 
            isPreview={true} 
            section={section} 
          />
        ))}
      </div>
    </div>
  );
};

const Overview = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Function to fetch articles from each section
  const fetchAllSectionArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get sections from config
      const sections = config.content.sections;
      
      // Fetch articles from each section using the same function as LibrarySection
      const sectionPromises = sections.map(async (section) => {
        try {
          const articles = await getSectionPosts(section);
          // Add section to each article (getSectionPosts might not include it)
          return articles.map(article => ({
            ...article,
            section
          }));
        } catch (error) {
          console.error(`Error fetching ${section} articles:`, error);
          return [];
        }
      });
      
      // Wait for all fetches to complete
      const sectionResults = await Promise.all(sectionPromises);
      
      // Combine all articles into a single array
      const allArticles = sectionResults.flat();
      
      // Sort by date (newest first)
      const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Take the most recent articles for the overview
      setFeaturedArticles(sortedArticles.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles. Please try again.');
      setLoading(false);
    }
  };
  
  // Fetch articles when component mounts
  useEffect(() => {
    fetchAllSectionArticles();
    
    // Set up polling to refresh articles every 30 seconds
    const intervalId = setInterval(fetchAllSectionArticles, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  if (loading) {
    return <div className="loading-message">Loading featured articles...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (featuredArticles.length === 0) {
    return <div className="loading-message">No articles found.</div>;
  }
  
  // Sort articles by date (newest first)
  const sortedArticles = [...featuredArticles].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Extract featured article and the rest
  const [featuredArticle, ...otherArticles] = sortedArticles;

  return (
    <div className="overview-grid">
      <div className="featured-section">
        <Link to={`/library/${featuredArticle.section}/${featuredArticle.slug}`} className="book-card large">
          <div className="book-cover">
            {featuredArticle.image && (
              <img 
                src={getImageUrl(featuredArticle)}
                alt={featuredArticle.title}
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
            <h2>Featured in {featuredArticle.section.charAt(0).toUpperCase() + featuredArticle.section.slice(1)}</h2>
            <h3>{featuredArticle.title}</h3>
            <p className="description">{featuredArticle.excerpt}</p>
            <p className="author">By {featuredArticle.author}</p>
            {!isMobile && <p className="category">{featuredArticle.tags?.join(', ')}</p>}
          </div>
        </Link>
      </div>
      <div className="secondary-section">
        {otherArticles.map(post => (
          <LibraryPost 
            key={post.slug} 
            post={post} 
            isPreview={true} 
            section={post.section}
            cardStyle="large"
            showSectionHeading={true}
          />
        ))}
      </div>
    </div>
  );
};

const Library = () => {
  const location = useLocation();
  const { section } = useParams();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`library-container ${isMobile ? 'mobile-view' : ''}`}>
      <nav className={`library-nav ${isMobile ? 'mobile-view' : ''}`}>
        {isMobile ? (
          <LibraryMobileNav />
        ) : (
          <div className="library-nav-links">
            <Link to="/library" className={isActive('/library') ? 'active' : ''}>Overview</Link>
            <Link to="/library/mindset" className={section === 'mindset' ? 'active' : ''}>Mindset</Link>
            <Link to="/library/politics" className={section === 'politics' ? 'active' : ''}>Politics</Link>
            <Link to="/library/economics" className={section === 'economics' ? 'active' : ''}>Economics</Link>
            <Link to="/library/technology" className={section === 'technology' ? 'active' : ''}>Technology</Link>
            <Link to="/library/stories" className={section === 'stories' ? 'active' : ''}>Stories</Link>
          </div>
        )}
      </nav>
      
      <div className="library-content">
        {!section ? <Overview /> : <LibrarySection section={section} />}
      </div>
    </div>
  );
};

export default Library;