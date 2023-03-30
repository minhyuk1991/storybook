<style>
    .row {
        display: flex;
        gap: 4px;
    }
    .row > div {
        padding: 0 20px;
        background: rgb(25, 5, 46);
        color: white;
        /* min-width: 400px; */
        cursor: pointer;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .row + .row {
        margin-top: 4px;
    }

    .row:hover > div {
        background: rgb(220, 193, 248);
        color: #000;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .tbody {
        margin-top: 4px;
        width: 1200px;
        overflow: auto;
        position: relative;
        white-space: nowrap;
    }
    .tbody.overflow_x {
        width: calc(1200px - 17px);
    }
</style>

<script lang="ts">
    import {} from 'os';
    import type { MockData } from '../../types';
    import type { DerivedColumnConfig, DerivedColumnConfigs, GridCore } from '../GridCore';
    import { numberWithCommas } from './utils';
    import VirtualList from './Vl.svelte';
    export let rowsData: { [type: string]: any }[] = [];
    export let renderColumnList: DerivedColumnConfigs<MockData>;
    export let scrollY: number;
    export let scrollX: number;
    export let gridInstance: GridCore<MockData>;
    export let isDevMode: boolean;
    export let updateGridRows: () => void;
    export let scrollHandler: (
        e: UIEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) => void;
    let start: number;
    let end: number;
    type ChangeEvent = Event & {
        currentTarget: EventTarget & {
            checked: boolean;
        };
    };

    const onChangeHandler = (
        e: ChangeEvent,
        item: DerivedColumnConfig<MockData>,
        name: keyof MockData,
    ) => {
        if (gridInstance) {
            console.log(item.name);
            gridInstance.rowCheckChange(item.index, e.currentTarget.checked, name);
            updateGridRows();
        }
    };
</script>

<div class="tbody">
    <VirtualList
        items="{rowsData}"
        height="500px"
        itemHeight="{25}"
        bind:start="{start}"
        bind:end="{end}"
        let:item
        scrollHandler="{scrollHandler}"
        scrollX="{scrollX}"
        let:index="{rowIndex}"
    >
        <div class="row">
            {#each renderColumnList as cell, index}
                {#if (isDevMode || cell.onlyDev === false) && cell.type === 'string'}
                    <div
                        style="{`min-width: ${
                            typeof cell.size === 'string' ? cell.size : ''
                        };width:${cell.size}`}">{item[cell.name].value}</div
                    >
                {/if}
                {#if (isDevMode || cell.onlyDev === false) && cell.type === 'int'}
                    <div
                        style="{`min-width: ${
                            typeof cell.size === 'string' ? cell.size : ''
                        };width:${cell.size}`}">{numberWithCommas(item[cell.name].value)}</div
                    >
                {/if}

                {#if (isDevMode || cell.onlyDev === false) && cell.type === 'check' && gridInstance && gridInstance.checkTypeInfo}
                    <div
                        style="{`display:flex; justify-content:center; min-width: ${
                            typeof cell.size === 'string' ? cell.size : ''
                        };width:${cell.size}`}"
                    >
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            checked="{item[cell.name].value}"
                            on:change="{(e) => {
                                console.log('item', item.index);
                                onChangeHandler(e, item, cell.name);
                                if (e.currentTarget && e.currentTarget.checked === false) {
                                    console.log('실행!!');
                                    gridInstance.checkTypeInfo[
                                        cell.name
                                    ].currentAllIsRowsChecked = false;
                                }
                                updateGridRows();
                            }}"
                        />
                        <!-- {console.log(rowsData[index][cell.name])} -->
                    </div>
                {/if}
            {/each}
        </div>
    </VirtualList>
</div>
