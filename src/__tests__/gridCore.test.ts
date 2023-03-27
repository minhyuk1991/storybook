import { createMockDataList } from './../mockData';

import '@testing-library/jest-dom';
import { DerivedColumnConfig, GridCore, InputColumnConfig } from '../grid/GridCore';
import type { MockData } from '../types';

describe('button ', () => {
    const mockData = createMockDataList(40000);
    const test = new GridCore(mockData, { resizable: true });
    const list: InputColumnConfig<MockData>[] = [
        {
            name: 'id',
            type: 'string',
            accessor: 'id',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: true,
            isHide: false,
            size: '200px',
        },
        {
            name: 'hostName',
            type: 'string',
            accessor: 'hostName',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
        {
            name: 'top',
            type: 'string',
            accessor: 'top',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
        {
            name: 'cpu',
            type: 'string',
            accessor: 'cpu',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
        {
            name: 'mem',
            type: 'string',
            accessor: 'mem',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
        {
            name: 'diskName',
            type: 'string',
            accessor: 'diskName',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
        {
            name: 'disk',
            type: 'string',
            accessor: 'disk',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
            isHide: false,
        },
    ];
    test.addColumn(list);
    // const renderColumnList = test.getColumns();
    it('addColumn length 체크', () => {
        expect(test.getColumns().length === list.length).toBeTruthy();
    });
    it('addColumn 확인', () => {
        const result = test.getColumns()[0].name === 'id';
        expect(result).toBeTruthy();
    });
    it('addColumn onlyDev', () => {
        const result = test.getColumns()[0].onlyDev === true;
        expect(result).toBeTruthy();
    });
    it('getColumns', () => {
        expect(test.currentColumns === test.getColumns()).toBeTruthy();
    });
    it('subscribeDevMode', () => {
        const unSubscribe = test.subscribeDevMode(() => console.log('test'));
        expect(typeof test.isDevModeSubscribeFunctionList[0].id === 'string').toBeTruthy();
        unSubscribe();
        expect(test.isDevModeSubscribeFunctionList.length === 0).toBeTruthy();
    });

    it('updateColumnWidth', () => {
        const testCase: DerivedColumnConfig<MockData> = {
            name: 'id',
            type: 'string',
            accessor: 'id',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: true,
            isHide: false,
            index: 0,
            size: '200px',
        };
        const testSize = testCase.size;
        test.updateColumnWidth(testSize, testCase);
        expect(test.currentColumns[0].size === testSize).toBeTruthy();
    });

    it('columnChange from<to', () => {
        const testArg1 = [0, test.currentColumns[0]] as const;
        const from = testArg1[0];
        const fromColumn = testArg1[1];
        const testArg2 = [2, test.currentColumns[2]] as const;
        const to = testArg2[0];

        test.columnChange(testArg1[from], to);
        expect(test.currentColumns[to] === fromColumn).toBeTruthy();
    });

    it('columnChange from>to', () => {
        const testArg1 = [4, test.currentColumns[4]] as const;
        const fromColumn = testArg1[1];
        const testArg2 = [1, test.currentColumns[1]] as const;
        const to = testArg2[0];
        test.columnChange(testArg1[0], testArg2[0]);
        // expect(test.currentColumns[2] === testArg1[1]).toBeTruthy();
        expect(test.currentColumns[to] === fromColumn).toBeTruthy();
    });
});
