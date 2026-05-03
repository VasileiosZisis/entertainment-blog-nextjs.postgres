# Milestones

The project should be built in small, reviewable milestones. Each milestone should leave the app in a runnable state when possible.

## Milestone 1: Scaffold The App

Status: complete.

Goal: create the baseline Next.js app and development foundation.

Tasks:

- [x] Initialize a Next.js App Router project in the target repo.
- [x] Use TypeScript.
- [x] Use npm.
- [x] Add linting and formatting scripts.
- [x] Add baseline folder structure.
- [x] Add global styles.
- [x] Add environment variable example file.
- [x] Add a minimal home page.
- [x] Verify the app runs locally.

Exit criteria:

- [x] `npm run dev` starts successfully.
- [x] `npm run build` succeeds.
- [x] The repo has a clear baseline structure.

Completion notes:

- Added project-specific README setup instructions.
- Added `.env.example`.
- Added shared site constants.
- Added baseline route, feature, library, component, and style folders.
- Added a minimal branded home page.
- Verified `npm run check`.
- Verified the dev server responds on `http://127.0.0.1:3000`.

## Milestone 2: Database And Prisma

Status: complete.

Goal: define and verify the PostgreSQL data layer.

Tasks:

- [x] Install Prisma and Prisma Client.
- [x] Configure PostgreSQL datasource.
- [x] Create the initial Prisma schema.
- [x] Add models for users, blog posts, and upcoming cards.
- [x] Add migrations.
- [x] Add JavaScript seed script for one admin user and sample content.
- [x] Add a shared Prisma client helper.
- [x] Verify migration and seed locally.

Exit criteria:

- [x] The database can be migrated.
- [x] Seed data can be inserted.
- [x] Prisma Client can read seeded posts and upcoming cards.

Completion notes:

- Added Prisma 7 configuration with the PostgreSQL adapter workflow.
- Added the initial migration `20260502193305_init`.
- Added `User`, `BlogPost`, `Upcoming`, `BlogCategory`, and `UpcomingKind`.
- Required image alt text for blog posts and upcoming cards.
- Seeded 1 admin user, 8 realistic sample posts, and 3 upcoming cards.
- Verified migration status and Prisma read queries.
- Added Prettier scripts and included `format:check` in `npm run check`.

## Milestone 3: Public Site Shell

Status: complete.

Goal: build the modern public layout and navigation.

Tasks:

- [x] Create the main layout.
- [x] Build header/navigation.
- [x] Build footer.
- [x] Use light-only styling for v1.
- [x] Use Geist typography.
- [x] Include visible nav links for Blog, Games, Anime, Books, and TV.
- [x] Exclude a visible login link.
- [x] Establish typography, spacing, colors, and responsive behavior.
- [x] Add empty route shells for the included public pages.
- [x] Exclude `/about` and `/contact` from v1.

Exit criteria:

- [x] Public routes render without data dependencies.
- [x] Navigation works on desktop and mobile.
- [x] `/login` remains reachable manually but is not linked from the public shell.
- [x] The visual direction is established.

Completion notes:

- Added shared public layout with header and footer.
- Added responsive primary navigation and mobile menu.
- Added route shells for `/blog`, `/games`, `/anime`, `/books`, `/tv`, and `/login`.
- Verified `/login` is not linked from the public shell.
- Verified public routes return `200`.
- Verified `npm run check`.

## Milestone 4: Public Blog Experience

Status: complete.

Goal: implement read-only blog features.

Tasks:

- [x] Build home page with latest posts.
- [x] Build upcoming/currently section.
- [x] Build blog index with pagination.
- [x] Build category pages with pagination.
- [x] Build search results.
- [x] Build article detail page using `/blog/[slug]`.
- [x] Add metadata for public pages.
- [x] Render rich text safely.

Exit criteria:

- [x] Visitors can browse, search, filter, and read posts.
- [x] Article URLs use slugs.
- [x] Public pages have useful metadata.

Completion notes:

