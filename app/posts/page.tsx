import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <>
      {/*  */}
      <div className="group relative cursor-pointer ">
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
        <div className="relative bg-white/40 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-100 to-transparent"></div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium"></span>
            <div className="h-px w-8 bg-slate-200"></div>
          </div>
          <div className="mt-6 flex items-center text-[11px] font-semibold tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
            <Link href={"http://localhost:3000"}>Go To Home</Link>
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="min-h-screen bg-[#FAF9F6] text-slate-700 selection:bg-indigo-50">
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-rose-50/30 rounded-full blur-[100px]"></div>
        </div>

        <main className="relative z-10 max-w-2xl mx-auto py-24 px-6 w-full">
          <header className="mb-20 text-center">
            <h1 className="text-3xl font-light tracking-[0.3em] text-slate-800 uppercase mb-2">
              記事一覧
            </h1>
            <p className="text-xs text-slate-400 tracking-[0.1em]">
              Article List.
            </p>
          </header>

          <div className="grid gap-12 text-2xl">
            {posts.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post.title}>
                {post.title}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
