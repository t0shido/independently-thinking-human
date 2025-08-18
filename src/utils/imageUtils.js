import config from '../config';

// Utility function to generate image URLs for blog posts
export const getImageUrl = (post) => {
  if (!post.image) return null;
  
  // Use the mediaUrl from config to ensure correct path in both dev and prod
  return `${config.content.mediaUrl}/${post.image}`;
};
