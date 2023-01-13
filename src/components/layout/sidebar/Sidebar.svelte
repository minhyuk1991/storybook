<script lang="ts">
import type { EventMouse } from '../../../types';
import Tab from '../../Tab.svelte';
export let isOpen: boolean;
export let clickHandler: (e: EventMouse) => void;

const testData = [
	{ name: 'a1', isChecked: false },
	{ name: 'a2', isChecked: false },
	{ name: 'a3', isChecked: false },
	{ name: 'a4', isChecked: false }
];
</script>

<header
	class="{`fixed left-0 top-0 z-10 flex h-[100vh] w-[300px] items-start bg-[#333333] transition-all duration-1000 dark:bg-gray-600 ${
		isOpen ? ' ' : 'translate-x-[-100%] transform'
	}`}"
>
	<button
		on:click="{clickHandler}"
		class="absolute right-0 z-10 translate-x-[100%] transform bg-black px-2 py-4  text-white dark:bg-white dark:text-black"
		>{isOpen ? '<' : '>'}
	</button>

	<Tab tabItems="{testData}" />
</header>
