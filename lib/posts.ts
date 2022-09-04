import { sync } from "glob";
import path from "path";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "posts");
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

type PostItems = {
  [key: string]: string;
};

export function getPostBySlug(slug: string, fields: string[] = []): PostItems {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items: PostItems = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllPosts(fields: string[] = []): PostItems[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}


// export const getSlugs = (): string[] => {
// 	const paths = sync(`${POSTS_PATH}/*.mdx`);
// 	return paths.map((path) => {
// 		const parts = path.split("/");
// 		const filename = parts[parts.length - 1];
// 		const [slug, _ext] = filename.split(".");
// 		return slug;
// 	});
// };

// export const getAllPosts = () => {
// 	const posts = getSlugs()
// 		.map((slug) => getPostFromSlug(slug))
// 		.sort((a, b) => {
// 			if (a.meta.updated > b.meta.updated) return 1;
// 			if (a.meta.updated < b.meta.updated) return -1;
// 			return 0;
// 		})
// 		.reverse();
// 	return posts;
// };

// export interface Post {
// 	meta: PostMeta;
// 	content: string;
// }

// export interface PostMeta {
// 	title: string;
// 	slug: string;
// 	excerpt: string;
// 	tags: string[];
// 	uploaded: string;
// 	updated: string;
// }

// export const getPostFromSlug = (slug: string): Post => {
// 	const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
// 	const source = fs.readFileSync(postPath);
// 	const { data, content } = matter(source);
// 	return {
// 		meta: {
// 			title: data.title ?? slug,
// 			slug,
// 			excerpt: data.excerpt ?? "",
// 			tags: (data.tags ?? []).sort(),
// 			uploaded: (data.uploaded ?? new Date()).toString(),
// 			updated: (data.updated ?? new Date()).toString(),
// 		},
// 		content,
// 	};
// };
