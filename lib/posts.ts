import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta, PostMetaWithExcerpt } from "@/types/post";
import { extractTitleFromMarkdown, extractExcerpt } from "./utils/markdown";
import { getFileModifiedDate } from "./utils/file";


 const postsDirectory: string = path.join(process.cwd(), "content", "posts");


function parsePostMeta(
  slug: string,
  fileContents: string,
  fullPath: string
): PostMeta {
  const { data, content } = matter(fileContents);
  let title: string =
    typeof data.title === "string" && data.title ? data.title : "";

  if (!title) {
    title = extractTitleFromMarkdown(content);
  }
  if (!title) {
    title = slug;
  }

  // 日付: front-matterがあれば使用、なければファイルの更新日時
  let date: string =
    typeof data.date === "string" && data.date ? data.date : "";
  if (!date) {
    date = getFileModifiedDate(fullPath);
  }
  const parsedPostMeta: PostMeta = {
    slug,
    title,
    date,
  };
  return parsedPostMeta;
}


function sortPostsByDate(posts: PostMeta[]): PostMeta[] {
  // 文字列比較は yy-mm-dd の場合、新しい日付が大きくなる
  return posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    if (!a.date && !b.date) return 0;
    return b.date.localeCompare(a.date);
  });
}


export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const slugs: string[] = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
  return slugs;
}


export function getAllPosts(): PostMeta[] {
  const slugs: string[] = getAllSlugs();

  const posts: PostMeta[] = slugs.map((slug) => {
    const fullPath: string = path.join(postsDirectory, `${slug}.md`);
    const fileContents: string = fs.readFileSync(fullPath, "utf8");
    return parsePostMeta(slug, fileContents, fullPath);
  });
  const sortedPosts: PostMeta[] = sortPostsByDate(posts);
  return sortedPosts;
}

export function getPostBySlug(slug: string): string | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return content;
}

 export function getPostMeta(slug: string): PostMeta | null {
  const fullPath: string = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  return parsePostMeta(slug, fileContents, fullPath);
}


export function getLatestPosts(): PostMetaWithExcerpt[] {
  const limit: number = 6;
  const allPosts: PostMeta[] = getAllPosts();
  const latestPosts = allPosts.slice(0, limit);

  return latestPosts.map((post) => {
    const fullPath: string = path.join(postsDirectory, `${post.slug}.md`);
    const fileContents: string = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);
    const excerpt = extractExcerpt(content);

    return {
      ...post,
      excerpt,
    };
  });
}
