// API service for communicating with the Django backend

// Use relative URL in production, full URL in development
// Always use the full URL with explicit protocol to avoid connectivity issues
const API_URL = 'http://127.0.0.1:8000/api';

// Get all articles from a section
export const getArticles = async (section) => {
  try {
    console.log(`Fetching articles from: ${API_URL}/articles/${section}/`);
    
    // Add explicit CORS mode and credentials
    const response = await fetch(`${API_URL}/articles/${section}/`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} articles for section: ${section}`);
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Create a new article
export const createArticle = async (articleData) => {
  try {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(articleData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, articleData[key]);
      }
    });
    
    // Add image if it exists
    if (articleData.image) {
      formData.append('image', articleData.image);
    }
    
    const response = await fetch(`${API_URL}/articles`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

// Update an existing article
export const updateArticle = async (section, slug, articleData) => {
  try {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(articleData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, articleData[key]);
      }
    });
    
    // Add image if it exists
    if (articleData.image) {
      formData.append('image', articleData.image);
    }
    
    const response = await fetch(`${API_URL}/articles/${section}/${slug}`, {
      method: 'PUT',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

// Delete an article
export const deleteArticle = async (section, slug) => {
  try {
    const response = await fetch(`${API_URL}/articles/${section}/${slug}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};
