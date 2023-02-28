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
</style>

<script lang="ts">
    import { createMockDataList } from '../mockData';
    import { Grid } from './Grid';
    import GridBody from './_components/GridBody.svelte';
    import GridHeader from './_components/GridHeader.svelte';
    let mockData = createMockDataList(400);

    const test = new Grid(mockData, { resizable: true });

    let renderColumnList = test.getRenderColumnList();
    // let renderRowList = test.getRenderRowList();
    // let rowsData = [...renderRowList].map((item) => item[1]).map((item) => Object.values(item));
    let renderRowList = test.items;
    let count = 0;

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
</script>

<div class="test">
    <button on:click="{() => count++}">count+1</button>
    <p>{count}</p>
    <button
        on:click="{() => {
            test._columnChange(0, 7);
            const next = test.getRenderColumnList();
            renderColumnList = [...next];
        }}">aaa</button
    >
    <!-- <div class="table_wrapper"> -->
    <!-- <div class="table"> -->
    <GridHeader scrollX="{scrollX}" grid="{test}" renderColumnList="{renderColumnList}" />
    <GridBody
        scrollHandler="{scrollHandler}"
        rowsData="{renderRowList}"
        scrollY="{scrollY}"
        scrollX="{scrollX}"
        renderColumnList="{renderColumnList}"
    />
    <!-- </div> -->
    <!-- </div> -->
</div>
