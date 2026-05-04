import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/rich-text";
import { getCategoryLabel, getCategoryPath } from "@/features/posts/categories";
import { formatPostDate } from "@/features/posts/format";
import { getAllPostSlugs, getPostBySlug } from "@/features/posts/queries";
import { SITE_NAME } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: `${post.title}. ${post.subtitle}`,
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.subtitle,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [
        {
          url: post.imageUrl,
          alt: post.imageAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
        >
          Back to blog
        </Link>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-surface">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <header className="mt-10 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            <Link
              href={getCategoryPath(post.category)}
              className="transition-colors hover:text-accent"
            >
              {getCategoryLabel(post.category)}
            </Link>
            <span aria-hidden="true">/</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatPostDate(post.createdAt)}
            </time>
          </div>

          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] text-balance text-foreground sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted sm:text-2xl sm:leading-9">
            {post.subtitle}
          </p>
        </header>

        <div className="mt-10">
          <RichText html={post.content} />
        </div>
      </article>
    </main>
  );
}
