import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { CATEGORY_DETAILS, getPageMetadata } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Games",
  description: CATEGORY_DETAILS.games.description,
  path: "/games",
});

export default function GamesPage() {
  return <CategoryPostsPage categorySlug="games" page={1} />;
}
