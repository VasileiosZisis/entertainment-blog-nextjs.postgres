import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";

export const metadata: Metadata = {
  title: "Books",
  description: "Quick and Honest book posts.",
};

export default function BooksPage() {
  return <CategoryPostsPage categorySlug="books" page={1} />;
}
