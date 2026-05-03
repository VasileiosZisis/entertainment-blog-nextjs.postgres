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

Quick and Honest should feel like a focused entertainment workspace: editorial enough for reviews, but structured like a web app. The surface should be direct, fast to scan, and more product-like than a typical WordPress-style blog.

The design language is based on the portfolio tone:

- fast, focused web products
- stable, usable web apps
- direct interfaces
- clear architecture
- practical decisions
- real product shape, not just screens

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
- Use small uppercase labels and mono numerals for the app-like indexing system.
- Avoid long marketing copy.

## Color Palette

The palette is light-only and restrained:

- Background: warm off-white with a slight green cast.
- Foreground: near-black green.
- Surface: pale green-gray.
- Border: muted green-gray.
- Accent: red-orange for active states and emphasis.

The goal is to avoid a generic beige editorial theme while keeping the site readable and calm.

## Interaction Direction

Use motion sparingly:

- Hero text enters with a short reveal.
- Hero image has a slow ambient scale.
- Currently carousel scrolls continuously and includes every upcoming entry.
- Rows and links use small hover movement and underline reveals.

Future pages should reuse these motion rules instead of adding unrelated animations.

## Rules For Future Pages

- Prefer category lanes, rails, and structured sections over generic blog cards.
- Use images as content, not decoration.
- Keep cards rare; use borders, spacing, and layout first.
- Keep copy short and operational.
- Use the homepage category rail and post row language when redesigning `/blog` and category pages.
- Article pages should inherit the same type scale, image treatment, and direct editorial tone.
- Mobile layouts should preserve the same hierarchy rather than collapsing into a generic feed.
