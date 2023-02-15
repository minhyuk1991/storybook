type Option = { resizable?: boolean };

type RenderColumn = {
    name: string;
    visible: boolean;
    width: '100%' | 'auto' | number;
    minWidth?: 'auto' | number;
    maxWidth?: 'auto' | number;
    resizable?: boolean;
    dragable?: boolean;
};

// type RenderItem<T> = {};

export class Grid<T extends { [key: string]: number | string }> {
    items: Array<T>;

    columns: { [key: string]: any };

    renderRows: Array<T & { a: number }>;

    renderColumns: Map<string, RenderColumn>;

    constructor(items: T[], option?: Option) {
        this.items = items;
        this.columns = items.length > 0 ? (Object.keys(items[0]) as Array<keyof T>) : [];
        this.renderRows = items.map((item) => ({ ...item, a: 1 }));
        this.renderColumns = new Map<string, RenderColumn>();

        this.renderColumns = new Map<string, RenderColumn>(
            items.map((item) => [
                String(item.dataName),
                {
                    name: 'a',
                    visible: true,
                    resizable: false,
                    width: 'auto',
                    minWidth: 'auto',
                    maxWidth: 'auto',
                    dragable: true,
                    ...item,
                },
            ]),
        );
    }

    getRenderRowList() {
        return this.renderRows;
    }

    getRenderColumnList() {
        return this.renderColumns;
    }

    setColumnOption(columnOptions: ({ [key: string]: unknown } & { dataName: string })[]) {
        columnOptions.map((item) => {
            const target = this.renderColumns.get(item.dataName);
            if (!target) throw new Error('dataName not found');
            const nextValue = { ...target, ...item };
            this.renderColumns.set(item.dataName, nextValue);
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
