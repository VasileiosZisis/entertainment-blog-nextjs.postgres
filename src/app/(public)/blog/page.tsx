import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Blog",
  description: "All Quick and Honest posts across games, anime, books, and TV.",
};

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="All posts"
      title="Blog"
      description="The full post index will live here, with search and pagination added in a later milestone."
    />
  );
}
