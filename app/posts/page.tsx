import { getAllSlugs } from '@/lib/posts';
import Link from 'next/link';

export default function PostsPage() {
  const slugs = getAllSlugs();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}