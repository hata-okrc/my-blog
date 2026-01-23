import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full fade-in">
      <div className="bg-white px-6 py-4 border-b border-b-gray-700 ">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-4xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/rock-icon.svg"
                alt="アイコン"
                width={50}
                height={50}
              />
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
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/gitHubIcon.svg"
                  alt="アイコン"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
