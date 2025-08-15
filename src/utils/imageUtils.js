// Utility function to generate image URLs for blog posts
export const getImageUrl = (post) => {
  if (!post.image) return null;
  
  // All images are now stored in Django media folder with consistent paths
  return `/media/${post.image}`;
};
