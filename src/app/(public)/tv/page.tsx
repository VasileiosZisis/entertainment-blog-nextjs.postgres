import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { CATEGORY_DETAILS, getPageMetadata } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "TV",
  description: CATEGORY_DETAILS.tv.description,
  path: "/tv",
});

export default function TvPage() {
  return <CategoryPostsPage categorySlug="tv" page={1} />;
}
