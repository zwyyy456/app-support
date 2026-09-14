import { defineConfig } from 'astro/config';
import { site } from './src/site.config.mjs';

// Static output: no SSR, adapter, database or deployment secrets required.
// Both locale trees come from src/lib/routes.mjs; English has no prefix.
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
