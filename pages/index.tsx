import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Page from "@/components/Page";
import React from 'react'
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Post from "@/components/Post";
import { MDXProvider } from "@mdx-js/react";

export const Index = ({ posts }: IndexProps): JSX.Element => {
	return (
		<Page>
			<div>
				<h4>Latest Projects</h4>
				<div>
					<Post posts={posts} />
				</div>
				<h4>Latest Posts</h4>
				<div>
				</div>
			</div>
		</Page>
	);
}

export async function getStaticProps() {
	const posts = getAllPosts(['uploaded', 'updated', 'description', 'slug', 'title'])

	return {
		props: { posts },
	};
}

export default Index;