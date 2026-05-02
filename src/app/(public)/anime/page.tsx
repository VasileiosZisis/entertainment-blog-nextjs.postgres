import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Anime",
  description: "Quick and Honest anime posts.",
};

export default function AnimePage() {
  return (
    <PageShell
      eyebrow="Category"
      title="Anime"
      description="Anime notes and short impressions will be listed here once category queries are added."
    />
  );
}
