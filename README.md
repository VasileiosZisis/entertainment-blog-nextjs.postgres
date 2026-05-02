# Quick and Honest

Quick and Honest is a Next.js rewrite of the original MERN demo blog. The new app is planned around Next.js App Router, TypeScript, Prisma, Neon PostgreSQL, Cloudinary uploads, and Vercel deployment.

## Current Status

Milestone 1 is the scaffold and development foundation:

- Next.js App Router
- TypeScript
- npm
- Tailwind CSS
- global theme tokens
- baseline source folders
- environment variable example
- project checks

Database, authentication, admin tools, and content features start in later milestones.

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

The values can stay empty for Milestone 1. Database, auth, admin seed, and Cloudinary values are needed in later milestones.

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
- `npm run build`

Other useful checks:

```bash
npm run audit
npm run prisma:validate
npm run prisma:format
npm run prisma:migrate:status
```

Prisma checks require a Prisma schema and database setup, which begin in Milestone 2.

## Planning Docs

Project planning lives in [docs/planning](./docs/planning):

- decisions
- architecture
- milestones
- task backlog
- data/auth/content plan
- deployment and environment plan
