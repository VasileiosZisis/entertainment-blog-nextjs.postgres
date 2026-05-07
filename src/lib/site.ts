import type { Metadata } from "next";

export const SITE_NAME = "Quick and Honest";

export const SITE_DESCRIPTION =
  "Quick posts that help you decide what is worth watching, reading, or playing";

export const SITE_OG_IMAGE =
  "https://res.cloudinary.com/dmdbza74n/image/upload/v1778011989/quick-and-honest/Cozy_study_with_gaming_and_reading_vibes_fbwbej.png";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_ORIGIN = new URL(SITE_URL).origin;

export const GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-MYB663Q6FK";

export function getAbsoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: {
    url: string;
    alt: string;
  };
  noIndex?: boolean;
};

export function getPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = {
    url: SITE_OG_IMAGE,
    alt: "Quick and Honest entertainment workspace",
  },
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = getAbsoluteUrl(path);
  const socialTitle =
    absoluteTitle || title === SITE_NAME
      ? SITE_NAME
      : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

type ArticleMetadataOptions = PageMetadataOptions & {
  publishedTime: string;
  modifiedTime: string;
};

export function getArticleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
}: ArticleMetadataOptions): Metadata {
  const metadata = getPageMetadata({
    title,
    description,
    path,
    image,
  });

  return {
    ...metadata,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: getAbsoluteUrl(path),
      siteName: SITE_NAME,
      type: "article",
      publishedTime,
      modifiedTime,
      images: image ? [image] : undefined,
    },
  };
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
    description:
      "Quick game notes about what is fun, what drags, and whether a game is worth playing",
  },
  anime: {
    label: "Anime",
    title: "Anime",
    description:
      "Short anime posts about what hooks early, what holds up, and whether a show is worth starting",
  },
  books: {
    label: "Books",
    title: "Books",
    description:
      "Short reading notes to help decide whether a book deserves a spot on the list",
  },
  tv: {
    label: "TV",
    title: "TV",
    description:
      "No long recaps, just direct TV notes about whether a show is worth your evenings",
  },
};
