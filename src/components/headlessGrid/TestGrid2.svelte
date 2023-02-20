<style>
    table {
        border-spacing: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
    }
    table thead {
        border-radius: 20px 20px 0 0;
        overflow: hidden;
    }
    th,
    td {
        /* border-bottom: 1px solid black; */
        /* border-right: 1px solid black; */
        padding: 0.5rem;
    }
    thead th,
    thead td {
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    th {
        position: relative;
        background: #424242;
        color: white;
    }

    th .resizer {
        position: absolute;
        top: 0;
        bottom: 0;
        right: -1px;
        width: 8px;
        z-index: 1;
        cursor: col-resize;
    }

    th .resizer:hover {
        background: rgba(255, 255, 255, 0.3);
        width: 2px;
    }
    .sorted {
        background: rgb(144, 191, 148, 0.5);
    }
    .matches {
        font-weight: 700;
    }
    .group {
        background: rgb(144, 191, 148, 0.5);
    }
    .aggregate {
        background: rgb(238, 212, 100, 0.5);
    }
    .repeat {
        background: rgb(255, 139, 139, 0.5);
    }
    .selected {
        background: rgb(148, 205, 255, 0.5);
    }

    .button-area {
        /* border: 1px solid brown; */
    }

    .button-prev {
        color: brown;
    }
    .button-next {
        color: aqua;
    }
</style>

<script>
    import { derived, readable } from 'svelte/store';
    import { Render, Subscribe, createTable, createRender } from 'svelte-headless-table';
    import {
        addColumnFilters,
        addColumnOrder,
        addHiddenColumns,
        addSortBy,
        addTableFilter,
        addPagination,
        addExpandedRows,
        matchFilter,
        numberRangeFilter,
        textPrefixFilter,
        addSubRows,
        addGroupBy,
        addSelectedRows,
        addResizedColumns,
    } from 'svelte-headless-table/plugins';

    import { mean, sum } from './math';
    import { getShuffled } from './getShuffled';
    import { getDistinct } from './array';
    import { createSamples } from './createSamples';
    import Italic from './Italic.svelte';
    import Profile from './Profile.svelte';
    import TextFilter from './TextFilter.svelte';
    import NumberRangeFilter from './NumberRangeFilter.svelte';
    import SelectFilter from './SelectFilter.svelte';
    import ExpandIndicator from './ExpandIndicator.svelte';
    import SelectIndicator from './SelectIndicator.svelte';

    const data = readable(createSamples(1000));

    const table = createTable(data, {
        subRows: addSubRows({
            children: 'children',
        }),
        filter: addColumnFilters(),
        tableFilter: addTableFilter({
            includeHiddenColumns: true,
        }),
        group: addGroupBy({
            initialGroupByIds: [],
        }),
        sort: addSortBy(),
        expand: addExpandedRows({
            initialExpandedIds: { 1: true },
        }),
        select: addSelectedRows({
            initialSelectedDataIds: { 1: true },
        }),
        orderColumns: addColumnOrder(),
        hideColumns: addHiddenColumns(),
        page: addPagination({
            initialPageSize: 20,
        }),
        resize: addResizedColumns(),
    });

    const columns = table.createColumns([
        table.display({
            id: 'selected',
            header: '',
            cell: ({ row }, { pluginStates }) => {
                const { isSelected, isSomeSubRowsSelected } = pluginStates.select.getRowState(row);
                return createRender(SelectIndicator, {
                    isSelected,
                    isSomeSubRowsSelected,
                });
            },
            plugins: {
                resize: {
                    disable: true,
                },
            },
        }),
        table.display({
            id: 'expanded',
            header: '',
            cell: ({ row }, { pluginStates }) => {
                const { isExpanded, canExpand, isAllSubRowsExpanded } =
                    pluginStates.expand.getRowState(row);
                return createRender(ExpandIndicator, {
                    isExpanded,
                    canExpand,
                    isAllSubRowsExpanded,
                    depth: row.depth,
                });
            },
            plugins: {
                resize: {
                    disable: true,
                },
            },
        }),
        table.column({
            header: 'Summary',
            id: 'summary',
            accessor: (item) => item,
            cell: ({ value }) =>
                createRender(Profile, {
                    age: value.age,
                    progress: value.progress,
                    name: `${value.firstName} ${value.lastName}`,
                }),
            plugins: {
                sort: {
                    getSortValue: (i) => i.lastName,
                },
                tableFilter: {
                    getFilterValue: (i) => i.progress,
                },
            },
        }),
        table.group({
            header: (_, { rows, pageRows }) =>
                derived(
                    [rows, pageRows],
                    ([_rows, _pageRows]) =>
                        `Name (${_rows.length} records, ${_pageRows.length} in page)`,
                ),
            columns: [
                table.column({
                    header: createRender(Italic, { text: 'First Name' }),
                    accessor: 'firstName',
                    plugins: {
                        group: {
                            getAggregateValue: (values) => getDistinct(values).length,
                            cell: ({ value }) => `${value} unique`,
                        },
                        sort: {
                            invert: true,
                        },
                        filter: {
                            fn: textPrefixFilter,
                            render: ({ filterValue, values }) =>
                                createRender(TextFilter, { filterValue, values }),
                        },
                    },
                }),
                table.column({
                    header: () => 'Last Name',
                    accessor: 'lastName',
                    plugins: {
                        group: {
                            getAggregateValue: (values) => getDistinct(values).length,
                            cell: ({ value }) => `${value} unique`,
                        },
                    },
                }),
            ],
        }),
        table.group({
            header: (_, { rows }) =>
                createRender(
                    Italic,
                    derived(rows, (_rows) => ({ text: `Info (${_rows.length} samples)` })),
                ),
            columns: [
                table.column({
                    header: 'Age',
                    accessor: 'age',
                    plugins: {
                        group: {
                            getAggregateValue: (values) => mean(values),
                            cell: ({ value }) => `${value.toFixed(2)} (avg)`,
                        },
                        resize: {
                            minWidth: 50,
                            initialWidth: 100,
                            maxWidth: 200,
                        },
                    },
                }),
                table.column({
                    header: 'Status',
                    id: 'status',
                    accessor: (item) => item.status,
                    plugins: {
                        sort: {
                            disable: true,
                        },
                        filter: {
                            fn: matchFilter,
                            render: ({ filterValue, preFilteredValues }) =>
                                createRender(SelectFilter, { filterValue, preFilteredValues }),
                        },
                        tableFilter: {
                            exclude: true,
                        },
                        resize: {
                            disable: true,
                        },
                    },
                }),
                table.column({
                    header: 'Visits',
                    accessor: 'visits',
                    plugins: {
                        group: {
                            getAggregateValue: (values) => sum(values),
                            cell: ({ value }) => `${value} (total)`,
                        },
                        filter: {
                            fn: numberRangeFilter,
                            initialFilterValue: [null, null],
                            render: ({ filterValue, values }) =>
                                createRender(NumberRangeFilter, { filterValue, values }),
                        },
                    },
                }),
                table.column({
                    header: 'Profile Progress',
                    accessor: 'progress',
                    plugins: {
                        group: {
                            getAggregateValue: (values) => mean(values),
                            cell: ({ value }) => `${value.toFixed(2)} (avg)`,
                        },
                    },
                }),
            ],
        }),
    ]);

    const {
        flatColumns,
        headerRows,
        pageRows,
        tableAttrs,
        tableBodyAttrs,
        visibleColumns,
        pluginStates,
    } = table.createViewModel(columns);
    const ids = flatColumns.map((c) => c.id);

    const { groupByIds } = pluginStates.group;
    const { sortKeys } = pluginStates.sort;
    const { filterValues } = pluginStates.filter;
    const { filterValue } = pluginStates.tableFilter;
    const { selectedDataIds } = pluginStates.select;
    const { pageIndex, pageCount, pageSize, hasPreviousPage, hasNextPage } = pluginStates.page;
    const { expandedIds } = pluginStates.expand;
    const { columnIdOrder } = pluginStates.orderColumns;
    $columnIdOrder = ids;
    const { hiddenColumnIds } = pluginStates.hideColumns;
    let hideForId = Object.fromEntries(ids.map((id) => [id, false]));
    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => hide)
        .map(([id]) => id);
    const { columnWidths } = pluginStates.resize;
