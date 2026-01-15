import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="py-16 text-center fade-in">
        <div className="float inline-block">
          <h1 className="text-6xl font-light gradient-text mb-4">MY BLOG</h1>
          <Link href="/posts" className="text-slate-500 text-lg opacity-70">
            投稿一覧
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <article
          className="glass rounded-3xl p-10 mb-12"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-slate-500 text-sm mb-3">2026.01.15</div>
          <h2 className="text-4xl font-light text-slate-700 mb-6">
            月光の下で見た夢
          </h2>
          <p className="text-slate-500 leading-relaxed mb-4">
            静かな夜、月明かりが窓辺に差し込む。その光は柔らかく、まるで時間が溶けていくようだった。私は本を閉じ、目を閉じた。すると、そこには見知らぬ風景が広がっていた。
          </p>
          <p className="text-slate-500 leading-relaxed">
            遠くに見える山々は霞んでいて、空と地の境界が曖昧になっている。風が頬を撫でる。それは現実なのか、夢なのか、もう分からなくなっていた。
          </p>
          <button className="mt-6 text-slate-400 hover:text-slate-700 transition-colors">
            続きを読む →
          </button>
        </article>

        <div className="grid md:grid-cols-2 gap-8">
          <article
            className="glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-slate-500 text-sm mb-2">2026.01.10</div>
            <h3 className="text-2xl font-light text-slate-700 mb-4">
              朝霧の中の散歩
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              朝早く目を覚ますと、世界は霧に包まれていた。いつもの道が、まるで別の場所のように見える。一歩ずつ進むたびに、新しい景色が現れては消えていく。
            </p>
            <button className="mt-4 text-slate-500 hover:text-slate-700 transition-colors text-sm">
              続きを読む →
            </button>
          </article>

          <article
            className="glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-slate-500 text-sm mb-2">2026.01.05</div>
            <h3 className="text-2xl font-light text-slate-700 mb-4">
              古い図書館で
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              埃の香りと古い紙の匂い。本棚の間を歩くと、時代を超えた声が聞こえてくるような気がした。ここは現実と幻想の境界線にある場所なのかもしれない。
            </p>
            <button className="mt-4 text-slate-500 hover:text-slate-700 transition-colors text-sm">
              続きを読む →
            </button>
          </article>

          <article
            className="glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-slate-500 text-sm mb-2">2025.12.28</div>
            <h3 className="text-2xl font-light text-slate-700 mb-4">
              雨音のセレナーデ
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              窓を叩く雨の音が、優しいメロディーを奏でている。傘を持たずに外に出た。雨に濡れることを恐れずに、ただその瞬間を感じていたかった。
            </p>
            <button className="mt-4 text-slate-500 hover:text-slate-700 transition-colors text-sm">
              続きを読む →
            </button>
          </article>

          <article
            className="glass rounded-2xl p-8 fade-in hover:shadow-lg transition-shadow"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-slate-500 text-sm mb-2">2025.12.20</div>
            <h3 className="text-2xl font-light text-slate-700 mb-4">
              冬の星空
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              冷たい空気の中、見上げた空には無数の星が輝いていた。その光は何万年も前のもの。過去と現在が交差する、不思議な感覚に包まれた。
            </p>
            <button className="mt-4 text-slate-500 hover:text-slate-700 transition-colors text-sm">
              続きを読む →
            </button>
          </article>
          <div className="group relative cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          <div className="relative bg-white/40 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-100 to-transparent"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-slate-200"></div>
            </div>
            <div className="mt-6 flex items-center text-[11px] font-semibold tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                <Link href={"http://localhost:3000/posts"}>article list</Link>
              </span>
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>
        </div>

      
      </main>

      <footer className="text-center py-12 text-slate-500 opacity-60">
        <p className="text-sm">© 2026 夢想日記. All dreams reserved.</p>
      </footer>
    </>
  );
}
