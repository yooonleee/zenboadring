import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const visibility = z.enum(['public', 'private']);

const posts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!private-*.md'], base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    links: z.object({
      sessions: z.array(z.string()),
      places: z.array(z.string()),
      gear: z.array(z.string()),
      references: z.array(z.string()),
    }),
    visibility,
  }),
});

const sessions = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!private-*.md'], base: './content/sessions' }),
  schema: z.object({
    date: z.string(),
    place: z.string(),
    gear: z.array(z.string()),
    skills: z.array(z.string()),
    condition: z.string(),
    media: z.array(z.string()),
    visibility,
  }),
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/gear' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['deck', 'trucks', 'wheels', 'bearings', 'shoes', 'other']),
    bought_at: z.string(),
    since: z.string(),
    visibility,
  }),
});

const places = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/places' }),
  schema: z.object({
    name: z.string(),
    region: z.string(),
    note: z.string(),
    visibility,
  }),
});

const references = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/references' }),
  schema: z.object({
    url: z.string().url(),
    title: z.string(),
    kind: z.enum(['app', 'website', 'book', 'article', 'video', 'scene']),
    region: z.string(),
    note: z.string(),
    tags: z.array(z.string()),
    visibility,
  }),
});

export const collections = { posts, sessions, gear, places, references };
