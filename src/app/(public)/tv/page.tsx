import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";

export const metadata: Metadata = {
  title: "TV",
  description: "Quick and Honest TV posts.",
};

export default function TvPage() {
  return <CategoryPostsPage categorySlug="tv" page={1} />;
}
