import Link from "next/link";
type TableOfContentsProps = {
  level: number;
  title: string;
  href: string;
  key: string;
}; 
export function TableOfContents({ level, title, href, key }: TableOfContentsProps) {
  return (
    <Link
      key={key}
      href={`#${href}`}
      className="block py-1 ext-gray-500 hover:text-black transition-colors"
      style={{ paddingLeft: `${(level - 1) * 1}rem` }}
    >
      {title}
    </Link>
  );
}
