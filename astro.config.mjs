import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { RehypePlugin } from '@astrojs/markdown-remark';
import rehypeToc from 'rehype-toc';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://new.hegdeatri.com',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    rehypePlugins: [ rehypeToc],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'material-palenight',
      wrap: true,
    }
  }
});