import matter from 'gray-matter';

export async function getAllPosts() {
  const posts = import.meta.glob('/content/blog/*.md');
  
  const allPosts = await Promise.all(
    Object.entries(posts).map(async ([path, resolver]) => {
      const { default: content, metadata } = await resolver();
      const slug = path.replace('/content/blog/', '').replace('.md', '');
      
      return {
        slug,
        content,
        ...metadata
      };
    })
  );

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}
