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
