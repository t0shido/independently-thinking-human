import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002; // Changed to port 3002

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist')); // Serve the built React app
app.use('/content', express.static('content')); // Serve content directory for images

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const section = req.body.section || 'mindset';
    const dir = path.join(__dirname, 'content', 'library', section);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Use original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// API Routes

// Get all articles from a section
app.get('/api/articles/:section', (req, res) => {
  const { section } = req.params;
  const sectionPath = path.join(__dirname, 'content', 'library', section);
  
  try {
    if (!fs.existsSync(sectionPath)) {
      return res.status(404).json({ error: 'Section not found' });
    }
    
    const files = fs.readdirSync(sectionPath)
      .filter(file => file.endsWith('.json'));
    
    const articles = files.map(file => {
      const filePath = path.join(sectionPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const article = JSON.parse(fileContent);
      
      return {
        ...article,
        slug: file.replace('.json', '')
      };
    });
    
    res.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Failed to read articles' });
  }
});

// Create a new article
app.post('/api/articles', upload.single('image'), (req, res) => {
  try {
    const { title, author, section, tags, excerpt, content } = req.body;
    
    // Validate required fields
    if (!title || !author || !section || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
    
    // Create article object
    const article = {
      title,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      author,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      excerpt: excerpt || '',
      content,
      image: req.file ? req.file.originalname : null // Store the image filename
    };
    
    // Save article to file
    const filePath = path.join(__dirname, 'content', 'library', section, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(article, null, 4));
    
    res.status(201).json({ 
      message: 'Article created successfully',
      slug,
      article
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update an existing article
app.put('/api/articles/:section/:slug', upload.single('image'), (req, res) => {
  try {
    const { section, slug } = req.params;
    const { title, author, tags, excerpt, content } = req.body;
    
    // Validate required fields
    if (!title || !author || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const filePath = path.join(__dirname, 'content', 'library', section, `${slug}.json`);
    
    // Check if article exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Read existing article
    const existingArticle = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Update article
    const updatedArticle = {
      ...existingArticle,
      title,
      author,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : existingArticle.tags,
      excerpt: excerpt || existingArticle.excerpt,
      content
    };
    
    // Save updated article
    fs.writeFileSync(filePath, JSON.stringify(updatedArticle, null, 4));
    
    res.json({
      message: 'Article updated successfully',
      article: updatedArticle
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete an article
app.delete('/api/articles/:section/:slug', (req, res) => {
  try {
    const { section, slug } = req.params;
    const filePath = path.join(__dirname, 'content', 'library', section, `${slug}.json`);
    
    // Check if article exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Delete article file
    fs.unlinkSync(filePath);
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
