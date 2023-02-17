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
    .table {
        width: 1000px;
        border-collapse: separate;
        text-indent: initial;
        border-spacing: 2px;
    }

    .table thead {
        word-break: keep-all;
    }

    .table thead tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }

    .table thead tr td {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        white-space: nowrap;
        box-sizing: content-box;
        white-space: nowrap;
        display: table-cell;
    }

    .table body tr td {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        white-space: nowrap;
        box-sizing: content-box;
        white-space: nowrap;
        display: table-cell;
    }

    .table thead ~ tbody,
    .table thead ~ tfoot {
        text-align: center;
    }

    .table-data {
        border-top: 2px solid #2c53b0;
        border-left: 1px solid #e5e5e5;
        width: 100%;

        display: table;
        border-collapse: separate;
        box-sizing: border-box;
        text-indent: initial;
        border-spacing: 2px;
        border-color: grey;
    }

    .table-data th,
    .table-data td {
        height: 39px;
        padding: 7px 10px;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
    }

    .table-data th {
        font-size: 0.16rem;
        font-weight: normal;
        background-color: #4d6fb9;
        color: #fff;
        cursor: pointer;
    }

    .th2 {
        font-size: 0.16rem;
        font-weight: normal;
        background-color: #2c53b0 !important;
        color: #fff;
    }

    .table-data thead {
        text-align: center;
    }

    .table-data tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
        width: 100%;
        margin: 0 auto;
        clear: both;
        border-collapse: separate;
        border-spacing: 0;
    }
    .table-data tbody tr:first-child th,
    .table-data tbody tr:first-child td {
        border-top: 1px solid #bfbfbf;
    }

    .table-data thead th:hover {
        background-color: #25499e !important;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .table-wrapper {
        position: relative;
        overflow: auto;
        width: 100%;
        display: block;
    }
</style>

<script lang="ts">
    import { createMockDataList } from '../mockData';
    import { Grid } from './Grid';
    let mockData = createMockDataList(400);

    const test = new Grid(mockData, { resizable: true });

    let renderColumnList = test.getRenderColumnList();
    let renderRowList = test.getRenderRowList();
    let rowsData = [...renderRowList].map((item) => item[1]).map((item) => Object.values(item));
    console.log(rowsData);
</script>

<div class="table-wrapper">
    <table class="table-data table">
        <thead>
            <tr>
                {#each renderColumnList as item}
                    <th style="width : 200px;" draggable="true">{item}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rowsData as row}
                <tr>
                    {#each Object.entries(row) as cell}
                        <td>
                            {cell}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
