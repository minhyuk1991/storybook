<style>
    ul {
        display: flex;
    }
    ul > li {
        background: rgba(0, 0, 0, 0.05);
        padding: 10px;
    }
    ul > li + li {
        margin-left: 4px;
    }
</style>

<script>
    import { createMockDataList } from '@/mockData';
    import { Grid } from './Grid';
    let mockData = createMockDataList(20000);
    console.log(mockData);
    // const myColumnDefinitions = [
    //     {
    //         display: 'hostName',
    //         dataName: 'hostName',
    //         width: 300,
    //     },
    //     {
    //         display: 'top',
    //         dataName: 'top',
    //         width: 300,
    //     },
    //     {
    //         display: 'cpu',
    //         dataName: 'cpu',
    //         width: 300,
    //     },
    //     {
    //         display: 'mem',
    //         dataName: 'mem',
    //         width: 150,
    //     },
    //     {
    //         display: 'swap',
    //         dataName: 'swap',
    //         width: 150,
    //     },
    //     {
    //         display: 'disk',
    //         dataName: 'disk',
    //         width: 150,
    //     },
    //     {
    //         display: 'diskName',
    //         dataName: 'diskName',
    //         width: 300,
    //     },
    // ];
    const test = new Grid(mockData, { resizable: true });

    console.log(test.getRenderColumnList());

    let renderColumnList = test.getRenderColumnList();
    console.log(renderColumnList);
    // test.setColumnOption([
    //     {
    //         dataName: 'swap',
    //         resizable: true,
    //     },
    // ]);

    // console.log(renderColumnList);
</script>

<div>
    <ul>
        <!-- {#each renderColumnList as item}
            <li style="width : 200px;">{item}</li>
        {/each} -->
    </ul>
    <ul> </ul>
</div>
