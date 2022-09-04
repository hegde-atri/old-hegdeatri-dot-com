import Link from "next/link";
import { PostType } from "../types/post";

type IndexProps = {
  posts: PostType[];
};

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