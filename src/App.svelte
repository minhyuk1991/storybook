<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.svelte:hover {
  filter: drop-shadow(0 0 2em #ff3e00aa);
}
.read-the-docs {
  color: #888;
}
</style>

<script lang="ts">
import Counter from "./components/Counter.svelte";
import InterSectionList from "./components/intersectionList/InterSectionList.svelte";
import Layout from "./components/layout/Layout.svelte";

const values = new Array(500).fill(0).map((item, i) => {
  return { id: i };
});
</script>

<Layout>
  <p class="h-[1500px]">content</p>
  <!-- <InterSectionList array="{values}" /> -->
</Layout>
