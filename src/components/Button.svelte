<style>
.rounded {
	border-radius: 35px;
}

.button {
	border: 3px solid;
	padding: 10px 20px;
	background-color: white;
	outline: none;
}
</style>

<script lang="ts">
import { createEventDispatcher, afterUpdate } from 'svelte';
export let text = '';
export let rounded = true;

const dispatch = createEventDispatcher();

function clickHandler(
	event: MouseEvent & {
		currentTarget: EventTarget & HTMLButtonElement;
	}
) {
	rounded = !rounded;

	dispatch('click', event);
}

afterUpdate(() => {
	dispatch('afterUpdate');
});
</script>

<button class="button" class:rounded="{rounded}" on:click="{clickHandler}">
	{text}
	<slot />
</button>
