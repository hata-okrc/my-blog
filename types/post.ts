/**
 * 記事のメタデータ型定義
 */
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

/**
 * 記事メタデータ + 本文抜粋
 */
export type PostWithExcerpt = PostMeta & {
  excerpt: string;
};

/**
 * 記事の完全なデータ（本文を含む）
 */
export type Post = PostMeta & {
  content: string;
};
