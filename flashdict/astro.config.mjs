import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://flashdict.hyperseek.tech',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
