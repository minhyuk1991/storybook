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
    import VirtualList from './Vl.svelte';
    export let rowsData: { [type: string]: any }[] = [];
    export let renderColumnList: string[] = [];
    export let scrollY: number;
    export let scrollX: number;

    export let scrollHandler: (
        e: UIEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) => void;
    let start: number;
    let end: number;
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
    >
        <div class="row">
            {#each renderColumnList as cell}
                <div>{item[cell]}</div>
            {/each}
        </div>
    </VirtualList>
</div>
