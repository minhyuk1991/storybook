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
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: move;
    }

    .row > div > .cell:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
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
    .row > div .line.guide::after {
        width: 2px;
        position: absolute;
        top: 0;
        right: -5px;
        background: rgb(255, 3, 3);
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
    let rectInfoList: { index: number; width: number; height: number; x: number; y: number }[] = [];
    let draggableElement: Node | null = null;

    let order: { where: 'after' | 'before'; index: number } | null = null;

    let dndTargetLeft: number | null = null;
    let adjustedDndTargetLeft: number | null = null;
    let currentGuideIndex: number | null = null;
    let fromIndex: number | null = null;
    let coulmnElList: Element[];

    $: {
        if (scrollEl) {
            scrollEl.scrollLeft = scrollX;
        }
    }

    const isInsideArea = (
        item: {
            index: number;
            width: number;
            height: number;
            x: number;
            y: number;
        },
        e: MouseEvent,
    ): { where: 'before' | 'after'; index: number } | undefined => {
        const isInsideX =
            item.x < e?.pageX + (scrollX || 0) && item.x + item.width > e?.pageX + (scrollX || 0);
        const isInsideY = item.y < e?.pageY && item.y + item.height > e?.pageY - window.scrollY;
        const isBefore = isInsideX && item.x + item.width * 0.3 > e.pageX + (scrollX || 0);
        const isAfter = isInsideX && item.x + item.width * 0.7 < e.pageX + (scrollX || 0);
        const isInsideXY = isInsideX && isInsideY;

        if (isInsideXY && isBefore) {
            return { where: 'before', index: item.index };
        }

        if (isInsideXY && isAfter) {
            return { where: 'after', index: item.index };
        }
    };
    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
        scrollEl.scrollTop = scrollY;
    });

    let currentCell: CurrentCell = null;
    let currentCellSize: number;
    const elSet = () => {
        coulmnElList = Array.from(document.querySelectorAll('.cell'));
        console.log('coulmnElList재수집', coulmnElList);
        rectInfoList = coulmnElList.map((item, i) => {
            const rect: DOMRect = item.getBoundingClientRect();
            return {
                index: i,
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top,
            };
        });
    };
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
            elSet();
        },
    };

    const dndControl = {
        mouseDownHandler: (e: MouseEvent, cell: DerivedColumnConfig) => {
            elSet();
            console.log(e);
            e.preventDefault();
            const target = e.target as HTMLElement;
            dndTargetLeft = target.getBoundingClientRect().left;
            console.log(target.getBoundingClientRect());
            adjustedDndTargetLeft = dndTargetLeft - e.pageX;

            [...coulmnElList].find((item, index) => {
                if (item === target) {
                    fromIndex = index;
                }
            });
            if (target) {
                draggableElement = (target as Node).cloneNode(true) as HTMLElement;
                // draggableElement.style = { ...e.target.style };
                if (draggableElement) {
                    // draggableElement.style.width = '200px';
                    (draggableElement as HTMLElement).style.position = 'absolute';
                    // draggableElement.style.height = '400px';
                    // draggableElement.style.background = 'red';
                    (draggableElement as HTMLElement).style.opacity = '0.5'; // 투명도를 50%로 설정
                    document.body.appendChild(draggableElement);
                }
            }

            // 드래그 앤 드롭 이벤트가 발생하지 않도록 이벤트 취소
            // 마우스 이동 처리
            mouseDownLockChange(true);
            // xPositionList = renderColumnList.sort((a, b) => a.index - b.index);
            // const a = renderColumnList.
            window.addEventListener('mousemove', dndControl.mouseMoveHandler);
            window.addEventListener('mouseup', dndControl.mouseUpHandler);
        },

        //눌린 x좌표 - e.target
        mouseMoveHandler: (e: MouseEvent) => {
            console.log(e.pageX);
            rectInfoList.forEach((item) => {
                order = isInsideArea(item, e) ?? null;
                let currentTargetItem = isInsideArea(item, e);
                if (currentTargetItem) {
                    console.log('currentTargetItem', currentTargetItem);
                    if (currentTargetItem.where === 'before') {
                        console.log(currentTargetItem.index);
                        if (currentTargetItem.index === 0) {
                            currentGuideIndex = 0;
                            console.log(currentGuideIndex);
                        }
                        if (currentTargetItem.index) {
                            currentGuideIndex = currentTargetItem.index;
                            console.log(currentGuideIndex);
                        }
                    }
                    if (currentTargetItem.where === 'after') {
                        // console.log('after', currentTargetItem.index);
                        // currentGuideIndex = currentTargetItem.index;
                        if (currentTargetItem.index === 0) {
                            currentGuideIndex = 0;
                        }
                        if (currentTargetItem.index) {
                            currentGuideIndex = currentTargetItem.index;
                        }
                    }
                }
            });
            if ((draggableElement as unknown as HTMLDivElement) && adjustedDndTargetLeft) {
                (draggableElement as HTMLDivElement).style.left =
                    String(e.pageX + adjustedDndTargetLeft) + 'px';
                (draggableElement as HTMLDivElement).style.top = String(e.pageY) + 'px';
            }
        },
        mouseUpHandler: (e: MouseEvent) => {
            window.removeEventListener('mousemove', dndControl.mouseMoveHandler);
            window.removeEventListener('mouseout', dndControl.mouseUpHandler);

            console.log('up');
            if ((fromIndex === 0 || fromIndex) && (currentGuideIndex === 0 || currentGuideIndex)) {
                console.log('fromIndex,currentGuideIndex', fromIndex, currentGuideIndex);
                gridInstance.columnChange(fromIndex, currentGuideIndex);
                console.log('updateGridColumn');
                updateGridColumn();
            }
            if (draggableElement) {
                document.body.removeChild(draggableElement);
                draggableElement = null;
            }
            currentGuideIndex = null;
            mouseDownLockChange(false);
        },
    };
</script>

<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell, index}
                <!-- {console.log(cell.onlyDev)} -->
                <!-- {#if !cell.onlyDev || isDevMode} -->
                <div>
                    <div
                        class="{`cell cell-${cell.index}`}"
                        on:mousedown="{(e) => {
                            dndControl.mouseDownHandler(e, cell);
                        }}"
                        draggable="{true}"
                        style="{`
                            min-width: ${cell.size}; 
                            width: ${cell.size};
                            padding: '0 20px';
                            background: 'rebeccapurple'
                            color:'white';
                            position:'absolute'
                            
                            
                            `}">{cell.name}{cell.index}</div
                    >
                    <div
                        class="{`line line-${cell.index} ${
                            currentGuideIndex === cell.index ? 'guide' : ''
                        }`}"
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
                <!-- {/if} -->
            {/each}
        </div>
    </div>
</div>
