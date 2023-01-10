<script lang="ts">
import * as S from "./Layout.style";
</script>

<div class="{S.Layout}">
  <!-- <header class="bg-red-200 h-[200px]">header</header> -->
  <main class="min-h-[calc(100vh-200px-200px)] flex flex-1">
    <slot />
  </main>
  <footer class="bg-gray-800 h-[200px] text-white">footer</footer>
</div>
