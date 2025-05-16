import matter from 'gray-matter';

// Import all JSON files from each section directory
const sectionFiles = {
  mindset: import.meta.glob('../../content/library/mindset/*.json', { eager: true, import: 'default' }),
  politics: import.meta.glob('../../content/library/politics/*.json', { eager: true, import: 'default' }),
  economics: import.meta.glob('../../content/library/economics/*.json', { eager: true, import: 'default' }),
  technology: import.meta.glob('../../content/library/technology/*.json', { eager: true, import: 'default' }),
  health: import.meta.glob('../../content/library/health/*.json', { eager: true, import: 'default' }),
  stories: import.meta.glob('../../content/library/stories/*.json', { eager: true, import: 'default' })
};

console.log('Available section files:', JSON.stringify(sectionFiles, null, 2));

const SECTIONS = {
  mindset: [],
  politics: [],
  economics: [],
  technology: [],
  health: [],
  stories: []
};

export async function getSectionPosts(section) {
  console.log('Loading posts for section:', section);
  
  try {
    if (sectionFiles[section]) {
      const posts = [];
      const files = sectionFiles[section];
      console.log('Number of files found:', Object.keys(files).length);
      
      for (const path in files) {
        try {
          console.log('Processing file:', path);
          const post = files[path];
          console.log('Post data:', JSON.stringify(post, null, 2));
          
          // Extract filename for slug
          const filename = path.split('/').pop().replace('.json', '');
          console.log('Generated slug:', filename);
          
          posts.push({
            ...post,
            slug: filename
          });
        } catch (error) {
          console.error(`Error loading file ${path}:`, error);
        }
      }
      
      console.log('Final posts array:', JSON.stringify(posts, null, 2));
      // Sort posts by date (newest first)
      return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return SECTIONS[section] || [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostBySlug(section, slug) {
  const posts = await getSectionPosts(section);
  return posts.find(post => post.slug === slug);
}
