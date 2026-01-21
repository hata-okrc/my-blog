import { getPostBySlug, getAllSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";

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
      <Header />

      <main className="max-w-3xl mx-auto py-20 px-6">
        <time className="text-gray-400 text-sm mb-4 block">
          {postMeta.date}
        </time>

        <div
          className="article-content fade-in"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </>
  );
}
