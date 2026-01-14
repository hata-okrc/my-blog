# 個人ブログシステム アーキテクチャ設計（architecture.md）

## 1. 概要

本ドキュメントは、学習内容のアウトプットを目的とした個人ブログシステムの  
**アーキテクチャ設計書**である。

本ブログは以下の特徴を持つ。

- Next.js App Router を用いたフルスタック構成
- 記事は Markdown（`.md`）ファイルとして管理
- 外部データベースや CMS を使用しない
- SSG（Static Site Generation）による高速配信

---

## 2. 設計方針

### 2.1 基本方針

- **シンプルさを最優先**
- **拡張可能だが最初は最小構成**
- フロントエンドとバックエンドを分離しすぎない

### 2.2 非目標（MVP 時点）

- ユーザー認証
- 管理画面
- 外部 DB（PostgreSQL / Firebase など）
- 動的更新（SSR / ISR）

---

## 3. 技術スタック

| 領域           | 技術                           |
| -------------- | ------------------------------ |
| フレームワーク | Next.js（App Router）          |
| 言語           | TypeScript                     |
| レンダリング   | SSG                            |
| コンテンツ管理 | Markdown（`.md`）              |
| Markdown 解析  | gray-matter / remark / rehype  |
| スタイリング   | Tailwind CSS                   |
| デプロイ       | Vercel                         |
| データ保存     | プロジェクト内ファイルシステム |

---

## 4. 全体アーキテクチャ

### 4.1 論理構成

┌────────────┐
│ Browser │
└─────┬──────┘
│ HTTP
┌─────▼─────────────────────────┐
│ Next.js App Router │
│ │
│ ┌──────────────┐ │
│ │ Page(UI) │ │
│ └─────┬────────┘ │
│ │ │
│ ┌─────▼────────┐ │
│ │ Data Layer │ │
│ │ (fs + md) │ │
│ └─────┬────────┘ │
│ │ │
│ ┌─────▼────────┐ │
│ │ Markdown │ │
│ │ Parser │ │
│ └──────────────┘ │
└─────────────────────────────────┘

- フロントエンド・バックエンドは Next.js 内で完結
- データ取得は Node.js の `fs` を使用
- ビルド時に静的 HTML を生成

---

## 5. データフロー

### 5.1 記事一覧生成

1. `/content/posts` 配下の `.md` ファイルを走査
2. front matter を解析
3. 記事メタデータ一覧を生成
4. 記事一覧ページを SSG で生成

### 5.2 記事詳細生成

1. slug（ファイル名）を元に Markdown ファイルを取得
2. front matter と本文を分離
3. Markdown を HTML に変換
4. 静的な記事ページを生成

---

## 6. ディレクトリ構成

my-blog/
├── app/
│ ├── layout.tsx
│ ├── page.tsx # トップページ
│ ├── posts/
│ │ ├── page.tsx # 記事一覧
│ │ └── [slug]/
│ │ └── page.tsx # 記事詳細（SSG）
│ └── about/
│ └── page.tsx
│
├── content/
│ └── posts/
│ ├── hello-nextjs.md
│ ├── app-router-basics.md
│ └── ssg-vs-ssr.md
│
├── lib/
│ ├── posts.ts # 記事取得ロジック
│ ├── markdown.ts # Markdown 変換
│ └── fs.ts # fs ラッパ（任意）
│
├── components/
│ ├── PostCard.tsx
│ ├── PostHeader.tsx
│ └── MarkdownRenderer.tsx
│
├── types/
│ └── post.ts
│
├── styles/
│ └── globals.css
│
├── public/
│ └── images/
│
├── next.config.js
├── tsconfig.json
└── package.json

---

## 7. Markdown 設計

### 7.1 記事ファイル形式

```md
---
title: "Next.js App Router入門"
date: "2026-01-05"
tags: ["Next.js", "React"]
description: "App Routerの基本構造を解説"
---

## App Router とは

Next.js 13 以降で導入された新しいルーティング方式。

## 8. lib 層の責務

### 8.1 posts.ts

- 記事一覧取得
- slug 一覧取得
- 単一記事取得

想定関数：

- getAllPosts()
- getAllSlugs()
- getPostBySlug(slug)

### 8.2 markdown.ts

- Markdown → HTML 変換

- remark / rehype 設定の集約

## 9. App Router 設計方針

- Server Component を基本とする
- Client Component は最小限
- 記事ページは完全 SSG
- generateStaticParams を使用
- generateMetadata で SEO 対応

## 10. SSG 採用理由

- 記事更新頻度が低い
- 読み取り専用データ
- 表示速度最優先
- サーバーコスト最小化

## 11. デプロイ戦略

- GitHub に push
- Vercel による自動ビルド
- Markdown 更新 → 再ビルドで反映

## 12. 将来的な拡張案（MVP 後）

- RSS フィード生成
- 全文検索
- Syntax Highlight 強化
- MDX 対応
- ISR 導入
- Headless CMS への置き換え
```
