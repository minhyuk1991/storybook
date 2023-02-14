<script>
    import { getDistinct } from './array';

    export let filterValue; //: Writable<string>;
    export let preFilteredValues; //: Readable<unknown[]>;
    $: uniqueValues = getDistinct($preFilteredValues);
</script>

<select bind:value="{$filterValue}" on:click|stopPropagation>
    <option value="{undefined}">All</option>
    {#each uniqueValues as value}
        <option value="{value}">{value}</option>
    {/each}
</select>
