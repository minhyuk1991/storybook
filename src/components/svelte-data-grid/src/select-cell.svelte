<style>
    .select-cell {
        background: white;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    select {
        border: none;
    }
    select {
        width: 100%;
        height: 100%;
        padding: 0 5px;
    }
</style>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let select: { value: string };
    type Colum = {
        display: string | Function;
        dataName: string;
        options: any[];
        width: number;
        headerComponent: any;
        cellComponent: any;
        disallowResize: boolean;
    };
    export let column: Colum;
    export let row: { data: { [key: Colum['dataName']]: any } };
    export let rowNumber: number;
    function getOptionDisplay(display: string | Function) {
        console.log('display');
        if (display instanceof Function) {
            return display();
        }
        return display;
    }

    $: {
        console.log(column.display instanceof Function), [column];
    }
    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
    export function onChange(
        event: Event & {
            currentTarget: EventTarget & HTMLSelectElement;
        },
    ) {
        // delay this until after the ui updates on the screen
        setTimeout(() => {
            dispatch('valueupdate', {
                row,
                column,
                value: select.value,
                rowNumber,
            });
        }, 0);
    }
</script>

<div class="select-cell">
    {#if column.options instanceof Array}
        <select on:change="{onChange}" bind:this="{select}">
            {#each column.options as option}
                <option
                    value="{option.value}"
                    selected="{option.value === row.data[column.dataName]}"
                >
                    {getOptionDisplay(option.display)}
                </option>
            {/each}
        </select>
    {/if}
</div>
