import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminPage() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
        Admin
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Manage the blog from here. Upcoming cards will get their own tools in
        the next milestone.
      </p>

      <div className="mt-10 border-y border-border py-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-accent"
        >
          Manage blog posts
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Create posts, edit existing drafts, replace images, and remove posts.
        </p>
      </div>
    </section>
  );
}
