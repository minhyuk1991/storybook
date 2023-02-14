<!-- <script></script> -->
<script lang="ts" context="module">
    export type Props = { color: string; size: string };
</script>

<script lang="ts">
    export let color: string = '#fff';
    export let size: string = 'sm';
    export let text: string;
    export let onClickF: () => void;
</script>

<div>
    <button
        on:click="{() => {
            if (onClickF) {
                onClickF();
            }
        }}"
        style="{`background-color: ${color};`}"
        class="{`${size === 'sm' ? 'sm text-[10px]' : ''}${
            size === 'lg' ? 'lg text-[20px]' : ''
        } border-dark-900 border-[1px] border-solid px-2 py-2 text-white`}"
        >{text}{#if !text}<slot />{/if}</button
    >
</div>
