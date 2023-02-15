<style global>
    .line-chart-cell > svg {
        width: 100%;
        height: 24px;
    }
    .line-chart-cell .axis {
        font: 10px sans-serif;
    }

    .line-chart-cell .axis path,
    .line-chart-cell .axis line {
        fill: none;
        stroke: steelblue;
        stroke-width: 1.5px;
    }

    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 1.5px;
    }

    .grid-headers > .grid-header-row .grid-cell > .cell-default {
        background-color: #424242 !important;
        color: white;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { v4 as uuidv4 } from 'uuid';

    let uuid = uuidv4();
    onMount(() => {
        const svg = d3.select(`.i${uuid} svg`);
        console.log('svg, ', svg);

        const svgRect = svg['_groups'][0][0].getBoundingClientRect();
        console.log('svg, svgRect', svg, svgRect);
        const margin = {
            top: 4,
            right: 0,
            bottom: 4,
            left: 0,
        };
        const width = +svgRect.width - margin.left - margin.right;
        const height = +svgRect.height - margin.top - margin.bottom;
        const g = svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // const parseTime = d3.timeParse('%H:%M:%S');

        const x = d3.scaleTime().rangeRound([0, width]);

        const y = d3.scaleLinear().rangeRound([height, 0]);

        const line = d3
            .line<any>()
            .x(function (d) {
                return x(d.time);
            })
            .y(function (d) {
                return y(d.value);
            });

        let data: any[] = [];
        setInterval(function () {
            const now = new Date();
            data.push({
                time: now,
                value: Math.random() * 100,
            });

            // keep only 1 minute of data
            data = data.filter(function (d) {
                return d.time > new Date(now.getTime() - 60 * 1000);
            });

            x.domain(
                <[Date, Date]>d3.extent(data, function (d) {
                    return d.time;
                }),
            );
            y.domain(
                <[Date, Date]>d3.extent(data, function (d) {
                    return d.value;
                }),
            );

            g.selectAll('.line').remove();
            g.append('path').datum(data).attr('class', 'line').attr('d', line);

            g.select('.axis--x').remove();
            g.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x).ticks(5));

            g.select('.axis--y').remove();
            g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10));
        }, 2000);
    });
</script>

<div class="{`line-chart-cell i${uuid}`}">
    <svg></svg>
</div>
