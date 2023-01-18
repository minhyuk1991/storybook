<script lang="ts">
  import Button from './components/button/Button.svelte';
  import Layout from './components/layout/Layout.svelte';
  import Radio from './components/radio/Radio.svelte';
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
</script>

<Router {routes} />

<style>
</style>
