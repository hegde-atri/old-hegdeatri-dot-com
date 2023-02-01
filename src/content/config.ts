// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    date: z.date().optional(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    comments: z.boolean().optional(),
    tags: z.array(z.string()),
  }),
});

const snippetsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        date: z.date().optional(),
        draft: z.boolean().optional(),
    })
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postsCollection,
  'snippets': snippetsCollection
};
