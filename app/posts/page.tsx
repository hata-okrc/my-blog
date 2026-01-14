import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}