# Task Backlog

This backlog breaks the milestones into smaller implementation tasks. Move tasks into a working checklist as each milestone begins.

## Foundation

- [x] Use npm as the package manager.
- [x] Initialize Next.js project.
- [x] Add TypeScript strictness settings.
- [x] Add lint script.
- [ ] Add format script if desired.
- [x] Add `.env.example`.
- [x] Add README setup instructions.
- [x] Add basic route groups.
- [x] Add shared constants for site name and base URL.
- [x] Set site name to "Quick and Honest".

## Design

- Define brand direction.
- Keep "Quick and Honest" as the brand name.
- Define color palette.
- Define typography.
- Define page width and spacing rules.
- Use Tailwind CSS plus global CSS variables as the styling baseline.
- Use CSS Modules only for complex custom component styling.
- Use shadcn/ui selectively for admin/form primitives.
- Build responsive header.
- Build responsive navigation menu.
- Build footer.
- Build post card component.
- Build upcoming card component.
- Build pagination component.
- Build empty state component.
- Build loading state component.
- Build form controls.
- Build admin layout.

## Prisma And Database

- Add Prisma dependencies.
- Configure `prisma/schema.prisma`.
- Create `User` model.
- Create `BlogPost` model.
- Create `Upcoming` model.
- Create category enum.
- Add indexes and unique constraints.
- Create first migration.
- Add seed script.
- Seed the admin user from a JavaScript script.
- Add local database setup instructions.
- Add Prisma Client singleton/helper.

## Blog Queries

- Query latest posts.
- Query paginated posts.
- Query posts by category.
- Query posts by keyword.
- Query post by slug.
- Query post by id for admin editing.
- Add pagination metadata helper.
- Add slug generation helper.
- Do not implement old `/blog/:id` support.

## Public Pages

- Home page.
- Blog index page.
- Blog search page.
- Category pages.
- Article page.
- Login page.
- 404 page.
- Do not build `/about` or `/contact` for v1.

## Admin Auth

- Add login form.
- Add login action or route handler.
- Add password hashing and comparison.
- Add JWT signing.
- Add JWT verification.
- Add cookie utilities.
- Add logout action or route handler.
- Add admin route protection.
- Add current admin lookup.

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

- Add site-wide metadata defaults.
- Add home metadata.
- Add blog metadata.
- Add category metadata.
- Add article metadata.
- Add canonical URLs.
- Add Open Graph images.
- Add sitemap.
- Add robots.

## Security And Validation

- Validate server inputs.
- Sanitize rich text content.
- Validate file MIME types.
- Validate file sizes.
- Use HTTP-only cookies.
- Use secure cookies in production.
- Avoid exposing admin-only data in public responses.
- Handle authorization failures consistently.

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

- Run lint.
- Run type check.
- Run build.
- Test public navigation.
- Test pagination.
- Test search.
- Test article metadata.
- Test admin login/logout.
- Test create/edit/delete post.
- Test create/delete upcoming card.
- Test Cloudinary cleanup behavior.
- Test mobile layout.
