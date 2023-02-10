import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import astroRemark from '@astrojs/markdown-remark';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://hegdeatri.com',
  markdown: {
    astroRemark,
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeToc],
    // syntaxHighlight: 'prism',
    shikiConfig: {
      theme: 'material-palenight'
      // wrap: true,
    }
  },

  integrations: [mdx(), sitemap(), tailwind()],
  output: "server",
  adapter: vercel()
});