import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { parsePageParam } from "@/features/posts/page-params";
import { CATEGORY_DETAILS, getPageMetadata } from "@/lib/site";

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
    title: `Games - Page ${page}`,
    description: CATEGORY_DETAILS.games.description,
    path: `/games/page/${page}`,
  });
}

export default async function GamesPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <CategoryPostsPage categorySlug="games" page={page} />;
}
