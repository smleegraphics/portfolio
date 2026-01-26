# Sam Lee Portfolio

Personal portfolio website showcasing 3D modeling, code projects, and artwork.

Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npx astro check` | Run type checker |

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── content/        # Markdown content collections
│   ├── projects/   # 3D and code projects
│   ├── sketches/   # Sketchbook entries
│   └── blog/       # Blog posts
├── layouts/        # Page layouts
└── pages/          # Site pages
```

## Adding Content

Create a new `.md` file in the appropriate `src/content/` folder with this frontmatter:

```yaml
---
title: Project Title
description: Brief description
date: 2024-01-01
thumbnail: /images/thumbnail.jpg
images:
  - /images/image1.jpg
  - /images/image2.jpg
tags:
  - 3d
featured: false
---
```
