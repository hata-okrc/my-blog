/**
 * 日付フォーマットユーティリティ
 */

/**
 * 日付を YYYY-MM-DD から YYYY.MM.DD 形式に変換
 * @param dateString - YYYY-MM-DD形式の日付文字列
 * @returns YYYY.MM.DD形式の日付文字列、または空文字列
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return dateString.replace(/-/g, '.');
}

/**
 * Date オブジェクトを YYYY-MM-DD 形式に変換
 * @param date - Date オブジェクト
 * @returns YYYY-MM-DD形式の日付文字列
 */
export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
