import Page from "@/components/Page";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { format } from "path";
import { PostType } from "types/post";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import fs from "fs"
import matter from "gray-matter";
import mdxPrism from 'mdx-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { postFilePaths } from "@/lib/posts";
import { unified } from "unified";

const components = {
  Head,
  Image,
  Link,
}

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType
}


const slugpage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
  return (
    <Page>
      <article>
        <h1>
          {frontMatter.title}
        </h1>
        <p>{frontMatter.updated}, {frontMatter.uploaded}</p>
        <div>
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const POSTS_PATH = path.join(process.cwd(), "posts");
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require('remark-code-titles')],
      rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    scope: data,
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default slugpage;