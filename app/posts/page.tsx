import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Header } from "@/components/Header";

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <>
      <Header />
      <main className="max-w-screen-xl  my-10  md:px-12 mx-auto">
        <div className="relative flex my-15 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-700 text-4xl font-medium">
            記事一覧
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              href={`/posts/${post.slug}`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
