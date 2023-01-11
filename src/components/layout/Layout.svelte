<style>
.header {
  background: red;
}
.header.active {
  background: blue;
}
</style>

<script lang="ts">
import Footer from "./footer/Footer.svelte";

let active = false;
</script>

<div class="{`header ${active ? 'active' : ''}`}">
  <!-- <header class="bg-red-200 h-[200px]">header</header> -->
  <main class="min-h-[calc(100vh-200px-200px)] flex flex-1">
    <slot />
  </main>
  <Footer />
  <footer class="bg-gray-800 h-[200px] text-white">footer</footer>
</div>
