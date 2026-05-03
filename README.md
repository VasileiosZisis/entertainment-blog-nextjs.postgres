# Quick and Honest

Quick and Honest is a Next.js rewrite of the original MERN demo blog. The new app is planned around Next.js App Router, TypeScript, Prisma, Neon PostgreSQL, Cloudinary uploads, and Vercel deployment.

## Current Status

Milestones 1 through 8 are complete:

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
- public blog, category, search, and article pages
- cookie-based admin auth
- admin post management
- admin upcoming-card management
- Cloudinary upload and cleanup flows
- sitemap and robots metadata routes
- production error and not-found states
- baseline security headers

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
cp .env.example .env
```

Database, admin seed, JWT, and Cloudinary values are required for local development.

Run database migrations and seed local content:

```bash
npm run prisma:migrate
npm run prisma:seed
```

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
npm run prisma:migrate:deploy
npm run prisma:migrate:status
npm run prisma:seed
npm run prisma:verify
```

Prisma migration and seed commands use the `DATABASE_URL` and admin seed variables from `.env`.

## Deployment

Production target:

- Vercel for hosting
- Neon PostgreSQL for the database
- Cloudinary for uploaded images
- `https://www.quickandhonest.com` as the production site URL

Set these Vercel environment variables before deploying:

```text
DATABASE_URL=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
NEXT_PUBLIC_SITE_URL=https://www.quickandhonest.com
```

Use the default Vercel build command:

```bash
npm run build
```

The build script runs `prisma generate` before `next build`. Database migrations and production admin seeding should be run intentionally, not automatically during the Vercel build:

```bash
npm run prisma:migrate:deploy
npm run prisma:seed
```

## Planning Docs

Project planning lives in [docs/planning](./docs/planning):

- decisions
- architecture
- milestones
- task backlog
- data/auth/content plan
- deployment and environment plan
