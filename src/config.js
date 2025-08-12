/**
 * Configuration file for the Independently Thinking Human project
 * Contains settings for API endpoints and other configuration options
 */

const config = {
  // API configuration
  api: {
    // Base URL for the Django backend API
    baseUrl: '/api',
    
    // Whether to use the API or local JSON files
    // Set to false to use local JSON files (fallback mode)
    useApi: true,
    
    // Endpoints
    endpoints: {
      // Get articles from a section
      getArticles: (section) => `${config.api.baseUrl}/articles/${section}/`,
      
      // Create a new article
      createArticle: () => `${config.api.baseUrl}/articles/`,
      
      // Update or delete an article
      articleDetail: (section, slug) => `${config.api.baseUrl}/articles/${section}/${slug}/`,
    }
  },
  
  // Content configuration
  content: {
    // Sections available in the library
    sections: ['mindset', 'politics', 'economics', 'technology', 'health', 'stories'],
    
    // Media URL for images
    mediaUrl: '/media',
  }
};

export default config;
