<script lang="ts">
	export let name: string;
	export let id: string;
	export let isChecked: boolean;
	export let text: string;
</script>

<div class="flex items-center gap-[10px]">
	<label for="{id}" class="order-2">
		{text}
	</label>
	<input type="radio" name="{name}" id="{id}" checked="{isChecked}" class="order-1" />
</div>