- Added server-rendered Prisma queries for latest posts, paginated posts, category lists, search, and post details.
- Added home latest posts and currently/upcoming sections.
- Added post cards, grids, pagination, search form, upcoming cards, and rich text rendering.
- Added route support for `/blog`, `/blog/page/[page]`, `/blog/search/[keyword]`, `/blog/search/[keyword]/page/[page]`, `/blog/[slug]`, and category pagination.
- Configured `next/image` remote patterns for Unsplash and Cloudinary.
- Verified old id-style URLs are not supported.
- Verified `npm run check`.

## Milestone 5: Authentication

Status: complete.

Goal: allow the owner/admin to log in securely.

Tasks:

- [x] Build login page.
- [x] Implement password verification.
- [x] Set HTTP-only JWT cookie.
- [x] Add logout.
- [x] Add current-user helper.
- [x] Protect admin routes.
- [x] Add basic unauthorized handling.

Exit criteria:

- [x] Admin can log in and out.
- [x] Admin-only routes reject anonymous users.
- [x] Public pages remain accessible.

Completion notes:

- Added bcrypt password verification through a Server Action.
- Added signed JWT auth cookies with HTTP-only, same-site, and production-secure settings.
- Added current-admin lookup backed by Prisma.
- Added `/admin` as the minimal authenticated dashboard.
- Protected `/admin` routes with Next.js Proxy.
- Verified anonymous `/admin` redirects to `/login`.
- Preserved safe admin-local `next` redirects through login.
- Verified login redirects to `/admin` and sets the auth cookie.
- Verified logout redirects to `/login` and clears the auth cookie.
- Verified `npm run check`.

## Milestone 6: Admin Blog Management

Status: implementation complete.

Goal: allow the admin to manage blog posts.

Tasks:

- [x] Build admin dashboard shell.
- [x] Keep the dashboard minimal.
- [x] Build new post form.
- [x] Build edit post form.
- [x] Add client-only rich text editor.
- [x] Add server-side validation.
- [x] Add slug generation.
- [x] Add Cloudinary image upload.
- [x] Add post delete flow.
- [x] Add image replacement cleanup where practical.

Exit criteria:

- [x] Admin can create, edit, and delete posts.
- [x] New posts appear on public pages.
- [x] Slugs are generated and unique.

Completion notes:

- Added minimal admin layout and post management routes.
- Added `/admin/posts`, `/admin/posts/new`, and `/admin/posts/[id]/edit`.
- Added TipTap as a client-only rich text editor.
- Added Zod server-side validation for post fields and image rules.
- Added Cloudinary server-side upload and best-effort image cleanup.
- Added unique slug generation for new posts.
- Added create, update, and delete Server Actions with admin checks.
- Added confirmed delete flow for posts.
- Increased Server Action body size limit for image uploads.
- Verified admin post routes with an authenticated session.
- Verified `npm run check`.
- Live Cloudinary create/edit/delete smoke testing is left for manual review to avoid creating and deleting remote assets without an explicit test run.

## Milestone 7: Admin Upcoming Management

Goal: allow the admin to manage upcoming/currently cards.

Tasks:

- Build upcoming cards admin list.
- Build new upcoming card form.
- Add Cloudinary upload.
- Add delete flow.
- Add validation for allowed card types.

Exit criteria:

- Admin can create and delete upcoming cards.
- Public home page reflects the changes.

## Milestone 8: Production Readiness

Goal: prepare the app for Vercel deployment.

Tasks:

- Add production environment variable documentation.
- Confirm Vercel build command.
- Confirm Prisma generate/migrate workflow for deployment.
- Add security headers where needed.
- Add sitemap.
- Add robots configuration.
- Add 404 and error states.
- Run final build and lint checks.

Exit criteria:

- The app builds for production.
- Required deployment variables are documented.
- Vercel deployment path is clear.

## Milestone 9: Post-Launch Enhancements

Goal: track deferred improvements.

Tasks:

- Comments.
- Password reset.
- Better search.
- Draft/publish scheduling.
- Analytics.
- RSS feed.
- Content import/export tooling.
