export const SITE_NAME = "Quick and Honest";

export const SITE_DESCRIPTION =
  "A modern entertainment blog for quick, honest notes on games, anime, books, and TV.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const BLOG_CATEGORIES = ["games", "anime", "books", "tv"] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number];

export const PUBLIC_NAV_ITEMS = [
  { href: "/blog", label: "Blog" },
  { href: "/games", label: "Games" },
  { href: "/anime", label: "Anime" },
  { href: "/books", label: "Books" },
  { href: "/tv", label: "TV" },
] as const;
