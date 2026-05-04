import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import type { PostListItem } from "@/features/posts/types";

type PostCardProps = {
  post: PostListItem;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group border-t border-border">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-5 py-6 transition-colors hover:bg-surface/70 sm:grid-cols-[420px_1fr] lg:grid-cols-[460px_1fr]"
      >
        <div className="relative h-[220px] w-full overflow-hidden bg-surface sm:h-[240px] lg:h-[260px]">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 460px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            {getCategoryLabel(post.category)}
            <span aria-hidden="true">/</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatPostDate(post.createdAt)}
            </time>
          </div>

          <h2 className="home-link-line mt-3 inline text-3xl font-semibold leading-tight text-balance text-foreground">
            {post.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {post.subtitle}
          </p>
        </div>
      </Link>
    </article>
  );
}
