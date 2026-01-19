import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Header } from "@/components/Header";

export default function PostsPage() {
  // データ取得: ビルド時に実行される
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto my-10">
        <div className="text-center m-20">
          <h1 className="text-6xl font-light gradient-text mb-4">記事一覧</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
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
