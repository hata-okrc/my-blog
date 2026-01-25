import { getLatestPosts } from "@/lib/posts";
import { LatestPostCard } from "@/components/LatestPostCard";
import { formatDate } from "@/lib/utils/date";
import { PostMetaWithExcerpt } from "@/types/post";
import { Header } from "@/components/Header";

export default function Home() {
  const posts: PostMetaWithExcerpt[] = getLatestPosts();
  posts.map((post) => {
    console.log(`タイトル: ${post.title}`);
  });

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto my-10 flex-grow">
        <div className="relative flex  my-15 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700 text-4xl font-medium">
            最新の記事
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.slice(0, 6).map((post) => (
            <LatestPostCard
              key={post.slug}
              title={post.title}
              date={formatDate(post.date)}
              href={`/posts/${post.slug}`}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full py-10 flex justify-center text-slate-500 opacity-60">
        <p className="text-sm">© 2026 My Blog reserved.</p>
      </footer>
    </>
  );
}
