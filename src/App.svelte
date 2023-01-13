<style>
</style>

<script lang="ts">
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import Counter from './components/Counter.svelte';
import Layout from './components/layout/Layout.svelte';
import { dark } from './store';
const values = new Array(500).fill(0).map((item, i) => {
	return { id: i };
});
</script>

<Layout>
	<!-- <p class="h-[1500px]">content</p> -->
	<!-- <InterSectionList array="{values}" /> -->
</Layout>
