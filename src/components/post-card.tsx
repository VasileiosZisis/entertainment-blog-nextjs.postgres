import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel, getCategoryPath } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import type { PostListItem } from "@/features/posts/types";

type PostCardProps = {
  post: PostListItem;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          <Link
            href={getCategoryPath(post.category)}
            className="transition-colors hover:text-accent"
          >
            {getCategoryLabel(post.category)}
          </Link>
          <span aria-hidden="true">/</span>
          <time dateTime={post.createdAt.toISOString()}>
            {formatPostDate(post.createdAt)}
          </time>
        </div>

        <h2 className="mt-3 text-2xl font-semibold leading-snug text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors group-hover:text-accent"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {post.subtitle}
        </p>
      </div>
    </article>
  );
}
