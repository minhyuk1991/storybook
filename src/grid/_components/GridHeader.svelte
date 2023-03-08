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
        overflow: hidden;
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
    import { DerivedColumnConfig, getOnlyNumber, Grid } from '../Grid';

    export let renderColumnList: DerivedColumnConfig[];
    export let scrollX: number;
    export let isDevMode: boolean;
    export let gridInstance: Grid<MockData>;
    export let mouseDownLockChange: (v: boolean) => void;
    export let updateGridColumn: () => void;
    export let mouseDownLock: boolean;
    let scrollEl: HTMLDivElement;
    let elementId = uuidv4();
    type CurrentCell = DerivedColumnConfig | null;

    let mouseDownSnapShotSizeX: number | null;
    let deltaMovement;
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
    let currentCellSize: number;
    const widthControl = {
        //
        mouseDownHandler: (
            e: MouseEvent & {
                currentTarget: EventTarget & HTMLDivElement;
            },
        ) => {
            mouseDownSnapShotSizeX = e.pageX;
            console.log(mouseDownSnapShotSizeX, 'mouseDownSnapShotSizeX');
            window.addEventListener('mousemove', widthControl.mouseMoveHandler);
            window.addEventListener('mouseup', widthControl.mouseUpHandler);
        },

        mouseMoveHandler: function mouseMoveHandler(e: MouseEvent) {
            const { pageX } = e;
            if (currentCell && mouseDownSnapShotSizeX && currentCellSize) {
                // const width = `${getOnlyNumber(currentCell.size)} ${
                //     mouseDownSnapShotSizeX.pageX - pageX
                // }px`;
                deltaMovement = mouseDownSnapShotSizeX - pageX;
                console.log('pageX', pageX);
                console.log('deltaMovement', deltaMovement);
                const width = currentCellSize - deltaMovement;
                if (currentCell) {
                    console.log(width);
                    gridInstance.updateColumnWidth(`${width}px`, currentCell);
                }
                updateGridColumn();
            }
        },
        mouseUpHandler: function mouseUpHandler(e: MouseEvent) {
            window.removeEventListener('mousemove', widthControl.mouseMoveHandler);
            window.removeEventListener('mouseup', widthControl.mouseUpHandler);
            mouseDownSnapShotSizeX = null;
            currentCell = null;
            deltaMovement = null;
            mouseDownLockChange(false);
        },
    };
</script>

<!-- //scrollX -->

<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell}
                <!-- {console.log(cell.onlyDev)} -->
                {#if !cell.onlyDev || isDevMode}
                    <div>
                        <div
                            class="cell"
                            draggable="{`${mouseDownLock ? 'false' : 'true'}`}"
                            style="{`min-width: ${cell.size}; width: ${cell.size};`}"
                            >{cell.name}</div
                        >
                        <div
                            class="line"
                            on:mousedown="{(e) => {
                                console.log('click');
                                currentCell = cell;
                                mouseDownSnapShotSizeX = e.pageX;
                                currentCellSize = Number(getOnlyNumber(cell.size));
                                console.log('currentCellSize', currentCellSize);
                                widthControl.mouseDownHandler(e);
                                mouseDownLockChange(true);
                            }}"></div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
