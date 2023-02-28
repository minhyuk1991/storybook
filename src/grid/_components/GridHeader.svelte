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
        overflow-y: scroll;
        white-space: nowrap;
    }
    .header-wrapper::-webkit-scrollbar {
        background: transparent;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { MockData } from '../../types';
    import type { Grid } from '../Grid';
    import { v4 as uuidv4 } from 'uuid';

    export let grid: Grid<MockData>;
    export let renderColumnList: {
        name: string;
    }[];
    export let scrollX: number;
    let scrollEl: HTMLDivElement;
    let elementId = uuidv4();

    onMount(() => {
        const headerEl = document.querySelector('.header') as HTMLDivElement;
        headerEl.addEventListener('click', () => {});
    });

    $: {
        if (scrollEl) {
            scrollEl.scrollLeft = scrollX;
        }
    }

    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
        scrollEl.scrollTop = scrollY;
    });
</script>

<!-- //scrollX -->
<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell}
                <div draggable="true">{cell.name}</div>
            {/each}
            <div class=""></div>
        </div>
    </div>
</div>
