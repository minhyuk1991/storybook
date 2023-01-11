<script lang="ts">
import type { EventMouse } from "../../types";
import Sidebar from "./sidebar/Sidebar.svelte";

let isOpen = false;

const clickHandler = (e: EventMouse) => {
  console.log("dd");
  isOpen = !isOpen;
};
</script>

<div class="flex min-h-[100vh] w-full items-stretch">
  <Sidebar clickHandler="{clickHandler}" isOpen="{isOpen}" />
  <div
    class="{`overflow-hidden flex flex-1  ${
      isOpen ? 'translate-x-[300px]' : ''
    }`}">
    <main class="{`min-h-[calc(100vh-200px-200px)] flex flex-1 `}">
      <div class="bg-dark-800 pl-[40px] w-full">daaaaaaaaaaaaaaadd</div>
      <slot />
    </main>
  </div>
  <!-- <footer class="bg-gray-800  text-white">footer</footer> -->
</div>
