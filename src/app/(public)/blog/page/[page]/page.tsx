import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListPage } from "@/features/posts/blog-list-page";
import { parsePageParam } from "@/features/posts/page-params";
import { getPageMetadata } from "@/lib/site";

type Props = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    return {
      title: "Page not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return getPageMetadata({
    title: `Blog - Page ${page}`,
    description:
      "More Quick and Honest posts across games, anime, books, and TV",
    path: `/blog/page/${page}`,
  });
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <BlogListPage page={page} />;
}
