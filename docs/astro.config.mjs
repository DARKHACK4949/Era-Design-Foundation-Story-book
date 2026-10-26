import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

/**
 * The docs site lives next to the Storybook and imports the same component
 * source and the same generated tokens. Nothing is duplicated, so a token
 * change lands on both without anyone remembering to update a page.
 */
export default defineConfig({
  site: 'https://darkhack4949.github.io',
  base: '/Era-Design-Foundation-Story-book',
  trailingSlash: 'ignore',
  integrations: [mdx(), react()],
  vite: {
    resolve: {
      alias: {
        '@era': fileURLToPath(new URL('../src', import.meta.url)),
        '@tokens': fileURLToPath(new URL('../tokens/generated', import.meta.url)),
      },
    },
    // The component source sits one level above this project.
    server: { fs: { allow: ['..'] } },
  },
});
