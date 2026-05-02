import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListPage } from "@/features/posts/blog-list-page";
import { parsePageParam } from "@/features/posts/page-params";

type Props = {
  params: Promise<{ page: string }>;
};

export const metadata: Metadata = {
  title: "Blog",
  description: "All Quick and Honest posts across games, anime, books, and TV.",
};

export default async function BlogPaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = parsePageParam(pageParam);

  if (!page) {
    notFound();
  }

  return <BlogListPage page={page} />;
}
