import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAdminPosts } from "@/features/posts/admin-queries";
import { getAdminUpcomingCards } from "@/features/upcoming/admin-queries";

export default async function AdminPage() {
  const [posts, upcomingCards] = await Promise.all([
    getAdminPosts(),
    getAdminUpcomingCards(),
  ]);
  const publishedPosts = posts.filter((post) => post.published).length;
  const draftPosts = posts.length - publishedPosts;

  return (
    <section>
      <div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-[0.98] text-foreground">
            Dashboard
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted lg:pt-8">
          Manage posts and homepage queue cards without leaving the working
          surface
        </p>
      </div>

      <div className="mt-8 grid border-y border-border sm:grid-cols-3">
        <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Published
          </p>
          <p className="mt-3 text-4xl font-semibold">{publishedPosts}</p>
        </div>
        <div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:px-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Drafts
          </p>
          <p className="mt-3 text-4xl font-semibold">{draftPosts}</p>
        </div>
        <div className="py-5 sm:pl-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Queue cards
          </p>
          <p className="mt-3 text-4xl font-semibold">{upcomingCards.length}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <DashboardLink
          href="/admin/posts"
          title="Manage blog posts"
          description="Create posts, edit drafts, replace images, and remove old entries"
        />
        <DashboardLink
          href="/admin/upcoming"
          title="Manage upcoming cards"
          description="Add and remove Reading, Watching, and Playing cards for the home page"
        />
      </div>
    </section>
  );
}

function DashboardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-y border-border py-6">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-xl font-semibold text-foreground transition-colors hover:text-accent"
      >
        {title}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        {description}
      </p>
    </div>
  );
}
