export const SITE_NAME = "Quick and Honest";

export const SITE_DESCRIPTION =
  "A modern entertainment blog for quick, honest notes on games, anime, books, and TV.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_ORIGIN = new URL(SITE_URL).origin;

export function getAbsoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

export const BLOG_CATEGORIES = ["games", "anime", "books", "tv"] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number];

export const POSTS_PER_PAGE = 9;
export const LATEST_POSTS_LIMIT = 6;

export const PUBLIC_NAV_ITEMS = [
  { href: "/blog", label: "Blog" },
  { href: "/games", label: "Games" },
  { href: "/anime", label: "Anime" },
  { href: "/books", label: "Books" },
  { href: "/tv", label: "TV" },
] as const;

export const CATEGORY_DETAILS: Record<
  BlogCategorySlug,
  {
    label: string;
    title: string;
    description: string;
  }
> = {
  games: {
    label: "Games",
    title: "Games",
    description: "Quick, honest notes on the games worth thinking about.",
  },
  anime: {
    label: "Anime",
    title: "Anime",
    description: "Short impressions on anime that stays with you.",
  },
  books: {
    label: "Books",
    title: "Books",
    description: "Concise reading notes across fantasy, sci-fi, and beyond.",
  },
  tv: {
    label: "TV",
    title: "TV",
    description: "TV reactions and verdicts without the long recap.",
  },
};
