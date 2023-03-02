<script lang="ts">
    import DarkModeToggleButton from '../darkModeToggleButton/DarkModeToggleButton.svelte';
    import Sidebar from './sidebar/Sidebar.svelte';
    export let isOpen = false;
    const clickHandler = () => (isOpen = !isOpen);

    import { writable } from 'svelte/store';
    export const isDevMode = writable(false);

    let isPressedKeyD = false;
    let isPressedKey0 = false;

    $: {
        const isDeveModeToggleCase = isPressedKeyD && isPressedKey0;
        console.log(isDeveModeToggleCase);
        if (isDeveModeToggleCase) {
            $isDevMode = !$isDevMode;
            console.log('isDevMode', $isDevMode);
        }
    }

    $: {
        console.log($isDevMode, 'isDevMode :', $isDevMode);
    }

    const handleKeydown = (
        e: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        },
    ) => {
        if (e.key === 'd') {
            isPressedKeyD = true;
            console.log('dd');
        }
        if (e.key === '0') {
            isPressedKey0 = true;
            console.log('0');
        }
    };

    const handleKeyUp = (
        e: KeyboardEvent & {
            currentTarget: EventTarget & Window;
        },
    ) => {
        if (e.key === 'd') {
            isPressedKeyD = false;
        }
        if (e.key === '0') {
            isPressedKey0 = false;
        }
    };
</script>

<svelte:window on:keydown="{handleKeydown}" on:keyup="{handleKeyUp}" />

<div class="flex min-h-[100vh] w-full items-stretch">
    <Sidebar clickHandler="{clickHandler}" isOpen="{isOpen}" />
    <div class="{`flex flex-1 overflow-hidden `}">
        <main
            data-testid="main"
            id="main"
            class="{`main flex min-h-[calc(100vh-200px-200px)] flex-1 transform flex-col items-stretch  transition-transform duration-1000 ${
                isOpen ? 'open translate-x-[300px]' : 'close'
            }`}"
        >
            <div
                class="w-full bg-white pl-[40px] text-center font-bold text-black dark:bg-black dark:text-white"
            >
                <DarkModeToggleButton />
                <dvi>
                    <a href="/test1">test1</a>
                    <a href="/test2">test2</a>
                    <a href="/test3">test3</a>
                </dvi>
            </div>
            <div
                class="bg-dark-800 w-full flex-1 pl-[40px] text-center font-bold text-black dark:text-white"
            >
                Main contents
            </div>
            <slot isDevMode="{$isDevMode}" />
        </main>
    </div>
</div>
