import { getPostBySlug, getAllSlugs } from "@/lib/posts";
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

  if (!content) {
    notFound();
  }

  const htmlContent = await markdownToHtml(content);

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6] selection:bg-indigo-50">
        <article className="max-w-2xl mx-auto px-6 py-32">
          <header className="mb-16">
            <time className="text-xs font-mono text-slate-400 tracking-widest block mb-4">
              2025
            </time>
            <h1 className="text-3xl md:text-4xl font-normal text-slate-800 leading-tight">
              {slug}
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

          <footer className="mt-32 pt-12 border-t border-slate-100 text-center">
            <Link
              href={"http://localhost:3000"}
              className="text-xs tracking-[0.2em] text-slate-400 hover:text-slate-800 transition"
            >
              BACK TO HOME
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
