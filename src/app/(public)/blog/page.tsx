import type { Metadata } from "next";
import { BlogListPage } from "@/features/posts/blog-list-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "All Quick and Honest posts across games, anime, books, and TV.",
};

export default function BlogPage() {
  return <BlogListPage page={1} />;
}
