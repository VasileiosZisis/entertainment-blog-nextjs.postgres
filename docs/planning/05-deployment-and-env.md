# Deployment And Environment Plan

This document tracks deployment and environment setup for Vercel.

## Deployment Target

- Hosting: Vercel
- Runtime: Next.js on Vercel
- Database: Neon PostgreSQL
- ORM: Prisma
- Media: Cloudinary

## Required Environment Variables

Development:

```text
DATABASE_URL=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Production:

```text
DATABASE_URL=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Optional:

```text
DIRECT_URL=
```

`DIRECT_URL` may be useful depending on the PostgreSQL provider and connection pooling strategy.

## PostgreSQL Provider

Use Neon for PostgreSQL.

Neon selection criteria:

- Works well with Vercel.
- Supports Prisma.
- Has clear connection string management.
- Supports branching if needed later.
- Allows easy backup/export options.

## Vercel Build Notes

Expected scripts:

```text
npm run dev
npm run lint
npm run typecheck
npm run build
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The exact scripts will be finalized after scaffold.

Build considerations:

- Prisma Client must be generated before or during build.
- Migrations should be applied intentionally, not hidden inside normal app startup.
- Seed scripts should not run automatically in production builds.
- The admin user should be seeded from a JavaScript script run intentionally with production environment variables.
- Admin credentials must not be committed.

## Pre-Deployment Checklist

- Set production `DATABASE_URL`.
- Set production `JWT_SECRET`.
- Set Cloudinary variables.
- Set production `NEXT_PUBLIC_SITE_URL`.
- Run database migration.
- Create production admin user by running the JavaScript seed script against Neon.
- Run production build locally.
- Verify public pages.
- Verify admin login.
- Verify image upload.
- Verify article creation.
- Verify article slug URL.
- Verify metadata and social preview basics.

## Post-Deployment Checklist

- Confirm home page loads.
- Confirm blog index loads.
- Confirm article page loads by slug.
- Confirm category pages load.
- Confirm admin login works.
- Confirm create/edit/delete works.
- Confirm uploaded images render.
- Confirm Cloudinary cleanup works when deleting test content.
- Confirm 404 page works.
- Confirm no secrets are exposed in the browser.
