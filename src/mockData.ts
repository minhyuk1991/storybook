import type { MockData } from './types';
import { v4 as uuidv4 } from 'uuid';

export const creatMockData = (index: number): MockData => {
    const hostName = `host-${index}`;
    return {
        id: uuidv4(),
        hostName,
        top: Math.floor(Math.random() * 100),
        cpu: Math.floor(Math.random() * 100),
        mem: Math.floor(Math.random() * 100),
        swap: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        diskName: `${hostName}-disk`,
    };
};

export const createMockDataList = (length: number) => {
    return new Array(length).fill(0).map((item, i) => creatMockData(i));
};

function createMockDataCPS(index: number, callback: (data: MockData) => void) {
    const hostName = `host-${index}`;
    const data = {
        id: uuidv4(),
        hostName,
        top: Math.floor(Math.random() * 100),
        cpu: Math.floor(Math.random() * 100),
        mem: Math.floor(Math.random() * 100),
        swap: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        diskName: `${hostName}-disk`,
    };
    callback(data);
}

export function createMockDataListPromise(length: number) {
    return new Promise<MockData[]>((resolve, reject) => {
        const result: MockData[] = [];
        console.log('aaa');

        function createNextData(i: number) {
            if (i >= length) {
                console.log('length', length);
                resolve(result);
                return;
            }

            createMockDataCPS(i, (data) => {
                console.log(result, result.length);
                result.push(data);
                setTimeout(() => createNextData(i + 1), 0);
            });
        }

        createNextData(length);
    });
}
