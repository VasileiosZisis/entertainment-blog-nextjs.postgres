# Milestones

The project should be built in small, reviewable milestones. Each milestone should leave the app in a runnable state when possible.

## Milestone 1: Scaffold The App

Goal: create the baseline Next.js app and development foundation.

Tasks:

- Initialize a Next.js App Router project in the target repo.
- Use TypeScript.
- Use npm.
- Add linting and formatting scripts.
- Add baseline folder structure.
- Add global styles.
- Add environment variable example file.
- Add a minimal home page.
- Verify the app runs locally.

Exit criteria:

- `npm run dev` starts successfully.
- `npm run build` succeeds or has only known setup blockers.
- The repo has a clear baseline structure.

## Milestone 2: Database And Prisma

Goal: define and verify the PostgreSQL data layer.

Tasks:

- Install Prisma and Prisma Client.
- Configure PostgreSQL datasource.
- Create the initial Prisma schema.
- Add models for users, blog posts, and upcoming cards.
- Add migrations.
- Add JavaScript seed script for one admin user and sample content.
- Add a shared Prisma client helper.
- Verify migration and seed locally.

Exit criteria:

- The database can be migrated.
- Seed data can be inserted.
- Prisma Client can read seeded posts and upcoming cards.

## Milestone 3: Public Site Shell

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
