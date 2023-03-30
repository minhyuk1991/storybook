import type { MockData } from '../../types';
import type { DerivedColumnConfig, GridCore } from '../GridCore';

export const updateCurrentGuideIndex = (
    currentTargetItem:
        | {
              where: 'before' | 'after';
              index: number;
          }
        | undefined,
    fromIndex: number,
) => {
    if (currentTargetItem && (fromIndex === 0 || fromIndex)) {
        const beforeCase = currentTargetItem.where === 'before';
        const afterCase = currentTargetItem.where === 'after';
        if (beforeCase) {
            if (fromIndex < currentTargetItem.index) {
                return {
                    where: 'before',
                    index: currentTargetItem.index,
                };
            }
            if (fromIndex > currentTargetItem.index) {
                return {
                    where: 'before',
                    index: currentTargetItem.index - 1,
                };
            }
        }
        if (afterCase) {
            if (fromIndex < currentTargetItem.index) {
                return {
                    where: 'before',
                    index: currentTargetItem.index,
                };
            }
            if (fromIndex > currentTargetItem.index) {
                return {
                    where: 'before',
                    index: currentTargetItem.index,
                };
            }
        }
    }
};

export const isInsideArea = (
    item: {
        index: number;
        width: number;
        height: number;
        x: number;
        y: number;
    },
    e: MouseEvent,
): { where: 'before' | 'after'; index: number } | undefined => {
    const isInsideX = item.x < e?.pageX && item.x + item.width > e?.pageX;
    const isInsideY = item.y < e?.pageY && item.y + item.height > e?.pageY - window.scrollY;
    const isBefore = isInsideX && item.x + item.width * 0.3 > e.pageX;
    const isAfter = isInsideX && item.x + item.width * 0.7 < e.pageX;
    const isInsideXY = isInsideX && isInsideY;

    if (isInsideXY && isBefore) {
        return { where: 'before', index: item.index };
    }

    if (isInsideXY && isAfter) {
        return { where: 'after', index: item.index };
    }
};

export type DndControl = {
    mouseDownHandler: (
        e: MouseEvent,
        cell: DerivedColumnConfig<MockData>,
        coulmnElList: Element[],
        mouseDownLockChange: (v: boolean) => void,
        gridInstance: GridCore<MockData>,
        updateGridColumn: () => void,
    ) => void;
    mouseMoveHandler: (e: MouseEvent) => void;
    mouseUpHandler: (e: MouseEvent) => void;
};

// widthControl.ts

export type WidthControl = {
    mouseDownHandler: (
        e: MouseEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
        currentCell: DerivedColumnConfig<MockData>,
        currentCellSize: number,
        gridInstance: GridCore<MockData>,
        updateGridColumn: () => void,
        mouseDownLockChange: (v: boolean) => void,
    ) => void;
    mouseMoveHandler: (e: MouseEvent) => void;
    mouseUpHandler: (e: MouseEvent) => void;
};

export function scrollRight(element: HTMLDivElement) {
    // 현재 스크롤 위치
    let scrollPos = element.scrollLeft;
    // 초당 이동할 거리
    const distance = 40;
    // requestAnimationFrame을 이용하여 1초에 60번씩 이동
    function animateScroll() {
        scrollPos += distance / 60;
        element.scrollLeft = scrollPos;

        if (scrollPos < element.scrollWidth - element.clientWidth) {
            requestAnimationFrame(animateScroll);
        }
    }
    requestAnimationFrame(animateScroll);
}

export function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
