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

    .row > div > .cell.check {
        display: flex;
        justify-content: center;
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
    import { CheckTypeInfo, DerivedColumnConfig, getOnlyNumber, GridCore } from '../GridCore';
    import { updateCurrentGuideIndex } from './utils';
    import { throttle } from 'lodash';

    export let gridInstance: GridCore<MockData>;
    export let renderColumnList: DerivedColumnConfig<MockData>[];
    export let isDevMode: boolean;
    export let mouseDownLockChange: (v: boolean) => void;
    export let updateGridColumn: () => void;
    export let mouseDownLock: boolean;
    export let updateGridRows: () => void;
    export let checkInfo: CheckTypeInfo<MockData>;

    export let scrollX: number;
    export let setScrollX: (value: number) => void;
    let floatingScrolledValue = 0;
    let scrollEl: HTMLDivElement;
    type CurrentCell = DerivedColumnConfig<MockData> | null;

    let mouseDownSnapShotSizeX: number | null;
    let mouseDownSnapShotScrollLeft: number | null;
    let mouseDownDnDSnapShotSizeX: number | null;

    let deltaMovement;
    let rectInfoList: { index: number; width: number; height: number; x: number; y: number }[] = [];
    let draggableElement: Node | null = null;

    let elementId = uuidv4();
    let order: { where: 'after' | 'before'; index: number } | null = null;

    console.log(order);
    $: {
        console.log(isDevMode);
    }
    export let scrollHandler: (
        e: UIEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) => void;

    let currentGuideIndex: number | null = null;
    let fromIndex: number | null = null;
    let coulmnElList: Element[];
    let guideIndex: number | null = null;
    let currentTargetItem:
        | {
              where: 'before' | 'after';
              index: number;
          }
        | undefined;
    $: {
        if (scrollEl) {
            scrollEl.scrollLeft = scrollX;
        }
    }

    const updateGuideIndex = () => {
        if (currentTargetItem && (fromIndex === 0 || fromIndex)) {
            const fineTuningValue = (() => {
                const toIndex = currentTargetItem.index;
                const beforCase = currentTargetItem.where === 'before';
                const afterCase = currentTargetItem.where === 'after';
                const fromGreaterThanTo = fromIndex < toIndex;
                const ToGreaterThanFrom = fromIndex > toIndex;
                if (beforCase && fromGreaterThanTo) return -1;
                if (beforCase && ToGreaterThanFrom) return -1;
                if (afterCase && fromIndex > toIndex) return 0;
                if (afterCase && fromIndex < toIndex) return 0;
                return 0;
            })();
            guideIndex = currentTargetItem?.index + fineTuningValue;
        }
    };
    const resetGuideIndex = () => {
        guideIndex = null;
    };
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
        // 아이템의 시작 x좌표
        // 마우스 포인터 위치
        // 스크롤된 값 보정
        //
        const isInsideX =
            item.x < e?.pageX + floatingScrolledValue &&
            item.x + item.width > e?.pageX + floatingScrolledValue;
        const isInsideY = item.y < e?.pageY && item.y + item.height > e?.pageY - window.scrollY;
        const isBefore = isInsideX && item.x + item.width * 0.3 > e.pageX + floatingScrolledValue;
        const isAfter = isInsideX && item.x + item.width * 0.7 < e.pageX + floatingScrolledValue;
        const isInsideXY = isInsideX && isInsideY;

        console.log('isInsideX', item.x < e?.pageX + floatingScrolledValue);
        if (isInsideXY && isBefore) {
            console.log({ where: 'before', index: item.index });
            return { where: 'before', index: item.index };
        }

        if (isInsideXY && isAfter) {
            console.log({ where: 'after', index: item.index });
            return { where: 'after', index: item.index };
        }
    };
    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
        scrollEl.scrollTop = scrollY;
    });

    // $: {
    //     console.log('scrollX', scrollX);
    //     console.log('floatingScrolledValue', floatingScrolledValue);
    // }

    let animateMode: 'left' | 'conterLeft' | 'center' | 'centerRight' | 'right' | null = null;
    let currentCell: CurrentCell = null;
    let currentCellSize: number;
    const elSet = () => {
        coulmnElList = Array.from(document.querySelectorAll('.cell'));
        rectInfoList = coulmnElList.map((item, i) => {
            const rect: DOMRect = item.getBoundingClientRect();
            if (i === coulmnElList.length - 1) {
                console.log('return case', {
                    index: i,
                    width: rect.width * 0.5,
                    height: rect.height,
                    x: rect.left,
                    y: rect.top,
                    el: item,
                });
                return {
                    index: i,
                    width: rect.width,
                    height: rect.height,
                    x: rect.left,
                    y: rect.top,
                    el: item,
                };
            }
            return {
                index: i,
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top,
                el: item,
            };
        });
        console.log(rectInfoList);
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
    let scrollEnd: number;
    let ScrollRectInfo = {
        centerLeftStart: 0,
        centerLeftEnd: 0,
        centerRightStart: 0,
        centerRightEnd: 0,
        centerStart: 0,
        centerEnd: 0,
        leftStart: 0,
        leftEnd: 0,
        rightStart: 0,
        rightEnd: 0,
    };
    onMount(() => {
        scrollEnd =
            scrollEl.scrollWidth - scrollX || 0 - scrollEl.getBoundingClientRect().width + 14;

        if (scrollEl) {
            const rect = scrollEl.getBoundingClientRect();
            ScrollRectInfo.centerStart = rect.left + rect.width * 0.3;
            ScrollRectInfo.centerEnd = rect.left + rect.width * 0.7;
            ScrollRectInfo.centerLeftStart = rect.left + rect.width * 0.1;
            ScrollRectInfo.centerLeftEnd = rect.left + rect.width * 0.3;
            ScrollRectInfo.centerRightStart = rect.left + rect.width * 0.7;
            ScrollRectInfo.centerRightEnd = rect.left + rect.width * 0.9;
            ScrollRectInfo.leftStart = rect.left + rect.width * 0;
            ScrollRectInfo.leftEnd = rect.left + rect.width * 0.1;
            ScrollRectInfo.rightStart = rect.left + rect.width * 0.9;
            ScrollRectInfo.rightEnd = rect.left + rect.width * 1;
        }
        console.log(ScrollRectInfo);
    });

    $: {
        console.log('header rowsData');
    }
    // let isClickedItemOver: boolean = false;
    let animationFrameId: number | null = null;
    const dndControl = {
        adjustedDndTargetLeft: null,
        mouseDownHandler: (e: MouseEvent, cell: DerivedColumnConfig<MockData>) => {
            elSet();
            e.preventDefault();
            mouseDownSnapShotScrollLeft = scrollEl.scrollLeft;
            const target = e.target as HTMLElement;
            const dndTargetLeft = target.getBoundingClientRect().left;
            dndControl.adjustedDndTargetLeft = dndTargetLeft - e.pageX;

            [...coulmnElList].find((item, index) => {
                if (item === target) {
                    fromIndex = index;
                }
            });

            if (target) {
                draggableElement = (target as Node).cloneNode(true) as HTMLElement;
                if (draggableElement) {
                    (draggableElement as HTMLElement).style.position = 'absolute';
                    (draggableElement as HTMLElement).style.opacity = '0.5'; // 투명도를 50%로 설정
                    (draggableElement as HTMLElement).style.pointerEvents = 'none'; // 투명도를 50%로 설정

                    document.body.appendChild(draggableElement);
                }
            }
            mouseDownLockChange(true);
            window.addEventListener('mousemove', dndControl.mouseMoveHandler);
            window.addEventListener('mouseup', dndControl.mouseUpHandler);
            dndControl.animate();
        },

        animate: () => {
            const start = () => {
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                if (!animateMode && typeof animationFrameId === 'number') {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                    return;
                }
                if (animateMode) {
                    const scrollElWidth =
                        scrollEl.scrollWidth - scrollEl.getBoundingClientRect().width + 14;

                    if (animateMode === 'center') {
                        console.log('center');
                        floatingScrolledValue = floatingScrolledValue + 0;
                    }
                    if (animateMode === 'centerRight') {
                        if (scrollX + 10 <= scrollElWidth) {
                            // console.log('centerRight', scrollX, scrollElWidth);
                            setScrollX(10);
                            floatingScrolledValue = floatingScrolledValue + 10;
                        } else {
                            setScrollX(0);
                        }
                    }
                    if (animateMode === 'conterLeft') {
                        if (scrollX - 10 <= rectInfoList[0].x) {
                            setScrollX(0);
                        } else {
                            // console.log('conterLeft', scrollX, scrollElWidth);
                            setScrollX(-10);
                            floatingScrolledValue = floatingScrolledValue - 10;
                        }
                    }
                    if (animateMode === 'left') {
                        if (scrollX - 10 <= rectInfoList[0].x) {
                            console.log(rectInfoList[0].x);
                            setScrollX(0);
                        } else {
                            setScrollX(-10);
                            floatingScrolledValue = floatingScrolledValue - 10;
                        }
                    }
                    if (animateMode === 'right') {
                        if (scrollX + 10 <= scrollElWidth) {
                            setScrollX(10);
                            floatingScrolledValue = floatingScrolledValue + 10;
                        } else {
                            setScrollX(0);
                        }
                    }
                }
                requestAnimationFrame(start);
            };
            animationFrameId = requestAnimationFrame(start);
        },
        mouseMoveHandler: (e: MouseEvent) => {
            const rectthrottle = throttle(() => {
                console.log('throttle');
                rectInfoList.forEach((item) => {
                    const isInsideItem = isInsideArea(item, e);

                    console.log('mouseDownDnDSnapShotSizeX', mouseDownDnDSnapShotSizeX);
                    if (!mouseDownDnDSnapShotSizeX) return;
                    const isItemOver = Math.abs(mouseDownDnDSnapShotSizeX - e.pageX) > 100;
                    if (isInsideItem && isItemOver) {
                        currentTargetItem = isInsideArea(item, e);
                        updateGuideIndex();
                        const newGuideIndex = updateCurrentGuideIndex(
                            currentTargetItem,
                            fromIndex!,
                        );
                        if (newGuideIndex !== null && newGuideIndex && currentTargetItem) {
                            currentGuideIndex = currentTargetItem.index;
                        }

                        const centerCase =
                            e.pageX > ScrollRectInfo.centerStart &&
                            e.pageX < ScrollRectInfo.centerEnd;
                        const centerLeftCase =
                            e.pageX > ScrollRectInfo.centerLeftStart &&
                            e.pageX < ScrollRectInfo.centerLeftEnd;
                        const centerRightCase =
                            e.pageX > ScrollRectInfo.centerRightStart &&
                            e.pageX < ScrollRectInfo.centerRightEnd;
                        const leftCase =
                            e.pageX > ScrollRectInfo.leftStart && e.pageX < ScrollRectInfo.leftEnd;
                        const rightCase =
                            e.pageX > ScrollRectInfo.rightStart &&
                            e.pageX < ScrollRectInfo.rightEnd;
                        //
                        if (centerCase) {
                            animateMode = 'center';
                        }

                        // 마우스 다운되고 무브 된 순간부터, 리퀘스트 에니메이션 돌리는거고,
                        // 마우스 무브시에 모드 변경,
                        // 마우스 업에 정지.
                        if (centerRightCase) {
                            animateMode = 'centerRight';
                        }

                        if (centerLeftCase) {
                            animateMode = 'conterLeft';
                        }

                        if (rightCase) {
                            animateMode = 'right';
                        }

                        if (leftCase) {
                            animateMode = 'left';
                        }
                    }
                });
            }, 100);
            rectthrottle();
            if (
                (draggableElement as unknown as HTMLDivElement) &&
                dndControl.adjustedDndTargetLeft
            ) {
                (draggableElement as HTMLDivElement).style.left =
                    String(e.pageX + dndControl.adjustedDndTargetLeft) + 'px';
                (draggableElement as HTMLDivElement).style.top = String(e.pageY) + 'px';
            }
        },
        mouseUpHandler: (e: MouseEvent) => {
            window.removeEventListener('mousemove', dndControl.mouseMoveHandler);
            window.removeEventListener('mouseout', dndControl.mouseUpHandler);

            if ((fromIndex === 0 || fromIndex) && (currentGuideIndex === 0 || currentGuideIndex)) {
                const beforCase = currentTargetItem?.where === 'before';
                const afterCase = currentTargetItem?.where === 'after';
                if (beforCase && fromIndex > currentGuideIndex)
                    gridInstance.columnChange(fromIndex, currentGuideIndex);

                if (beforCase && fromIndex < currentGuideIndex) {
                    gridInstance.columnChange(fromIndex, currentGuideIndex - 1);
                }
                if (afterCase && fromIndex > currentGuideIndex) {
                    gridInstance.columnChange(fromIndex, currentGuideIndex + 1);
                }
                if (afterCase && fromIndex < currentGuideIndex) {
                    gridInstance.columnChange(fromIndex, currentGuideIndex);
                }

                updateGridColumn();
            }
            if (draggableElement) {
                document.body.removeChild(draggableElement);
                draggableElement = null;
            }
            if (animationFrameId) {
                console.log('clear!');
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            animateMode = null;
            currentGuideIndex = null;
            mouseDownLockChange(false);
            resetGuideIndex();
            floatingScrolledValue = 0;
            animateMode = null;
        },
    } as {
        adjustedDndTargetLeft: number | null;
        readonly mouseDownHandler: (e: MouseEvent, cell: DerivedColumnConfig<MockData>) => void;
        readonly mouseMoveHandler: (e: MouseEvent) => void;
        readonly mouseUpHandler: (e: MouseEvent) => void;
        readonly animate: () => void;
    };
</script>

<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell, index}
                {#if (!cell.onlyDev || isDevMode) && cell.type === 'string'}
                    <div>
                        <div
                            class="{`cell cell-${cell.index}`}"
                            on:mousedown="{(e) => {
                                console.log('mouseDownSnapShotSizeXmouseDownSnapShotSizeX');
                                mouseDownDnDSnapShotSizeX = e.pageX;
                                dndControl.mouseDownHandler(e, cell);
                            }}"
                            draggable="{true}"
                            style="{`
                            min-width: ${cell.size}; 
                            width: ${cell.size};
                            padding: 0 20px;
                            background: rebeccapurple;
                            color:white;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            height:60px;
                            
                            `}">{cell.name}{cell.index}</div
                        >
                        <div
                            class="{`line line-${cell.index} ${currentGuideIndex} ${
                                guideIndex === cell.index ? 'guide' : ''
                            }`}"
                            on:mousedown="{(e) => {
                                console.log('md');
                                currentCell = cell;
                                mouseDownSnapShotSizeX = e.pageX;
                                currentCellSize = Number(getOnlyNumber(cell.size));
                                widthControl.mouseDownHandler(e);
                                mouseDownLockChange(true);
                            }}"></div>
                    </div>
                {/if}

                {#if (!cell.onlyDev || isDevMode) && cell.type === 'check'}
                    <div>
                        <div
                            class="{`cell cell-${cell.index}`}"
                            on:mousedown="{(e) => {
                                console.log('mouseDownSnapShotSizeXmouseDownSnapShotSizeX');
                                mouseDownDnDSnapShotSizeX = e.pageX;
                                dndControl.mouseDownHandler(e, cell);
                            }}"
                            draggable="{true}"
                            style="{`
                        min-width:100px;
                        width: 100px;
                        padding: 0 20px;
                        background: rebeccapurple;
                        color:white;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        height:60px;
                        `}"
                        >
                            <input
                                type="checkbox"
                                name=""
                                id=""
                                disabled="{checkInfo[cell.name].isDisabled}"
                                value="{checkInfo[cell.name].currentAllIsRowsChecked}"
                                checked="{checkInfo[cell.name].currentAllIsRowsChecked}"
                                on:change="{(e) => {
                                    if (e.target) {
                                        gridInstance.rowAllCheckChange(
                                            e.currentTarget.checked,
                                            cell.name,
                                            gridInstance.currentRows[index],
                                        );
                                        console.log(gridInstance.checkTypeInfo[cell.name]);

                                        updateGridRows();
                                    }
                                }}"
                            />
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
