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
export async function getSectionPosts(section, { forceRefresh = false } = {}) {
  try {
    if (!forceRefresh && apiCache[section]) {
      return apiCache[section];
    }

    const posts = await getArticles(section);
    apiCache[section] = posts;
    return posts;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error('Error loading posts from API:', error);
    }
    // On refresh failure, keep last-known cache if present
    if (apiCache[section]) return apiCache[section];
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
