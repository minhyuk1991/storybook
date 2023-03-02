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
            onlyDev: true,
            isHide: false,
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
    let renderColumnList = test.getColumns();
    let renderRowList = test.getRows();
    // let rowsData = [...renderRowList].map((item) => item[1]).map((item) => Object.values(item));
    // let renderRowList = test.items;
    let count = 0;
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
</script>

<svelte:window on:click="{a}" />
<div class="{`${isSelect ? 'select' : ''} test grid`}" on:click="{() => {}}">
    <button on:click="{() => count++}">count+1</button>
    <p>{count}</p>
    <!-- <button
        on:click="{() => {
            test._columnChange(0, 7);
            const next = test.getRenderColumnList();
            renderColumnList = next;
        }}">chage column</button
    > -->
    <GridHeader isDevMode="{isDevMode}" scrollX="{scrollX}" renderColumnList="{renderColumnList}" />
    <GridBody
        isDevMode="{isDevMode}"
        scrollHandler="{scrollHandler}"
        rowsData="{renderRowList}"
        scrollY="{scrollY}"
        scrollX="{scrollX}"
        renderColumnList="{renderColumnList}"
    />
</div>
