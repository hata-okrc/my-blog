/**
 * 記事データ取得ロジック
 * 
 * 責務: ファイルシステムから記事データを取得する
 * 実行タイミング: Server Component または generateStaticParams 実行時（ビルド時またはリクエスト時）
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PostMeta, PostWithExcerpt } from '@/types/post';
import { extractTitleFromMarkdown, extractExcerpt } from './utils/markdown';
import { getFileModifiedDate } from './utils/file';

/**
 * 記事ディレクトリのパス
 * 実行タイミング: モジュール読み込み時（定数として評価）
 */
const postsDirectory: string = path.join(process.cwd(), 'content', 'posts');

/**
 * 記事メタデータを解析して取得
 * 責務: front-matterとMarkdown本文からメタデータを抽出
 * 
 * @param slug - 記事のslug
 * @param fileContents - ファイルの内容
 * @param fullPath - ファイルのフルパス
 * @returns 記事メタデータ
 */
function parsePostMeta(
  slug: string,
  fileContents: string,
  fullPath: string
): PostMeta {
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

/**
 * 記事を日付降順でソート
 * 責務: 記事配列を日付でソートする
 * 
 * @param posts - 記事メタデータ配列
 * @returns ソート済み記事配列
 */
function sortPostsByDate(posts: PostMeta[]): PostMeta[] {
  return posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    if (!a.date && !b.date) return 0;
    return b.date.localeCompare(a.date);
  });
}

/**
 * すべての記事のslugを取得
 * 実行タイミング: generateStaticParams 実行時、または記事一覧取得時
 * 
 * @returns slugの配列
 */
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

/**
 * すべての記事のメタデータを取得（日付降順でソート）
 * 実行タイミング: Server Component 実行時（ビルド時またはリクエスト時）
 * 
 * @returns 記事メタデータの配列
 */
export function getAllPosts(): PostMeta[] {
  const slugs: string[] = getAllSlugs();

  const posts: PostMeta[] = slugs.map((slug) => {
    const fullPath: string = path.join(postsDirectory, `${slug}.md`);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    return parsePostMeta(slug, fileContents, fullPath);
  });

  return sortPostsByDate(posts);
}

/**
 * slugから記事の本文を取得
 * 実行タイミング: Server Component 実行時（ビルド時またはリクエスト時）
 * 
 * @param slug - 記事のslug
 * @returns Markdown本文（front-matterを除去済み）、存在しない場合はnull
 */
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
 * 実行タイミング: Server Component 実行時（ビルド時またはリクエスト時）
 * 
 * @param slug - 記事のslug
 * @returns 記事メタデータ、存在しない場合はnull
 */
export function getPostMeta(slug: string): PostMeta | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, 'utf8');
  return parsePostMeta(slug, fileContents, fullPath);
}

/**
 * 最新の記事を取得（本文の一部も含む）
 * 実行タイミング: Server Component 実行時（ビルド時またはリクエスト時）
 * 
 * @param limit - 取得件数（デフォルト: 5）
 * @returns 記事メタデータ + 抜粋の配列
 */
export function getLatestPosts(limit: number = 5): PostWithExcerpt[] {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, limit);

  return latestPosts.map((post) => {
    const fullPath: string = path.join(postsDirectory, `${post.slug}.md`);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    const excerpt = extractExcerpt(content, 150);

    return {
      ...post,
      excerpt,
    };
  });
}
