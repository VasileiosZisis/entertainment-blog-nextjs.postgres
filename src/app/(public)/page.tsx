import Link from "next/link";
import { SITE_DESCRIPTION } from "@/lib/site";
import { PostGrid } from "@/components/post-grid";
import { UpcomingCard } from "@/components/upcoming-card";
import { getLatestPosts } from "@/features/posts/queries";
import { getUpcomingCards } from "@/features/upcoming/queries";
import { LATEST_POSTS_LIMIT } from "@/lib/site";

export default async function Home() {
  const [latestPosts, upcomingCards] = await Promise.all([
    getLatestPosts(LATEST_POSTS_LIMIT),
    getUpcomingCards(),
  ]);

  return (
    <main className="flex-1">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Games / Anime / Books / TV
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
              Quick notes. Honest verdicts.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {SITE_DESCRIPTION}
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Read the blog
            </Link>
          </div>

          <aside className="border-l border-border pl-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Currently
            </h2>
            <div className="mt-6 space-y-5">
              {upcomingCards.map((card) => (
                <UpcomingCard key={card.id} {...card} />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mb-8 flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Latest
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Recent posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            View all posts
          </Link>
        </div>
        <PostGrid posts={latestPosts} />
      </section>
    </main>
  );
}
