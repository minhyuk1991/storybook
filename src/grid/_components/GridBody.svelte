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
        margin-top: 10px;
    }

    .row:hover > div {
        background: rgb(39, 8, 71);
    }
</style>

<script lang="ts">
    export let rowsData: (string | number)[][];
</script>

<div class="tbody">
    {#each rowsData as row}
        <div class="row">
            {#each row as cell}
                <div>{cell}</div>
            {/each}
        </div>
    {/each}
</div>
