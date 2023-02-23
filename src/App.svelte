<style>
    ul li {
        color: black;
    }
</style>

<!-- <script lang="ts">
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';
</script>

<Router routes="{routes}" /> -->
<script lang="ts">
    let currentPage = 'index';
    import Index from './pages/index.svelte';
    import Markup1 from './pages/test1.svelte';
    import Markup2 from './pages/test2.svelte';
    import Markup3 from './pages/test3.svelte';

    type ClickEvent = MouseEvent & {
        currentTarget: EventTarget & HTMLButtonElement;
    };
    const clickHandler = (e: ClickEvent) => {
        const target = e.target as HTMLButtonElement;
        currentPage = target.innerText;
    };
</script>

<ul>
    <li><button on:click="{clickHandler}">test1</button></li>
    <li><button on:click="{clickHandler}">test2</button></li>
    <li><button on:click="{clickHandler}">test3</button></li>
</ul>

<main>
    {#if currentPage === 'index'}
        <Index />
    {/if}
    {#if currentPage === 'test1'}
        <Markup1 />
    {/if}
    {#if currentPage === 'test2'}
        <Markup2 />
    {/if}
    {#if currentPage === 'test3'}
        <Markup3 />
    {/if}
</main>
