<style>
    .checkbox-cell {
        text-align: center;
        background: white;
    }
</style>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let checkbox: { checked: boolean } | null = null;
    export let row: { data: { [key: string]: string } };
    export let column: { dataName: string };
    export let rowNumber: any;

    $: {
        if (rowNumber) {
            console.log('rowNumber', rowNumber);
        }
        [rowNumber];
    }
    console.log('ddd');
    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
    export function onChange(
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) {
        // delay this until after the ui updates on the screen
        if (checkbox) {
            setTimeout(() => {
                dispatch('valueupdate', {
                    row,
                    column,
                    value: checkbox && checkbox.checked,
                    rowNumber,
                });
            }, 0);
        }
    }
    console.log('checkbox-cell');
</script>

<div class="checkbox-cell">
    <input
        type="checkbox"
        bind:this="{checkbox}"
        checked="{row.data[column.dataName] ? true : false}"
        on:click="{(e) => {}}"
        on:click="{onChange}"
    />
</div>
