import Link from "next/link";

type PostCardProps = {
  title: string;
  date: string;
  href: string;
  excerpt?: string;
};

export function PostCard({ title, date, href, excerpt }: PostCardProps) {
  return (
    <>
      <Link
        href={href}
        className="rounded-3xl  fade-in hover:shadow-2xl hover:border-black/20 transition-all duration-300  shadow-lg"
      >
        <div className="flex items-center px-6 py-3 bg-gray-800 rounded-t-xl">
          <h1 className="mx-3 text-lg font-semibold text-white">{title}</h1>
        </div>
        <div className="px-6 py-4">
          <p className="py-2 text-gray-700 dark:text-gray-400">{excerpt}</p>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <p className="px-2 text-sm">{date}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
