import { getPostBySlug, getAllSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PostMeta } from "@/types/post";
import { getToc } from "@/lib/utils/markdown";

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
  const { slug }: { slug: string } = await params;
  const content: string | null = getPostBySlug(slug);
  const postMeta: PostMeta | null = getPostMeta(slug);

  if (!content || !postMeta) {
    notFound();
  }

  const htmlContent = await markdownToHtml(content);
  const toc = getToc(content);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto py-12 md:py-20 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="flex-1 min-w-0">
            <div
              className="article-content fade-in"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
          <aside className="hidden lg:block w-64">
            <div className="sticky top-24 p-6  rounded-2xl border border-black bg-white">
              <h2 className="text-xs font-bold text-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-4 h-px bg-black"></span>
                目次
              </h2>
              <nav>
                <ul className="space-y-3 text-sm">
                  {toc.map((item) => (
                    <li
                      key={item.ref}
                      style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                      className="text-gray-500 hover:text-black transition-colors"
                    >
                      <a href={`#${item.ref}`} className="block py-1">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
