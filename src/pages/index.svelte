<script lang="ts">
  import Layout from '../components/layout/Layout.svelte';
  import DataGrid from './../components/svelte-data-grid/src/index.svelte';
  import LineChartCell from './../components/svelte-data-grid/src/lineChart-cell.svelte';
  import PercentageChartCell from './../components/svelte-data-grid/src/percentageChart-cell.svelte';

  import { createMockDataList } from '../mockData';
  import { onDestroy, onMount } from 'svelte';
  import * as d3 from 'd3';

  const myRows = [
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Apple',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Blueberry',
      fruitColor: 'Blue',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
    {
      fruitName: 'Tomato',
      fruitColor: 'Red',
    },
  ];

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
  1200;

  225;
  const saveNewColumnOrder = () => {};

  let mockData = createMockDataList(20000);
  const interValMockData = setInterval(
    () => (mockData = createMockDataList(20000)),
    1000
  );
  onDestroy(() => {
    clearInterval(interValMockData);
  });
  //
  //
</script>

<Layout>
  <DataGrid
    rows={mockData}
    allowColumnReordering={true}
    columns={myColumnDefinitions}
    on:columnOrderUpdated={saveNewColumnOrder}
    rowHeightHeader={40}
  />
  <p class="text-[400px]">Main page</p>

  <!-- <div class="lin-chart-cell">
    <svg width="960" height="520" />
  </div> -->
</Layout>
