import "dotenv/config";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for Prisma verification.`);
  }

  return value;
}

async function main() {
  const [{ PrismaPg }, prismaModule] = await Promise.all([
    import("@prisma/adapter-pg"),
    import("../src/generated/prisma/client.ts"),
  ]);
  const PrismaClient =
    prismaModule.PrismaClient ?? prismaModule.default.PrismaClient;

  const adapter = new PrismaPg({
    connectionString: requireEnv("DATABASE_URL"),
  });
  const prisma = new PrismaClient({ adapter });

  const [users, posts, upcoming, latestPosts] = await Promise.all([
    prisma.user.count(),
    prisma.blogPost.count(),
    prisma.upcoming.count(),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        title: true,
        slug: true,
        category: true,
        imageAlt: true,
      },
    }),
  ]);

  console.log(
    JSON.stringify(
      {
        users,
        posts,
        upcoming,
        latestPosts,
      },
      null,
      2,
    ),
  );

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
