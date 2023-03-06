type Option = { resizable?: boolean; isReorder?: boolean };
import { v4 as uuidv4 } from 'uuid';

export type ColumnDataType = 'string' | 'int' | 'stringInt' | 'email' | 'url';

export type InputColumnConfig = {
    name: string;
    type: ColumnDataType;
    accessor: string;
    columnWidth?: string;
    columnFixed?: boolean;
    onlyDev?: boolean;
    isHide?: boolean;
    size?: string;
};
export type InputColumnConfigs = InputColumnConfig[];
export type DerivedColumnConfig = InputColumnConfig & {
    columnWidth: string;
    columnFixed: boolean;
    onlyDev: boolean;
    isHide: boolean;
    index: number;
    size: string;
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
const createItem = (
    {
        name,
        type,
        accessor,
        columnWidth = 'auto',
        columnFixed = false,
        onlyDev = false,
        isHide = false,
        size = '400px',
    }: {
        name: string;
        type: ColumnDataType;
        accessor: string;
        columnWidth?: string | undefined;
        columnFixed?: boolean | undefined;
        onlyDev?: boolean | undefined;
        isHide?: boolean | undefined;
        size?: string | undefined;
    },
    index: number,
) => {
    return {
        name,
        type,
        accessor,
        columnWidth,
        columnFixed,
        onlyDev,
        isHide,
        index,
        size,
    };
};
export class Grid<T extends { [key: string]: number | string }> {
    items: Array<T>;

    // columns: DerivedColumnConfigs;

    currentColumns: DerivedColumnConfigs;

    originalColumnState: DerivedColumnConfigs;

    renderRows: T[];

    isDevMode: boolean;

    isDevModeSubscribeFunctionList: {
        id: string;
        callback: (v: boolean) => void;
    }[];

    constructor(items: T[], option?: Option) {
        this.items = items;
        this.renderRows = [];
        this.currentColumns = [];
        this.originalColumnState = [];
        //init Rows
        this.renderRows = getRenderRows<T>(items);
        this.isDevMode = false;
        this.isDevModeSubscribeFunctionList = [];
    }

    addColumn(config: InputColumnConfig | InputColumnConfigs) {
        const isArray = Array.isArray(config);

        if (isArray) {
            const nextColumns = config.map((column, i) => {
                const derivedColumn = createItem(column, i);
                return derivedColumn;
            });
            this.currentColumns = [...nextColumns];
            this.originalColumnState = [...nextColumns];
        }

        if (!isArray) {
            const derivedColumn = createItem(config, this.originalColumnState.length + 1);
            this.originalColumnState.push(derivedColumn);
        }
    }

    // getRenderColumnList() {
    //     return this.columns.filter((item) => item.isVisible);
    // }

    getColumns() {
        return this.originalColumnState;
    }

    getRows() {
        return this.items;
    }

    //인자로 함수를 받음
    subscribeDevMode(f: (v: boolean) => void) {
        // 콜백함수에 받아온 함수 넣고, id에 고유한 아이디 만들어서 넣어줌)
        const result = { id: uuidv4(), callback: f };

        // 클래스 내부에 isDevModeSubscribeFunctionList 이라는 배열이 있는데 거기안에 넣어줌.(등-록/구-독)
        this.isDevModeSubscribeFunctionList.push(result);

        //이건 리턴 해줄 녀석인데, 이걸 받아서 실행하면, 구독이 해제됨.
        const unSubscribeFunction = () =>
            this.isDevModeSubscribeFunctionList.filter((item) => item.id !== result.id);
        return unSubscribeFunction;
    }

    setDevMode(v: boolean) {
        const prevState = this.isDevMode;
        this.isDevMode = v;
        if (prevState !== v) {
            console.log('동작');
            this.isDevModeSubscribeFunctionList.map((item) => item.callback(v));
        }
    }

    resetColumns() {
        return (this.currentColumns = [...this.originalColumnState]);
    }

    columnChange(from: number, to: number) {
        const errorCase =
            from === to ||
            from < 0 ||
            to < 0 ||
            from > this.currentColumns.length - 1 ||
            to > this.currentColumns.length - 1;

        if (errorCase) throw new Error('error');

        const nextColumns = [...this.currentColumns];

        nextColumns.splice(to, 0, nextColumns.splice(from, 1)[0]);

        for (let i = from + 1; i <= to; i++) {
            nextColumns[i].index -= 1;
        }

        this.currentColumns = nextColumns;
    }
}
