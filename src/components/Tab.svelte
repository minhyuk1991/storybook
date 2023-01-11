<script lang="ts">
import { each, onMount } from "svelte/internal";
import type { EventMouse, TabItems } from "../types";

export let tabItems: TabItems;
export let clickHandlerF = null;

let currentItem = tabItems[0];
onMount(() => {});

const clickHandler = (e: EventMouse, item) => {
  currentItem = item;
};
</script>

<ul class="flex w-full">
  {#each tabItems as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li
      on:click="{(e) => {
        clickHandler(e, item);
      }}"
      class="{`text-white flex items-center justify-center border-t-[8px] border-solid flex-1 cursor-pointer ${
        currentItem.name === item.name
          ? 'border-yellow-200'
          : ' border-transparent'
      }`}">
      {item.name}
    </li>
  {/each}
</ul>
