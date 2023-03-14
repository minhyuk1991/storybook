<style>
    .table {
        position: relative;
    }
    .table_wrapper {
    }
    .table_wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0 auto;
    }
    .table {
    }
    .test.select {
        border: 3px solid gold;
    }
</style>

<script lang="ts">
    import { onDestroy } from 'svelte';
    import { createMockDataList } from '../mockData';
    import { Grid } from './Grid';
    import GridBody from './_components/GridBody.svelte';
    import GridHeader from './_components/GridHeader.svelte';
    let mockData = createMockDataList(40000);
    export let isDevMode: boolean;
    const test = new Grid(mockData, { resizable: true });
    $: {
    }

    test.addColumn([
        {
            name: 'id',
            type: 'string',
            accessor: 'id',
            columnWidth: 'string',
            columnFixed: true,
            onlyDev: false,
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
    ]);
    const unSubscribeDevMode = test.subscribeDevMode((v: boolean) => {
        console.log('ddd');
        isDevMode = v;
    });
    let renderColumnList = test.getColumns();
    let renderRowList = test.getRows();
    let isSelect = false;

    let scrollX: number;
    let scrollY: number;
    const scrollHandler = (
        e: UIEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) => {
        scrollX = (e.target as HTMLDivElement).scrollLeft;
        scrollY = (e.target as HTMLDivElement).scrollTop;
    };

    const a = (
        e: MouseEvent & {
            currentTarget: EventTarget & Window;
        },
    ) => {
        console.log((e.target as HTMLElement).classList);
    };
    onDestroy(() => {
        unSubscribeDevMode();
    });

    let mouseDownLock = false;
    const updateGridColumn = () => {
        renderColumnList = test.getColumns();
    };

    const mouseDownLockChange = (v: boolean) => {
        mouseDownLock = v;
    };
</script>

<svelte:window on:click="{a}" on:keydown="{() => {}}" />
<div
    class="{`${isSelect ? 'select' : ''} test grid`}"
    on:click="{() => {}}"
    on:keydown="{() => {}}"
>
    <button
        on:keydown="{() => {}}"
        on:click="{() => {
            test.setDevMode(!test.isDevMode);
        }}"
        >devModeToggle
    </button>
    <button
        on:keydown="{() => {}}"
        on:click="{() => {
            test.columnChange(0, 5);
            renderColumnList = test.currentColumns;
        }}">chage column</button
    >
    <button
        on:keydown="{() => {}}"
        on:click="{() => {
            console.log(test.resetColumns());
            const next = test.resetColumns();
            console.log(next);
            renderColumnList = next;
        }}">reset column</button
    >
    <GridHeader
        gridInstance="{test}"
        isDevMode="{isDevMode}"
        scrollX="{scrollX}"
        renderColumnList="{renderColumnList}"
        updateGridColumn="{updateGridColumn}"
        mouseDownLockChange="{mouseDownLockChange}"
        mouseDownLock="{mouseDownLock}"
    />
    <GridBody
        gridInstance="{test}"
        isDevMode="{isDevMode}"
        scrollHandler="{scrollHandler}"
        rowsData="{renderRowList}"
        scrollY="{scrollY}"
        scrollX="{scrollX}"
        renderColumnList="{renderColumnList}"
    />
</div>
