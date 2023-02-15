<script lang="ts">
    import { basepath } from '@sveltech/routify';
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';
    $: $basepath = '/storybook';
</script>

<Router routes="{routes}" />
