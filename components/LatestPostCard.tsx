import Link from "next/link";

type FeaturedPostCardProps = {
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

export function LatestPostCard({
  title,
  date,
  excerpt,
  href,
}: FeaturedPostCardProps) {
  return (
    <article
      className="glass rounded-3xl p-10 mb-12 hover:shadow-lg transition-shadow fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="text-slate-500 text-sm mb-3">{date}</div>
      <h2 className="text-4xl font-light text-slate-700 mb-6">{title}</h2>
      <p className="text-slate-500 leading-relaxed mb-4">{excerpt}</p>
      <Link
        href={href}
        className="mt-6 inline-block text-slate-400 hover:text-slate-700 transition-colors"
      >
        続きを読む →
      </Link>
    </article>
  );
}

