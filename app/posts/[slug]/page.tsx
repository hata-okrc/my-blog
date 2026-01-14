import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getPostBySlug(slug);

  if (!content) {
    notFound();
  }

  const htmlContent = await markdownToHtml(content);

  return (
    <div>
      <h1>{slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}