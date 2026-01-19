/**
 * 記事詳細ページ
 *
 * 責務: 個別記事を表示するページコンポーネント
 * 実行タイミング: Server Component（generateStaticParamsでビルド時にSSGで生成）
 */

import { getPostBySlug, getAllSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
/**
 * generateStaticParams: ビルド時に実行され、すべてのslugを返す
 * 実行タイミング: ビルド時（npm run build）
 */
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * 記事詳細ページコンポーネント
 * 実行タイミング: ビルド時（generateStaticParamsで生成された各slugに対して実行）
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // データ取得: ビルド時に実行される
  const content = getPostBySlug(slug);
  const postMeta = getPostMeta(slug);

  if (!content || !postMeta) {
    notFound();
  }

  const htmlContent = await markdownToHtml(content);

  return (
    <>
      <Header />

      <main>
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
        </div>
      </main>
    </>
  );
}
