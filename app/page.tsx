import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>My Blog</h1>
      <Link href="/posts">投稿一覧</Link>
    </div>
  );
}
