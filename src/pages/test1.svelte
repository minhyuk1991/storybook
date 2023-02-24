<script lang="ts">
    import Layout from '../components/layout/Layout.svelte';
    import DataGrid from '../components/svelte-data-grid/src/index.svelte';
    import LineChartCell from '../components/svelte-data-grid/src/lineChart-cell.svelte';
    import PercentageChartCell from '../components/svelte-data-grid/src/percentageChart-cell.svelte';

    import { createMockDataList, createMockDataListPromise } from '../mockData';
    import { onDestroy } from 'svelte';

    const myColumnDefinitions = [
        {
            display: 'hostName',
            dataName: 'hostName',
            width: 300,
        },
        {
            display: 'top',
            dataName: 'top',
            width: 300,
            cellComponent: LineChartCell,
        },
        {
            display: 'cpu',
            dataName: 'cpu',
            width: 300,
            cellComponent: PercentageChartCell,
        },
        {
            display: 'mem',
            dataName: 'mem',
            width: 150,
        },
        {
            display: 'swap',
            dataName: 'swap',
            width: 150,
        },
        {
            display: 'disk',
            dataName: 'disk',
            width: 150,
        },
        {
            display: 'diskName',
            dataName: 'diskName',
            width: 300,
        },
    ];

    const saveNewColumnOrder = () => {};

    let mockData = createMockDataList(400);

    const interValMockData = setInterval(() => {
        createMockDataListPromise(400)
            .then((result) => {
                mockData = result;
                console.log('result', result);
                console.log(mockData);
                return (mockData = result);
            })
            .catch(() => {});
    }, 1000);
    onDestroy(() => {
        clearInterval(interValMockData);
    });
    //
    //
</script>

<Layout>
    {#if mockData}
        <DataGrid
            rows="{mockData}"
            allowColumnReordering="{true}"
            columns="{myColumnDefinitions}"
            on:columnOrderUpdated="{saveNewColumnOrder}"
            rowHeightHeader="{40}"
        />
    {/if}

    <!-- <div class="lin-chart-cell">
	  <svg width="960" height="520" />
	</div> -->
</Layout>
