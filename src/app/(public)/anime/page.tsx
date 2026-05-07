import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { CATEGORY_DETAILS, getPageMetadata } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Anime",
  description: CATEGORY_DETAILS.anime.description,
  path: "/anime",
});

export default function AnimePage() {
  return <CategoryPostsPage categorySlug="anime" page={1} />;
}
