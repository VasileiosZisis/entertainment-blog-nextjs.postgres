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
      <div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Blog
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-[0.98] text-foreground">
            Posts
          </h1>
        </div>

        <div className="max-w-2xl lg:pt-8">
          <p className="text-lg leading-8 text-muted">
            Create, update, publish, and remove editorial posts
          </p>
          <Link
            href="/admin/posts/new"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
          >
            <Plus size={16} aria-hidden="true" />
            New post
          </Link>
        </div>
      </div>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-5 py-5 transition-colors hover:bg-background/70 md:grid-cols-[160px_1fr_auto]"
            >
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                width={320}
                height={200}
                className="aspect-[8/5] w-full max-w-72 object-cover md:max-w-none"
              />

              <div className="min-w-0 self-center">
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
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-background"
                >
                  <SquarePen size={16} aria-hidden="true" />
                  Edit
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-foreground">
              No posts yet
            </h2>
            <p className="mt-2 text-muted">Create the first blog post</p>
          </div>
        )}
      </div>
    </section>
  );
}
