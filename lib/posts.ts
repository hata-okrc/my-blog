import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory: string = path.join(process.cwd(), 'content', 'posts');
// const postsDirectory: string = './content/posts';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

/**
 * Markdown本文から最初の#見出しを抽出
 */
function extractTitleFromMarkdown(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  return '';
}

/**
 * ファイルの更新日時を取得（YYYY-MM-DD形式）
 */
function getFileModifiedDate(filePath: string): string {
  try {
    const stats = fs.statSync(filePath);
    const date = new Date(stats.mtime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
}

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
    const { data, content } = matter(fileContents);

    // タイトル: front-matterがあれば使用、なければMarkdown本文から抽出、それもなければslug
    let title: string = typeof data.title === 'string' && data.title ? data.title : '';
    if (!title) {
      title = extractTitleFromMarkdown(content);
    }
    if (!title) {
      title = slug;
    }

    // 日付: front-matterがあれば使用、なければファイルの更新日時
    let date: string = typeof data.date === 'string' && data.date ? data.date : '';
    if (!date) {
      date = getFileModifiedDate(fullPath);
    }

    return {
      slug,
      title,
      date,
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

/**
 * slugから記事のメタデータを取得
 */
export function getPostMeta(slug: string): PostMeta | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // タイトル: front-matterがあれば使用、なければMarkdown本文から抽出、それもなければslug
  let title: string = typeof data.title === 'string' && data.title ? data.title : '';
  if (!title) {
    title = extractTitleFromMarkdown(content);
  }
  if (!title) {
    title = slug;
  }

  // 日付: front-matterがあれば使用、なければファイルの更新日時
  let date: string = typeof data.date === 'string' && data.date ? data.date : '';
  if (!date) {
    date = getFileModifiedDate(fullPath);
  }

  return {
    slug,
    title,
    date,
  };
}