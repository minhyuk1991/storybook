<style global>
    @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { RowSelection } from 'gridjs/plugins/selection';
    import { Grid } from 'gridjs';

    const config = {
        columns: [
            {
                id: 'selectRow',
                name: 'Select',
                data: true,

                plugin: {
                    component: RowSelection,
                    // props: {
                    //     onChange: (isSelected, rowData, updatedRowData) => {
                    //         console.log('Checkbox clicked!');
                    //         // 여기에 원하는 함수를 실행하세요.
                    //         // handleCheckboxClick(isSelected, rowData, updatedRowData);
                    //     },
                    // },
                },
            },
            {
                name: 'Name',
                formatter: (cell) => `Name: ${cell}`,
            },
            'Email',
        ],
        resizable: true,
        sort: true,
        pagination: true,
        fixedHeader: true,
        data: [
            ['John1', 'john@example.com', false],
            ['Mark2', 'mark@gmail.com', false],
        ],
    };
    const grid = new Grid(config);

    // const handleCheckboxClick = (isSelected, rowData, updatedRowData) => {
    //     console.log('isSelected:', isSelected);
    //     console.log('rowData:', rowData);
    //     console.log('updatedRowData:', updatedRowData);
    // };

    const updateValue = () => {
        console.log('aa');
        console.log(grid);
        grid.updateConfig({
            ...config,
            data: [
                ['John', 'john@example.com'],
                ['Mark', 'mark@gmail.com'],
            ],
        }).forceRender();

        console.log(grid);
    };
    onMount(() => {
        grid.render(document.querySelector('.test') as HTMLElement);
    });
</script>

<button
    on:click="{() => {
        updateValue();
    }}">button</button
>
<div class="test"> </div>
