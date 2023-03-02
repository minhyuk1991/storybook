type Option = { resizable?: boolean; isReorder?: boolean };

export type ColumnDataType = 'string' | 'int' | 'stringInt' | 'email' | 'url';

export type InputColumnConfig = {
    name: string;
    type: ColumnDataType;
    accessor: string;
    columnWidth?: string;
    columnFixed?: boolean;
    onlyDev?: boolean;
    isHide?: boolean;
};
export type InputColumnConfigs = InputColumnConfig[];
export type DerivedColumnConfig = InputColumnConfig & {
    columnWidth: string;
    columnFixed: boolean;
    onlyDev: boolean;
    isHide: boolean;
};
export type DerivedColumnConfigs = DerivedColumnConfig[];

export type RenderColumnList = {
    name: string;
    isHidden: boolean;
}[];
// const getKeys = <T extends object>(obj: T) => Object.keys(obj);
// const getColumns = (keys: string[]) =>
//     keys.map((item, index) => {
//         console.log(item);
//         return {
//             isHidden: item === 'id' ? true : false,
//             isVisible: true,
//             name: item,
//             index,
//         };
//     });

// const getRenderColumn = <T extends { [key: string]: string | number }>(firstItem: T) => {
//     const result: {
//         name: string;
//     }[] = [];
//     for (const key in firstItem) {
//         const hasProperty = Object.prototype.hasOwnProperty.call(firstItem, key);
//         let insertColumnObj: {
//             name: string;
//         };
//         if (hasProperty) {
//             insertColumnObj = { name: key };
//             result.push(insertColumnObj);
//         }
//     }
//     return result;
// };

const getRenderRows = <T>(items: T[]) => {
    return items;
};
const createItem = ({
    name,
    type,
    accessor,
    columnWidth = 'auto',
    columnFixed = false,
    onlyDev = false,
    isHide = false,
}: {
    name: string;
    type: ColumnDataType;
    accessor: string;
    columnWidth?: string | undefined;
    columnFixed?: boolean | undefined;
    onlyDev?: boolean | undefined;
    isHide?: boolean | undefined;
}) => {
    return {
        name,
        type,
        accessor,
        columnWidth,
        columnFixed,
        onlyDev,
        isHide,
    };
};
export class Grid<T extends { [key: string]: number | string }> {
    items: Array<T>;

    columns: DerivedColumnConfigs;

    renderRows: T[];

    constructor(items: T[], option?: Option) {
        // const columnkeys = getKeys<T>(items[0]);

        this.items = items;
        this.renderRows = [];
        this.columns = [];
        // this.columns = getColumns(columnkeys);
        // this.columns = getColumns(columnkeys);

        //init Columns
        // this.renderColumns = getRenderColumn(items[0]);

        //init Rows
        this.renderRows = getRenderRows<T>(items);
        console.log(this.renderRows);
    }

    addColumn(config: InputColumnConfig | InputColumnConfigs) {
        const isArray = Array.isArray(config);

        if (isArray) {
            this.columns = config.map((column) => {
                const derivedColumn = createItem(column);
                return derivedColumn;
            });
        }

        if (!isArray) {
            const derivedColumn = createItem(config);
            this.columns.push(derivedColumn);
        }
    }

    // getRenderColumnList() {
    //     return this.columns.filter((item) => item.isVisible);
    // }

    getColumns() {
        return this.columns;
    }

    getRows() {
        return this.items;
    }
    // setColumnOption(columnOptions: ({ [key: string]: unknown } & { dataName: string })[]) {
    //     columnOptions.map((item) => {});
    // }

    columnChange(from: number, to: number) {
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
}
