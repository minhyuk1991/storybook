type Option = { resizable?: boolean };

// type RenderColumn = {
//     name: string;
//     visible: boolean;
//     width: '100%' | 'auto' | number;
//     minWidth?: 'auto' | number;
//     maxWidth?: 'auto' | number;
//     resizable?: boolean;
//     dragable?: boolean;
// };

// type RenderItem<T> = {};

export class Grid<T extends { [key: string]: number | string }> {
    items: Array<T>;

    columns: {
        name: keyof T;
        index: number;
    }[];

    renderRows: Map<string, T>;

    renderColumns: string[];

    constructor(items: T[], option?: Option) {
        this.items = items;
        // this.columns = items.length > 0 ? (Object.keys(items[0]) as Array<keyof T>) : [];
        // this.columns =
        //     items.length > 0
        //         ? (Object.keys(items[0].map((item, index) => ({ index, item }))) as Array<{
        //               index: keyof T;
        //               item: string;
        //           }>)
        //         : [];
        this.renderRows = new Map();
        this.renderColumns = [];

        const columnkeys = Object.keys(items[0]) as Array<keyof T>;
        this.columns = columnkeys.map((item, index) => ({
            name: item,
            index,
        }));

        //init Columns
        const firstItem = items[0];
        if (firstItem) {
            for (const key in firstItem) {
                if (Object.prototype.hasOwnProperty.call(firstItem, key)) {
                    this.renderColumns.push(key);
                }
            }
        }

        //init Rows
        items.forEach((item) => {
            if (typeof item.id !== 'string') throw new Error('item.id is not string');
            if (typeof item.id === 'string') this.renderRows.set(item.id, item);
        });
    }

    getRenderRowList() {
        return this.renderRows;
    }

    getRenderColumnList() {
        return this.renderColumns;
    }

    setColumnOption(columnOptions: ({ [key: string]: unknown } & { dataName: string })[]) {
        columnOptions.map((item) => {
            // const target = this.renderColumns.get();
            // if (!target) throw new Error('dataName not found');
            // const nextValue = { ...target, ...item };
            // this.renderColumns.set(item.dataName, nextValue);
        });
    }

    _setRenderList() {}

    _rowChange() {}

    _columnChange() {}

    _columnFloat() {}

    _columnDown() {}

    _columnMove() {}

    columnChange() {}
}
