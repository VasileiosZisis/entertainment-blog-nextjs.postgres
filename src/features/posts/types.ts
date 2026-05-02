import type { BlogCategory } from "@/generated/prisma/enums";
import type { BlogCategorySlug } from "@/lib/site";

export type PostListItem = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: BlogCategory;
  imageUrl: string;
  imageAlt: string;
  createdAt: Date;
};

export type PostDetail = PostListItem & {
  content: string;
  updatedAt: Date;
};

export type PaginatedPosts = {
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

export type CategoryConfig = {
  slug: BlogCategorySlug;
  label: string;
  prismaCategory: BlogCategory;
};
