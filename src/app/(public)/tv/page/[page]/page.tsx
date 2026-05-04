import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { parsePageParam } from "@/features/posts/page-params";

type Props = {
  params: Promise<{ page: string }>;
};

export const metadata: Metadata = {
  title: "TV",
  description: "Quick and Honest TV posts",
};

export default async function TvPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <CategoryPostsPage categorySlug="tv" page={page} />;
}
