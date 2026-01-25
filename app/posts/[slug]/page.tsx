import { getPostBySlug, getAllSlugs, getPostMeta } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdownToHtml";
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
                table of contents
              </h2>
              <nav className="space-y-3 text-sm">
                {/* <ul className=""> */}
                {toc.map((item) => (
                  <a
                    key={item.key}
                    href={`#${item.ref}`}
                    className="block py-1 ext-gray-500 hover:text-black transition-colors"
                    style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                  >
                    {item.title}
                  </a>
                ))}
                {/* </ul> */}
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
