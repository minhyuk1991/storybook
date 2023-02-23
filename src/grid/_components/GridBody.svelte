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
    export let rowsData: { [type: string]: any }[];
    export let renderColumnList: string[];
    console.log('rowsData', rowsData);
</script>

<div class="tbody">
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
