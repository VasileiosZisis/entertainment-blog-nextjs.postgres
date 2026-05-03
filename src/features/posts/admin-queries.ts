import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

export const adminPostSelect = {
  id: true,
  title: true,
  subtitle: true,
  slug: true,
  category: true,
  content: true,
  imageUrl: true,
  imagePublicId: true,
  imageAlt: true,
  published: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const getAdminPosts = cache(async () => {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: adminPostSelect,
  });
});

export const getAdminPostById = cache(async (id: string) => {
  return prisma.blogPost.findUnique({
    where: { id },
    select: adminPostSelect,
  });
});
