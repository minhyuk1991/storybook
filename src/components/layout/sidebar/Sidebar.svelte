<script lang="ts">
    import Folder from '../../folder/Folder.svelte';
    import Tab from '../../Tab.svelte';
    export let isOpen: boolean | undefined = undefined;
    type Test = (() => void) | undefined;
    export let clickHandler: Test = undefined;

    const testData = [
        { name: 'a1', isChecked: false },
        { name: 'a2', isChecked: false },
        { name: 'a3', isChecked: false },
        { name: 'a4', isChecked: false },
    ];

    let root = {
        name: 'Root',
        children: [
            {
                name: 'Child 1',
                children: [
                    {
                        name: 'Grandchild 1',
                        children: [],
                    },
                    {
                        name: 'Grandchild 2',
                        children: [],
                    },
                    {
                        name: 'Grandchild 3',
                        children: [],
                    },
                ],
            },
            {
                name: 'Child 2',
                children: [
                    {
                        name: 'Grandchild 1',
                        children: [],
                    },
                    {
                        name: 'Grandchild 2',
                        children: [],
                    },
                    {
                        name: 'Grandchild 3',
                        children: [],
                    },
                ],
            },
            {
                name: 'Child 3',
                children: [
                    {
                        name: 'Grandchild 1',
                        children: [],
                    },
                    {
                        name: 'Grandchild 2',
                        children: [],
                    },
                    {
                        name: 'Grandchild 3',
                        children: [],
                    },
                ],
            },
        ],
    };
</script>

<header
    class="{`fixed left-0 top-0 z-10  flex h-[100vh] w-[300px] flex-col flex-wrap items-start bg-[#333333] transition-all duration-1000 dark:bg-gray-600 ${
        isOpen ? ' ' : 'translate-x-[-100%] transform'
    }`}"
>
    <button
        on:click="{clickHandler}"
        class="absolute right-0 z-10 translate-x-[100%] transform bg-black px-2 py-4  text-white dark:bg-white dark:text-black"
        >{isOpen ? '<' : '>'}
    </button>
    <div class="w-full">
        <Tab tabItems="{testData}" />
    </div>
    <div class="flex flex-grow flex-col justify-items-start">
        <Folder children="{root.children}" />
    </div>
</header>
