# Data, Auth, And Content Plan

This document records the planned backend behavior for data, authentication, content editing, and media.

## Fresh Start Data

The new app will start fresh. The old MongoDB data does not need to be imported.

Development seed data should include:

- one admin user
- realistic sample posts in each category
- realistic sample upcoming cards

Production data should be created through the admin UI unless a production seed is explicitly needed.

The site should use "Quick and Honest" as the brand name, with categories kept as games, anime, books, and TV.

## Admin User

The app assumes one owner/admin user.

Recommended setup:

- Use a JavaScript seed script for local development and admin user creation.
- Avoid committing real production credentials.
- In production, create the admin user by running the JavaScript seed script intentionally against the production Neon database.
- Store only password hashes in the database.

Seed script rules:

- Read admin name, email, and password from environment variables.
- Hash the password before inserting it.
- Upsert by email so the script can be rerun safely.
- Never commit real production admin credentials.

## Authentication Flow

Login:

- User submits email and password.
- Server finds user by email.
- Server compares password with bcrypt.
- Server signs JWT with user id and admin flag or user id only.
- Server stores JWT in HTTP-only cookie.

Authenticated request:

- Server reads cookie.
- Server verifies JWT.
- Server loads current user from Prisma.
- Server confirms `isAdmin` for admin-only operations.

Logout:

- Server clears the auth cookie.

Cookie settings:

- `httpOnly: true`
- `sameSite: lax` or `strict`
- `secure: true` in production
- reasonable expiration such as 30 days

## Blog Content

Fields:

- title
- subtitle
- slug
- content
- category
- image URL
- Cloudinary public id
- image alt text
- published status
- created timestamp
- updated timestamp

Rules:

- Title is required.
- Subtitle is required.
- Content is required.
- Category must be one of the approved categories.
- Slug must be unique.
- Image is required for published posts.
- Image alt text is required.
- Content must be sanitized.
- Rich text content must be stored as sanitized HTML.

Slug behavior:

- Generate slug from title.
- If slug already exists, append a suffix.
- Keep slug stable after publication unless the admin explicitly changes it.
- Do not support old `/blog/:id` URLs.

## Upcoming Cards

Fields:

- title
- subtitle
- image URL
- Cloudinary public id
- image alt text
- created timestamp
- updated timestamp

Allowed titles:

- Reading
- Watching
- Playing

Rules:

- Title is required.
- Subtitle is required.
- Image is required.
- Image alt text is required.
- Admin can create and delete cards.
- Editing can be added later if needed.

## Rich Text Editor

The editor must be compatible with Next.js App Router.

Recommended behavior:

- Load editor as a client-only component.
- Store sanitized HTML initially for migration simplicity.
- Render sanitized HTML on article pages.
- Keep editor toolbar similar to the old app: bold, italic, underline, strike, blockquote, lists, indent, alignment, link, clean.

Storage:

- Use sanitized HTML for the first version because it matches the old app and keeps admin editing simpler.

## Cloudinary

Required environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Upload rules:

- Accept only `jpeg`, `jpg`, `png`, and `webp`.
- Add file size limit.
- Store Cloudinary secure URL and public id.
- Delete Cloudinary image when deleting content.
- Delete old image when replacing it, after the new upload succeeds.

Accessibility:

- Require `imageAlt` for blog posts and upcoming cards.
- Use clear, descriptive alt text for editorial images.
