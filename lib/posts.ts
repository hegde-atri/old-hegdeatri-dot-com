import { sync } from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import renderToString from 'next-mdx-remote'

const POSTS_PATH = path.join(process.cwd(), "posts");

export const getSlugs = (): string[] => {
	const paths = sync(`${POSTS_PATH}/*.mdx`);
	return paths.map((path) => {
		const parts = path.split("/");
		const filename = parts[parts.length - 1];
		const [slug, _ext] = filename.split(".");
		return slug;
	});
};

export const getAllPosts = () => {
	const posts = getSlugs()
		.map((slug) => getPostFromSlug(slug))
		.sort((a, b) => {
			if (a.meta.updated > b.meta.updated) return 1;
			if (a.meta.updated < b.meta.updated) return -1;
			return 0;
		})
		.reverse();
	return posts;
};

export interface Post {
	meta: PostMeta;
	content: string;
}

export interface PostMeta {
	title: string;
	slug: string;
	excerpt: string;
	tags: string[];
	uploaded: string;
	updated: string;
}

export const getPostFromSlug = (slug: string): Post => {
	const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
	const source = fs.readFileSync(postPath);
	const { data, content } = matter(source);
	return {
		meta: {
			title: data.title ?? slug,
			slug,
			excerpt: data.excerpt ?? "",
			tags: (data.tags ?? []).sort(),
			uploaded: (data.uploaded ?? new Date()).toString(),
			updated: (data.updated ?? new Date()).toString(),
		},
		content,
	};
};
