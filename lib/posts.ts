import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// const postsDirectory: string = path.join(process.cwd(), 'content', 'posts');
const postsDirectory: string = './content/posts';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const slugs: string[] = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
  return slugs;
}

export function getAllPosts(): PostMeta[] {
  const slugs: string[] = getAllSlugs();

  const posts: PostMeta[] = slugs.map((slug) => {
    const fullPath: string = path.join(postsDirectory, `${slug}.md`);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date : '',
    };
  });

  // date 降順（空は最後）
  posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    if (!a.date && !b.date) return 0;
    return b.date.localeCompare(a.date);
  });

  return posts;
}

export function getPostBySlug(slug: string): string | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);

  return content;
}