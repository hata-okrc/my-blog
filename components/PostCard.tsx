import Link from "next/link";

type PostCardProps = {
  title: string;
  date: string;
  href: string;
  excerpt?: string;
};

export function PostCard({ title, date, href, excerpt }: PostCardProps) {
  const baseClass =
    "glass rounded-2xl p-8 fade-in hover:shadow-xl hover:border-black/20 transition-all duration-300";

  return (
    <article className={baseClass}>
      <div className="text-gray-400 text-xs font-medium mb-3 tracking-wider">
        {date}
      </div>

      <h3 className="text-2xl font-semibold text-black mb-4">{title}</h3>

      {excerpt && (
        <p className="text-gray-600 leading-relaxed text-sm mb-6">{excerpt}</p>
      )}
      <Link
        href={href}
        className="inline-flex items-center text-black font-medium hover:opacity-60 transition-opacity text-sm border-b border-black/10 pb-1"
      >
        続きを読む <span className="ml-1">→</span>
      </Link>
    </article>
  );
}
