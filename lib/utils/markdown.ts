/**
 * Markdown処理ユーティリティ
 */

/**
 * Markdown本文から最初の#見出しを抽出
 * @param content - Markdown本文
 * @returns 見出しテキスト、見つからない場合は空文字列
 */
export function extractTitleFromMarkdown(content: string): string {
  const lines: string[] = content.split('\n');
  // for (const line of lines) {
  //   const trimmed = line.trim();
  //   if (trimmed.startsWith('# ')) {
  //     return trimmed.substring(2).trim();
  //   }
  // }
  lines.map((line) => {
    const trimmed: string = line.trim();
    const isBeginningWithSharp: boolean = trimmed.startsWith('# ');
    if(isBeginningWithSharp){
      const extractedTitle: string = trimmed.substring(2).trim();
      return extractedTitle;
    }
  })
  return '';
}

/**
 * Markdown本文からテキストを抽出してプレビューを生成
 * @param content - Markdown本文
 * @param maxLength - 最大文字数（デフォルト: 150）
 * @returns プレビューテキスト
 */
export function extractExcerpt(content: string): string {
  // Markdownの見出し記号やリンク記号などを除去
  const maxLength: number = 150;
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
