<script lang="ts">
    import Layout from '../../components/layout/Layout.svelte';
    import { params } from '@roxi/routify';

    let slug: string;
    $: {
        if (typeof $params.slug === 'string') slug = $params.slug;
    }
</script>

<Layout>
    <p class="text-[400px]">Test page {decodeURIComponent(slug)}</p></Layout
>
