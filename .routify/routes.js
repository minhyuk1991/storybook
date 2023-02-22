
/**
 * @roxi/routify 2.18.11
 * File generated Wed Feb 22 2023 10:58:10 GMT+0900 (대한민국 표준시)
 */

export const __version = "2.18.11"
export const __timestamp = "2023-02-22T01:58:10.278Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isPage": true,
          "path": "/test/:slug",
          "id": "_test__slug",
          "component": () => import('../src/pages/test/[slug].svelte').then(m => m.default)
        }
      ],
      "path": "/test"
    },
    {
      "isPage": true,
      "path": "/test1",
      "id": "_test1",
      "component": () => import('../src/pages/test1.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/test2",
      "id": "_test2",
      "component": () => import('../src/pages/test2.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/test3",
      "id": "_test3",
      "component": () => import('../src/pages/test3.svelte').then(m => m.default)
    }
  ],
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

