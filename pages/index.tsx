import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "@/components/Layout";
import { getAllPosts, PostMeta } from "@/lib/posts";
import Post from "@/components/Post";
import { MDXProvider } from "@mdx-js/react";

export default function Home({ posts }: { posts: PostMeta[] }) {
	return (
		<Layout>
			<div>
				<h4>Latest Projects</h4>
				<div>
					<Post posts={posts} />
				</div>
				<h4>Latest Posts</h4>
				<div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const posts = getAllPosts()
		.slice(0, 3)
		.map((post) => post.meta);

	return {
		props: { posts },
	};
}
