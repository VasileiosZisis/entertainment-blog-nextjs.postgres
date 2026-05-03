import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { getCategoryLabel } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import type { PostListItem } from "@/features/posts/types";
import {
  getLatestPosts,
  getLatestPostsByCategoryGroups,
} from "@/features/posts/queries";
import { getUpcomingKindLabel } from "@/features/upcoming/kinds";
import { getUpcomingCards } from "@/features/upcoming/queries";
import {
  CATEGORY_DETAILS,
  LATEST_POSTS_LIMIT,
  PUBLIC_NAV_ITEMS,
} from "@/lib/site";

type UpcomingItem = Awaited<ReturnType<typeof getUpcomingCards>>[number];

function HeroEntry({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-t border-background/20 py-4 text-background transition-colors hover:text-accent-foreground md:border-l md:border-t-0 md:px-5 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-background/60">
        <span>{getCategoryLabel(post.category)}</span>
        <span aria-hidden="true">/</span>
        <time dateTime={post.createdAt.toISOString()}>
          {formatPostDate(post.createdAt)}
        </time>
      </div>
      <h2 className="home-link-line mt-2 inline text-lg font-semibold leading-tight text-balance xl:text-xl">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-1 text-sm leading-6 text-background/70">
        {post.subtitle}
      </p>
    </Link>
  );
}

function CategoryRail() {
  return (
    <section className="border-t border-border" aria-labelledby="categories">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:px-10 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Featured categories
          </p>
          <h2
            id="categories"
            className="mt-4 max-w-md text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl"
          >
            Four lanes. Same direct verdicts.
          </h2>
        </div>

        <div className="grid border-t border-border sm:grid-cols-2">
          {PUBLIC_NAV_ITEMS.filter((item) => item.href !== "/blog").map(
            (item) => {
              const slug = item.href.slice(1) as keyof typeof CATEGORY_DETAILS;
              const details = CATEGORY_DETAILS[slug];

              return (
                <article
                  key={item.href}
                  className="border-b border-border py-7 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7"
                >
                  <h3 className="text-2xl font-semibold text-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                    {details.description}
                  </p>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

function CurrentItem({ item }: { item: UpcomingItem }) {
  return (
    <article className="upcoming-carousel-item shrink-0 bg-background pt-5">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 1024px) 82vw, 18rem"
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          {getUpcomingKindLabel(item.kind)}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-balance text-foreground">
          {item.subtitle}
        </h3>
      </div>
    </article>
  );
}

function CurrentCarousel({ items }: { items: UpcomingItem[] }) {
  if (items.length === 0) {
    return (
      <p className="mx-auto max-w-7xl border-t border-border px-6 pt-5 text-center text-sm text-muted sm:px-8 lg:px-10">
        Nothing is queued right now.
      </p>
    );
  }

  const duration = Math.max(24, items.length * 7);
  const itemsInView = Math.min(items.length, 4);
  const carouselStyle = {
    "--upcoming-carousel-duration": `${duration}s`,
    "--upcoming-carousel-items-in-view": itemsInView,
  } as CSSProperties;

  return (
    <div className="upcoming-carousel" style={carouselStyle}>
      <div className="upcoming-carousel-track">
        <div className="upcoming-carousel-group">
          {items.map((item) => (
            <CurrentItem key={item.id} item={item} />
          ))}
        </div>
        <div className="upcoming-carousel-group" aria-hidden="true">
          {items.map((item) => (
            <CurrentItem key={`${item.id}-duplicate`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostRow({ post }: { post: PostListItem }) {
  return (
    <article className="group border-t border-border">
      <Link
        href={`/blog/${post.slug}`}
        className="grid gap-5 py-6 transition-colors hover:bg-surface/70 sm:grid-cols-[350px_1fr] xl:grid-cols-[350px_1fr_2rem]"
      >
        <div className="relative h-[275px] w-full max-w-[350px] overflow-hidden bg-surface">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            sizes="350px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            <span>{getCategoryLabel(post.category)}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatPostDate(post.createdAt)}
            </time>
          </div>
          <h3 className="home-link-line mt-2 inline text-2xl font-semibold leading-tight text-balance text-foreground">
            {post.title}
          </h3>
          <p className="mt-2 max-w-2xl text-base leading-6 text-muted">
            {post.subtitle}
          </p>
        </div>
        <div className="hidden items-start justify-end xl:flex">
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

type CategoryPostGroup = Awaited<
  ReturnType<typeof getLatestPostsByCategoryGroups>
>[number];

function CategoryPostLane({ group }: { group: CategoryPostGroup }) {
  return (
    <section aria-labelledby={`${group.slug}-latest`}>
      <div>
        <h3
          id={`${group.slug}-latest`}
          className="text-base font-semibold uppercase tracking-[0.22em] text-accent"
        >
          {group.label}
        </h3>
      </div>

      <div className="mt-5">
        {group.posts.length > 0 ? (
          group.posts.map((post) => <PostRow key={post.id} post={post} />)
        ) : (
          <p className="border-t border-border py-6 text-base text-muted">
            No posts yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  const [latestPosts, upcomingCards, categoryPostGroups] = await Promise.all([
    getLatestPosts(LATEST_POSTS_LIMIT),
    getUpcomingCards(),
    getLatestPostsByCategoryGroups(2),
  ]);

  const featuredPost = latestPosts[0];
  const heroPosts = latestPosts.slice(0, 3);

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
          </div>

          <div className="home-reveal-delay py-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-background/50">
              Latest entries
            </p>
            <div className="mt-4 grid md:grid-cols-3">
              {heroPosts.map((post) => (
                <HeroEntry key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CategoryRail />

      <section className="py-16 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Currently
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
            The live queue behind the next notes.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            A compact view of what is being read, watched, or played before it
            becomes a full entry.
          </p>
        </div>

        <div className="mt-12">
          <CurrentCarousel items={upcomingCards} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-8 pt-10 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Recently filed
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
              Notes with product shape, not template noise.
            </h2>
            <Link
              href="/blog"
              className="mt-6 inline-flex bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
            >
              View all posts
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-14">
          {categoryPostGroups.map((group) => (
            <CategoryPostLane key={group.slug} group={group} />
          ))}
        </div>
      </section>
    </main>
  );
}
