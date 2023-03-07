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
        cursor: w-resize;
        position: absolute;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        border: 5px solid transparent;
    }
    .row > div .line::after {
        width: 2px;
        position: absolute;
        top: 0;
        right: -5px;
        background: navy;
        height: 100%;
        width: 2px;
        content: '';
        display: flex;
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
    import type { MockData } from '../../types';
    import type { DerivedColumnConfig, Grid } from '../Grid';

    export let renderColumnList: DerivedColumnConfig[];
    export let scrollX: number;
    export let isDevMode: boolean;
    export let gridInstance: Grid<MockData>;

    export let updateGridColumn: () => void;
    let scrollEl: HTMLDivElement;
    let elementId = uuidv4();
    type Point = { pageX: number; pageY: number };
    type CurrentCell = DerivedColumnConfig | null;
    let mouseDownPoint: Point;
    let mouseUpPoint: Point;
    let isDown = false;

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
    let currentCell: CurrentCell = null;

    const widthControll = {
        mouseDownHandler: () => {
            isDown = true;

            window.addEventListener('mousemove', widthControll.mouseMoveHandler);
            window.addEventListener('mouseup', widthControll.mouseUpHandler);
        },
        mouseMoveHandler: function mouseMoveHandler(e: MouseEvent) {
            const { pageX, pageY } = e;
            mouseUpPoint = { pageX, pageY };
        },
        mouseUpHandler: function mouseUpHandler(e: MouseEvent) {
            const width = `${mouseUpPoint.pageX - mouseDownPoint.pageX}px`;
            isDown = false;
            window.removeEventListener('mousemove', widthControll.mouseMoveHandler);
            window.removeEventListener('mouseup', widthControll.mouseUpHandler);

            if (currentCell) {
                console.log(width);
                gridInstance.updateColumnWidth(width, currentCell);
            }
            currentCell = null;
            updateGridColumn();
        },
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
                        <div
                            class="line"
                            on:mousedown="{(e) => {
                                const { pageX, pageY } = e;
                                mouseDownPoint = { pageX, pageY };
                                currentCell = cell;
                                mouseDownHandler();
                            }}"></div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
