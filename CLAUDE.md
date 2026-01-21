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
- **`src/pages/3d-modeling.astro`** - 3D projects gallery
- **`src/pages/sketchbook.astro`** - Sketches gallery
- **`src/pages/code.astro`** - Code projects gallery
- **`src/pages/about.astro`** - About page with contact form
- **`src/pages/blog/`** - Blog index and dynamic post pages

## Content Schema

Projects and sketches use this frontmatter schema:
```yaml
title: string (required)
description: string (required)
date: date (required)
thumbnail: string (required) - path to thumbnail image
images: string[] (optional) - additional gallery images
tags: string[] (optional) - for filtering (use "3d" for 3D Modeling, "code"/"web" for Code)
featured: boolean (default: false) - shows on home page
```

## Tech Stack

- Astro 4 with TypeScript
- Tailwind CSS for styling
- Content Collections for type-safe Markdown
- FormSubmit.co for contact form (sends to smlee.graphics@gmail.com)
