import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { DeletePostButton } from "@/components/delete-post-button";
import { PostForm } from "@/components/post-form";
import { getAdminPostById } from "@/features/posts/admin-queries";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string | string[] }>;
};

export default async function EditPostPage({
  params,
  searchParams,
}: EditPostPageProps) {
  const [{ id }, { status }] = await Promise.all([params, searchParams]);
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  const saved = (Array.isArray(status) ? status[0] : status) === "saved";

  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back to posts
        </Link>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-background"
          >
            <ExternalLink size={16} aria-hidden="true" />
            View
          </Link>
          <DeletePostButton postId={post.id} postTitle={post.title} />
        </div>
      </div>

      <div className="mt-8 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          Edit post
        </p>
        <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-[0.98] text-foreground">
          {post.title}
        </h1>
        {saved && (
          <p className="mt-5 max-w-xl border-l-2 border-accent pl-4 text-sm font-semibold text-foreground">
            Changes saved
          </p>
        )}
      </div>

      <PostForm
        mode="edit"
        initialPost={{
          id: post.id,
          title: post.title,
          subtitle: post.subtitle,
          category: post.category,
          content: post.content,
          imageUrl: post.imageUrl,
          imageAlt: post.imageAlt,
          published: post.published,
        }}
      />
    </section>
  );
}
