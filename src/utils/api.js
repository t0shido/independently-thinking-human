// API service for communicating with the Django backend

// Use relative URL in production, fallback to localhost in development
const API_URL = '/api';

// Get all articles from a section
export const getArticles = async (section) => {
  try {
    const response = await fetch(`${API_URL}/articles/${section}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return await response.json();
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
