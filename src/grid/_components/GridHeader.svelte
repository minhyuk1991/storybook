<style>
    .row {
        display: flex;
        gap: 4px;
    }
    .row > div {
        padding: 0 20px;
        background: rebeccapurple;
        color: white;
        min-width: 400px;
        cursor: pointer;
    }
    .header {
        position: sticky;
        top: 0;
    }
    .row > div {
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { MockData } from '../../types';
    import type { Grid } from '../Grid';

    export let grid: Grid<MockData>;
    export let renderColumnList: string[];

    onMount(() => {
        const headerEl = document.querySelector('.header') as HTMLDivElement;
        headerEl.addEventListener('click', () => {
            console.log('aa');
            console.log('grid', grid);
        });
    });
</script>

<div class="header">
    <div class="row">
        {#each renderColumnList as cell}
            <div draggable="true">{cell}</div>
        {/each}
    </div>
</div>
