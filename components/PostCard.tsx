import Link from "next/link";

type PostCardProps = {
  title: string;
  date: string;
  href: string;
  excerpt?: string;
  /**
   * アニメーションディレイ（秒）
   */
  delaySeconds?: number;
  /**
   * テキスト中央寄せ（記事一覧ページ用）
   */
  centered?: boolean;
  /**
   * リンクラベル（例: "続きを読む →", "詳細 →"）
   */
  linkLabel: string;
};

export function PostCard({
  title,
  date,
  href,
  excerpt,
  delaySeconds,
  centered,
  linkLabel,
}: PostCardProps) {
  const baseClass =
    "glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow";
  const alignClass = centered ? " text-center" : "";

  const style =
    typeof delaySeconds === "number"
      ? { animationDelay: `${delaySeconds}s` }
      : undefined;

  return (
    <article className={baseClass + alignClass} style={style}>
      <div className="text-slate-500 text-sm mb-2">{date}</div>
      <h3 className="text-2xl font-light text-slate-700 mb-4">{title}</h3>
      {excerpt && (
        <p className="text-slate-500 leading-relaxed text-sm mb-2">
          {excerpt}
        </p>
      )}
      <Link
        href={href}
        className="mt-4 inline-block text-slate-500 hover:text-slate-700 transition-colors text-sm"
      >
        {linkLabel}
      </Link>
    </article>
  );
}

