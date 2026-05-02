import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../utils/api';
import config from '../config';
import './Admin.css';

/**
 * Secure Admin Component with Backend Authentication
 * 
 * SECURITY FEATURES:
 * - No hardcoded passwords
 * - Backend token authentication
 * - Secure token storage
 * - Automatic token verification
 */

function AdminSecure() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [editingSlug, setEditingSlug] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    author: 'Toshi',
    section: 'mindset',
    tags: '',
    excerpt: '',
    content: '',
    image: null,
    imagePreview: null
  });
  
  const navigate = useNavigate();

  // Check if user has valid token on mount
  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = localStorage.getItem('ith-admin-token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${config.api.baseUrl}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUsername(data.username);
        loadArticles();
      } else {
        // Token invalid, clear it
        localStorage.removeItem('ith-admin-token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('ith-admin-token');
      setIsAuthenticated(false);
    }
  };

  const loadArticles = async () => {
    try {
      const sectionArticles = await getArticles(newArticle.section);
      setArticles(sectionArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
      setError('Failed to load articles. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${config.api.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token securely
        localStorage.setItem('ith-admin-token', data.token);
        setIsAuthenticated(true);
        setUsername(data.username);
        setPassword(''); // Clear password from memory
        loadArticles();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('ith-admin-token');
    
    try {
      // Call logout endpoint to invalidate token on server
      await fetch(`${config.api.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear local storage and state
    localStorage.removeItem('ith-admin-token');
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewArticle({
        ...newArticle,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('ith-admin-token');
    if (!token) {
      setError('Not authenticated. Please log in again.');
      setIsAuthenticated(false);
      return;
    }

    try {
      const formattedContent = `# ${newArticle.title}\n\n${newArticle.content}`;
      
      const articleData = {
        title: newArticle.title,
        author: newArticle.author,
        section: newArticle.section,
        tags: newArticle.tags,
        excerpt: newArticle.excerpt,
        content: formattedContent,
        image: newArticle.image
      };
      
      if (editingSlug) {
        await updateArticle(editingSection || newArticle.section, editingSlug, articleData, token);
        alert(`Article "${newArticle.title}" updated successfully!`);
      } else {
        await createArticle(articleData, token);
        alert(`Article "${newArticle.title}" saved successfully!`);
      }

      // Reset form
      setEditingSlug(null);
      setEditingSection(null);
      setNewArticle({
        title: '',
        author: 'Toshi',
        section: 'mindset',
        tags: '',
        excerpt: '',
        content: '',
        image: null,
        imagePreview: null
      });

      loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      if (error.message.includes('401') || error.message.includes('403')) {
        setError('Authentication expired. Please log in again.');
        setIsAuthenticated(false);
        localStorage.removeItem('ith-admin-token');
      } else {
        alert(`Error saving article: ${error.message}`);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h1>Admin Login</h1>
        <p className="security-notice">🔒 Secure authentication required</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <span>Logged in as: <strong>{username}</strong></span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'articles' ? 'active' : ''} 
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
        <button 
          className={activeTab === 'new' ? 'active' : ''} 
          onClick={() => setActiveTab('new')}
        >
          New Article
        </button>
        <button 
          className={activeTab === 'settings' ? 'active' : ''} 
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'articles' && (
          <div className="articles-list">
            <h2>Your Articles</h2>
            <div className="section-selector">
              <label htmlFor="section-filter">Section:</label>
              <select
                id="section-filter"
                value={newArticle.section}
                onChange={(e) => {
                  setNewArticle({...newArticle, section: e.target.value});
                  setTimeout(() => loadArticles(), 100);
                }}
              >
                <option value="mindset">Mindset</option>
                <option value="politics">Politics</option>
                <option value="economics">Economics</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="stories">Stories</option>
              </select>
              <button onClick={loadArticles} className="refresh-button">Refresh</button>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            {articles.length === 0 ? (
              <p className="info-message">No articles found in this section.</p>
            ) : (
              <div className="articles-grid">
                {articles.map(article => (
                  <div key={article.slug} className="article-card">
                    <h3>{article.title}</h3>
                    <p className="article-meta">
                      <span className="article-author">{article.author}</span>
                      <span className="article-date">{article.date}</span>
                    </p>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-tags">
                      {article.tags && article.tags.map(tag => (
                        <span key={tag} className="article-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="article-actions">
                      <button 
                        className="edit-button"
                        onClick={() => {
                          setEditingSlug(article.slug);
                          setEditingSection(newArticle.section);
                          setNewArticle({
                            title: article.title,
                            author: article.author,
                            section: newArticle.section,
                            tags: article.tags ? article.tags.join(', ') : '',
                            excerpt: article.excerpt || '',
                            content: article.content.replace(`# ${article.title}\n\n`, ''),
                            image: null,
                            imagePreview: null
                          });
                          setActiveTab('new');
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
                            try {
                              const token = localStorage.getItem('ith-admin-token');
                              await deleteArticle(newArticle.section, article.slug, token);
                              alert(`Article "${article.title}" deleted successfully!`);
                              loadArticles();
                            } catch (error) {
                              console.error('Error deleting article:', error);
                              alert(`Error deleting article: ${error.message}`);
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'new' && (
          <div className="new-article">
            <h2>Create New Article</h2>
            <form onSubmit={handleArticleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <select
                    id="section"
                    value={newArticle.section}
                    onChange={(e) => setNewArticle({...newArticle, section: e.target.value})}
                    required
                  >
                    <option value="mindset">Mindset</option>
                    <option value="politics">Politics</option>
                    <option value="economics">Economics</option>
                    <option value="technology">Technology</option>
                    <option value="health">Health</option>
                    <option value="stories">Stories</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  value={newArticle.tags}
                  onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                  placeholder="mindset, purpose, direction, etc."
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                  placeholder="A brief summary of your article"
                  required
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                  placeholder="Write your article content here..."
                  required
                  rows="15"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="image">Featured Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {newArticle.imagePreview && (
                  <div className="image-preview">
                    <img src={newArticle.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
              
              <button type="submit" className="save-button">Save Article</button>
            </form>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings">
            <h2>Settings</h2>
            <p className="info-message">
              In a production environment, this would contain settings for your blog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSecure;
