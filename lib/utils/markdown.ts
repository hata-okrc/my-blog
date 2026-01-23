import GithubSlugger from "github-slugger";

export function extractTitleFromMarkdown(content: string): string {
  const lines: string[] = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      return trimmed.substring(2).trim();
    }
  }
  return "";
}

export function extractExcerpt(content: string): string {
  // Markdownの見出し記号やリンク記号などを除去
  const maxLength: number = 80;
  const contentText = content
    .replace(/^#+\s+/gm, "") // 見出し記号を除去
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // リンクをテキストに変換
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "") // 画像を除去
    .replace(/\*\*([^\*]+)\*\*/g, "$1") // 太字を除去
    .replace(/\*([^\*]+)\*/g, "$1") // 斜体を除去
    .replace(/`([^`]+)`/g, "$1") // インラインコードを除去
    .replace(/\n+/g, " ") // 改行をスペースに変換
    .trim();

  if (contentText.length <= maxLength) {
    return contentText;
  }

  const excerpt = contentText.substring(0, maxLength);
  return excerpt + " ...";
}

export function getToc(content: string) {
  const headings: string[] = content.match(/^(#|##|###) .+/gm) || [];

  const toc: { level: number; title: string; ref: string; id: string }[] = [];
  for (let i = 0; i < headings.length; i++) {
    const level: number = headings[i].split(" ")[0].length;
    const title: string = headings[i].replace(/^(#|##|###) /, "");
    const slugger = new GithubSlugger();
    const ref: string = slugger.slug(title);
    const id: string = String(i);
    toc.push({ level, title, ref, id });
  }
  return toc;
}
