import Link from "next/link";
import { PostMeta } from "@/lib/posts";

export default function Post({posts}: {posts: PostMeta[]}) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}