/**
 * 記事一覧ページ
 * 
 * 責務: すべての記事を一覧表示するページコンポーネント
 * 実行タイミング: Server Component（ビルド時にSSGで生成）
 */

import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";

export default function PostsPage() {
  // データ取得: ビルド時に実行される
  const posts = getAllPosts();

  return (
    <>
    <header>
    <div className="group relative cursor-pointer ">
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
        <div className="relative bg-white/40 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-100 to-transparent"></div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium"></span>
            <div className="h-px w-8 bg-slate-200"></div>
          </div>
          <div className="mt-6 flex items-center text-[15px] font-semibold tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
            <Link href={"http://localhost:3000"}>ホームに戻る</Link>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </header>
        <div className="text-center m-20">
          <h1 className="text-6xl font-light gradient-text mb-4">記事一覧</h1>
        </div>

      <main className="max-ww-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              href={`/posts/${post.slug}`}
              delaySeconds={0.5 + index * 0.1}
              centered
              linkLabel="詳細 →"
            />
          ))}
        </div>
      </main>
      </>
  );
}
