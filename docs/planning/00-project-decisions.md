# Project Decisions

This document records the current product and technical decisions for the rewrite of the old MERN blog into a new Next.js application.

## Source Project

- Original project: `C:\Users\gonea\repos\personal-blog-mern.stack`
- New project: `C:\Users\gonea\repos\entertainment-blog-nextjs.Postgres`
- The original website is a demo and has no production data that must be migrated.
- The target repository can be initialized as a new application.

## Confirmed Decisions

- Use Next.js with the App Router.
- Use TypeScript.
- Use npm as the package manager.
- Use Prisma.
- Use PostgreSQL.
- Deploy to Vercel.
- Use Tailwind CSS for most component styling.
- Use CSS variables in global CSS for theme tokens.
- Use CSS Modules only for complex custom component styling when utility classes become hard to read.
- Use shadcn/ui only for accessible admin/form primitives if those primitives are useful.
- Preserve existing public routes where practical.
- Use slug-based article URLs: `/blog/[slug]`.
- Use simple cookie-based JWT authentication with Prisma and bcrypt.
- Keep Cloudinary for uploaded blog and upcoming-card images.
- Use a Next-compatible rich text editor loaded client-side.
- Store rich text as sanitized HTML.
- Start with fresh data instead of importing MongoDB production data.
- Seed/development content should be as realistic as possible.
- Modernize the design and content structure.
- Do not include `/about` or `/contact`.
- Keep "Quick and Honest" as the brand name.
- Keep categories as games, anime, books, and TV.
- Keep the admin dashboard minimal for now.
- Keep the public v1 design light-only.
- Use Geist for typography during the milestone build.
- Defer the deeper visual design pass until after the functional milestones.
- Public navigation should include Blog, Games, Anime, Books, and TV.
- Do not include a visible login link; `/login` is accessed manually by URL.
- Add slug URLs now.
- Do not support old `/blog/:id` URLs.
- Use Neon for PostgreSQL.
- Make image alt text required for blog posts and upcoming cards.
- Seed the admin user from a JavaScript script.
- Defer comments and password reset functionality.

## Old App Features To Preserve

- Home page with latest posts and a currently/upcoming section.
- Blog index.
- Search.
- Category pages for games, anime, books, and TV.
- Article detail page.
- Admin login.
- Admin-only create, edit, and delete for blog posts.
- Admin-only create and delete for upcoming cards.
- Cloudinary upload support.
- SEO metadata for public pages.
- Sanitized rich text rendering.

## Old App Features Not Included In V1

- `/about`
- `/hire-me`
- `/privacy-policy`
- `/disclaimer`
- `/profile`
- public registration
- `/contact`

Registration was already disabled in the old app. The new app should assume one admin user unless requirements change.

## Recommended Route Direction

Public routes:

- `/`
- `/blog`
- `/blog/page/[page]`
- `/blog/search/[keyword]`
- `/blog/search/[keyword]/page/[page]`
- `/blog/[slug]`
- `/games`
- `/games/page/[page]`
- `/anime`
- `/anime/page/[page]`
- `/books`
- `/books/page/[page]`
- `/tv`
- `/tv/page/[page]`
- `/login`

Visible public navigation:

- Blog
- Games
- Anime
- Books
- TV

Admin routes:

- `/admin`
- `/admin/posts/new`
- `/admin/posts/[id]/edit`
- `/admin/upcoming`
- `/admin/upcoming/new`

## Styling Approach

- Use Tailwind CSS for most component styling.
- Use CSS variables in global CSS for theme tokens.
- Use CSS Modules only for complex custom component styling when utility classes become hard to read.
- Use shadcn/ui selectively for accessible admin/form primitives.
- Do not let shadcn/ui define the public site's visual identity.