</script>

<div style:margin-top="1rem">
    <label for="page-size" class="">Page size</label>
    <input id="page-size" type="number" min="{1}" bind:value="{$pageSize}" />
</div>
<div class="button-area">
    <div>{$pageIndex + 1} of {$pageCount}</div>
    <button on:click="{() => $pageIndex--}" disabled="{!$hasPreviousPage}" class="button-prev"
        >Previous</button
    >
    <button on:click="{() => $pageIndex++}" disabled="{!$hasNextPage}" class="button-next"
        >Next</button
    >
</div>

<div style:overflow-x="auto">
    <table {...$tableAttrs}>
        <thead>
            {#each $headerRows as headerRow (headerRow.id)}
                <Subscribe attrs="{headerRow.attrs()}" let:attrs>
                    <tr {...attrs}>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe
                                attrs="{cell.attrs()}"
                                let:attrs
                                props="{cell.props()}"
                                let:props
                            >
                                <th
                                    {...attrs}
                                    on:click="{props.sort.toggle}"
                                    class:sorted="{props.sort.order !== undefined}"
                                    use:props.resize
                                >
                                    <div>
                                        <Render of="{cell.render()}" />
                                        {#if props.sort.order === 'asc'}
                                            ⬇️
                                        {:else if props.sort.order === 'desc'}
                                            ⬆️
                                        {/if}
                                    </div>
                                    {#if !props.group.disabled}
                                        <button on:click|stopPropagation="{props.group.toggle}">
                                            {#if props.group.grouped}
                                                ungroup
                                            {:else}
                                                group
                                            {/if}
                                        </button>
                                    {/if}
                                    {#if props.filter !== undefined}
                                        <Render of="{props.filter.render}" />
                                    {/if}
                                    {#if !props.resize.disabled}
                                        <div
                                            class="resizer"
                                            on:click|stopPropagation
                                            use:props.resize.drag></div>
                                    {/if}
                                </th>
                            </Subscribe>
                        {/each}
                    </tr>
                </Subscribe>
            {/each}
        </thead>
        <tbody {...$tableBodyAttrs}>
            {#each $pageRows as row (row.id)}
                <Subscribe attrs="{row.attrs()}" let:attrs rowProps="{row.props()}" let:rowProps>
                    <tr {...attrs} class:selected="{rowProps.select.selected}">
                        {#each row.cells as cell (cell.id)}
                            <Subscribe
                                attrs="{cell.attrs()}"
                                let:attrs
                                props="{cell.props()}"
                                let:props
                            >
                                <td
                                    {...attrs}
                                    class:sorted="{props.sort.order !== undefined}"
                                    class:matches="{props.tableFilter.matches}"
                                    class:group="{props.group.grouped}"
                                    class:aggregate="{props.group.aggregated}"
                                    class:repeat="{props.group.repeated}"
                                >
                                    {#if !props.group.repeated}
                                        <Render of="{cell.render()}" />
                                    {/if}
                                </td>
                            </Subscribe>
                        {/each}
                    </tr>
                </Subscribe>
            {/each}
        </tbody>
    </table>
</div>
