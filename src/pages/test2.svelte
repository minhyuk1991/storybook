<script lang="ts">
    import Layout from '../components/layout/Layout.svelte';
    import TestGrid from '../components/headlessGrid/TestGrid.svelte';
    import { createMockDataList } from '../mockData';
    import { onDestroy } from 'svelte';

    // const myColumnDefinitions = [
    // 	{
    // 		display: 'hostName',
    // 		dataName: 'hostName',
    // 		width: 300,
    // 	},
    // 	{
    // 		display: 'top',
    // 		dataName: 'top',
    // 		width: 300,
    // 		cellComponent: LineChartCell,
    // 	},
    // 	{
    // 		display: 'cpu',
    // 		dataName: 'cpu',
    // 		width: 300,
    // 		cellComponent: PercentageChartCell,
    // 	},
    // 	{
    // 		display: 'mem',
    // 		dataName: 'mem',
    // 		width: 150,
    // 	},
    // 	{
    // 		display: 'swap',
    // 		dataName: 'swap',
    // 		width: 150,
    // 	},
    // 	{
    // 		display: 'disk',
    // 		dataName: 'disk',
    // 		width: 150,
    // 	},
    // 	{
    // 		display: 'diskName',
    // 		dataName: 'diskName',
    // 		width: 300,
    // 	},
    // ];

    // const saveNewColumnOrder = () => {};

    let mockData = createMockDataList(20000);
    const interValMockData = setInterval(() => (mockData = createMockDataList(20000)), 1000);
    onDestroy(() => {
        clearInterval(interValMockData);
    });
    //
    //
</script>

<Layout>
    <TestGrid />
</Layout>
