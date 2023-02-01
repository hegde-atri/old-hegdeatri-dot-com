import rss from '@astrojs/rss';
import { getCollection } from 'astro:content'

export async function get(context) {
    const posts = await getCollection('posts');
    return rss({
      title: 'Atri’s posts',
      description: 'Another amazing rss feed',
      site: context.site,
      items: posts.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        // Compute RSS link from post `slug`
        // This example assumes all posts are rendered as `/blog/[slug]` routes
        link: `/posts/${post.slug}/`,
      })),
    });
  }
