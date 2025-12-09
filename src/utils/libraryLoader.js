import { getArticles } from './api';

// Define available sections
const SECTIONS = {
  mindset: [],
  politics: [],
  economics: [],
  technology: [],
  stories: []
};

// Cache for API responses to avoid unnecessary requests
// Clear cache on module reload during development
const apiCache = {};

// Function to clear cache (useful during development)
export function clearCache() {
  Object.keys(apiCache).forEach(key => delete apiCache[key]);
  console.log('API cache cleared');
}

/**
 * Get all posts for a specific section using the API
 * Falls back to file-based loading if API fails
 */
export async function getSectionPosts(section) {
  console.log('Loading posts for section:', section);
  
  try {
    // Check if we have a cached response
    if (apiCache[section]) {
      console.log('Using cached data for section:', section);
      return apiCache[section];
    }
    
    // Try to fetch from API first
    console.log('Fetching from API for section:', section);
    const posts = await getArticles(section);
    
    // Cache the response
    apiCache[section] = posts;
    
    console.log(`Loaded ${posts.length} posts from API for section:`, section);
    return posts;
  } catch (error) {
    console.error('Error loading posts from API:', error);
    console.log('Falling back to default section data');
    return SECTIONS[section] || [];
  }
}

export async function getPostBySlug(section, slug) {
  try {
    // First try to get all posts for the section
    const posts = await getSectionPosts(section);
    
    // Find the post with the matching slug
    const post = posts.find(post => post.slug === slug);
    
    if (post) {
      return post;
    } else {
      console.error(`Post with slug ${slug} not found in section ${section}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching post ${slug} from section ${section}:`, error);
    return null;
  }
}
