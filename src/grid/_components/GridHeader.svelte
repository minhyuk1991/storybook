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

    let dndTargetLeft: number | null = null;
    let adjustedDndTargetLeft: number | null = null;
    onMount(() => {
        const headerEl = document.querySelector('.header') as HTMLDivElement;
        headerEl.addEventListener('click', () => {});
    });

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
        taget: MouseEvent,
    ) => {
        const isInsideX = item.x < taget?.pageX && item.x + item.width > taget?.pageX;
        //아이템 시작지점보다 포인터가 커야함 //포인터가 아이템
        const isInsideY = item.y < taget?.pageY && item.y + item.height > taget?.pageY;

        const isBefore = isInsideX && item.x + item.width * 0.3 > taget.pageX;
        const isAfter = isInsideX && item.x + item.width * 0.7 < taget.pageX;

        if (isInsideX && isInsideY) {
            if (isBefore) {
                console.log('before');
                console.log(taget.pageX, taget.pageY, item.index);
                return { where: 'before' };
            }
            if (isAfter) {
                console.log('after');
                console.log(taget.pageX, taget.pageY, item.index);

                return { where: 'after' };
            }
        }
    };
    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
        scrollEl.scrollTop = scrollY;
        const coulmnElList = Array.from(document.querySelectorAll('.cell'));
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
        console.log(rectInfoList);
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

    const dndControl = {
        mouseDownHandler: (
            e: MouseEvent & {
                target: HTMLDivElement;
                currentTarget: EventTarget & HTMLDivElement;
            },
            cell: DerivedColumnConfig,
        ) => {
            e.preventDefault();
            dndTargetLeft = e.target.getBoundingClientRect().left;
            adjustedDndTargetLeft = dndTargetLeft - e.pageX;
            if (e.target) {
                draggableElement = (e.target as Node).cloneNode(true) as HTMLElement;
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
            const headerEl = document.querySelector('.header-wrapper') as HTMLDivElement;
            console.log(headerEl.getBoundingClientRect().left);
            rectInfoList.forEach((item) => {
                console.log('aa', isInsideArea(item, e));
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
            console.log('aaaaa');
            console.log(e.pageX);
            if (draggableElement) {
                document.body.removeChild(draggableElement);
                draggableElement = null;
            }
        },
    };
</script>

<!-- 
    1.마우스다운 (무브,업 이벤트 부여)
    - 쿼리셀렉터올로 아이템들 잡기->각각 rect x,y,width,height 배열생성
    [ {x,y,width,height,index,}]

    2.마우스무브 시에 검사함수 실행
    - 위에서 얻은 좌표값으로 비교,
    - 비교식 :
    - 결과 : from,to 

    3.바우스 업 시에 무브 업 이벤트 클린
    - 위 결과 적용 columnChange(결과)
 -->
<!-- //scrollX -->

<div class="{`class-${elementId} header-wrapper`}">
    <div class="header">
        <div class="row">
            {#each renderColumnList as cell, index}
                <!-- {console.log(cell.onlyDev)} -->
                {#if !cell.onlyDev || isDevMode}
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
                            
                            
                            `}">{cell.name}{index}</div
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
