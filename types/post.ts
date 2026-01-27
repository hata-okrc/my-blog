export type PostMeta = {
  slug: string;
  title: string;
  date: string;
};


export type PostMetaWithExcerpt = PostMeta & {
  excerpt: string;
};


export type Post = PostMeta & {
  content: string;
};
