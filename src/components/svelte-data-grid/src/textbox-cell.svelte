<style>
    .textbox-cell {
        position: relative;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 3;
    }
    input {
        height: 100%;
        width: 100%;
        border: 0;
        margin: 0;
        padding: 0 5px;
        box-sizing: border-box;
    }
    input:active,
    input:focus {
        border: 1px solid lime;
    }
</style>

<script lang="ts">
    import { afterUpdate, beforeUpdate, createEventDispatcher } from 'svelte';
    const INPUT_DEBOUNCE_INTERVAL = 400;
    const dispatch = createEventDispatcher();
    export let textbox: HTMLInputElement | null = null;
    export let column: Colum;
    export let rowNumber: number;
    export let row: {
        i: number;
        data: { [key: Colum['dataName']]: any };
    };

    let prevColumn: Colum;
    let prevRow: {
        i: number;
        data: any[];
    };

    type Colum = {
        display: string | Function;
        dataName: string;
        options: any[];
        width: number;
        headerComponent: any;
        cellComponent: any;
        disallowResize: boolean;
        activeRow?: number;
    };
    // [svelte-upgrade warning]
    // beforeUpdate and afterUpdate handlers behave
    // differently to their v2 counterparts
    beforeUpdate(() => {
        if (prevColumn !== column || prevRow !== row) {
            const updateTextbox = () => {
                if (textbox) textbox.value = row.data[column.dataName];
            };
            if (textbox) {
                updateTextbox();
            } else {
                setTimeout(updateTextbox, 0);
            }
            prevColumn = column;
        }
    });
    // [svelte-upgrade warning]
    // beforeUpdate and afterUpdate handlers behave
    // differently to their v2 counterparts
    afterUpdate(() => {
        /* Since data-grid isn't using a keyed each block to display the rows, we need to update
      the focus as the grid scrolls. When this cell component receives a new row, check if the column's active row
      is this row, and focus or blur if necessary */
        if (prevRow !== row) {
            if (column.activeRow && column.activeRow === rowNumber && textbox) {
                textbox.focus();
            } else if (textbox === document.activeElement) {
                textbox && textbox.blur();
            }
            prevRow = row as {
                i: number;
                data: any[];
            };
        }
    });
    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
    export function onFocus(
        event: FocusEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) {
        column.activeRow = rowNumber;
    }
    export function onBlur(
        event: FocusEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) {
        // if blur event was user-initiated and not initiated by the blur call above,
        // remove the activeRow property
        const e = event as FocusEvent & {
            currentTarget: EventTarget & HTMLInputElement;
        } & { sourceCapabilities: any };
        if (e.sourceCapabilities) {
            delete column.activeRow;
        }
    }
    export function onInput(
        event: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) {
        if (textbox) {
            const value = textbox.value;
            setTimeout(() => {
                dispatch('valueupdate', {
                    row,
                    column,
                    value,
                    rowNumber,
                });
            }, 0);
        }
    }
</script>

<div class="textbox-cell">
    <input
        type="text"
        on:input="{onInput}"
        on:focus="{onFocus}"
        on:blur="{onBlur}"
        bind:this="{textbox}"
    />
</div>
