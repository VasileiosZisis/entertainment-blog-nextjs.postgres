import type { Metadata } from "next";
import { BlogListPage } from "@/features/posts/blog-list-page";
import { getPageMetadata } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Blog",
  description:
    "All Quick and Honest posts across games, anime, books, and TV in one direct list",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogListPage page={1} />;
}
