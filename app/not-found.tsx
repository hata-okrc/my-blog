import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-height-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center fade-in">
        <h1 className="text-9xl font-black gradient-text mb-4">404</h1>
        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-black mb-2">
            ページが見つかりませんでした
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            お探しのページは削除されたか、URLが変更された可能性があります。
            トップページに戻って新しい記事を探してみませんか？
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-black/10"
          >
            ホームに戻る
          </Link>
          <Link
            href="/posts"
            className="w-full sm:w-auto text-black border border-black/10 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
          >
            記事一覧を見る
          </Link>
        </div>
      </div>
    </main>
  );
}
