export function extractTitleFromMarkdown(content: string): string {
  const lines: string[] = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  return '';
}


export function extractExcerpt(content: string): string {
  // Markdownの見出し記号やリンク記号などを除去
  const maxLength: number = 80;
  let contentText = content
    .replace(/^#+\s+/gm, '') // 見出し記号を除去
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // リンクをテキストに変換
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // 画像を除去
    .replace(/\*\*([^\*]+)\*\*/g, '$1') // 太字を除去
    .replace(/\*([^\*]+)\*/g, '$1') // 斜体を除去
    .replace(/`([^`]+)`/g, '$1') // インラインコードを除去
    .replace(/\n+/g, ' ') // 改行をスペースに変換
    .trim();

  if (contentText.length <= maxLength) {
    return contentText;
  }

  let excerpt = contentText.substring(0, maxLength);
  return excerpt + ' ...';
}
