import { defineConfig, BuildOptions } from 'vite';

// eslint-disable-next-line import/no-unresolved
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
// import wasm from 'vite-plugin-wasm';
// import topLevelAwait from 'vite-plugin-top-level-await';
// https://vitejs.dev/config/

interface CustomBuildOptions extends BuildOptions {
    exclude: string[];
}

const option = {
    plugins: [
        // wasm(),
        // topLevelAwait({
        //   // The export name of top-level await promise for each chunk module
        //   promiseExportName: '__tla',
        //   // The function to generate import names of top-level await promise in each chunk module
        //   promiseImportName: (i) => `__tla_${i}`,
        // }),
        tsconfigPaths(),
        svelte({
            preprocess: [sveltePreprocess({ typescript: true })],
        }),
        createHtmlPlugin(),
    ],
    base: './',
    build: {
        target: 'esnext',
        exclude: ['./src/stories/**/*'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
};

export default defineConfig(option);
