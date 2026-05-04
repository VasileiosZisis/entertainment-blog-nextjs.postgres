# Design Notes

This document tracks the visual direction for the public redesign.

## Design Milestone 1: Homepage

Status: complete.

Scope:

- Redesign only the homepage.
- Use the homepage as the blueprint for the remaining public pages.
- Keep the existing functional behavior intact.
- Keep the admin UI out of this design pass.

## Visual Thesis

Quick and Honest should feel like a time-respecting entertainment blog: casual enough to read quickly, structured enough to help someone decide what deserves their evening. The surface should still feel more app-like than a typical WordPress-style blog, but the language should sound human, direct, and reader-first.

The design language is based on the portfolio tone:

- quick verdicts
- honest tradeoffs
- no long recaps
- clear recommendations
- respect for the reader's time
- enough context to decide whether to watch, read, or play

## Homepage Structure

The homepage now defines these reusable patterns:

- Full-viewport hero with a real content image as the visual anchor.
- Brand-first hierarchy with `Quick and Honest` as the loudest first-screen text.
- Compact latest-entry index inside the hero.
- Category rail instead of a generic card grid.
- Currently section presented as a centered intro with an infinite carousel.
- Article previews grouped by category, with up to two latest posts per category.

## Typography

- Keep Geist for v1.
- Use large, tight hero type for the brand.
- Use strong section headings with short supporting copy.
- Use small uppercase labels and compact metadata for the app-like indexing system.
- Avoid long marketing copy.

## Color Palette

The palette is light-only and restrained:

- Background: warm off-white with a slight green cast.
- Foreground: near-black green.
- Surface: pale green-gray.
- Border: muted green-gray.
- Accent: red-orange for active states and emphasis.

The goal is to avoid a generic beige editorial theme while keeping the site readable and calm.

## Background Asset

The public site uses `/background-abstract.svg` as a low-contrast grey-white geometric background. It should stay subtle enough to sit behind long text and list sections without reducing readability.

## Interaction Direction

Use motion sparingly:

- Hero text enters with a short reveal.
- Hero image has a slow ambient scale.
- Currently carousel scrolls continuously and includes every upcoming entry.
- Rows and links use restrained hover states: image scale, underline reveals, and quiet background changes.

Future pages should reuse these motion rules instead of adding unrelated animations.

## Rules For Future Pages

- Prefer category lanes, rails, and structured sections over generic blog cards.
- Use images as content, not decoration.
- Keep cards rare; use borders, spacing, and layout first.
- Keep copy short, casual, and useful.
- Use the homepage category rail and post row language when redesigning `/blog` and category pages.
- Article pages should inherit the same type scale, image treatment, and direct editorial tone.
- Mobile layouts should preserve the same hierarchy rather than collapsing into a generic feed.

## Design Milestone 2: Archives And Search

Status: complete.

Scope:

- Redesign `/blog`.
- Redesign `/games`, `/anime`, `/books`, and `/tv`.
- Redesign search result pages.
- Redesign pagination and empty states.
- Keep existing routes and behavior intact.

Archive pages should feel like a focused index, not a card gallery. Use a structured header with a short reader-first promise, compact metadata, and one-column post rows that are easy to scan by category, date, title, and short take.

Archive patterns:

- Use the same max-width, spacing, label style, and foreground/accent system as the homepage.
- Keep search visible on the main blog and search result pages.
- Render post previews as full-width rows with a stable wide image block, compact metadata, large title, and short subtitle.
- Use image scale, underline reveal, and quiet background hover instead of arrows or heavy button chrome inside rows.
- Keep pagination rectangular and informational, with a visible page count.
- Empty states should sound casual and useful, not like generic system errors.

## Design Milestone 3: Article Detail

Status: complete.

Scope:

- Redesign `/blog/[slug]`.
- Use a narrow reading column with the post image above the article header.
- Keep articles as category/date, title, subtitle, image, and body only.
- Do not add author display.
- Do not add related posts, previous/next links, verdict boxes, comments, or share controls.
- Keep existing route behavior, metadata, and sanitized rich text rendering intact.

Article pages should feel quieter than the homepage and archive pages. The main job is reading, so the layout should use fewer controls, a stable image, compact metadata, and generous text rhythm.

Article patterns:

- Start with a simple `Back to blog` link.
- Keep the image inside the same narrow reading measure as the article.
- Use the same uppercase category/date metadata language as archive rows.
- Make the title large and direct, but keep the body column narrow enough for comfortable reading.
- Rich text should support clear paragraphs, H2/H3 headings, lists, links, and blockquotes without feeling like a generic CMS template.

## Design Milestone 4: Public Chrome And Utility Pages

Status: complete.

Scope:

- Refine the sticky public header.
- Refine the mobile dropdown navigation.
- Refine the footer without changing its content.
- Keep `/login` functional and understated.
- Redesign the global not-found page with casual blog language.
- Keep admin pages out of this pass.

Shared chrome should stay quiet and useful. The header should remain sticky, minimal, and readable over the light background, with sharper active and hover states but no heavy decoration. The mobile menu should remain a dropdown, not a full-screen takeover.

Utility page patterns:

- Login should feel like a private utility surface, not a marketing page.
- Not-found copy should stay casual and reader-first.
- Buttons should use the same rectangular foreground/accent treatment as the homepage and archives.
- Footer links should stay simple, with the creator credit preserved.
- Public chrome should support the content without competing with the article, archive, or homepage layouts.
