export const SITE_NAME = "Quick and Honest";

export const SITE_DESCRIPTION =
  "Quick posts that help you decide what is worth watching, reading, or playing";

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
    description: "What is fun, what drags, and whether it is worth playing",
  },
  anime: {
    label: "Anime",
    title: "Anime",
    description:
      "What hooks early, what holds up, and whether it is worth starting",
  },
  books: {
    label: "Books",
    title: "Books",
    description: "Short reading notes before you add another book to the list",
  },
  tv: {
    label: "TV",
    title: "TV",
    description: "No long recaps, just whether a show is worth your evenings",
  },
};
