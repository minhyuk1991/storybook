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

    .header-wrapper {
        margin-top: 4px;
        width: 1200px;
        overflow: hidden;
        position: relative;
        white-space: nowrap;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { MockData } from '../../types';
    import type { Grid } from '../Grid';
    import { v4 as uuidv4 } from 'uuid';

    export let grid: Grid<MockData>;
    export let renderColumnList: string[];
    export let scrollX: number;
    let scrollEl: HTMLDivElement;
    let elementId = uuidv4();
    onMount(() => {
        const headerEl = document.querySelector('.header') as HTMLDivElement;
        headerEl.addEventListener('click', () => {
            console.log('aa');
            console.log('grid', grid);
        });
    });

    $: {
        if (scrollEl) {
            scrollEl.scrollLeft = scrollX;
        }
    }

    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
        console.log(scrollEl.scrollLeft, 'aa');
    });
</script>

<!-- //scrollX -->
<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell}
                <div draggable="true">{cell}</div>
            {/each}
        </div>
    </div>
</div>
