<style>
    .row-action-line {
        position: absolute;
        left: 0;
        width: 100%;
        height: 4px;
        z-index: 6;
        background: #aaa;
    }
    .row-affix-marker {
        display: none;
        position: absolute;
        left: 0;
        height: 4px;
        z-index: 6;
        background: white;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        cursor: ns-resize;
    }
    .column-affix-marker {
        position: absolute;
        top: 0;
        width: 4px;
        z-index: 5;
        background: white;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        cursor: ew-resize;
        transform: translateX(-50%);
    }
    .resizing * {
        user-select: none;
    }
    .resizing .grid-inner {
        overflow-y: hidden;
    }
    .resizing .grid-space {
        pointer-events: all;
    }
    .grid-cell > * {
        height: 100%;
    }
    .cell-default {
        padding: 0 5px;
        background: white;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .data-grid-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .column-action-line {
        position: absolute;
        top: 0;
        bottom: 17px;
        z-index: 3;
        width: 4px;
        background: #aaa;
        cursor: ew-resize;
    }
    .grid-cell-size-capture {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 5;
        background: transparent;
        cursor: ew-resize;
        pointer-events: all;
    }
    .grid-inner {
        overflow: auto;
    }
    .grid-space {
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
        pointer-events: none;
        z-index: 3;
    }
    .grid-headers {
        position: absolute;
        overflow: hidden;
        max-width: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border-bottom: 2px solid black;
    }
    .grid-headers .grid-cell {
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }
    .grid-headers .cell-default:hover {
        background: #eee;
    }
    .grid-header-row {
        position: absolute;
        overflow: hidden;
        top: 0;
    }
    .grid-row {
        position: absolute;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .grid-row:not(:last-child) {
        border-bottom: 1px solid white;
    }
    .grid-cell {
        position: absolute;
        top: 0;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .grid-cell > * {
        width: 100%;
    }
    .grid-cell:not(:last-child) {
        border-right: 1px solid white;
    }

    .grid-headers {
        text-align: center;
        border-radius: 24px 25px 0 0;
        overflow: hidden;
    }

    .grid-header-row > * .cell-default {
        background-color: red;
    }
    .grid-header-row .grid-cell:first-child {
        border-radius: 25px 0 0 0;
    }
    .grid-header-row .grid-cell:nth-last-child(2) > div {
        border-radius: 0 25px 0 0;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import EditHistory from './edit-history';
    import { createEventDispatcher } from 'svelte';
    import { onDestroy } from 'svelte/internal';
    import { createMockDataList } from './../../../mockData';
    const dispatch = createEventDispatcher();
    const MIN_COLUMN_SIZE = 30;
    let wrapper: null | HTMLDivElement;
    let tableSpace: null | HTMLDivElement;

    function getCellLeft({
        i,
        columnWidths,
        __affixedColumnIndices,
        __scrollLeft,
    }: {
        i: number;
        columnWidths: number[];
        __affixedColumnIndices: number[];
        __scrollLeft: number;
    }) {
        if (__affixedColumnIndices.indexOf(i) >= 0) {
            if (i === 0) {
                return __scrollLeft;
            }
            let left = __scrollLeft;
            for (let j = i - 1; j >= 0; j--) {
                left += columnWidths[j];
            }
            return left;
        }
        let left = 0;
        for (let j = 0; j < i; j++) {
            left += columnWidths[j];
        }
        return left;
    }

    function getClosestIndex(
        x: number,
        columnWidths: number[],
        __affixedColumnIndices: number[],
        __scrollLeft: number,
    ) {
        let closest = 0;
        for (let i = 0; i < columnWidths.length; i++) {
            const left =
                getCellLeft({ i, columnWidths, __affixedColumnIndices, __scrollLeft }) +
                Math.floor(columnWidths[i] / 2);
            if (left < x) {
                closest = i + 1;
            }
        }
        // special handling required when there are affixed columns, because
        // if the grid is scrolled horizontally to the right, we want to have this function return the closest
        // affixed column, rather than any columns that might be closer to x but are being overlapped by an affixed column
        if (__affixedColumnIndices.length > 0) {
            const firstAffixedLeft = getCellLeft({
                i: __affixedColumnIndices[0],
                columnWidths,
                __affixedColumnIndices,
                __scrollLeft,
            });
            const lastAffixedLeft = getCellLeft({
                i: __affixedColumnIndices[__affixedColumnIndices.length - 1],
                columnWidths,
                __affixedColumnIndices,
                __scrollLeft,
            });
            const lastAffixedRight =
                lastAffixedLeft +
                columnWidths[__affixedColumnIndices[__affixedColumnIndices.length - 1]];
            const closestLeft = getCellLeft({
                i: closest,
                columnWidths,
                __affixedColumnIndices,
                __scrollLeft,
            });
            if (closestLeft > firstAffixedLeft && closestLeft < lastAffixedRight) {
                if (closestLeft < lastAffixedRight && closestLeft > lastAffixedLeft) {
                    closest = __affixedColumnIndices[__affixedColumnIndices.length - 1];
                } else {
                    for (let i = 0; i < __affixedColumnIndices.length; i++) {
                        const left =
                            getCellLeft({
                                i: __affixedColumnIndices[i],
                                columnWidths,
                                __affixedColumnIndices,
                                __scrollLeft,
                            }) + Math.floor(columnWidths[__affixedColumnIndices[i]] / 2);
                        if (left < x) {
                            closest = __affixedColumnIndices[i] + 1;
                        }
                    }
                }
            }
        }
        return closest;
    }
    function getBodyScrollTop() {
        return (
            window.pageYOffset ||
            (document.documentElement.clientHeight
                ? document.documentElement.scrollTop
                : document.body.scrollTop)
        );
    }
    type T = $$Generic;
    interface $$Slots {
        default: {
            // slot name
            item: T;
            index: number;
        };
    }

    let editHistory: EditHistory | null = null;
    export let rows: any[] = []; // Rows to display
    export let columns:
        | {
              display: string;
              dataName: string;
              width: number;
              headerComponent?: any;
              cellComponent?: any;
              disallowResize?: boolean;
              options?: any[];
          }[] = []; // Array of column definitions: { display: '', dataName: ''}, where display is what the display value is and dataName is what the key on the row object is
    export let rowHeight = 24; // Row height in pixels
    export let rowHeightHeader = 24; // Row height in pixels
    export let allowResizeFromTableCells = false; // Allow the user to click on table cell borders to resize columns
    export let allowResizeFromTableHeaders = true; // Allow the user to clikc on table header borders to resize columns
    export let allowColumnReordering = true; // Allow the user to drag column headers to reorder columns
    export let allowColumnAffix = true; // Alow the user to affix columns to the left of the grid
    export let __extraRows = 0; // Number of extra rows to render beyond what is visible in the scrollable area
    export let __columnHeaderResizeCaptureWidth = 20; // The width of the area on column borders that can be clicked to resize the column
    /**** Do not modify any of the data variables below. Some of them are temporarily commented out to hide warnings. ****/
    // export let __affixedRowIndices = []; // DO NOT MODIFY DIRECTLY. The row indices to affix to the top of the grid
    export let __affixedColumnIndices: number[] = []; // DO NOT MODIFY DIRECTLY. The column indices to affix to the left side of the grid
    export let __affixingRow = false; // DO NOT MODIFY DIRECTLY. Whether a row affix operation is in progress
    export let __affixingColumn = false; // DO NOT MODIFY DIRECTLY. Whether a column affix operation is in progress
    export let __rowActionLineTop = 0; // DO NOT MODIFY DIRECTLY. The 'top' position of the row action line
    export let __rowAffixLineTop = 0; // DO NOT MODIFY DIRECTLY. The 'top' position of the row affix line
    // export let __columnAffixLineLeft = 0; // DO NOT MODIFY DIRECTLY. The 'left' position of the column affix line
    export let __columnDragging = false; // DO NOT MODIFY DIRECTLY. Whether a column is being dragged
    export let __columnIndexBeingDragged: number | null = null; // DO NOT MODIFY DIRECTLY. The column index that is being dragged
    export let __columnDragOffsetX = 0; // DO NOT MODIFY DIRECTLY. The X offset of where the user clicked on the column header
    export let __resizing = false; // DO NOT MODIFY DIRECTLY. Whether or not a column is currently being resized
    export let __columnIndexBeingResized: number | null = null; // DO NOT MODIFY DIRECTLY. The column index being resized
    export let __columnActionLineLeft = 0; // DO NOT MODIFY DIRECTLY. The 'left' position of the action line
    export let __innerOffsetHeight = 0; // DO NOT MODIFY DIRECTLY. The height of the scrollable area on screen
    export let __scrollTop = 0; // DO NOT MODIFY DIRECTLY. The scrollTop position of the scrollable area
    export let __scrollLeft = 0; // DO NOT MODIFY DIRECTLY. The scrollLeft position of the scrollable area
    export let __scrolledAllTheWayToTheRight = false; // DO NOT MODIFY DIRECTLY. Whether the container is scrolled all the way to the right as of the last onscroll event
    onMount(() => {
        editHistory = new EditHistory(rows);
    });

    function dragCopy(node: HTMLDivElement, enabled: boolean) {
        console.log(node);
        let copy: HTMLDivElement | null = null;
        let dragging = false;
        let offsetX = 0;
        function onWindowMouseMove(event: MouseEvent) {
            if (!dragging) {
                return;
            }
            if (copy) {
                copy.style.left = event.pageX - offsetX + 'px';
            }
        }
        function onWindowMouseUp(event: MouseEvent) {
            console.log(event);
            if (!dragging || event.which !== 1) {
                return;
            }
            if (!copy) {
                throw new Error('copy is null');
            }
            dragging = false;
            document.body.removeChild(copy);
            copy = null;
        }
        function onNodeMouseDown(event: MouseEvent) {
            console.log(event);
            if (event.which !== 1) {
                return;
            }
            dragging = true;
            if (copy) {
                document.body.removeChild(copy);
            }
            copy = createCopy();
            offsetX = event.offsetX;
            copy.style.top = node.getBoundingClientRect().top + getBodyScrollTop() + 'px';
            copy.style.left = event.pageX - offsetX + 'px';
            document.body.appendChild(copy);
        }
        function createCopy() {
            const copy = document.createElement('div');
            copy.innerHTML = node.innerHTML;
            const { width, height, textAlign, fontWeight } = getComputedStyle(node);
            copy.style.width = width;
            copy.style.height = height;
            copy.style.maxHeight = height;
            copy.style.textAlign = textAlign;
            copy.style.fontWeight = fontWeight;
            copy.style.position = 'absolute';
            copy.style.opacity = '0.5';
            copy.style.pointerEvents = 'none';
            copy.style.overflow = 'hidden';
            copy.style.background = '#dddddd';
            copy.style.zIndex = '99999';
            return copy;
        }
        function attachEvents() {
            window.addEventListener('mousemove', (e) => {});
            window.addEventListener('mousemove', onWindowMouseMove);
            window.addEventListener('mouseup', onWindowMouseUp);
            node.addEventListener('mousedown', onNodeMouseDown);
        }
        function detachEvents() {
            window.removeEventListener('mousemove', onWindowMouseMove);
            window.removeEventListener('mouseup', onWindowMouseUp);
            node.removeEventListener('mousedown', onNodeMouseDown);
        }
        if (enabled) {
            attachEvents();
        }
        return {
            destroy() {
                detachEvents();
            },
            update(enabled: boolean) {
                if (enabled) {
                    attachEvents();
                } else {
                    detachEvents();
                }
            },
        };
    }
    function onWindowKeyDown(
        event: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (event.ctrlKey) {
            if (event.keyCode === 90) {
                undo();
                event.preventDefault();
            }
            if (event.keyCode === 89) {
                redo();
                event.preventDefault();
            }
        }
    }

    function onMouseMove(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        onColumnDragMouseMove(event);
        onColumnResizeMouseMove(event);
        onRowAffixMouseMove(event);
        onColumnAffixMouseMove(event);
    }
    /**
     * Event handler for window's mouseup event
     * @param {MouseEvent} event The MouseEvent object
     */
    function onMouseUp(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        onColumnDragEnd(event);
        onColumnResizeEnd(event);
        onRowAffixEnd(event);
        onColumnAffixEnd(event);
    }
    /**
     * Event handler for when a value has been updated
     * @param {Object} event Event object with row and column objects
     */
    function onCellUpdated(
        event: CustomEvent<{
            row: number;
            column: { dataName: string };
            value: string;
            rowNumber: number;
        }>,
    ) {
        rows[event.detail.rowNumber][event.detail.column.dataName] = event.detail.value;
        dispatch('valueUpdated', event);
    }
    /**
     * Applies the most recent backward change
     */
    function undo() {
        if (!editHistory) throw new Error('not found editHistory');

        const eRows = editHistory.undo();
        if (eRows) {
            rows = eRows;
        }
    }
    /**
     * Applies the most recent forward change
     */
    function redo() {
        if (!editHistory) throw new Error('not found editHistory');
        const eRows = editHistory.redo();
        if (eRows) {
            rows = eRows;
        }
    }
    /**
     * Event handler for starting column affix operation
     */
    function onColumnAffixStart(
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) {
        if (!tableSpace) throw new Error('not found tableSpace');
        // left click only
        if (event.which !== 1) {
            return;
        }
        if (__affixedColumnIndices.length > 0) {
            tableSpace.scrollLeft = 0;
            __affixingColumn = true;
        } else {
            __affixingColumn = true;
        }
    }
    /**
     * Event handler for mousemove column affix operation
     */
    function onColumnAffixMouseMove(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!__affixingColumn) {
            return;
        }
        if (event.which !== 1) {
            onColumnAffixEnd(event);
            return;
        }
        if (!wrapper) {
            throw new Error('wrapper not found');
        }
        const { left: wrapperPageX } = wrapper.getBoundingClientRect();
        const offsetPoint = event.pageX - wrapperPageX + __scrollLeft;
        const idx = getClosestIndex(
            offsetPoint,
            columnWidths,
            __affixedColumnIndices,
            __scrollLeft,
        );
        const indices = [];
        for (let i = 0; i < idx; i++) {
            indices.push(i);
        }
        __columnActionLineLeft = offsetPoint;
        __affixedColumnIndices = indices;
        event.preventDefault();
        // check to see if horizontal scroll position doesn't match where the
    }
    /**
     * Event handler for ending column affix operation
     */
    function onColumnAffixEnd(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        __affixingColumn = false;
    }
    /**
     * Event handler for starting row affix operation
     */
    function onRowAffixStart(
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) {
        __affixingRow = true;
    }
    /**
     * Event handler for mousemove row affix operation
     */
    function onRowAffixMouseMove(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!__affixingRow) {
            return;
        }
    }
    /**
     * Event handler for ending row affix operation
     */
    function onRowAffixEnd(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        __affixingRow = false;
    }
    /**
     * Event handler for column dragging
     */
    function onColumnDragStart(
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
        columnIndex: number,
    ) {
        if (event.which !== 1) {
            return;
        }
        // if the developer has disabled column reordering, don't begin a reorder
        if (!allowColumnReordering) {
            return;
        }
        __columnDragging = true;
        __columnIndexBeingDragged = columnIndex;
        __columnDragOffsetX = event.offsetX;
        __columnActionLineLeft =
            getCellLeft({
                i: columnIndex,
                columnWidths,
                __scrollLeft,
                __affixedColumnIndices,
            }) - __scrollLeft;
    }
    function onColumnDragMouseMove(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!__columnDragging) {
            return;
        }
        // if user is no longer pressing the left mouse button and we are out of sync
        // with __columnDragging because mouseup didn't fire, finish the reorder
        if (event.which !== 1) {
            onColumnDragEnd(event);
            return;
        }
        if (!wrapper) throw new Error('wrapper not found');

        const { left: wrapperPageX } = wrapper.getBoundingClientRect();
        // change the position of the action line to the closest column index under the mouse
        const offsetPoint = event.pageX - wrapperPageX + __scrollLeft - __columnDragOffsetX;
        const idx = getClosestIndex(
            offsetPoint,
            columnWidths,
            __affixedColumnIndices,
            __scrollLeft,
        );
        __columnActionLineLeft =
            getCellLeft({
                i: idx,
                columnWidths,
                __affixedColumnIndices,
                __scrollLeft,
            }) - __scrollLeft;
    }
    /**
     * Window mouseup handler for column dragging
     */
    function onColumnDragEnd(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        // user might try to be clever and middle-click to scroll horizontally while dragging a column
        // don't stop the drag for middle clicks
        if (event.which !== 1) {
            return;
        }
        // if a column isn't being dragged, don't reorder anything
        if (!__columnDragging) {
            return;
        }
        if (!wrapper) throw new Error('wrapper not found');
        const { left: wrapperPageX } = wrapper.getBoundingClientRect();
        const offsetPoint = event.pageX - wrapperPageX + __scrollLeft - __columnDragOffsetX;
        // move column object to its new position in the array based off the mouse position and scroll position
        const newIdx = getClosestIndex(
            offsetPoint,
            columnWidths,
            __affixedColumnIndices,
            __scrollLeft,
        );
        let mColumns = columns;
        if (!__columnIndexBeingDragged) throw new Error('__columnIndexBeingDragged is null ');
        mColumns.splice(
            newIdx > __columnIndexBeingDragged ? newIdx - 1 : newIdx,
            0,
            mColumns.splice(__columnIndexBeingDragged, 1)[0],
        );
        columns = mColumns;
        // delay firing of event so that new column order is accessible when handlers are called
        setTimeout(() => dispatch('columnOrderUpdated'), 0);
        __columnDragging = false;
        __columnDragOffsetX = 0;
        __columnIndexBeingDragged = null;
    }
    /**
     * Mousedown handler for column resizing
     */
    function onColumnResizeStart(
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
        columnIndex: number,
    ) {
        // left click only
        if (event.which !== 1) {
            return;
        }
        if (!wrapper) throw new Error('wrapper is null ');

        const { left: wrapperPageX } = wrapper.getBoundingClientRect();
        __resizing = true;
        __columnActionLineLeft = event.pageX - wrapperPageX - __scrollLeft;
        __columnIndexBeingResized = columnIndex;
        event.stopPropagation();
    }
    /**
     * Mousemove handler for column resizing
     */
    function onColumnResizeMouseMove(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        // if not currently resizing a column, ignore the event
        if (!__resizing) {
            return;
        }
        if (!wrapper) throw new Error('wrapper is null ');
        const { left: wrapperPageX } = wrapper.getBoundingClientRect();
        const resizeLineLeft = event.pageX - wrapperPageX;
        const columnLeft = getCellLeft({
            i: __columnIndexBeingResized as number,
            columnWidths,
            __affixedColumnIndices,
            __scrollLeft,
        });
        const resizeLineMinLeft = columnLeft - __scrollLeft + MIN_COLUMN_SIZE;
        const newColumnWidth = Math.max(
            resizeLineLeft + __scrollLeft - columnLeft,
            MIN_COLUMN_SIZE,
        );
        // thanks to the virtual list, we're able to get away with setting the column's size while the mouse moves
        columns[__columnIndexBeingResized as number].width = newColumnWidth;
        __columnActionLineLeft = Math.max(resizeLineLeft, resizeLineMinLeft);
        // If mouseup was not fired for some reason, abort the resize
        if (event.which !== 1) {
            __resizing = false;
            __columnIndexBeingResized = null;
            // delay firing the event until the next frame to guarantee that new values will be available in component.get()
            setTimeout(
                () =>
                    dispatch('columnWidthUpdated', {
                        idx: __columnIndexBeingResized,
                        width: newColumnWidth,
                    }),
                0,
            );
        }
        // if still resizing and the user does not have the left mouse button depressed,
        // the mouseup event didn't fire for some reason, so turn off the resize mode
    }
    /**
     * Mouseup handler for column resizing
     */
    function onColumnResizeEnd(
        event: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) {
        if (!__resizing) {
            return;
        }
        dispatch('columnWidthUpdated');
        __resizing = false;
        __columnIndexBeingResized = null;
    }
    /**
     * Sets updated scroll values when the scrollable area is scrolled
     */

    const debounce = (callback: Function, delay: number) => {
        let timer: number;
        return () => {
            if (timer) clearTimeout(timer as number);
            timer = setTimeout(callback, delay);
        };
    };

    let isScrolling = false;
    function onScroll() {
        isScrolling = true;
        debounce(() => {
            isScrolling = false;
        }, 300)();
        if (!tableSpace) {
            throw new Error('tableSpace is null');
        }
        // get new scroll values from the scroll area
        const { scrollTop: newScrollTop, scrollLeft: newScrollLeft } = tableSpace as {
            scrollTop: number;
            scrollLeft: number;
            scrollWidth: number;
        };
        /*
         * To avoid doing unnecessary re-calculation of computed variables, don't set the scroll
         * properties that haven't changed
         */
        if (__scrollTop !== newScrollTop) {
            __scrollTop = newScrollTop;
        }
        if (__scrollLeft !== newScrollLeft) {
            __scrollLeft = newScrollLeft;
        }
        __scrolledAllTheWayToTheRight =
            Math.ceil(tableSpace.scrollWidth - tableSpace.scrollLeft) === tableSpace.clientWidth;
    }
    /**
     * Computed Properties
     */
    /**
     * The 'left' value of the column affix line
     */
    let columnAffixLineLeft = 0; //TODO setter probably not needed due to reactive statement
    $: {
        // if no columns are affixed, set the line all the way to the left
        if (__affixedColumnIndices.length === 0) {
            columnAffixLineLeft = 0;
        }
        let left = __scrollLeft;
        for (let i = 0; i < __affixedColumnIndices.length; i++) {
            left += Number(columnWidths[__affixedColumnIndices[i]]);
        }
        columnAffixLineLeft = left;
    }
    /**
     * Array of column widths
     */
    let columnWidths = columns.map((x) => Number(x.width) || MIN_COLUMN_SIZE); //TODO setter probably not needed due to reactive statement
    $: {
        // if width was not provided for this column, give it a default value
        columnWidths = columns.map((x) => Number(x.width) || MIN_COLUMN_SIZE);
    }
    /**
     * The number of rows we have
     */
    let numRows = rows.length; //TODO setter probably not needed due to reactive statement
    $: {
        numRows = rows.length;
    }
    /**
     * Width of the overall grid space
     */
    let gridSpaceWidth = 0; //TODO setter probably not needed due to reactive statement
    $: {
        let sum = 0;
        for (let i = 0; i < columnWidths.length; i++) {
            sum += Number(columnWidths[i]);
        }
        /**
         * If the table is scrolled all the way to the right, resizing columns could
         * accelerate until the column is the minimum width. Add some extra space on the right
         * to ensure this undesired behavior does not happen. This doesn't seem like a perfect solution
         * but it works for now until I can think of something better.
         */
        if (__resizing && __scrolledAllTheWayToTheRight) {
            sum *= 2;
        }
        gridSpaceWidth = sum;
    }
    /**
     * Height of the overall grid space
     */
    let gridSpaceHeight = rowHeight * numRows; //TODO setter probably not needed due to reactive statement
    $: {
        gridSpaceHeight = rowHeight * numRows;
    }
    /**
     * Number of rows to render in the viewport
     */
    let numRowsInViewport = Math.ceil(__innerOffsetHeight / rowHeight);
    $: {
        numRowsInViewport = Math.ceil(__innerOffsetHeight / rowHeight);
    }
    /**
     * Computes which rows should be visible
     */
    let visibleRows: { i: number; data: T }[];
    $: {
        const start = Math.max(0, Math.floor(__scrollTop / rowHeight - __extraRows / 2));
        const end = start + numRowsInViewport + __extraRows;
        visibleRows = rows.slice(start, end).map((x: T, i) => {
            return {
                i: i + start, // for aria-rowindex
                data: x as unknown as T, // the row data
            };
        });
    }
    /**
     * Helpers
     */
    const getCellZIndex = function (__affixedColumnIndices: number[], i: number) {
        return __affixedColumnIndices.indexOf(i) === -1 ? 1 : 2;
    };
    /**
     * Gets the 'top' value for a grid-row
     */
    const getRowTop = function (i: number, rowHeight: number) {
        return i * rowHeight;
    };
    // const getCellLeft =getCellLeft

    $: {
        console.log(createMockDataList(200));
        console.log(visibleRows);
    }

    let testMockData = [];
    const interValMockData = setInterval(
        () =>
            (testMockData = createMockDataList(2000).map((item, k) => {
                return { data: item, i: k };
            })),
        1000,
    );
    onDestroy(() => {
        clearInterval(interValMockData);
    });
</script>

<!-- <svelte:window
    on:mouseup="{onMouseUp}"
    on:mouseup="{(e) => {}}"
    on:mousemove="{onMouseMove}"
    on:mousemove="{(e) => {}}"
    on:keydown="{onWindowKeyDown}"
    on:keydown="{(e) => {}}"
/> -->
<div
    class="data-grid-wrapper {__resizing || __columnDragging ? 'resizing' : ''}"
    style="padding-top: {rowHeightHeader}px;"
    bind:this="{wrapper}"
    role="table"
>
    {#if __resizing || __columnDragging || __affixingColumn}
        <div class="column-action-line" style="left: {__columnActionLineLeft - 2}px;"></div>
    {/if}
    {#if __affixingRow}
        <div class="row-action-line" style="top: {__rowActionLineTop - 2}px;"></div>
    {/if}

    <!-- <Header
    {rowHeight}
    {__scrollLeft}
    {gridSpaceWidth}
    {columns}
    {__affixedColumnIndices}
    {onColumnDragStart}
    {getCellZIndex}
    {getCellLeft}
    {columnWidths}
    {dragCopy}
    {onColumnResizeStart}
    {allowColumnReordering}
    {allowResizeFromTableHeaders}
    {__columnHeaderResizeCaptureWidth}
  /> -->
    <div class="grid-headers" style="height: {rowHeightHeader}px;" data-rolw="rowgroup">
        <!-- We link up the horizontal scrolling of the inner grid view with the sticky header row by making the
        -- header row width 100% of the container, and using position:absolute along with 'left' to
        -- control the 'scroll' of the header row -->
        <div
            class="grid-header-row"
            style="left: -{__scrollLeft}px; height: {rowHeightHeader}px; width: {gridSpaceWidth}px;"
            role="row"
        >
            {#each columns as column, i (i)}
                <div
                    class="grid-cell"
                    on:mousedown="{(event) => onColumnDragStart(event, i)}"
                    style="z-index: {getCellZIndex(__affixedColumnIndices, i)}; left: {getCellLeft({
                        i,
                        columnWidths,
                        __affixedColumnIndices,
                        __scrollLeft,
                    })}px; width: {columnWidths[
                        i
                    ]}px; height: {rowHeightHeader}px; line-height: {rowHeightHeader}px;"
                    title="{column.display || ''}"
                    use:dragCopy="{allowColumnReordering}"
                    role="columnheader"
                >
                    {#if column.headerComponent}
                        <svelte:component this="{column.headerComponent}" column="{column}" />
                    {:else}
                        <div class="cell-default">
                            {column.display || ''}
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

    <div
        class="{`grid-inner ${isScrolling ? 'scrolling' : ''}`}"
        bind:this="{tableSpace}"
        bind:offsetHeight="{__innerOffsetHeight}"
        on:scroll="{onScroll}"
        style="height: 100%;"
        role="rowgroup"
    >
        {#if allowColumnAffix}
            <div
                class="column-affix-marker"
                style="left: {columnAffixLineLeft}px; height: {gridSpaceHeight}px;"
                on:mousedown="{onColumnAffixStart}"></div>
        {/if}
        <div
            class="row-affix-marker"
            style="top: {__rowAffixLineTop}px; width: {gridSpaceWidth}px;"
            on:mousedown="{onRowAffixStart}"></div>

        <!-- We need an element to take up space so our scrollbars appear-->
        <div class="grid-space" style="width: {gridSpaceWidth}px; height: {gridSpaceHeight}px;">
            {#if allowResizeFromTableCells}
                {#each columns as column, i}
                    {#if !column.disallowResize}
                        <div
                            class="grid-cell-size-capture"
                            style="left: {getCellLeft({
                                i: i + 1,
                                columnWidths,
                                __affixedColumnIndices,
                                __scrollLeft,
                            }) -
                                Math.floor(
                                    __columnHeaderResizeCaptureWidth / 2,
                                )}px; width: {__columnHeaderResizeCaptureWidth}px;"
                            on:mousedown="{(event) => onColumnResizeStart(event, i)}"></div>
                    {/if}
                {/each}
            {/if}
        </div>

        <!-- Loop through the visible rows and display the data-->
        <!-- Scrolling seems to perform better when not using a keyed each block -->
        {#each visibleRows as row, i}
            <div
                class="grid-row"
                style="top: {getRowTop(row.i, rowHeight)}px; height: {rowHeight}px;
          width: {gridSpaceWidth}px;"
                role="row"
                aria-rowindex="{row.i}"
            >
                {#each columns as column, j}
                    <div
                        class="grid-cell"
                        style="z-index: {getCellZIndex(
                            __affixedColumnIndices,
                            j,
                        )}; left: {getCellLeft({
                            i: j,
                            columnWidths,
                            __affixedColumnIndices,
                            __scrollLeft,
                        })}px; height: {rowHeight}px; line-height: {rowHeight}px; width: {columnWidths[
                            j
                        ]}px;"
                        role="cell"
                    >
                        {#if column.cellComponent}
                            <svelte:component
                                this="{column.cellComponent}"
                                rowNumber="{row.i}"
                                column="{column}"
                                row="{row}"
                                on:valueupdate="{onCellUpdated}"
                            />
                        {:else}
                            <div class="cell-default">{row.data[column.dataName] || ''}</div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
        <!-- {#each testMockData as row, i}
			<div
				class="grid-row"
				style="top: {getRowTop(row.i, rowHeight)}px; height: {rowHeight}px;
          width: {gridSpaceWidth}px;"
				role="row"
				aria-rowindex="{row.i}"
			>
				{#each columns as column, j}
					<div
						class="grid-cell"
						style="z-index: {getCellZIndex(
							__affixedColumnIndices,
							j,
						)}; left: {getCellLeft({
							i: j,
							columnWidths,
							__affixedColumnIndices,
							__scrollLeft,
						})}px; height: {rowHeight}px; line-height: {rowHeight}px; width: {columnWidths[
							j
						]}px;"
						role="cell"
					>
						{#if column.cellComponent}
							<svelte:component
								this="{column.cellComponent}"
								rowNumber="{row.i}"
								column="{column}"
								row="{row}"
								on:valueupdate="{onCellUpdated}"
							/>
						{:else}
							<div class="cell-default">{row.data[column.dataName] || ''}aaa</div>
						{/if}
					</div>
				{/each}
			</div>
		{/each} -->
    </div>
</div>
