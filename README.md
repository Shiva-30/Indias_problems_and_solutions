# Problem Atlas

A website about India's biggest problems, the evidence behind them, and the solutions being tried. It starts with India and is built so other countries can be added later.

Built with [Astro](https://astro.build). All content lives in plain text files, so there is no database to run.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```sh
npm install
npm run dev        # open http://localhost:4321
```

Search only works on the built site:

```sh
npm run build
npm run preview
```

## Put it online (free)

1. Sign in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **Add New → Project** and pick this repository.
3. Keep the defaults (Vercel detects Astro) and click **Deploy**.

Every push to `main` then updates the live site in about a minute. Afterwards, set `site` in `astro.config.mjs` to your live address.

## How the content is organised

| What | Where |
| --- | --- |
| Problems | `src/content/problems/*.md`, one file per problem |
| Solutions | `src/content/solutions/*.md`, one file per solution |
| Resources (articles, papers, videos, reports, data) | `src/data/resources.json` |
| Categories (Water, Health, ...) | `src/data/categories.json` |
| Regions (World > India > states) | `src/data/regions.json` |

The file name is the page address: `src/content/problems/air-pollution.md` becomes `/problems/air-pollution/`.

Problems, solutions and resources point to each other by id. The build checks every id, so a typo stops the build with a clear error instead of creating a broken link.

### Add a resource

Add an entry to `src/data/resources.json`:

```json
{
  "id": "niti-water-index",
  "title": "Composite Water Management Index",
  "type": "report",
  "url": "https://www.niti.gov.in/",
  "source": "NITI Aayog",
  "year": 2019
}
```

`type` is one of `article`, `paper`, `video`, `report`, `dataset`, `podcast`. Then add its id to the `resources` list of any problem or solution that uses it.

### Add a problem

Create `src/content/problems/<id>.md`:

```markdown
---
title: "Groundwater depletion"
summary: "One or two sentences that explain the problem."
categories: ["water", "agriculture"]
regions: ["in-punjab", "in-haryana"]
regionNote: "Optional free text about where"
sdgs: [6]
keyStats:
  - { value: "35.5%", label: "of children under 5 are stunted", source: "NFHS-5, 2019-21" }
solutions: ["drip-irrigation"]
resources: ["cgwb"]
updated: 2026-10-25
---

## Causes

- ...

## Impact

- ...
```

### Add a solution

Create `src/content/solutions/<id>.md` with `title`, `summary`, `categories`, `regions`, `sdgs`, `approach`, `whoIsDoingIt`, `problems`, `resources` and `updated`, then `## How it works` and `## Evidence so far` sections. A link only has to be written on one side: a solution that lists a problem shows up on that problem's page too.

### Add a country

Add the country and its states or cities to `src/data/regions.json`, with `parent` pointing up the tree:

```json
{ "id": "ke", "name": "Kenya", "type": "country", "parent": "world" },
{ "id": "ke-nairobi", "name": "Nairobi", "type": "city", "parent": "ke" }
```

Region pages (`/regions/ke/`) then list everything tagged with that country or anywhere inside it.

## Sample content

The entries shipped with the site are samples. Check every figure against its source before launch. Some paper and video links open a Google Scholar or YouTube search and should be replaced with links to the specific item.
