import "dotenv/config";

import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { DEMO_ADMIN_EMAIL } from "../src/lib/auth/constants.ts";

const posts = [
  {
    title: "Elden Ring Rewards Curiosity",
    subtitle: "A hostile world that keeps inviting you forward",
    slug: "elden-ring-rewards-curiosity",
    category: "GAME",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/elden-ring-rewards-curiosity",
    imageAlt: "Retro gaming setup with a glowing arcade-style display.",
    content:
      "<p>Elden Ring works because it rarely treats failure as a full stop. A difficult boss, a sealed door, or a dangerous swamp is usually an invitation to turn around, follow another path, and come back sharper.</p><p>The Lands Between feel built for wandering. A distant tower, a half-hidden cave, or a suspicious cliff edge can turn a quiet ride into an entire evening of discovery.</p><p>Quick verdict: demanding, strange, and generous. It respects curiosity more than comfort.</p>",
    createdAt: new Date("2026-01-12T10:00:00.000Z"),
  },
  {
    title: "Hades Turns Failure Into Fuel",
    subtitle: "Fast runs, sharp writing, and one more try",
    slug: "hades-turns-failure-into-fuel",
    category: "GAME",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/hades-turns-failure-into-fuel",
    imageAlt: "A close view of a gaming keyboard lit by red and blue light.",
    content:
      "<p>Hades understands momentum. Every failed escape gives you a conversation, an upgrade, a joke, or a new grudge to carry into the next run.</p><p>The combat is quick without becoming messy, and the writing keeps repetition from feeling empty. The underworld is less a menu hub and more a house full of people who remember your bad decisions.</p><p>Quick verdict: stylish, efficient, and unusually warm for a game about dying over and over.</p>",
    createdAt: new Date("2026-01-18T10:00:00.000Z"),
  },
  {
    title: "Frieren Is Quiet Fantasy",
    subtitle: "A slow adventure about time, memory, and regret",
    slug: "frieren-is-quiet-fantasy",
    category: "ANIME",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/frieren-is-quiet-fantasy",
    imageAlt: "Shelves of colorful manga volumes in a bookstore.",
    content:
      "<p>Frieren starts after the heroic journey is already over, which is exactly why it feels fresh. The story is less interested in saving the world than in understanding what the journey meant.</p><p>Its best moments are small: a remembered spell, a familiar town, a conversation that arrives decades late. The show lets silence do real work.</p><p>Quick verdict: gentle, funny, and quietly devastating when it wants to be.</p>",
    createdAt: new Date("2026-02-02T10:00:00.000Z"),
  },
  {
    title: "Vinland Saga Chooses Growth",
    subtitle: "Violence, guilt, and the harder road after revenge",
    slug: "vinland-saga-chooses-growth",
    category: "ANIME",
    imageUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/vinland-saga-chooses-growth",
    imageAlt: "Illustrated comic books spread across a table.",
    content:
      "<p>Vinland Saga is strongest when it refuses to make revenge look clean. The early brutality matters because the story later asks what kind of person survives after hatred has burned through everything.</p><p>The shift toward patience, farming, and accountability could have felt like a different show. Instead, it becomes the point.</p><p>Quick verdict: a rare action story brave enough to question action itself.</p>",
    createdAt: new Date("2026-02-11T10:00:00.000Z"),
  },
  {
    title: "Project Hail Mary Moves Fast",
    subtitle: "Big science, bigger heart, very little wasted time",
    slug: "project-hail-mary-moves-fast",
    category: "BOOK",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/project-hail-mary-moves-fast",
    imageAlt: "An open book on a table surrounded by stacked books.",
    content:
      "<p>Project Hail Mary is built like a problem-solving machine. A mystery appears, a test follows, a new complication breaks the answer, and suddenly it is very hard to stop reading.</p><p>The science is approachable because the stakes are emotional, not just technical. The book is at its best when discovery turns into friendship.</p><p>Quick verdict: clever, sincere, and paced like a thriller with a lab coat.</p>",
    createdAt: new Date("2026-02-22T10:00:00.000Z"),
  },
  {
    title: "Piranesi Feels Like A Dream",
    subtitle: "A strange house, a gentle narrator, and a perfect mystery",
    slug: "piranesi-feels-like-a-dream",
    category: "BOOK",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/piranesi-feels-like-a-dream",
    imageAlt: "Rows of old books on wooden library shelves.",
    content:
      "<p>Piranesi is short, but it leaves a long shadow. Its endless halls, statues, tides, and birds feel impossible and specific at the same time.</p><p>The narrator gives the book its soul. His kindness makes the mystery more painful because the world he trusts is clearly hiding something from him.</p><p>Quick verdict: beautiful, eerie, and best read without knowing too much.</p>",
    createdAt: new Date("2026-03-03T10:00:00.000Z"),
  },
  {
    title: "Severance Makes Work Horrifying",
    subtitle: "A clean office with a rotten center",
    slug: "severance-makes-work-horrifying",
    category: "TV",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/severance-makes-work-horrifying",
    imageAlt: "A quiet modern office with desks and bright overhead lights.",
    content:
      "<p>Severance turns office politeness into something deeply creepy. The hallways are too clean, the rituals are too cheerful, and every rule sounds like it was written by a company that replaced empathy with branding.</p><p>The central idea is strong because it is both science fiction and a very direct workplace nightmare. What if work-life balance became a surgical procedure?</p><p>Quick verdict: precise, funny, and terrifying in fluorescent light.</p>",
    createdAt: new Date("2026-03-14T10:00:00.000Z"),
  },
  {
    title: "Andor Trusts The Slow Burn",
    subtitle: "Rebellion as pressure, compromise, and consequence",
    slug: "andor-trusts-the-slow-burn",
    category: "TV",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/posts/andor-trusts-the-slow-burn",
    imageAlt: "Rows of red cinema seats facing a large theater screen.",
    content:
      "<p>Andor works because it treats rebellion as labor. It is not just speeches and symbols; it is money, fear, surveillance, sacrifice, and people deciding what they can live with.</p><p>The show is patient without being soft. Every arc tightens until the release feels earned, and even small choices carry political weight.</p><p>Quick verdict: grounded, tense, and one of the strongest stories in its universe.</p>",
    createdAt: new Date("2026-03-25T10:00:00.000Z"),
  },
];

