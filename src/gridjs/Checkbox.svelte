<script lang="ts">
    export let rowId: string;
    export let onToggle: (id: string) => void;

    function handleChange() {
        onToggle(rowId);
    }
</script>

<div>ddd</div>
<input type="checkbox" on:change="{handleChange}" />
