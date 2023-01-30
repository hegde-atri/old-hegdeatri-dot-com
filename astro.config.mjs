import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeToc from 'rehype-toc';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://hegdeatri.com',
  markdown: {
    rehypePlugins: [ rehypeToc ],
    // syntaxHighlight: 'prism',
    shikiConfig: {
      theme: 'material-palenight',
      // wrap: true,
    }
  },
  integrations: [mdx(), sitemap(), tailwind()],
});