const upcoming = [
  {
    kind: "READING",
    subtitle: "The Spear Cuts Through Water",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/upcoming/the-spear-cuts-through-water",
    imageAlt: "A warmly lit library aisle filled with books.",
  },
  {
    kind: "WATCHING",
    subtitle: "Shogun",
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/upcoming/shogun",
    imageAlt: "A living room television showing a dramatic glowing scene.",
  },
  {
    kind: "PLAYING",
    subtitle: "Hades II",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    imagePublicId: "seed/upcoming/hades-ii",
    imageAlt: "A gaming monitor setup with colorful lights and peripherals.",
  },
];

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for database seeding.`);
  }

  return value;
}

async function getPrismaClient() {
  const [{ PrismaPg }, prismaModule] = await Promise.all([
    import("@prisma/adapter-pg"),
    import("../src/generated/prisma/client.ts"),
  ]);
  const PrismaClient =
    prismaModule.PrismaClient ?? prismaModule.default.PrismaClient;

  const adapter = new PrismaPg({
    connectionString: requireEnv("DATABASE_URL"),
  });

  return new PrismaClient({ adapter });
}

async function main() {
  const prisma = await getPrismaClient();
  const passwordHash = await bcrypt.hash(requireEnv("ADMIN_PASSWORD"), 12);
  const demoPasswordHash = await bcrypt.hash(randomUUID(), 12);

  await prisma.user.upsert({
    where: { email: requireEnv("ADMIN_EMAIL") },
    update: {
      name: requireEnv("ADMIN_NAME"),
      passwordHash,
      isAdmin: true,
      isDemo: false,
    },
    create: {
      name: requireEnv("ADMIN_NAME"),
      email: requireEnv("ADMIN_EMAIL"),
      passwordHash,
      isAdmin: true,
      isDemo: false,
    },
  });

  await prisma.user.upsert({
    where: { email: DEMO_ADMIN_EMAIL },
    update: {
      name: "Demo Admin",
      passwordHash: demoPasswordHash,
      isAdmin: true,
      isDemo: true,
    },
    create: {
      name: "Demo Admin",
      email: DEMO_ADMIN_EMAIL,
      passwordHash: demoPasswordHash,
      isAdmin: true,
      isDemo: true,
    },
  });

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  for (const card of upcoming) {
    await prisma.upcoming.upsert({
      where: { imagePublicId: card.imagePublicId },
      update: card,
      create: card,
    });
  }

  const [userCount, postCount, upcomingCount] = await Promise.all([
    prisma.user.count(),
    prisma.blogPost.count(),
    prisma.upcoming.count(),
  ]);

  console.log({ userCount, postCount, upcomingCount });

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
