// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set this to the live address once the site is deployed.
  site: 'https://example.com',
  markdown: {
    // Footnotes ([^1]) in problem and solution pages are their citations.
    remarkRehype: { footnoteLabel: 'Sources', footnoteLabelTagName: 'h2' },
  },
});
