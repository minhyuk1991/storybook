<script lang="ts">
	export let open = false;
</script>

<div
	class="border-light-100 relative mr-2 flex h-[12px] w-[12px] items-center justify-center border-[1px] border-solid"
>
	<span class=" translate-y-[-2px]">
		{open ? '-' : '+'}
	</span>
</div>
