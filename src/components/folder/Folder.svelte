<script lang="ts">
    import type { RootFolder } from '../../types';
    import TogglePlusMinus from '../togglePlusMinus/TogglePlusMinus.svelte';

    export let name = '';
    export let children: RootFolder = [];
    export let indent = 0;

    let open = true;

    function toggleOpen() {
        open = !open;
    }
</script>

<li
    style="padding-left: {indent}px"
    on:click="{toggleOpen}"
    on:keypress="{toggleOpen}"
    class="flex items-center text-white"
>
    {#if children.length > 0}
        <TogglePlusMinus open="{open}" />
        {open ? '(open)' : '(closed)'}
    {/if}
    {name}
</li>

{#if open}
    {#each children as child}
        <svelte:self {...child} indent="{indent + 24}" />
    {/each}
{/if}
