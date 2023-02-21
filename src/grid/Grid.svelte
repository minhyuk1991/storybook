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
        height: 500px;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    import { createMockDataList } from '../mockData';
    import { Grid } from './Grid';
    import GridBody from './_components/GridBody.svelte';
    import GridHeader from './_components/GridHeader.svelte';
    let mockData = createMockDataList(40);

    const test = new Grid(mockData, { resizable: true });

    let renderColumnList = test.getRenderColumnList();
    let renderRowList = test.getRenderRowList();
    let rowsData = [...renderRowList].map((item) => item[1]).map((item) => Object.values(item));
</script>

<div class="test">
    <div class="table_wrapper">
        <div class="table">
            <GridHeader grid="{test}" renderColumnList="{renderColumnList}" />
            <GridBody rowsData="{rowsData}" />
        </div>
    </div>
</div>
