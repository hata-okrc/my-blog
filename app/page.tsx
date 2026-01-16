/**
 * Home ページ
 * 
 * 責務: 最新記事を表示するページコンポーネント
 * 実行タイミング: Server Component（ビルド時にSSGで生成）
 */

import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";
import { FeaturedPostCard } from "@/components/FeaturedPostCard";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/utils/date";

export default function Home() {
  // データ取得: ビルド時に実行される
  const posts = getLatestPosts(5);

  return (
    <>
      <header className="py-16 text-center fade-in">
        <h1 className="text-6xl font-light gradient-text mb-4">MY BLOG</h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        {posts.length > 0 && (
          <FeaturedPostCard
            title={posts[0].title}
            date={formatDate(posts[0].date)}
            excerpt={posts[0].excerpt}
            href={`/posts/${posts[0].slug}`}
          />
        )}

        {posts.length > 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(1, 5).map((post, index) => (
              <PostCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                href={`/posts/${post.slug}`}
                excerpt={post.excerpt}
                delaySeconds={0.4 + index * 0.2}
                linkLabel="続きを読む →"
              />
            ))}
            <div className="group relative cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              <div className="relative bg-white/40 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-100 to-transparent"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-8 bg-slate-200"></div>
                </div>
                <div className="mt-6 flex items-center text-[11px] font-semibold tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    <Link href={"/posts"}>article list</Link>
                  </span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      
      </main>

      <footer className="text-center py-12 text-slate-500 opacity-60">
        <p className="text-sm">© 2026 My Blog reserved.</p>
      </footer>
    </>
  );
}
