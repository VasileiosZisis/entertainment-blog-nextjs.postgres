import { PostCard } from "@/components/post-card";
import type { PostListItem } from "@/features/posts/types";

type PostGridProps = {
  posts: PostListItem[];
  emptyMessage?: string;
};

export function PostGrid({
  posts,
  emptyMessage = "No posts found.",
}: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="border-t border-border pt-8">
        <p className="text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} priority={index < 3} />
      ))}
    </div>
  );
}
