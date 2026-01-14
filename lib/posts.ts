import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
  
  return slugs;
}