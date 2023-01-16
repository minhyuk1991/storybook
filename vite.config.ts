import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-unresolved
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

import { createHtmlPlugin } from 'vite-plugin-html';
// import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // wasm(),
    topLevelAwait(),
    svelte({
      preprocess: [sveltePreprocess({ typescript: true })],
    }),
    createHtmlPlugin(),
  ],
  base: './',
});
