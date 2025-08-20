// API service for communicating with the Django backend
import config from '../config';

// Use the environment-aware API URL from config.js
const API_URL = config.api.baseUrl;

// Enhanced logging function
const logApiCall = (method, endpoint, status, data = null, error = null) => {
  const timestamp = new Date().toISOString();
  const logPrefix = `[${timestamp}] [API ${method}] ${endpoint}`;
  
  if (error) {
    console.error(`${logPrefix} ERROR: ${status}`, error);
    return;
  }
  
  if (status >= 200 && status < 300) {
    console.log(`${logPrefix} SUCCESS: ${status}`, data ? { dataSize: typeof data === 'object' ? Object.keys(data).length : 'non-object' } : '');
  } else {
    console.warn(`${logPrefix} WARNING: ${status}`, data || '');
  }
};


// Get all articles from a section
export const getArticles = async (section) => {
  const endpoint = `articles/${section}/`;
  try {
    logApiCall('GET', endpoint, 'PENDING');
    
    // Add explicit CORS mode and credentials
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    // Log response headers for debugging
    const headerLog = {};
    response.headers.forEach((value, key) => {
      headerLog[key] = value;
    });
    console.log(`[Headers] ${endpoint}:`, headerLog);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { raw: errorText };
      }
      logApiCall('GET', endpoint, response.status, errorData, new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`));
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    logApiCall('GET', endpoint, response.status, { count: data.length });
    return data;
  } catch (error) {
    logApiCall('GET', endpoint, 'ERROR', null, error);
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
