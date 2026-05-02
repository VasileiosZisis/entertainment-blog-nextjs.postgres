import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "TV",
  description: "Quick and Honest TV posts.",
};

export default function TvPage() {
  return (
    <PageShell
      eyebrow="Category"
      title="TV"
      description="TV posts and quick reactions will be listed here once the category pages are backed by real queries."
    />
  );
}
