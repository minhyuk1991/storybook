type Option = { resizable?: boolean; isReorder?: boolean };
import { v4 as uuidv4 } from 'uuid';

export type ColumnDataType = 'string' | 'int' | 'stringInt' | 'email' | 'url' | 'double' | 'check';

export type RenderColumnList = {
    name: string;
    isHidden: boolean;
}[];

export const getOnlyNumber = (pxString: string) => {
    const hasPXstring = pxString.slice(pxString.length - 2, pxString.length);
    if (!hasPXstring) {
        throw new Error("Unable to find string 'px'.");
    }
    const a = pxString.slice(0, pxString.length - 2);
    return a;
};

const getRenderRows = <T>(currentRows: T[]) => {
    return currentRows;
};
const createItem = <T>(
    {
        name,
        type,
        accessor,
        columnWidth = 'auto',
        columnFixed = false,
        onlyDev = false,
        isHide = false,
        size = '300px',
        isCheck = false,
    }: InputColumnConfig<T>,
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
        isCheck,
    };
};
export type InputColumnConfig<T> = {
    name: keyof T;
    type: ColumnDataType;
    accessor: string;
    columnWidth?: string;
    columnFixed?: boolean;
    onlyDev?: boolean;
    isHide?: boolean;
    size?: string;
    isCheck?: boolean;
};
export type InputColumnConfigs<T> = InputColumnConfig<T>[];
export type DerivedColumnConfig<T> = InputColumnConfig<T> & {
    columnWidth: string;
    columnFixed: boolean;
    onlyDev: boolean;
    isHide: boolean;
    index: number;
    size: string;
};
export type DerivedColumnConfigs<T> = DerivedColumnConfig<T>[];

export class GridCore<T extends { [key: string]: any }> {
    currentRows: Array<T>;

    // columns: DerivedColumnConfigs;

    currentColumns: DerivedColumnConfigs<T>;

    originalColumnState: DerivedColumnConfigs<T>;

    originalRowState: T[];

    renderRows: T[];

    isDevMode: boolean;

    isDevModeSubscribeFunctionList: {
        id: string;
        callback: (v: boolean) => void;
    }[];

    checkTypeInfo: {
        [K in keyof T]: {
            isAllRowsChecked: boolean;
            isAllRowsUnchecked: boolean;
        };
    };
    // isCheck: boolean;

    // isAllRowsChecked: boolean;

    // isAllRowsUnchecked: boolean;

    constructor(currentRows: T[], option?: Option) {
        this.currentRows = currentRows;
        this.renderRows = [];
        this.currentColumns = [];
        this.originalColumnState = [];
        //init Rows
        this.originalRowState = currentRows;
        this.renderRows = getRenderRows<T>(currentRows);
        this.isDevMode = false;
        this.isDevModeSubscribeFunctionList = [];
        this.checkTypeInfo = {} as any;
        for (const key in currentRows[0]) {
            if (currentRows[0].hasOwnProperty(key)) {
                const element = currentRows[0][key];
                if ((element as any).type === 'check') {
                    this.checkTypeInfo[key as keyof T] = {
                        isAllRowsChecked: false,
                        isAllRowsUnchecked: true,
                    };
                }
            }
        }

        // this.isCheck = false;
        // this.isAllRowsChecked = false;
        // this.isAllRowsUnchecked = true;
    }

    getOnlyDevColumnLength() {
        return this.currentColumns.filter((item) => item.onlyDev === true).length;
    }

    addColumn(config: InputColumnConfig<T> | InputColumnConfigs<T>) {
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
        return this.currentColumns;
    }

    getRows() {
        return this.currentRows;
    }

    //인자로 함수를 받음
    subscribeDevMode(f: (v: boolean) => void) {
        // 콜백함수에 받아온 함수 넣고, id에 고유한 아이디 만들어서 넣어줌)
        const result = { id: uuidv4(), callback: f };

        // 클래스 내부에 isDevModeSubscribeFunctionList 이라는 배열이 있는데 거기안에 넣어줌.(등-록/구-독)
        this.isDevModeSubscribeFunctionList.push(result);

        //이건 리턴 해줄 녀석인데, 이걸 받아서 실행하면, 구독이 해제됨.
        const unSubscribeFunction = () => {
            console.log(result);
            this.isDevModeSubscribeFunctionList = this.isDevModeSubscribeFunctionList.filter(
                (item) => item.id !== result.id,
            );
        };
        return unSubscribeFunction;
    }

    setDevMode(v: boolean) {
        const prevState = this.isDevMode;
        this.isDevMode = v;
        if (prevState !== v) {
            this.isDevModeSubscribeFunctionList.map((item) => item.callback(v));
        }
    }

    resetColumns() {
        return (this.currentColumns = [...this.originalColumnState]);
    }

    updateColumnWidth(width: string, column: DerivedColumnConfig<T>) {
        const target = this.currentColumns.find((item) => item.name === column.name);
        if (target && target.size) {
            target.size = width;
        }
    }

    columnChange(from: number, to: number) {
        const insertTarget = this.currentColumns.slice(from, from + 1)[0];
        const nextColumns = [...this.currentColumns];

        if (from < to) {
            nextColumns.splice(from, 1);
            nextColumns.splice(to === 0 ? to : to, 0, insertTarget);
        }
        if (from > to) {
            nextColumns.splice(from, 1);
            nextColumns.splice(to, 0, insertTarget);
        }

        nextColumns.forEach((item, index) => {
            item.index = index;
        });

        this.currentColumns = nextColumns;
    }

    rowCheckChange(index: number, v: boolean, name: keyof T) {
        console.log('rowCheckChange');
        if (v && this.checkTypeInfo[name]) {
            this.checkTypeInfo[name]!.isAllRowsUnchecked = false;
            console.log('name', this.checkTypeInfo[name]!.isAllRowsChecked);
        }

        if (!v) {
            console.log('name', this.checkTypeInfo[name]);

            console.log('        this.checkTypeInfo[name]!.isAllRowsChecked = false;');
            this.checkTypeInfo[name]!.isAllRowsChecked = false;
            console.log('name', this.checkTypeInfo[name]!.isAllRowsChecked);
        }

        if (this.currentRows[index] && this.currentRows[index].type === 'check') {
            (this.currentRows[index] as any).value = v;
        }
    }

    rowAllCheckChange(v: boolean, fieldName: keyof T, row: T) {
        console.log('실행');
        console.log('실행', row[fieldName]);

        if (row[fieldName] && row[fieldName].type === 'check' && fieldName) {
            console.log('실행 fieldName', fieldName);

            if (this.checkTypeInfo[fieldName].isAllRowsUnchecked && v) {
                console.log('isAllRowsUnchecked');
                this.currentRows = this.currentRows.map((item) => ({
                    ...item,
                    [fieldName]: {
                        ...item[fieldName],
                        value: true,
                    },
                }));
                console.log(this.currentRows);

                this.checkTypeInfo[fieldName].isAllRowsUnchecked = false;
                this.checkTypeInfo[fieldName].isAllRowsChecked = true;
            }

            if (this.checkTypeInfo[fieldName].isAllRowsChecked && !v) {
                console.log('isAllRowsChecked');
                this.currentRows = this.currentRows.map((item) => ({
                    ...item,
                    [fieldName]: {
                        ...item[fieldName],
                        value: false,
                    },
                }));

                console.log(this.currentRows);

                this.checkTypeInfo[fieldName].isAllRowsChecked = false;
                this.checkTypeInfo[fieldName].isAllRowsUnchecked = true;
            }
        }
    }
}
