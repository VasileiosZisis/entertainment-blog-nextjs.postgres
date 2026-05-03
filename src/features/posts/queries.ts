import { cache } from "react";
import type { BlogCategory } from "@/generated/prisma/enums";
import { POSTS_PER_PAGE } from "@/lib/site";
import { prisma } from "@/lib/db/prisma";
import { CATEGORY_CONFIGS } from "./categories";
import type { PaginatedPosts, PostDetail, PostListItem } from "./types";

const postListSelect = {
  id: true,
  title: true,
  subtitle: true,
  slug: true,
  category: true,
  imageUrl: true,
  imageAlt: true,
  createdAt: true,
} as const;

const postDetailSelect = {
  ...postListSelect,
  content: true,
  updatedAt: true,
} as const;

function normalizePage(page: number) {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

function getPagination(totalPosts: number, page: number) {
  return {
    currentPage: normalizePage(page),
    totalPages: Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE)),
  };
}

export const getLatestPosts = cache(
  async (limit: number): Promise<PostListItem[]> => {
    return prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: postListSelect,
    });
  },
);

export const getLatestPostsByCategoryGroups = cache(async (limit: number) => {
  return Promise.all(
    Object.values(CATEGORY_CONFIGS).map(async (category) => {
      const posts = await prisma.blogPost.findMany({
        where: {
          published: true,
          category: category.prismaCategory,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        select: postListSelect,
      });

      return {
        slug: category.slug,
        label: category.label,
        posts,
      };
    }),
  );
});

export const getPaginatedPosts = cache(
  async (page: number): Promise<PaginatedPosts> => {
    const currentPage = normalizePage(page);
    const where = { published: true };

    const [totalPosts, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        select: postListSelect,
      }),
    ]);

    return {
      posts,
      totalPosts,
      ...getPagination(totalPosts, currentPage),
    };
  },
);

export const getPaginatedPostsByCategory = cache(
  async (category: BlogCategory, page: number): Promise<PaginatedPosts> => {
    const currentPage = normalizePage(page);
    const where = {
      published: true,
      category,
    };

    const [totalPosts, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        select: postListSelect,
      }),
    ]);

    return {
      posts,
      totalPosts,
      ...getPagination(totalPosts, currentPage),
    };
  },
);

export const searchPaginatedPosts = cache(
  async (keyword: string, page: number): Promise<PaginatedPosts> => {
    const currentPage = normalizePage(page);
    const normalizedKeyword = keyword.trim();
    const where = {
      published: true,
      OR: [
        {
          title: { contains: normalizedKeyword, mode: "insensitive" as const },
        },
        {
          subtitle: {
            contains: normalizedKeyword,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [totalPosts, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        select: postListSelect,
      }),
    ]);

    return {
      posts,
      totalPosts,
      ...getPagination(totalPosts, currentPage),
    };
  },
);

export const getPostBySlug = cache(
  async (slug: string): Promise<PostDetail | null> => {
    return prisma.blogPost.findFirst({
      where: {
        slug,
        published: true,
      },
      select: postDetailSelect,
    });
  },
);

export const getAllPostSlugs = cache(async () => {
  return prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
    orderBy: { createdAt: "desc" },
  });
});
