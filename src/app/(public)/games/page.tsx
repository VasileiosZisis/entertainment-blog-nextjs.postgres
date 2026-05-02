import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Games",
  description: "Quick and Honest game posts.",
};

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="Category"
      title="Games"
      description="Game notes, reviews, and short verdicts will be listed here once the public blog experience is wired to Prisma."
    />
  );
}
