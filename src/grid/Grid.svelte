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

    // let renderColumnList = test.getRenderColumnList();
    let renderRowList = test.getRenderRowList();
    let rowsData = [...renderRowList].map((item) => item[1]).map((item) => Object.values(item));
    console.log(rowsData);
</script>

<div class="dataTables_scroll"
    ><div
        class="dataTables_scrollHead"
        style="overflow: hidden; position: relative; border: 0px; width: 100%;"
        ><div
            class="dataTables_scrollHeadInner"
            style="box-sizing: content-box; width: 1071.56px; padding-right: 0px;"
            ><table
                class="display nowrap dataTable no-footer"
                style="width: 1071.56px; margin-left: 0px;"
                ><thead>
                    <tr
                        ><th
                            class="sorting sorting_asc"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 72.8281px;"
                            aria-sort="ascending"
                            aria-label="First name: activate to sort column descending"
                            >First name</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 71.2344px;"
                            aria-label="Last name: activate to sort column ascending">Last name</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 175px;"
                            aria-label="Position: activate to sort column ascending">Position</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 76.0469px;"
                            aria-label="Office: activate to sort column ascending">Office</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 27.2188px;"
                            aria-label="Age: activate to sort column ascending">Age</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 66.4219px;"
                            aria-label="Start date: activate to sort column ascending"
                            >Start date</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 56.0781px;"
                            aria-label="Salary: activate to sort column ascending">Salary</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 35.2188px;"
                            aria-label="Extn.: activate to sort column ascending">Extn.</th
                        ><th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example"
                            rowspan="1"
                            colspan="1"
                            style="width: 167.516px;"
                            aria-label="E-mail: activate to sort column ascending">E-mail</th
                        ></tr
                    >
                </thead></table
            ></div
        ></div
    ><div class="dataTables_scrollBody" style="position: relative; overflow: auto; width: 100%;"
        ><table
            id="example"
            class="display nowrap dataTable no-footer"
            style="width: 100%;"
            aria-describedby="example_info"
            ><thead>
                <tr style="height: 0px;"
                    ><th
                        class="sorting sorting_asc"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 72.8281px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-sort="ascending"
                        aria-label="First name: activate to sort column descending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >First name</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 71.2344px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Last name: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Last name</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 175px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Position: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Position</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 76.0469px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Office: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Office</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 27.2188px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Age: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Age</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 66.4219px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Start date: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Start date</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 56.0781px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Salary: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Salary</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 35.2188px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="Extn.: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >Extn.</div
                        ></th
                    ><th
                        class="sorting"
                        aria-controls="example"
                        rowspan="1"
                        colspan="1"
                        style="width: 167.516px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;"
                        aria-label="E-mail: activate to sort column ascending"
                        ><div class="dataTables_sizing" style="height: 0px; overflow: hidden;"
                            >E-mail</div
                        ></th
                    ></tr
                >
            </thead>

            <tbody>
                <tr class="odd">
                    <td class="sorting_1">Airi</td>
                    <td>Satou</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>33</td>
                    <td>2008-11-28</td>
                    <td>$162,700</td>
                    <td>5407</td>
                    <td>a.satou@datatables.net</td>
                </tr><tr class="even">
                    <td class="sorting_1">Angelica</td>
                    <td>Ramos</td>
                    <td>Chief Executive Officer (CEO)</td>
                    <td>London</td>
                    <td>47</td>
                    <td>2009-10-09</td>
                    <td>$1,200,000</td>
                    <td>5797</td>
                    <td>a.ramos@datatables.net</td>
                </tr><tr class="odd">
                    <td class="sorting_1">Ashton</td>
                    <td>Cox</td>
                    <td>Junior Technical Author</td>
                    <td>San Francisco</td>
                    <td>66</td>
                    <td>2009-01-12</td>
                    <td>$86,000</td>
                    <td>1562</td>
                    <td>a.cox@datatables.net</td>
                </tr><tr class="even">
                    <td class="sorting_1">Bradley</td>
                    <td>Greer</td>
                    <td>Software Engineer</td>
                    <td>London</td>
                    <td>41</td>
                    <td>2012-10-13</td>
                    <td>$132,000</td>
                    <td>2558</td>
                    <td>b.greer@datatables.net</td>
                </tr><tr class="odd">
                    <td class="sorting_1">Brenden</td>
                    <td>Wagner</td>
                    <td>Software Engineer</td>
                    <td>San Francisco</td>
                    <td>28</td>
                    <td>2011-06-07</td>
                    <td>$206,850</td>
                    <td>1314</td>
                    <td>b.wagner@datatables.net</td>
                </tr><tr class="even">
                    <td class="sorting_1">Brielle</td>
                    <td>Williamson</td>
                    <td>Integration Specialist</td>
                    <td>New York</td>
                    <td>61</td>
                    <td>2012-12-02</td>
                    <td>$372,000</td>
                    <td>4804</td>
                    <td>b.williamson@datatables.net</td>
                </tr><tr class="odd">
                    <td class="sorting_1">Bruno</td>
                    <td>Nash</td>
                    <td>Software Engineer</td>
                    <td>London</td>
                    <td>38</td>
                    <td>2011-05-03</td>
                    <td>$163,500</td>
                    <td>6222</td>
                    <td>b.nash@datatables.net</td>
                </tr><tr class="even">
                    <td class="sorting_1">Caesar</td>
                    <td>Vance</td>
                    <td>Pre-Sales Support</td>
                    <td>New York</td>
                    <td>21</td>
                    <td>2011-12-12</td>
                    <td>$106,450</td>
                    <td>8330</td>
                    <td>c.vance@datatables.net</td>
                </tr><tr class="odd">
                    <td class="sorting_1">Cara</td>
                    <td>Stevens</td>
                    <td>Sales Assistant</td>
                    <td>New York</td>
                    <td>46</td>
                    <td>2011-12-06</td>
                    <td>$145,600</td>
                    <td>3990</td>
                    <td>c.stevens@datatables.net</td>
                </tr><tr class="even">
                    <td class="sorting_1">Cedric</td>
                    <td>Kelly</td>
                    <td>Senior Javascript Developer</td>
                    <td>Edinburgh</td>
                    <td>22</td>
                    <td>2012-03-29</td>
                    <td>$433,060</td>
                    <td>6224</td>
                    <td>c.kelly@datatables.net</td>
                </tr></tbody
            >
        </table></div
    ></div
>

<!-- <div class="table-wrapper">
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
</div> -->
