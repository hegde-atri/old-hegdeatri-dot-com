import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import astroRemark from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import tailwind from "@astrojs/tailwind";
import syntaxTheme from "./syntax-theme.json";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://hegdeatri.com',
  markdown: {
    astroRemark,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax, rehypeSlug, rehypeAutolinkHeadings, rehypeToc],
    // syntaxHighlight: 'prism',
    shikiConfig: {
      theme: syntaxTheme,
      wrap: true,
    }
  },

  integrations: [mdx(), sitemap(), tailwind()],
  output: "server",
  adapter: vercel(),
});
