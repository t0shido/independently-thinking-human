import config from '../config';

// Utility function to generate image URLs for blog posts
export const getImageUrl = (post) => {
  if (!post.image) return null;
  
  // If image is already a full URL, use it directly
  if (post.image.startsWith('http://') || post.image.startsWith('https://')) {
    return post.image;
  }
  
  // If image starts with /media/, use it as-is (already has the prefix)
  if (post.image.startsWith('/media/')) {
    return post.image;
  }
  
  // Otherwise, prepend the mediaUrl for relative paths
  return `${config.content.mediaUrl}/${post.image}`;
};
