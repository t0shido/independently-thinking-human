import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav-menu">
          <div className="nav-links">
            <a href="#" className="nav-link">HOME</a>
            <a href="#" className="nav-link">LIBRARY</a>
            <a href="#" className="nav-link">CONTACT</a>
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
        
        <div className="hero-content">
          <h1 className="main-title">INDEPENDENTLY<br />THINKING HUMAN.</h1>
          <p style={{ 
            fontSize: '1.5rem', 
            opacity: 0.9, 
            letterSpacing: '1px',
            marginLeft: '0rem',
            lineHeight: '1.8'
          }}>
            Balancing between Order and Chaos while navigating through Life's Complexities
          </p>
          
          {/* Decorative elements */}
          <div className="decorative-circle" style={{
            width: '400px',
            height: '400px',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}></div>
          <div className="decorative-circle" style={{
            width: '300px',
            height: '300px',
            right: '100px',
            bottom: '50px'
          }}></div>
          <div className="decorative-circle" style={{
            width: '200px',
            height: '200px',
            right: '300px',
            top: '100px'
          }}></div>
        </div>
      </header>

      <main className="content-section">
        <section className="featured-posts">
          <h2>Latest Thoughts</h2>
          <div className="posts-grid">
            <article className="post-preview">
              <h3>The Nature of Consciousness</h3>
              <p>Exploring the depths of human awareness and its implications...</p>
            </article>
            <article className="post-preview">
              <h3>Philosophy of Time</h3>
              <p>Understanding the fourth dimension and its impact on human experience...</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
