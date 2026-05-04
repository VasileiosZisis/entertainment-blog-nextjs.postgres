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
- Render post previews as full-width rows with a stable image block, compact metadata, large title, and short subtitle.
- Use image scale, underline reveal, and quiet background hover instead of arrows or heavy button chrome inside rows.
- Keep pagination rectangular and informational, with a visible page count.
- Empty states should sound casual and useful, not like generic system errors.
