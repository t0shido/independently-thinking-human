import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './App.css';
import Library from './pages/Library';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import MobileNav from './components/MobileNav';
import chaosOrderImage from '../content/home/chaos_and_order.png';
import homeContent from '../content/home/intro.json';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Split content into paragraphs
  const paragraphs = homeContent.content.split('\n\n');
  const beforeImage = paragraphs.slice(0, 3).join('\n\n');
  const afterImage = paragraphs.slice(3).join('\n\n');

  return (
    <div className="app">
      <header className={`header ${isHome ? 'home' : ''}`}>
        {isMobile ? (
          <nav className="nav-menu mobile">
            <MobileNav />
          </nav>
        ) : (
          <nav className="nav-menu">
            <div className="nav-links">
              <Link to="/" className="nav-link">HOME</Link>
              <Link to="/library" className="nav-link">LIBRARY</Link>
              <Link to="/data" className="nav-link">DATA</Link>
              <Link to="/contact" className="nav-link">CONTACT</Link>
            </div>
            <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </nav>
        )}
        {isHome && (
          <div className={`hero-content ${isMobile ? 'mobile-view' : ''}`}>
            <h1 className={`main-title ${isMobile ? 'mobile-view' : ''}`}>INDEPENDENTLY<br />THINKING HUMAN.</h1>
            <p style={{ 
              fontSize: isMobile ? '1rem' : '1.5rem', 
              opacity: 0.9, 
              letterSpacing: '1px',
              marginLeft: '0rem'
            }}>
              Balancing between Order and Chaos while navigating through Life's Complexities
            </p>
            
            {/* Decorative elements */}
            <div className="decorative-circle size-lg"></div>
            <div className="decorative-circle size-md"></div>
            <div className="decorative-circle size-sm"></div>
          </div>
        )}
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="content-section">
              <section className="featured-posts">
                <div className="intro-text" style={{
                  position: 'relative'
                }}>
                  <h1>{homeContent.title}</h1>
                  {beforeImage.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <div className={`hero-image-container${isMobile ? ' mobile' : ''}`}>
                    <img
                      src={chaosOrderImage}
                      alt="Balance of Chaos and Order"
                      className="hero-image"
                      style={isMobile ? {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      } : {}}
                    />
                  </div>
                  {afterImage.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </div>
          } />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:section" element={<Library />} />
          <Route path="/library/:section/:slug" element={<Library />} />
          <Route path="/data" element={
            <div className="default-page">
              <div className="content-wrapper">
                <h1>Data Analysis</h1>
                <p className="subtitle">Exploring patterns and insights through data</p>
                <div className="coming-soon">
                  <p>This section is currently under development.</p>
                  <p>Check back soon for interactive data visualizations and analysis.</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Independently Thinking Human</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
