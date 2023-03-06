<style>
    .row {
        display: flex;
        gap: 4px;
    }
    .row > div {
        position: relative;
    }
    .row > div > .cell {
        padding: 0 20px;
        background: rebeccapurple;
        color: white;
        cursor: pointer;
        position: relative;
    }

    .row > div .line {
        top: 0;
        right: -3px;
        height: 100%;
        width: 2px;
        background-color: aqua;
        cursor: w-resize;
        position: absolute;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }

    .header {
        position: sticky;
        top: 0;
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
    import { v4 as uuidv4 } from 'uuid';
    import type { DerivedColumnConfig } from '../Grid';

    export let renderColumnList: DerivedColumnConfig[];
    export let scrollX: number;
    export let isDevMode: boolean;
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

    const widthControll = {
        mouseDownHandler: () => {
            console.log('dd');
        },
        mouseMoveHandler: () => {},
        mouseUpHandler: () => {},
    };

    const { mouseDownHandler } = widthControll;
</script>

<!-- //scrollX -->

<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell}
                <!-- {console.log(cell.onlyDev)} -->
                {#if !cell.onlyDev || isDevMode}
                    <div>
                        <div class="cell" draggable="true" style="{`min-width: ${cell.size}`}"
                            >{cell.name}</div
                        >
                        <div class="line" on:mousedown="{mouseDownHandler}"></div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
