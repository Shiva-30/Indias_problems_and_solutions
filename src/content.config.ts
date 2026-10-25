import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Lookup tables: small JSON files in src/data.
const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: z.object({ name: z.string(), color: z.string(), colorDark: z.string() }),
});

// Regions form a tree (world > country > state). Going global = adding rows here.
const regions = defineCollection({
  loader: file('src/data/regions.json'),
  schema: z.object({
    name: z.string(),
    type: z.enum(['world', 'country', 'state', 'city']),
    parent: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: file('src/data/resources.json'),
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'paper', 'video', 'report', 'dataset', 'podcast']),
    url: z.string().url(),
    source: z.string(),
    year: z.number().int(),
    language: z.string().default('en'),
  }),
});

const common = {
  title: z.string(),
  summary: z.string(),
  categories: z.array(reference('categories')).min(1),
  regions: z.array(reference('regions')).min(1),
  sdgs: z.array(z.number().int().min(1).max(17)).default([]),
  resources: z.array(reference('resources')).default([]),
  updated: z.coerce.date(),
};

// One Markdown file per problem in src/content/problems.
const problems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/problems' }),
  schema: z.object({
    ...common,
    regionNote: z.string().optional(),
    keyStats: z.array(z.object({ value: z.string(), label: z.string(), source: z.string() })).default([]),
    solutions: z.array(reference('solutions')).default([]),
  }),
});

// One Markdown file per solution in src/content/solutions.
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    ...common,
    approach: z.string(),
    whoIsDoingIt: z.string(),
    problems: z.array(reference('problems')).default([]),
  }),
});

export const collections = { categories, regions, resources, problems, solutions };
