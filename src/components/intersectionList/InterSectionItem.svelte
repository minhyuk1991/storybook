<script lang="ts">
export let id = 0;
export let itemHieght: string = "40px";
export let margin: string;
export let top: number;
</script>

<li
  class="flex items-center bg-red-900 text-white w-full"
  style="{`height: ${itemHieght}; min-height: ${itemHieght};`}">
  <!-- style="{`height: ${itemHieght}; min-height: ${itemHieght}; margin-top: ${margin}; top:${top}px`}"> -->
  {id}
</li>
