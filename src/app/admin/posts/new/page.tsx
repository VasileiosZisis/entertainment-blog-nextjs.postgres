import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return (
    <section>
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Back to posts
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          New post
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Create blog post
        </h1>
      </div>

      <PostForm mode="create" />
    </section>
  );
}
