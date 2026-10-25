import { getCollection, getEntries, type CollectionEntry } from 'astro:content';

export type Problem = CollectionEntry<'problems'>;
export type Solution = CollectionEntry<'solutions'>;
export type Resource = CollectionEntry<'resources'>;

export const RESOURCE_TYPES: Record<string, string> = {
  article: 'Articles',
  paper: 'Research papers',
  video: 'Videos',
  report: 'Reports',
  dataset: 'Data',
  podcast: 'Podcasts',
};

export const SDG_NAMES: Record<number, string> = {
  1: 'No poverty', 2: 'Zero hunger', 3: 'Good health and well-being', 4: 'Quality education',
  5: 'Gender equality', 6: 'Clean water and sanitation', 7: 'Affordable and clean energy',
  8: 'Decent work and economic growth', 9: 'Industry, innovation and infrastructure',
  10: 'Reduced inequalities', 11: 'Sustainable cities and communities',
  12: 'Responsible consumption and production', 13: 'Climate action', 14: 'Life below water',
  15: 'Life on land', 16: 'Peace, justice and strong institutions', 17: 'Partnerships for the goals',
};

export const byTitle = <T extends { data: { title: string } }>(a: T, b: T) => a.data.title.localeCompare(b.data.title);

export async function categoryMap() {
  const cats = await getCollection('categories');
  return new Map(cats.map((c) => [c.id, c.data]));
}

/** A region and every region below it, e.g. "in" gives India and all its states. */
export async function regionAndDescendants(id: string) {
  const regions = await getCollection('regions');
  const ids = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const r of regions) {
      if (r.data.parent && ids.has(r.data.parent) && !ids.has(r.id)) {
        ids.add(r.id);
        grew = true;
      }
    }
  }
  return ids;
}

export function inRegions(entry: Problem | Solution, ids: Set<string>) {
  return entry.data.regions.some((r) => ids.has(r.id));
}

export async function resourcesFor(entry: Problem | Solution) {
  return getEntries(entry.data.resources);
}

/** Which problems and solutions cite each resource, so the library can filter by category. */
export async function resourceCategories() {
  const [problems, solutions] = await Promise.all([getCollection('problems'), getCollection('solutions')]);
  const map = new Map<string, Set<string>>();
  for (const e of [...problems, ...solutions]) {
    for (const r of e.data.resources) {
      const set = map.get(r.id) ?? new Set<string>();
      e.data.categories.forEach((c) => set.add(c.id));
      map.set(r.id, set);
    }
  }
  return map;
}
