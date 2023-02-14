<style>
</style>

<script lang="ts">
    export let rowHeight: number;
    export let __scrollLeft: number;
    export let gridSpaceWidth: number;
    export let columns:
        | {
              display: string;
              dataName: string;
              width: number;
              headerComponent?: any;
              cellComponent?: any;
              disallowResize?: boolean;
              options?: any[];
          }[] = [];
    export let __affixedColumnIndices: number[] = [];
    export let onColumnDragStart: (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
        columnIndex: number,
    ) => void;
    export let getCellZIndex: Function;
    export let getCellLeft: ({
        i,
        columnWidths,
        __affixedColumnIndices,
        __scrollLeft,
    }: {
        i: number;
        columnWidths: number[];
        __affixedColumnIndices: number[];
        __scrollLeft: number;
    }) => number;
    export let columnWidths: number[];

    export let dragCopy: (
        node: HTMLDivElement,
        enabled: boolean,
    ) => {
        destroy(): void;
        update(enabled: boolean): void;
    };

    export let onColumnResizeStart: (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
        columnIndex: number,
    ) => void;
    export let allowColumnReordering: boolean;
    export let allowResizeFromTableHeaders: boolean;
    export let __columnHeaderResizeCaptureWidth: number;
</script>

<div class="grid-headers" style="height: {rowHeight}px;" data-rolw="rowgroup">
    <!-- We link up the horizontal scrolling of the inner grid view with the sticky header row by making the
        -- header row width 100% of the container, and using position:absolute along with 'left' to
        -- control the 'scroll' of the header row -->
    <div
        class="grid-header-row"
        style="left: -{__scrollLeft}px; height: {rowHeight}px; width: {gridSpaceWidth}px;"
        role="row"
    >
        {#each columns as column, i (i)}
            <div
                class="grid-cell"
                on:mousedown="{(e) => {
                    onColumnDragStart(e, i);
                }}"
                style="z-index: {getCellZIndex(__affixedColumnIndices, i)}; left: {getCellLeft({
                    i,
                    columnWidths,
                    __affixedColumnIndices,
                    __scrollLeft,
                })}px; width: {columnWidths[
                    i
                ]}px; height: {rowHeight}px; line-height: {rowHeight}px;"
                title="{column.display || ''}"
                use:dragCopy="{allowColumnReordering}"
                role="columnheader"
            >
                {#if column.headerComponent}
                    <svelte:component this="{column.headerComponent}" column="{column}" />
                {:else}
                    <div class="cell-default">
                        {column.display || ''}
                        <button>dasdsad</button>
                    </div>
                {/if}
            </div>
            {#if allowResizeFromTableHeaders && !column.disallowResize}
                <div
                    class="grid-cell-size-capture"
                    style="left: {getCellLeft({
                        i: i,
                        columnWidths,
                        __affixedColumnIndices,
                        __scrollLeft,
                    }) +
                        columnWidths[i] -
                        Math.floor(__columnHeaderResizeCaptureWidth / 2)}px;
              width: {__columnHeaderResizeCaptureWidth}px;"
                    on:mousedown="{(event) => onColumnResizeStart(event, i)}"></div>
            {/if}
        {/each}
    </div>
</div>
