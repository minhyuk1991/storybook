<style>
    .row {
        display: flex;
        gap: 4px;
    }
    .row > div {
        padding: 0 20px;
        background: rgb(25, 5, 46);
        color: white;
        min-width: 400px;
        cursor: pointer;
    }
    .row + .row {
        margin-top: 4px;
    }

    .row:hover > div {
        background: rgb(220, 193, 248);
        color: #000;
    }
    .tbody {
        margin-top: 4px;
    }
</style>

<script lang="ts">
    import VirtualList from '@sveltejs/svelte-virtual-list';
    export let rowsData: { [type: string]: any }[];
    export let renderColumnList: string[];
    console.log('rowsData', rowsData);

    let start: number;
    let end: number;
</script>

<div class="tbody">
    <VirtualList items="{rowsData}" height="500px" bind:start="{start}" bind:end="{end}" let:item>
        <!-- <div class="row">
            {#each renderColumnList as cell}
                <div>{row[cell]}</div>
            {/each}
        </div> -->
        {#each rowsData as row}
            <div class="row">
                {#each item as cell}
                    {console.log()}
                    <div>row{cell}</div>
                {/each}
            </div>
        {/each}
    </VirtualList>

    <!-- <div class="row">
            {#each renderColumnList as cell}
                <div>{row[cell]}</div>
            {/each}
        </div> -->
    <!-- {#each rowsData as row}
            <div class="row">
                {#each renderColumnList as cell}
                    <div>{row[cell]}</div>
                {/each}
            </div>
        {/each} -->
</div>
