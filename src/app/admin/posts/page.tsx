import Image from "next/image";
import Link from "next/link";
import { Plus, SquarePen } from "lucide-react";
import { getCategoryLabel } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import { getAdminPosts } from "@/features/posts/admin-queries";

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Blog
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">Posts</h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Create, update, publish, and remove editorial posts.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          <Plus size={16} aria-hidden="true" />
          New post
        </Link>
      </div>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-5 py-5 md:grid-cols-[120px_1fr_auto]"
            >
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                width={240}
                height={150}
                className="aspect-[8/5] w-full max-w-40 object-cover md:max-w-none"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  <span>{getCategoryLabel(post.category)}</span>
                  <span aria-hidden="true">/</span>
                  <span>{post.published ? "Published" : "Draft"}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  {post.subtitle}
                </p>
                <p className="mt-3 text-xs text-muted">
                  Updated {formatPostDate(post.updatedAt)}
                </p>
              </div>

              <div className="flex items-start md:justify-end">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
                >
                  <SquarePen size={16} aria-hidden="true" />
                  Edit
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="py-12">
            <h2 className="text-xl font-semibold text-foreground">
              No posts yet
            </h2>
            <p className="mt-2 text-muted">Create the first blog post.</p>
          </div>
        )}
      </div>
    </section>
  );
}
