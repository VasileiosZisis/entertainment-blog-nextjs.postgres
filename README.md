# Quick and Honest

Quick and Honest is a personal entertainment blog built as a modern Next.js rewrite of an older MERN demo project. The site is designed around short, direct posts that help a reader decide whether a game, anime, book, or TV show is worth their time.

The project is intentionally small in product scope, but it is built like a production application: typed routes and data access, PostgreSQL persistence, authenticated admin tools, image upload flows, sanitized rich text content, and a documented design system.

## What This Project Demonstrates

- A full-stack Next.js App Router application using TypeScript
- Prisma 7 with PostgreSQL, currently targeting Neon
- Server-rendered public content pages backed by database queries
- Cookie-based JWT admin authentication with bcrypt password hashing
- Admin CRUD workflows for posts and homepage queue cards
- Cloudinary upload and cleanup integration for content images
- Sanitized rich text editing and rendering with TipTap and `sanitize-html`
- Search, category archives, pagination, dynamic article pages, sitemap, and robots metadata
- A responsive custom UI designed to feel more like a focused web app than a generic blog template
- Milestone-based planning and design documentation

## Product Overview

Quick and Honest has two main surfaces.

The public site is the reader-facing blog. It includes:

- Homepage with latest posts, featured categories, and a currently/upcoming carousel
- `/blog` archive with search and pagination
- Category archives for `/games`, `/anime`, `/books`, and `/tv`
- Slug-based article pages at `/blog/[slug]`
- A light-only visual system with restrained typography, subtle background texture, and full-width article rows

The private admin area is intentionally minimal. It includes:

- `/login` for the site owner
- `/admin` dashboard with publishing stats
- Post create/edit/delete workflows
- Upcoming-card create/delete workflows
- Required image alt text for uploaded media
- Rich text editor that stores sanitized HTML

## Technical Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom global tokens
- **Database:** PostgreSQL via Prisma 7
- **Database host:** Neon
- **Authentication:** Cookie-based JWT sessions, bcrypt password hashing
- **Images:** Cloudinary
- **Editor:** TipTap loaded client-side
- **Validation:** Zod
- **Icons:** Lucide React
- **Formatting:** Prettier
- **Static checks:** ESLint, TypeScript, Next production build

## Architecture

The project keeps route files thin and pushes domain behavior into feature folders.

```text
src/
  app/              Next.js route groups, layouts, pages, metadata files
  components/       Shared UI components and form/editor components
  features/
    auth/           Login server action
    posts/          Blog queries, admin actions, validation, categories, slugs
    upcoming/       Homepage queue queries, admin actions, validation
  generated/        Prisma generated client
  lib/              Shared site config and sanitization helpers
prisma/
  schema.prisma     Database schema
  seed.js           Admin user and sample content seed script
  verify.js         Database verification helper
docs/
  design.md         Design milestones, decisions, and UI direction
```

The database currently models:

- `User` for the single admin account
- `BlogPost` for published and draft posts
- `Upcoming` for homepage queue cards
- `BlogCategory` and `UpcomingKind` enums

The app does not support legacy `/blog/:id` URLs. Articles use slug URLs only.

## Design Direction

The design goal is to avoid the usual WordPress-like blog feel. The public site uses:

- large brand-first homepage hierarchy
- structured archive rows instead of card grids
- content images as real editorial anchors
- compact metadata and direct reader-first copy
- rectangular controls and restrained hover states
- a subtle grey-white abstract background

Design decisions and completed design milestones are documented in [docs/design.md](./docs/design.md).

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Required environment variables:

```text
DATABASE_URL=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run migrations and seed the database:

```bash
npm run prisma:migrate
npm run prisma:seed
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

Run the standard project gate:

```bash
npm run check
```

This runs:

- `npm run lint`
- `npm run typecheck`
- `npm run format:check`
- `npm run build`

Other useful commands:

```bash
npm run audit
npm run prisma:generate
npm run prisma:validate
npm run prisma:format
npm run prisma:migrate:status
npm run prisma:verify
```

## Deployment

The production target is:

- Vercel for hosting
- Neon for PostgreSQL
- Cloudinary for uploaded images
- `https://www.quickandhonest.com` as the public domain

Set the same required environment variables in Vercel, with:

```text
NEXT_PUBLIC_SITE_URL=https://www.quickandhonest.com
```

The build command is:

```bash
npm run build
```

The build script runs `prisma generate` before `next build`. Production migrations and seeding should be run intentionally:

```bash
npm run prisma:migrate:deploy
npm run prisma:seed
```

## Current Scope

Completed:

- Public homepage, archive, category, search, and article pages
- Admin authentication
- Admin post management
- Admin upcoming-card management
- Cloudinary upload/delete flows
- Sanitized rich text content flow
- Sitemap, robots metadata, not-found page, and baseline security headers
- Responsive design pass and documentation alignment

Intentionally deferred:

- Comments
- Password reset
- Author profiles
- Related posts
- Open Graph image generator
- Legacy URL redirects
