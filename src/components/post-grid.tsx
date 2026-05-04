import { PostCard } from "@/components/post-card";
import type { PostListItem } from "@/features/posts/types";

type PostGridProps = {
  posts: PostListItem[];
  emptyTitle?: string;
  emptyMessage?: string;
};

export function PostGrid({
  posts,
  emptyTitle = "No posts yet",
  emptyMessage = "There is nothing to scan here right now",
}: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="border-y border-border py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          {emptyTitle}
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} priority={index < 3} />
      ))}
    </div>
  );
}
