import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { getAbsoluteUrl, PUBLIC_NAV_ITEMS } from "@/lib/site";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: getAbsoluteUrl("/"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: getAbsoluteUrl("/blog"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  ...PUBLIC_NAV_ITEMS.filter((item) => item.href !== "/blog").map((item) => ({
    url: getAbsoluteUrl(item.href),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      updatedAt: true,
      imageUrl: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [post.imageUrl],
    })),
  ];
}
