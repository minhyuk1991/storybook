<script lang="ts">
  import Layout from '../components/layout/Layout.svelte';
  import DataGrid from './../components/svelte-data-grid/src/index.svelte';
  import SelectCell from './../components/svelte-data-grid/src/select-cell.svelte';
  import CheckboxCell from './../components/svelte-data-grid/src/checkbox-cell.svelte';
  import TextboxCell from './../components/svelte-data-grid/src/textbox-cell.svelte';
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
      display: 'Fruit Color1',
      dataName: 'fruitColor',
      width: 300,
    },
    {
      display: 'Fruit Color2',
      dataName: 'fruitColor',
      width: 300,
    },
    {
      display: 'Fruit Color3',
      dataName: 'fruitColor',
      width: 300,
    },
    {
      display: 'Eye Color',
      dataName: 'eyeColor',
      width: 75,
      cellComponent: SelectCell,
      options: [
        {
          display: 'Green',
          value: 'green',
        },
        {
          display: 'Blue',
          value: 'blue',
        },
        {
          display: 'Brown',
          value: 'brown',
        },
      ],
    },
    {
      display: 'Eye Color',
      dataName: 'eyeColor',
      width: 75,
      cellComponent: TextboxCell,
    },
  ];
  const saveNewColumnOrder = () => {};
</script>

<Layout>
  <DataGrid
    rows={myRows}
    allowColumnReordering={true}
    columns={myColumnDefinitions}
    on:columnOrderUpdated={saveNewColumnOrder}
  />
  <p class="text-[400px]">Main page</p>
</Layout>
