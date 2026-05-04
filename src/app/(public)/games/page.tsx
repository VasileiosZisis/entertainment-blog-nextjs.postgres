import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";

export const metadata: Metadata = {
  title: "Games",
  description: "Quick and Honest game posts",
};

export default function GamesPage() {
  return <CategoryPostsPage categorySlug="games" page={1} />;
}
