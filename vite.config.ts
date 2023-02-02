import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-unresolved
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

import { createHtmlPlugin } from 'vite-plugin-html';
// import wasm from 'vite-plugin-wasm';
// import topLevelAwait from 'vite-plugin-top-level-await';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// wasm(),
		// topLevelAwait({
		//   // The export name of top-level await promise for each chunk module
		//   promiseExportName: '__tla',
		//   // The function to generate import names of top-level await promise in each chunk module
		//   promiseImportName: (i) => `__tla_${i}`,
		// }),
		svelte({
			preprocess: [sveltePreprocess({ typescript: true })],
		}),
		createHtmlPlugin(),
	],
	base: './',
	build: {
		target: 'esnext',
	},
});
