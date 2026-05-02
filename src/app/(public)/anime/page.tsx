import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";

export const metadata: Metadata = {
  title: "Anime",
  description: "Quick and Honest anime posts.",
};

export default function AnimePage() {
  return <CategoryPostsPage categorySlug="anime" page={1} />;
}
