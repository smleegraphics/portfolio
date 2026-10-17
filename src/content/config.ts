import { defineCollection, z } from 'astro:content';

// How many labels fit on a project card.
const CARD_TAG_LIMIT = 3;

const projectSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    thumbnail: z.string(),
    tags: z.array(z.string()).default([]),
    // The labels the card shows, picked from `tags`. Needed once there are more tags than fit.
    cardTags: z.array(z.string()).max(CARD_TAG_LIMIT).optional(),
    featured: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    for (const tag of data.cardTags ?? []) {
      if (!data.tags.includes(tag)) {
        ctx.addIssue({ code: 'custom', path: ['cardTags'], message: `"${tag}" is not in tags` });
      }
    }
    if (!data.cardTags && data.tags.length > CARD_TAG_LIMIT) {
      ctx.addIssue({
        code: 'custom',
        path: ['cardTags'],
        message: `${data.tags.length} tags but a card shows ${CARD_TAG_LIMIT}: list the ones to show in cardTags`,
      });
    }
  })
  .transform((data) => ({ ...data, cardTags: data.cardTags ?? data.tags }));

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
