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
