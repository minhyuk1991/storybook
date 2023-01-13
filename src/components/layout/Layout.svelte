<script lang="ts">
	import DarkModeToggleButton from '../darkModeToggleButton/DarkModeToggleButton.svelte'
	import Sidebar from './sidebar/Sidebar.svelte'

	export let isOpen = false

	const clickHandler = () => (isOpen = !isOpen)
</script>

<div class="flex min-h-[100vh] w-full items-stretch">
	<Sidebar clickHandler="{clickHandler}" isOpen="{isOpen}" />
	<div class="{`flex flex-1 overflow-hidden `}">
		<main
			class="{`flex min-h-[calc(100vh-200px-200px)] flex-1 transform flex-col items-stretch  transition-transform duration-1000 ${
				isOpen ? 'translate-x-[300px]' : ''
			}`}"
		>
			<div
				class="w-full bg-white pl-[40px] text-center font-bold text-black dark:bg-black dark:text-white"
			>
				<DarkModeToggleButton />
			</div>
			<div
				class="bg-dark-800 w-full flex-1 pl-[40px] text-center font-bold text-black dark:text-white"
			>
				Main contents
			</div>
			<slot />
		</main>
	</div>
	<!-- <footer class="bg-gray-800  text-white">footer</footer> -->
</div>
