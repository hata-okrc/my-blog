import fs from 'fs';
import { formatDateToISO } from './date';

/**
 * ファイルシステムユーティリティ
 */

/**
 * ファイルの更新日時を取得（YYYY-MM-DD形式）
 * @param filePath - ファイルパス
 * @returns YYYY-MM-DD形式の日付文字列、エラーの場合は空文字列
 */
export function getFileModifiedDate(filePath: string): string {
  try {
    const stats = fs.statSync(filePath);
    const date = new Date(stats.mtime);
    return formatDateToISO(date);
  } catch {
    return '';
  }
}
