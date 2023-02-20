<script lang="ts">
    import Layout from '../components/layout/Layout.svelte';
    import TestGrid from '../components/headlessGrid/TestGrid2.svelte';
    import { createMockDataList } from '../mockData';
    import { onDestroy } from 'svelte';

    let mockData = createMockDataList(20000);
    const interValMockData = setInterval(() => (mockData = createMockDataList(20000)), 1000);
    onDestroy(() => {
        clearInterval(interValMockData);
    });
    //
    //
</script>

<Layout>
    <TestGrid />
</Layout>
