<style>
    .percentage-cell {
        background: white;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .percentage-bar {
        background-color: aqua;
        transition: 0.4s;
        height: 100%;
    }
    .grid-inner.scrolling .percentage-bar {
        transition: 0s !important;
    }
</style>

<script lang="ts">
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

    const getPercentageColor = (percantage: number) => {
        if (percantage < 10) return '#48C548';
        if (percantage < 20) return '#6CC63B';
        if (percantage < 30) return '#8FC82C';
        if (percantage < 40) return '#C6C919';
        if (percantage < 50) return '#EFCD08';
        if (percantage < 60) return '#FFB404';
        if (percantage < 70) return '#FB820C';
        if (percantage < 80) return '#FE6D0F';
        if (percantage < 90) return '#F95312';
        if (percantage < 100) return '#F94212';
    };
    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
</script>

<div class="percentage-cell">
    <div
        class="percentage-bar"
        style="{`width:${row.data[column.dataName]}%; background-color:${getPercentageColor(
            row.data[column.dataName],
        )}`}"
    >
        {row.data[column.dataName]}%s
    </div>
</div>
