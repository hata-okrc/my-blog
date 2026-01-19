import Link from "next/link";

// export function Header() {
//   return (
//     <>
//    <header>
//     <div className="group relative cursor-pointer fade-in">
//         <div className="absolute -inset-2 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
//         <div className="relative bg-white/40 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden">
//           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-100 to-transparent"></div>
//           <div className="flex items-center gap-4 mb-4">
//             <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium"></span>
//             <div className="h-px w-8 bg-slate-200"></div>
//           </div>
//           <div className="mt-6 flex items-center text-[15px] font-semibold tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
//             <Link href={"http://localhost:3000"}>ホームに戻る</Link>
//             <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
//               →
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//     </>
//       );
// }

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full fade-in">
      <div className="bg-white px-6 py-4 border-b border-b-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/rock-icon.svg" alt="アイコン" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-black">
              MY BLOG
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href="/posts"
              className="text-sm font-medium text-gray-600 border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              記事一覧
            </Link>

            <div className="h-4 w-px bg-gray-200"></div>
            <Link
              href="https://github.com/hata-okrc"
              className="group flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                <img src="/gitHubIcon.svg" alt="アイコン" />
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
