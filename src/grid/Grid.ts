type Option = { resizable?: boolean; isReorder?: boolean };

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

    renderColumns: Record<string, string>[];

    constructor(items: T[], option?: Option) {
        this.items = items;
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
                const hasProperty = Object.prototype.hasOwnProperty.call(firstItem, key);
                const insertColumnObj: Record<string, string> = {};
                if (hasProperty) {
                    insertColumnObj.name = key;
                    this.renderColumns.push(insertColumnObj);
                }
            }
        }

        //init Rows
        items.forEach((item) => {
            if (typeof item.id !== 'string') throw new Error('item.id is not string');
            if (typeof item.id === 'string') this.renderRows.set(item.id, item);
        });
        console.log('this.items', this.items);
    }

    getRenderRowList() {
        return this.items;
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

    _columnChange(from: number, to: number) {
        const errorCase =
            from === to ||
            from < 0 ||
            to < 0 ||
            from > this.columns.length - 1 ||
            to > this.columns.length - 1;
        if (errorCase) throw new Error('error');

        const nextColumns = [...this.columns];

        nextColumns.splice(to, 0, nextColumns.splice(from, 1)[0]);

        for (let i = from + 1; i <= to; i++) {
            nextColumns[i].index -= 1;
        }

        this.columns = nextColumns;

        // this.renderColumns = nextColumns.map((item) => item);

        console.log(nextColumns);
    }

    _columnFloat() {}

    _columnDown() {}

    _columnMove() {}

    columnChange() {}
}
