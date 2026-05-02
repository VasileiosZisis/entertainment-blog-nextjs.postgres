import { BlogCategory } from "@/generated/prisma/enums";
import { CATEGORY_DETAILS, type BlogCategorySlug } from "@/lib/site";
import type { CategoryConfig } from "./types";

export const CATEGORY_CONFIGS: Record<BlogCategorySlug, CategoryConfig> = {
  games: {
    slug: "games",
    label: CATEGORY_DETAILS.games.label,
    prismaCategory: BlogCategory.GAME,
  },
  anime: {
    slug: "anime",
    label: CATEGORY_DETAILS.anime.label,
    prismaCategory: BlogCategory.ANIME,
  },
  books: {
    slug: "books",
    label: CATEGORY_DETAILS.books.label,
    prismaCategory: BlogCategory.BOOK,
  },
  tv: {
    slug: "tv",
    label: CATEGORY_DETAILS.tv.label,
    prismaCategory: BlogCategory.TV,
  },
};

export function getCategoryConfig(slug: BlogCategorySlug) {
  return CATEGORY_CONFIGS[slug];
}

export function getCategoryPath(category: BlogCategory) {
  switch (category) {
    case BlogCategory.GAME:
      return "/games";
    case BlogCategory.ANIME:
      return "/anime";
    case BlogCategory.BOOK:
      return "/books";
    case BlogCategory.TV:
      return "/tv";
  }
}

export function getCategoryLabel(category: BlogCategory) {
  switch (category) {
    case BlogCategory.GAME:
      return "Games";
    case BlogCategory.ANIME:
      return "Anime";
    case BlogCategory.BOOK:
      return "Books";
    case BlogCategory.TV:
      return "TV";
  }
}
