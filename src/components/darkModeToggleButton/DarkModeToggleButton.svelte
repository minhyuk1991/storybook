<script lang="ts">
    import { onMount } from 'svelte';
    import { dark } from '../../store';

    onMount(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia &&
                window?.matchMedia('(prefers-color-scheme: dark)')?.matches)
        ) {
            $dark = true;
        } else {
            $dark = false;
        }

        // Whenever the user explicitly chooses light mode
        localStorage.theme = 'light';

        // Whenever the user explicitly chooses dark mode
        localStorage.theme = 'dark';

        // Whenever the user explicitly chooses to respect the OS preference
        localStorage.removeItem('theme');
    });

    $: {
        if ($dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
</script>

<button
    on:click="{() => {
        $dark = !$dark;
    }}">current Mode : {$dark ? 'DarkMode' : 'LightMode'}</button
>
