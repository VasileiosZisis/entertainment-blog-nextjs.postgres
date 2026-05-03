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
- Build admin layout.

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
- Query post by id for admin editing.
- [x] Add pagination metadata helper.
- Add slug generation helper.
- [x] Do not implement old `/blog/:id` support.

## Public Pages

- [x] Home page.
- [x] Blog index page.
- [x] Blog search page.
- [x] Category pages.
- [x] Article page.
- [x] Login page.
- 404 page.
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

- Add admin post list.
- Add create post form.
- Add edit post form.
- Add delete post action.
- Add rich text editor component.
- Add form validation.
- Add image upload flow.
- Require image alt text.
- Add image replacement flow.
- Add Cloudinary cleanup on delete.
- Add success and error UI.

## Upcoming Admin

- Add admin upcoming list.
- Add create upcoming form.
- Add delete upcoming action.
- Add validation for title values.
- Add image upload flow.
- Require image alt text.
- Add Cloudinary cleanup on delete.

## SEO And Metadata

- [x] Add site-wide metadata defaults.
- [x] Add home metadata.
- [x] Add blog metadata.
- [x] Add category metadata.
- [x] Add article metadata.
- Add canonical URLs.
- Add Open Graph images.
- Add sitemap.
- Add robots.

## Security And Validation

- Validate server inputs.
- Sanitize rich text content.
- Validate file MIME types.
- Validate file sizes.
- [x] Use HTTP-only cookies.
- [x] Use secure cookies in production.
- [x] Avoid exposing admin-only data in public responses.
- [x] Handle authorization failures consistently.

## Vercel Deployment

- Confirm database provider.
- Use Neon for PostgreSQL.
- Add Vercel environment variable checklist.
- Confirm build command.
- Confirm Prisma generation in build.
- Confirm migration workflow.
- Add deployment notes to README.
- Test production build locally.

## Verification

- [x] Run lint.
- [x] Run type check.
- [x] Run build.
- [x] Test public navigation.
- [x] Test pagination.
- [x] Test search.
- [x] Test article metadata.
- [x] Test admin login/logout.
- Test create/edit/delete post.
- Test create/delete upcoming card.
- Test Cloudinary cleanup behavior.
- Test mobile layout.
