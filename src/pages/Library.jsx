import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { getSectionPosts } from '../utils/libraryLoader';
import { LibraryPost } from '../components/LibraryPost';
import LibraryMobileNav from '../components/LibraryMobileNav';
import mirrorImage from '../../content/library/mindset/mirror.png';
import purposeImage from '../../content/library/mindset/purpose.png';
import cornerstoneImage from '../../content/library/politics/cornerstone.png';
import empireCyclesImage from '../../content/library/economics/economics_one.png';
import technologyImage from '../../content/library/technology/technology_one.png';
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
        // Move "The Wave and the Ocean" to the first position if it exists, followed by "Finding Direction"
        const reorderedPosts = sectionPosts.sort((a, b) => {
          if (a.title === "The Wave and the Ocean") return -1;
          if (b.title === "The Wave and the Ocean") return 1;
          if (a.title === "Finding Direction") return -1;
          if (b.title === "Finding Direction") return 1;
          return 0;
        });
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
              {posts[0].image ? (
                <img 
                  src={`/content/library/${section}/${posts[0].image}`}
                  alt={posts[0].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              ) : posts[0].title === "The Mirror of the Mind" ? (
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
              ) : posts[0].title === "Finding Direction" ? (
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
              ) : posts[0].title === "Into Uncharted Territory" ? (
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
              ) : posts[0].title === "The Cornerstone of Politics" ? (
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
              ) : (posts[0].title === "The Rise and Fall of Empires: Economic Cycles That Shape History" || posts[0].title === "Dawn of a New Order") ? (
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
              ) : null}
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
      
      // Define the sections to fetch
      const sections = ['mindset', 'politics', 'economics', 'technology', 'health', 'stories'];
      
      // Fetch articles from each section
      const sectionPromises = sections.map(async (section) => {
        try {
          const response = await fetch(`http://localhost:3001/api/articles/${section}`);
          if (!response.ok) {
            return []; // Return empty array if section has no articles
          }
          const articles = await response.json();
          // Add section to each article
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
  
  // Define fallback articles to use if no articles are found
  const fallbackArticles = [
      {
        title: "Through the Eyes of Story",
        author: "Toshi",
        date: "2025-06-16",
        excerpt: "Stories act as bridges connecting us to ancient wisdom, helping us navigate both facts and meaning in our complex world.",
        tags: ["stories", "philosophy", "wisdom", "hero's journey"],
        slug: "through-the-eyes-of-story",
        section: "stories",
        image: "stories_one.png"
      },
      {
        title: "The Wave and the Ocean",
        author: "Toshi",
        date: "2025-05-30",
        excerpt: "Exploring the nature of consciousness and our deep connection to the universe as expressions of a greater whole.",
        tags: ["mindset", "consciousness", "philosophy", "connection"],
        slug: "the-wave-and-the-ocean",
        section: "mindset",
        image: "wave.png"
      },
      {
        title: "Into Uncharted Territory",
        author: "Toshi",
        date: "2025-03-17",
        excerpt: "How the tiny transistor transformed humanity and accelerated us into an uncertain technological future.",
        tags: ["technology", "transistors", "digital revolution", "computing", "future"],
        slug: "the-invisible-revolution",
        section: "technology",
        image: "technology_one.png"
      },
      {
        title: "Caught in a Vicious Cycle",
        author: "Toshi",
        date: "2025-06-10",
        excerpt: "Exploring how our modern monetary system creates an endless cycle of debt and why the current structure may be unsustainable.",
        tags: ["economics", "money", "debt", "central banking", "inflation"],
        slug: "caught-in-a-vicious-cycle",
        section: "economics",
        image: "economics_two.png"
      },
      {
        title: "Finding Direction",
        author: "Toshi",
        date: "2025-03-14",
        excerpt: "How finding your purpose transforms motivation, resilience, and fulfillment in an increasingly distracted world.",
        tags: ["mindset", "purpose", "direction", "meaning", "connection"],
        slug: "finding-direction",
        section: "mindset",
        image: "purpose.png"
      },
      {
        title: "Dawn of a New Order",
        author: "Toshi",
        date: "2025-03-04",
        excerpt: "How economic power shifts throughout history, and what the current warning signs tell us about the future of the global economy.",
        tags: ["economics", "history", "currency", "empires", "cycles"],
        slug: "the-rise-and-fall-of-empires",
        section: "economics",
        image: "economics_one.png"
      },
      {
        title: "The Cornerstone of Politics",
        author: "Toshi",
        date: "2025-02-22",
        excerpt: "An exploration of how the dynamic tension between liberal and conservative mindsets creates the essential balance that keeps society moving forward sustainably.",
        tags: ["politics", "society", "balance", "democracy", "unity"],
        slug: "the-cornerstone-of-politics",
        section: "politics",
        image: "cornerstone.png"
      },
      {
        title: "The Mirror of the Mind",
        author: "Toshi",
      date: "2025-02-11",
      excerpt: "How our perception shapes our reality and why mindset matters more than circumstances.",
      tags: ["mindset", "psychology", "perspective"],
      slug: "the-mirror-of-the-mind",
      section: "mindset",
      image: "mirror.png"
    }
  ];
  
  // Use the fetched articles if available, otherwise use fallback
  const articlesToUse = featuredArticles.length > 0 ? featuredArticles : fallbackArticles;
  
  // Custom sort to ensure specific article order
  const sortedArticles = [...articlesToUse].sort((a, b) => {
    // Through the Eyes of Story should always be first
    if (a.title === "Through the Eyes of Story") return -1;
    if (b.title === "Through the Eyes of Story") return 1;
    
    // Caught in a Vicious Cycle should always be second
    if (a.title === "Caught in a Vicious Cycle") return -1;
    if (b.title === "Caught in a Vicious Cycle") return 1;
    
    // Otherwise sort by date (newest first)
    return new Date(b.date) - new Date(a.date);
  });
  
  // Extract featured article and the rest
  const [featuredArticle, ...otherArticles] = sortedArticles;

  return (
    <div className="overview-grid">
      <div className="featured-section">
        <Link to={`/library/${featuredArticle.section}/${featuredArticle.slug}`} className="book-card large">
          <div className="book-cover">
            {featuredArticle.image ? (
              <img 
                src={featuredArticle.image.startsWith('/') ? featuredArticle.image : `/content/library/${featuredArticle.section}/${featuredArticle.image}`}
                alt={featuredArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            ) : featuredArticle.title === "The Wave and the Ocean" ? (
              <img 
                src={`/content/library/${featuredArticle.section}/wave.png`}
                alt="The Wave and the Ocean"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            ) : featuredArticle.title === "The Mirror of the Mind" ? (
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
            ) : featuredArticle.title === "Finding Direction" ? (
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
            ) : featuredArticle.title === "Into Uncharted Territory" ? (
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
            ) : featuredArticle.title === "The Cornerstone of Politics" ? (
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
            ) : (featuredArticle.title === "The Rise and Fall of Empires: Economic Cycles That Shape History" || featuredArticle.title === "Dawn of a New Order") ? (
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
            ) : null}
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
          <Link key={post.slug} to={`/library/${post.section}/${post.slug}`} className="book-card large">
            <div className="book-cover">
              {post.image ? (
                <img 
                  src={post.image.startsWith('/') ? post.image : `/content/library/${post.section}/${post.image}`}
                  alt={post.title}
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
              ) : post.title === "Finding Direction" ? (
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
              ) : post.title === "Into Uncharted Territory" ? (
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
              ) : post.title === "The Cornerstone of Politics" ? (
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
              ) : (post.title === "The Rise and Fall of Empires: Economic Cycles That Shape History" || post.title === "Dawn of a New Order") ? (
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
              ) : null}
            </div>
            <div className="card-content">
              <h2>Featured in {post.section.charAt(0).toUpperCase() + post.section.slice(1)}</h2>
              <h3>{post.title}</h3>
              <p className="description">{post.excerpt}</p>
              <p className="author">By {post.author}</p>
              {!isMobile && <p className="category">{post.tags?.join(', ')}</p>}
            </div>
          </Link>
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
            <Link to="/library/health" className={section === 'health' ? 'active' : ''}>Health</Link>
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