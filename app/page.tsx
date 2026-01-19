import { getLatestPosts } from "@/lib/posts";
import { LatestPostCard } from "@/components/LatestPostCard";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/utils/date";
import { PostMetaWithExcerpt } from "@/types/post";
import { Header } from "@/components/Header";

export default function Home() {
  const posts: PostMetaWithExcerpt[] = getLatestPosts();

  return (
    <>
      <Header />

      {/* <main className="max-w-4xl mx-auto my-10 flex-grow">
        <div className="relative flex my-10 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700 text-4xl font-medium">
            最新の記事
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {posts.length > 0 && (
          <LatestPostCard
            title={posts[0].title}
            date={formatDate(posts[0].date)}
            excerpt={posts[0].excerpt}
            href={`/posts/${posts[0].slug}`}
          />
        )}

        {posts.length > 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(1, 5).map((post, index) => (
              <PostCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                href={`/posts/${post.slug}`}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        )}
      </main> */}


      <main className="max-w-4xl mx-auto my-10 flex-grow">
        <div className="relative flex my-10 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700 text-4xl font-medium">
            最新の記事
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        
          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(0, 6).map((post, index) => (
              <PostCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                href={`/posts/${post.slug}`}
                excerpt={post.excerpt}
              />
            ))}
          </div>
      </main> 


      <footer className="text-center py-10 text-slate-500 opacity-60">
        <p className="text-sm">© 2026 My Blog reserved.</p>
      </footer>
    </>
  );
}
