import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

// export async function markdownToHtml(markdown: string): Promise<string> {
//   const result = await remark().use(html, {sanitize: false}).process(markdown);
//   return result.toString();
// }

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
