import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
});

const projects = defineCollection({
  type: 'content',
  schema: projectSchema,
});

const sketches = defineCollection({
  type: 'content',
  schema: projectSchema,
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  sketches,
  blog,
};
