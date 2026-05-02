# Quick and Honest

Quick and Honest is a Next.js rewrite of the original MERN demo blog. The new app is planned around Next.js App Router, TypeScript, Prisma, Neon PostgreSQL, Cloudinary uploads, and Vercel deployment.

## Current Status

Milestones 1 and 2 are complete:

- Next.js App Router
- TypeScript
- npm
- Tailwind CSS
- global theme tokens
- baseline source folders
- environment variable example
- project checks
- Prisma 7
- Neon PostgreSQL datasource
- initial migration
- JavaScript seed script
- realistic sample posts and upcoming cards
- shared Prisma client helper

Authentication UI, admin tools, and public content pages start in later milestones.

## Requirements

- Node.js compatible with Next.js 16
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Database and admin seed values are required for Prisma migration and seed scripts. Cloudinary values are needed in later milestones.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

Run the standard milestone gate:

```bash
npm run check
```

This runs:

- `npm run lint`
- `npm run typecheck`
- `npm run format:check`
- `npm run build`

Other useful checks:

```bash
npm run audit
npm run prisma:generate
npm run prisma:validate
npm run prisma:format
npm run prisma:migrate
npm run prisma:migrate:status
npm run prisma:seed
npm run prisma:verify
```

Prisma migration and seed commands use the `DATABASE_URL` and admin seed variables from `.env`.

## Planning Docs

Project planning lives in [docs/planning](./docs/planning):

- decisions
- architecture
- milestones
- task backlog
- data/auth/content plan
- deployment and environment plan
