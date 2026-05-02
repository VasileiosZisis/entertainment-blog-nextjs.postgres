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

Status: next.

Goal: build the modern public layout and navigation.

Tasks:

- Create the main layout.
- Build header/navigation.
- Build footer.
- Establish typography, spacing, colors, and responsive behavior.
- Add empty route shells for the included public pages.
- Exclude `/about` and `/contact` from v1.

Exit criteria:

- Public routes render without data dependencies.
- Navigation works on desktop and mobile.
- The visual direction is established.

## Milestone 4: Public Blog Experience

Goal: implement read-only blog features.

Tasks:

- Build home page with latest posts.
- Build upcoming/currently section.
- Build blog index with pagination.
- Build category pages with pagination.
- Build search results.
- Build article detail page using `/blog/[slug]`.
- Add metadata for public pages.
- Render rich text safely.

Exit criteria:

- Visitors can browse, search, filter, and read posts.
- Article URLs use slugs.
- Public pages have useful metadata.

## Milestone 5: Authentication

Goal: allow the owner/admin to log in securely.

Tasks:

- Build login page.
- Implement password verification.
- Set HTTP-only JWT cookie.
- Add logout.
- Add current-user helper.
- Protect admin routes.
- Add basic unauthorized handling.

Exit criteria:

- Admin can log in and out.
- Admin-only routes reject anonymous users.
- Public pages remain accessible.

## Milestone 6: Admin Blog Management

Goal: allow the admin to manage blog posts.

Tasks:

- Build admin dashboard shell.
- Keep the dashboard minimal.
- Build new post form.
- Build edit post form.
- Add client-only rich text editor.
- Add server-side validation.
- Add slug generation.
- Add Cloudinary image upload.
- Add post delete flow.
- Add image replacement cleanup where practical.

Exit criteria:

- Admin can create, edit, and delete posts.
- New posts appear on public pages.
- Slugs are generated and unique.

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
