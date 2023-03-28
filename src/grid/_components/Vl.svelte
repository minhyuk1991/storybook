<style>
    svelte-virtual-list-viewport {
        position: relative;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: block;
    }

    svelte-virtual-list-contents,
    svelte-virtual-list-row {
        display: block;
    }

    svelte-virtual-list-row {
    }
</style>

<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';
    import { onMount, tick } from 'svelte';
    interface VirtualListItem {
        index: number;
        data: any;
    }

    interface VirtualListProps {
        items: any[];
        height?: string;
        itemHeight?: number;
        start?: number;
        end?: number;
    }
    // props
    export let items: VirtualListProps['items'];
    export let height: VirtualListProps['height'] = '100%';

    export let itemHeight: VirtualListProps['itemHeight'];
    export let start: VirtualListProps['start'] = 0;
    export let end: VirtualListProps['end'] = 0;
    export let scrollHandler: (
        e: UIEvent & {
            currentTarget: EventTarget & HTMLDivElement;
        },
    ) => void;
    export let scrollX: number;
    // local state
    let heightMap: number[] = [];
    let rows: HTMLCollectionOf<HTMLDivElement>;
    let viewport: HTMLDivElement;
    let contents: HTMLDivElement;
    let viewportHeight = 0;
    let visible: VirtualListItem[];
    let mounted: boolean;

    let top = 0;
    let bottom = 0;
    let averageHeight: number;

    $: visible = items.slice(start, end).map((data, i) => {
        return { index: i + start!, data };
    });

    async function refresh(
        items: VirtualListProps['items'],
        viewportHeight: number,
        itemHeight?: number,
    ) {
        const { scrollTop } = viewport;

        await tick(); // wait until the DOM is up to date

        let contentHeight = top - scrollTop;
        let i = start;

        while (contentHeight < viewportHeight && i! < items.length) {
            let row = rows[i! - start!];

            if (!row) {
                end = i! + 1;
                await tick(); // render the newly visible row
                row = rows[i! - start!];
            }

            const rowHeight = (heightMap[i!] = itemHeight || row.offsetHeight);
            contentHeight += rowHeight;
            i! += 1;
        }

        end = i;

        const remaining = items.length - end!;
        averageHeight = (top + contentHeight) / end!;

        bottom = remaining * averageHeight;
        heightMap.length = items.length;
    }

    async function handleScroll() {
        const { scrollTop } = viewport;

        const oldStart = start;

        for (let v = 0; v < rows.length; v += 1) {
            heightMap[start! + v] = itemHeight || rows[v].offsetHeight;
        }

        let i = 0;
        let y = 0;

        while (i < items.length) {
            const rowHeight = heightMap[i] || averageHeight;
            if (y + rowHeight > scrollTop) {
                start = i;
                top = y;

                break;
            }

            y += rowHeight;
            i += 1;
        }

        while (i < items.length) {
            y += heightMap[i] || averageHeight;
            i += 1;

            if (y > scrollTop + viewportHeight) break;
        }

        end = i;

        const remaining = items.length - end;
        averageHeight = y / end;

        while (i < items.length) heightMap[i++] = averageHeight;
        bottom = remaining * averageHeight;

        // prevent jumping if we scrolled up into unknown territory
        if (start! < oldStart!) {
            await tick();
            let expectedHeight = 0;
            let actualHeight = 0;
            for (let i = start; i! < oldStart!; i! += 1) {
                if (rows[i! - start!]) {
                    expectedHeight += heightMap[i!];
                    actualHeight += itemHeight || rows[i! - start!].offsetHeight;
                }
            }

            const d = actualHeight - expectedHeight;
            viewport.scrollTo(scrollX, scrollTop + d);
        }

        // TODO if we overestimated the space these
        // rows would occupy we may need to add some
        // more. maybe we can just call handleScroll again?
    }
    // whenever `items` changes, invalidate the current heightmap
    $: if (mounted) refresh(items, viewportHeight, itemHeight);

    // trigger initial refresh
    onMount(() => {
        rows = contents.getElementsByTagName(
            'svelte-virtual-list-row',
        ) as HTMLCollectionOf<HTMLDivElement>;
        mounted = true;
    });
    let scrollEl: HTMLDivElement;
    let elementId = uuidv4();
    onMount(() => {
        scrollEl = document.querySelector(`.class-${elementId}`) as HTMLDivElement;
        scrollEl.scrollLeft = scrollX;
    });
    $: {
        if (scrollEl) {
            scrollEl.scrollLeft = scrollX;
        }
    }
</script>

<svelte-virtual-list-viewport
    bind:this="{viewport}"
    bind:offsetHeight="{viewportHeight}"
    on:scroll="{handleScroll}"
    on:scroll="{scrollHandler}"
    style="height: {height};"
    class="{`class-${elementId}`}"
>
    <svelte-virtual-list-contents
        bind:this="{contents}"
        style="padding-top: {top}px; padding-bottom: {bottom}px;"
    >
        {#each visible as row (row.index)}
            <svelte-virtual-list-row>
                <slot item="{row.data}" index="{row.index}">Missing template</slot>
            </svelte-virtual-list-row>
        {/each}
    </svelte-virtual-list-contents>
</svelte-virtual-list-viewport>
