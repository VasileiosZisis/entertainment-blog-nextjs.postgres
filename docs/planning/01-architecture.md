# Architecture Plan

This document describes the intended shape of the new Next.js, TypeScript, Prisma, and PostgreSQL app.

## Application Stack

- Framework: Next.js App Router
- Language: TypeScript
- Package manager: npm
- Database ORM: Prisma
- Database: PostgreSQL
- Hosting: Vercel
- Image storage: Cloudinary
- Authentication: cookie-based JWT
- Password hashing: bcrypt
- Validation: shared server-side validation with a TypeScript-friendly schema library
- Rich text: client-only editor component
- Rich text storage: sanitized HTML
- Styling: Tailwind CSS for most component styling, global CSS variables for theme tokens, CSS Modules only where useful
- UI primitives: selectively use shadcn/ui for accessible admin/form primitives
- Typography: Geist for the milestone build

## App Structure

Expected high-level structure:

```text
src/
  app/
    (public)/
    admin/
    api/
  components/
  features/
    auth/
    posts/
    upcoming/
  lib/
    auth/
    cloudinary/
    db/
    validation/
  styles/
prisma/
  schema.prisma
  seed.js
docs/
  planning/
```

The exact structure can change once the app is scaffolded, but the goal is to keep public UI, admin UI, server utilities, and domain logic easy to find.

## Styling Strategy

- Build the public site as a custom editorial UI for "Quick and Honest".
- Keep v1 light-only.
- Use Geist until the later visual design pass.
- Use Tailwind CSS utility classes for layout, spacing, typography, responsive behavior, and common component styling.
- Define theme tokens such as color, radius, shadows, and key spacing values with CSS variables in global CSS.
- Use CSS Modules only for complex custom components where utilities become difficult to read.
- Use shadcn/ui selectively for admin/forms primitives such as buttons, inputs, dialogs, dropdowns, and form controls.
- Avoid making the public blog feel like a generic dashboard or component-library template.
- Defer the deeper visual design pass until after the functional milestones are complete.

## Public Navigation

- Visible nav items: Blog, Games, Anime, Books, TV.
- Do not show a login link in the public shell.
- Keep `/login` available for manual URL entry.

## Data Model

Initial Prisma models:

- `User`
- `BlogPost`
- `Upcoming`

Suggested fields:

- `User`: `id`, `name`, `email`, `passwordHash`, `isAdmin`, `createdAt`, `updatedAt`
- `BlogPost`: `id`, `title`, `subtitle`, `slug`, `content`, `category`, `imageUrl`, `imagePublicId`, `imageAlt`, `published`, `createdAt`, `updatedAt`
- `Upcoming`: `id`, `title`, `subtitle`, `imageUrl`, `imagePublicId`, `imageAlt`, `createdAt`, `updatedAt`

Suggested enum:

- `BlogCategory`: `GAME`, `TV`, `BOOK`, `ANIME`

Suggested indexes:

- unique index on `User.email`
- unique index on `BlogPost.slug`
- index on `BlogPost.createdAt`
- index on `BlogPost.category`
- optional search indexes later if needed

## Rendering Strategy

- Public blog listing pages should use server rendering.
- Article pages should use server rendering and metadata generation.
- Admin forms should use client components where interaction requires it.
- The rich text editor should be dynamically loaded on the client to avoid server-rendering issues.
- Rich text should be sanitized before storage and rendered as sanitized HTML.
- Mutations can use Server Actions or Route Handlers. This decision should be made during the scaffold milestone.

## Authentication Strategy

- Admin logs in with email and password.
- Server verifies password with bcrypt.
- Server sets an HTTP-only cookie containing a signed JWT.
- Middleware or server-side helpers protect admin routes.
- Logout clears the cookie.
- Public registration is not included.
- Password reset is deferred.
- The admin dashboard should stay minimal for the first version.

## Content Safety

- Validate all create/update payloads on the server.
- Sanitize rich text before saving or before rendering.
- Restrict Cloudinary uploads to image MIME types and expected extensions.
- Require image alt text for uploaded images.
- Delete old Cloudinary images when replacing or deleting content where practical.

## SEO

- Use Next.js metadata APIs for static and dynamic metadata.
- Generate article metadata from title, subtitle, slug, and image.
- Add canonical URLs for public pages.
- Add Open Graph metadata for home, category, blog index, and article pages.
- Add sitemap and robots support in a later milestone.

## Vercel Considerations

- Keep database access compatible with Vercel's serverless model.
- Ensure Prisma Client generation runs during build.
- Store secrets in Vercel environment variables.
- Use Neon as the PostgreSQL provider.
- Use `DATABASE_URL`, `JWT_SECRET`, and Cloudinary credentials.
- Avoid filesystem-dependent uploads; all media should go directly through Cloudinary.
