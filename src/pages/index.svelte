<script lang="ts">
    import Layout from '../components/layout/Layout.svelte';
    import Grid from '../grid/Grid.svelte';
</script>

<Layout let:isDevMode>
    <Grid isDevMode="{isDevMode}" />
</Layout>
