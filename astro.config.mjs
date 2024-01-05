import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // Enable Preact to support Preact JSX components.
  integrations: [preact()],
  output: "hybrid",
  adapter: cloudflare()
});
