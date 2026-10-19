# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

This is Sam Lee's personal portfolio website built with Astro and Tailwind CSS. It uses Markdown-based content collections for projects, sketches, and blog posts.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:4321

# Build & Deploy
npm run build        # Production build to dist/
npm run preview      # Preview production build

# Type checking
npx astro check      # Run Astro type checker
```

## Architecture

### Key Files
- **`astro.config.mjs`** - Astro configuration with Tailwind integration
- **`tailwind.config.mjs`** - Tailwind CSS configuration with custom colors/fonts
- **`src/content/config.ts`** - Content collection schemas for projects, sketches, blog

### Content Collections
- **`src/content/projects/`** - 3D modeling and code project markdown files
- **`src/content/sketches/`** - Sketchbook entry markdown files
- **`src/content/blog/`** - Blog post markdown files
- **`src/content/project-updates/<project-slug>/`** - Dated updates to a project, one markdown file each (`project`, `title`, `date`, optional `summary`). They list newest first under the project's write-up; the file name is the update's link anchor (`/projects/<slug>#<file-name>`)

### Components
- **`src/components/Header.astro`** - Navigation with mobile hamburger menu
- **`src/components/Footer.astro`** - Footer with social links
- **`src/components/ProjectCard.astro`** - Grid item for galleries
- **`src/components/ImageGrid.astro`** - Reusable responsive grid
- **`src/components/Lightbox.astro`** - Image modal with keyboard navigation

### Layouts
- **`src/layouts/BaseLayout.astro`** - HTML shell with meta tags, header, footer
- **`src/layouts/ProjectLayout.astro`** - Individual project/sketch pages with gallery

### Pages
- **`src/pages/index.astro`** - Home page with hero and featured work
- **`src/pages/projects.astro`** - Every project, newest first, plus a Sketchbook card
- **`src/pages/projects/[...slug].astro`** - Individual project pages
- **`src/pages/art/sketchbook.astro`** - Sketches gallery
- **`src/pages/work-experience.astro`** (+ `work-experience/`) - Work history
- **`src/pages/about.astro`** - About page with contact form
- **`src/pages/blog/`** - Blog index and dynamic post pages (not linked from the nav)

## Content Schema

Projects and sketches use this frontmatter schema:
```yaml
title: string (required)
description: string (required)
date: date (required)
thumbnail: string (required) - path to thumbnail image
tags: string[] (optional) - labels shown on the project page; say what the project is made with or is about
cardTags: string[] (optional) - the labels the card shows (at most 3), picked from tags.
  Required when there are more than 3 tags: the build fails rather than cut the list.
featured: boolean (default: false) - shows on home page
```

## Tech Stack

- Astro 4 with TypeScript
- Tailwind CSS for styling
- Content Collections for type-safe Markdown
- FormSubmit.co for contact form (sends to smlee.graphics@gmail.com)
- Vercel Web Analytics via `@vercel/analytics/astro` (`<Analytics />` in `BaseLayout.astro`; only reports on Vercel deployments)
