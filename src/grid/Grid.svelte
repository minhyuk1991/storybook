<style>
    .table {
        position: relative;
    }
    .table_wrapper {
        width: 1200px;
        overflow-x: auto;
    }
    .table_wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 800px;
        overflow-y: auto;
        margin: 0 auto;
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
    <div class="table_wrapper">
        <div class="table">
            <GridHeader grid="{test}" renderColumnList="{renderColumnList}" />
            <GridBody rowsData="{renderRowList}" renderColumnList="{renderColumnList}" />
        </div>
    </div>
</div>
