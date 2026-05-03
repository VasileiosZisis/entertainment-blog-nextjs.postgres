# Task Backlog

This backlog breaks the milestones into smaller implementation tasks. Move tasks into a working checklist as each milestone begins.

## Foundation

- [x] Use npm as the package manager.
- [x] Initialize Next.js project.
- [x] Add TypeScript strictness settings.
- [x] Add lint script.
- [x] Add Prettier format script.
- [x] Add `.env.example`.
- [x] Add README setup instructions.
- [x] Add basic route groups.
- [x] Add shared constants for site name and base URL.
- [x] Set site name to "Quick and Honest".

## Design

- [x] Define brand direction.
- Keep "Quick and Honest" as the brand name.
- [x] Keep v1 light-only.
- [x] Use Geist typography during milestone build.
- Defer the deeper visual design pass until after functional milestones.
- [x] Define color palette.
- [x] Define typography.
- [x] Define page width and spacing rules.
- Use Tailwind CSS plus global CSS variables as the styling baseline.
- Use CSS Modules only for complex custom component styling.
- Use shadcn/ui selectively for admin/form primitives.
- [x] Build responsive header.
- [x] Build responsive navigation menu.
- [x] Visible public nav links: Blog, Games, Anime, Books, TV.
- [x] Do not include a visible login link.
- [x] Build footer.
- [x] Build post card component.
- [x] Build upcoming card component.
- [x] Build pagination component.
- Build empty state component.
- Build loading state component.
- [x] Build form controls.
- [x] Build admin layout.

## Prisma And Database

- [x] Add Prisma dependencies.
- [x] Configure `prisma/schema.prisma`.
- [x] Create `User` model.
- [x] Create `BlogPost` model.
- [x] Create `Upcoming` model.
- [x] Create category enum.
- [x] Add indexes and unique constraints.
- [x] Create first migration.
- [x] Add seed script.
- [x] Seed the admin user from a JavaScript script.
- [x] Add local database setup instructions.
- [x] Add Prisma Client singleton/helper.

## Blog Queries

- [x] Query latest posts.
- [x] Query paginated posts.
- [x] Query posts by category.
- [x] Query posts by keyword.
- [x] Query post by slug.
- [x] Query post by id for admin editing.
- [x] Add pagination metadata helper.
- [x] Add slug generation helper.
- [x] Do not implement old `/blog/:id` support.

## Public Pages

- [x] Home page.
- [x] Blog index page.
- [x] Blog search page.
- [x] Category pages.
- [x] Article page.
- [x] Login page.
- [x] 404 page.
- [x] Do not build `/about` or `/contact` for v1.

## Admin Auth

- [x] Add login form.
- [x] Add login action or route handler.
- [x] Add password hashing and comparison.
- [x] Add JWT signing.
- [x] Add JWT verification.
- [x] Add cookie utilities.
- [x] Add logout action or route handler.
- [x] Add admin route protection.
- [x] Add current admin lookup.

## Blog Admin

- [x] Add admin post list.
- [x] Add create post form.
- [x] Add edit post form.
- [x] Add delete post action.
- [x] Add rich text editor component.
- [x] Add form validation.
- [x] Add image upload flow.
- [x] Require image alt text.
- [x] Add image replacement flow.
- [x] Add Cloudinary cleanup on delete.
- [x] Add success and error UI.

## Upcoming Admin

- [x] Add admin upcoming list.
- [x] Add create upcoming form.
- [x] Add delete upcoming action.
- [x] Add validation for title values.
- [x] Add image upload flow.
- [x] Require image alt text.
- [x] Add Cloudinary cleanup on delete.

## SEO And Metadata

- [x] Add site-wide metadata defaults.
- [x] Add home metadata.
- [x] Add blog metadata.
- [x] Add category metadata.
- [x] Add article metadata.
- [x] Add canonical URLs.
- Add Open Graph images.
- [x] Add sitemap.
- [x] Add robots.

## Security And Validation

- [x] Validate server inputs.
- [x] Sanitize rich text content.
- [x] Validate file MIME types.
- [x] Validate file sizes.
- [x] Use HTTP-only cookies.
- [x] Use secure cookies in production.
- [x] Avoid exposing admin-only data in public responses.
- [x] Handle authorization failures consistently.
- [x] Add baseline security headers.

## Vercel Deployment

- [x] Confirm database provider.
- [x] Use Neon for PostgreSQL.
- [x] Add Vercel environment variable checklist.
- [x] Confirm build command.
- [x] Confirm Prisma generation in build.
- [x] Confirm migration workflow.
- [x] Add deployment notes to README.
- [x] Test production build locally.

## Verification

- [x] Run lint.
- [x] Run type check.
- [x] Run build.
- [x] Test public navigation.
- [x] Test pagination.
- [x] Test search.
- [x] Test article metadata.
- [x] Test admin login/logout.
- [x] Test create/edit/delete post with a real Cloudinary upload.
- [x] Test create/delete upcoming card with a real Cloudinary upload.
- [x] Test Cloudinary cleanup behavior with real uploaded assets.
- Test mobile layout.
- [x] Test sitemap.
- [x] Test robots.
- [x] Test 404 page.
