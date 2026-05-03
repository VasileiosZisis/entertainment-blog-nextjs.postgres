import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

export const adminUpcomingSelect = {
  id: true,
  kind: true,
  subtitle: true,
  imageUrl: true,
  imagePublicId: true,
  imageAlt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const getAdminUpcomingCards = cache(async () => {
  return prisma.upcoming.findMany({
    orderBy: { createdAt: "asc" },
    select: adminUpcomingSelect,
  });
});
