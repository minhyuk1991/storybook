
/**
 * @roxi/routify 2.18.8
 * File generated Thu Jan 19 2023 08:09:59 GMT+0900 (대한민국 표준시)
 */

export const __version = "2.18.8"
export const __timestamp = "2023-01-18T23:09:59.638Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/LG/Downloads/storybook-svelte-csf-vite-example-main/storybook-svelte-csf-vite-example-main/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "test",
      "filepath": "/test",
      "name": "test",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/LG/Downloads/storybook-svelte-csf-vite-example-main/storybook-svelte-csf-vite-example-main/src/pages/test",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/test/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/LG/Downloads/storybook-svelte-csf-vite-example-main/storybook-svelte-csf-vite-example-main/src/pages/test/index.svelte",
          "importPath": "../src/pages/test/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/test/index",
          "id": "_test_index",
          "component": () => import('../src/pages/test/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/test"
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

