<script lang="ts">
	import type { TabItem, TabItems } from '../types';

	export let tabItems: TabItems;

	let currentItem = tabItems[0];

	const clickHandler = (item: TabItem) => {
		currentItem = item;
	};
</script>

<ul class="flex w-full gap-[2px]">
	{#each tabItems as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li
			on:click="{() => {
				clickHandler(item);
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
