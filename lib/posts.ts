import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory: string = path.join(process.cwd(), 'content', 'posts');

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

export function getPostBySlug(slug: string): string | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  
  return content;
}