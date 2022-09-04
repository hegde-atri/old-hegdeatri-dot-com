import Link from "next/link";

export const Post = ({posts}: IndexProps): JSX.Element => {
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

export default Post;