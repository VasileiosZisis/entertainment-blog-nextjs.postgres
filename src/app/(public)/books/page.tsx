import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Books",
  description: "Quick and Honest book posts.",
};

export default function BooksPage() {
  return (
    <PageShell
      eyebrow="Category"
      title="Books"
      description="Book posts and concise reading notes will be listed here in the public blog milestone."
    />
  );
}
