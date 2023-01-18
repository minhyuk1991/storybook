<script>
  import Layout from '../../components/layout/Layout.svelte';
  import { params } from '@roxi/routify';
  $: slug = $params.slug;
</script>

<Layout>
  <p class="text-[400px]">Test page {decodeURIComponent(slug)}</p></Layout
>
