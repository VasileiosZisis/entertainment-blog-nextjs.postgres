import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot, LibraryBig } from "lucide-react";
import { getCategoryLabel } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import type { PostListItem } from "@/features/posts/types";
import { getLatestPosts } from "@/features/posts/queries";
import { getUpcomingKindLabel } from "@/features/upcoming/kinds";
import { getUpcomingCards } from "@/features/upcoming/queries";
import {
  CATEGORY_DETAILS,
  LATEST_POSTS_LIMIT,
  PUBLIC_NAV_ITEMS,
} from "@/lib/site";

type UpcomingItem = Awaited<ReturnType<typeof getUpcomingCards>>[number];

function FeaturedPost({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[5.25rem_1fr] gap-4 border-t border-background/20 pt-5 text-background transition-colors hover:text-accent-foreground sm:grid-cols-[8rem_1fr]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background/10">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          priority
          sizes="128px"
          className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-background/60">
          <span>{getCategoryLabel(post.category)}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.createdAt.toISOString()}>
            {formatPostDate(post.createdAt)}
          </time>
        </div>
        <h2 className="home-link-line mt-2 inline text-xl font-semibold leading-tight text-balance sm:mt-3 sm:text-2xl">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-background/70 sm:mt-3">
          {post.subtitle}
        </p>
      </div>
    </Link>
  );
}

function CategoryRail() {
  return (
    <nav aria-label="Featured categories" className="border-t border-border">
      <ul className="mx-auto grid w-full max-w-7xl divide-y divide-border px-6 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-10">
        {PUBLIC_NAV_ITEMS.filter((item) => item.href !== "/blog").map(
          (item, index) => {
            const slug = item.href.slice(1) as keyof typeof CATEGORY_DETAILS;
            const details = CATEGORY_DETAILS[slug];

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex min-h-28 flex-col justify-between gap-4 py-5 transition-colors md:px-5 md:first:pl-0 md:last:pr-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-muted">
                      0{index + 1}
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {details.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </nav>
  );
}

function CurrentItem({ item, index }: { item: UpcomingItem; index: number }) {
  return (
    <article className="group grid grid-cols-[4.5rem_1fr] gap-4 border-t border-border py-5 first:border-t-0 first:pt-0">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="72px"
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <span className="font-mono">0{index + 1}</span>
          <span>{getUpcomingKindLabel(item.kind)}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground">
          {item.subtitle}
        </h3>
      </div>
    </article>
  );
}

function PostRow({ post, index }: { post: PostListItem; index: number }) {
  return (
    <article className="group border-t border-border">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-5 py-6 transition-colors hover:bg-surface/70 sm:grid-cols-[3rem_7rem_1fr] lg:grid-cols-[4rem_9rem_1fr_8rem]"
      >
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative aspect-square w-28 overflow-hidden bg-surface sm:w-auto">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            sizes="144px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <span>{getCategoryLabel(post.category)}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatPostDate(post.createdAt)}
            </time>
          </div>
          <h3 className="home-link-line mt-3 inline text-2xl font-semibold leading-tight text-balance text-foreground">
            {post.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {post.subtitle}
          </p>
        </div>
        <div className="hidden items-start justify-end lg:flex">
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="mt-1 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
          />
        </div>
      </Link>
    </article>
  );
}

export default async function Home() {
  const [latestPosts, upcomingCards] = await Promise.all([
    getLatestPosts(LATEST_POSTS_LIMIT),
    getUpcomingCards(),
  ]);

  const featuredPost = latestPosts[0];
  const recentPosts = latestPosts.slice(1);

  return (
    <main className="flex-1 overflow-hidden">
      <section className="relative overflow-hidden bg-foreground text-background md:min-h-[calc(100svh-6rem)]">
        {featuredPost ? (
          <Image
            src={featuredPost.imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero-media object-cover opacity-35 saturate-75"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,20,16,0.96)_0%,rgba(18,20,16,0.82)_45%,rgba(18,20,16,0.38)_100%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-rows-[auto_auto] px-6 py-8 sm:px-8 md:min-h-[calc(100svh-6rem)] md:grid-rows-[1fr_auto] lg:px-10">
          <div className="home-reveal flex max-w-4xl flex-col justify-center py-4 md:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-foreground/70">
              Games / Anime / Books / TV
            </p>
            <h1 className="mt-5 text-6xl font-semibold leading-[0.92] text-balance sm:text-7xl lg:text-8xl">
              Quick and Honest
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-background/78 sm:text-xl sm:leading-9">
              Fast, focused notes for entertainment worth tracking. Clear
              structure, direct opinions, and no recap fog.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Open the index
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={featuredPost ? `/blog/${featuredPost.slug}` : "/blog"}
                className="inline-flex items-center gap-2 border border-background/30 px-5 py-3 text-sm font-semibold text-background transition-colors hover:border-background hover:bg-background/10"
              >
                Latest entry
                <CircleDot size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="home-reveal-delay grid gap-6 border-t border-background/20 py-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-background/50">
                Personal entertainment workspace
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-3xl font-semibold">
                    {latestPosts.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-background/55">recent posts</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">
                    {upcomingCards.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-background/55">active queue</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">04</p>
                  <p className="mt-1 text-background/55">categories</p>
                </div>
              </div>
            </div>
            {featuredPost ? <FeaturedPost post={featuredPost} /> : null}
          </div>
        </div>
      </section>

      <CategoryRail />

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:px-10 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <LibraryBig size={18} aria-hidden="true" />
            Currently
          </div>
          <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
            The live queue behind the next notes.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">
            A compact view of what is being read, watched, or played before it
            becomes a full entry.
          </p>
        </div>

        <div>
          {upcomingCards.length > 0 ? (
            upcomingCards.map((item, index) => (
              <CurrentItem key={item.id} item={item} index={index} />
            ))
          ) : (
            <p className="border-t border-border pt-5 text-sm text-muted">
              Nothing is queued right now.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Recently filed
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
              Notes with product shape, not template noise.
            </h2>
          </div>
          <div className="flex items-start justify-between gap-6">
            <p className="max-w-md text-base leading-7 text-muted">
              Short reads organized for scanning first and reading second.
            </p>
            <Link
              href="/blog"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent sm:inline-flex"
            >
              View all
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {recentPosts.length > 0 ? (
            recentPosts.map((post, index) => (
              <PostRow key={post.id} post={post} index={index} />
            ))
          ) : (
            <p className="border-t border-border pt-6 text-sm text-muted">
              No recent posts are published yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
