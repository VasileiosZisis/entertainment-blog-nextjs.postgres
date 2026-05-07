import type { Metadata } from "next";
import { CategoryPostsPage } from "@/features/posts/category-posts-page";
import { CATEGORY_DETAILS, getPageMetadata } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Books",
  description: CATEGORY_DETAILS.books.description,
  path: "/books",
});

export default function BooksPage() {
  return <CategoryPostsPage categorySlug="books" page={1} />;
}
