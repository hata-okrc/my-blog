import { getPostBySlug, getAllSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getPostBySlug(slug);
  const postMeta = getPostMeta(slug);

  if (!content || !postMeta) {
    notFound();
  }

  const htmlContent = await markdownToHtml(content);

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6] selection:bg-indigo-50">
        <article className="max-w-2xl mx-auto px-6 py-32">
          <header className="mb-16">
            <time className="text-xs font-mono text-slate-400 tracking-widest block mb-4">
              {postMeta.date}
            </time>
            <h1 className="text-3xl md:text-4xl font-normal text-slate-800 leading-tight">
              {postMeta.title}
            </h1>
            <div className="mt-10 h-px w-12 bg-slate-300"></div>
          </header>
          <div
            className="prose prose-slate prose-lg max-w-none 
          prose-headings:font-normal prose-headings:text-slate-800
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8
          prose-blockquote:italic prose-blockquote:border-l-indigo-100"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>          
        </article>

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
      </div>

      
    </>
  );
}
