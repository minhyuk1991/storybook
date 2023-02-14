<style>
    div {
        display: flex;
        gap: 0.5rem;
    }
</style>

<script>
    import { isNumber } from './filter';

    export let filterValue; //: Writable<[number | null, number | null]>;

    export let values; //: Readable<unknown[]>;
    $: min = $values.length === 0 ? 0 : Math.min(...$values.filter(isNumber));
    $: max = $values.length === 0 ? 0 : Math.max(...$values.filter(isNumber));
</script>

<div>
    <input
        type="number"
        bind:value="{$filterValue[0]}"
        on:click|stopPropagation
        placeholder="Min ({min})"
    />
    to
    <input
        type="number"
        bind:value="{$filterValue[1]}"
        on:click|stopPropagation
        placeholder="Max ({max})"
    />
</div>
