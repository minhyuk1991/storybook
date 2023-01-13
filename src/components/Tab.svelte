<script lang="ts">
import { each, onMount } from 'svelte/internal';
import type { EventMouse, TabItem, TabItems } from '../types';

export let tabItems: TabItems;
export let clickHandlerF = null;

let currentItem = tabItems[0];
onMount(() => {});

const clickHandler = (e: EventMouse, item: TabItem) => {
	currentItem = item;
};
</script>

<ul class="flex w-full gap-[2px]">
	{#each tabItems as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li
			on:click="{(e) => {
				clickHandler(e, item);
			}}"
			class="{`flex flex-1 cursor-pointer items-center justify-center border-t-[8px] border-solid bg-white text-black dark:bg-black dark:text-white ${
				currentItem.name === item.name
					? 'border-yellow-900 dark:border-yellow-400'
					: ' border-transparent'
			}`}"
		>
			{item.name}
		</li>
	{/each}
</ul>
