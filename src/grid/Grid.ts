type Option = { resizable?: boolean; isReorder?: boolean };

export type RenderColumnList = {
    name: string;
    isHidden: boolean;
}[];
const getKeys = <T extends object>(obj: T) => Object.keys(obj);
const getColumns = (keys: string[]) =>
    keys.map((item, index) => {
        console.log(item);
        return {
            isHidden: item === 'id' ? true : false,
            isVisible: true,
            name: item,
            index,
        };
    });

const getRenderColumn = <T extends { [key: string]: string | number }>(firstItem: T) => {
    const result: {
        name: string;
    }[] = [];
    for (const key in firstItem) {
        const hasProperty = Object.prototype.hasOwnProperty.call(firstItem, key);
        let insertColumnObj: {
            name: string;
        };
        if (hasProperty) {
            insertColumnObj = { name: key };
            result.push(insertColumnObj);
        }
    }
    return result;
};

const getRenderRows = <T extends { [key: string]: any }>(items: T[]) => {
    const result = new Map();
    items.forEach((item) => {
        const value: Record<string, any> = {};
        for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                if (key === 'id') {
                    value[key as string] = {
                        value: item[key],
                        isHidden: true,
                    } as Record<string, any> & { isHidden: boolean };
                }
                if (key !== 'id') {
                    value[key as string] = {
                        value: item[key],
                        isHidden: false,
                    } as Record<string, any> & { isHidden: boolean };
                }
            }
        }
        if (typeof item.id !== 'string') throw new Error('item.id is not string');
        if (typeof item.id === 'string') result.set(item.id, value);
    });
    return result;
};

export class Grid<T extends { [key: string]: number | string }> {
    items: Array<T>;

    columns: {
        name: keyof T;
        index: number;
        isVisible: boolean;
        isHidden: boolean;
    }[];

    renderRows: Map<string, T>;

    renderColumns: {
        name: string;
    }[];

    constructor(items: T[], option?: Option) {
        const columnkeys = getKeys<T>(items[0]);

        this.items = items;
        this.renderRows = new Map();
        this.columns = getColumns(columnkeys);
        this.renderColumns = [];

        //init Columns
        this.renderColumns = getRenderColumn(items[0]);

        //init Rows
        this.renderRows = getRenderRows(items);
        console.log(this.renderRows);
    }

    getRenderRowList() {
        return this.items;
    }

    getRenderColumnList() {
        return this.columns.filter((item) => item.isVisible);
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
