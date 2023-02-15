<script lang="ts">
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';
    // import { routes } from '../.routify/routes';
</script>

<head>
    <base href="/storybook/" />
</head>
<Router routes="{routes}" />
