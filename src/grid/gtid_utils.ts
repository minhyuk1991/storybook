type Column = {
    id: number;
    width: number;
};

export const autoWidth = (columnWidthList: Column[], currentWrapperWidth: number) => {
    const length = columnWidthList.length;
    return currentWrapperWidth / length;
};
