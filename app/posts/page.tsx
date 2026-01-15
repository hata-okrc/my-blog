import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      
      <header className="py-16 text-center fade-in">
        <div className="float inline-block">
          <h1 className="text-6xl font-light gradient-text mb-4">記事一覧</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <>
            <article
              className="glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow text-center"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-slate-500 text-sm mb-2">{post.date}</div>
              <h3 className="text-2xl font-light text-slate-700 mb-4">
                {post.title}
              </h3>
              <Link
                href={`/posts/${post.slug}`}
                key={post.title}
                className="mt-4 text-slate-500 hover:text-slate-700 transition-colors text-sm"
              >
                詳細 →
              </Link>
            </article>
          </>
        ))}
        </div>
      </main>

          </>
  );
}
