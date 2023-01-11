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
  <div class="{`overflow-hidden flex flex-1 `}">
    <main
      class="{`min-h-[calc(100vh-200px-200px)] flex flex-1 flex-col items-stretch transform  transition-transform duration-1000 ${
        isOpen ? 'translate-x-[300px]' : ''
      }`}">
      <div class="bg-white pl-[40px] w-full text-black text-center font-bold">
        Main header
      </div>
      <div
        class="bg-dark-800 pl-[40px] w-full flex-1 text-white text-center font-bold">
        Main contents
      </div>
      <slot />
    </main>
  </div>
  <!-- <footer class="bg-gray-800  text-white">footer</footer> -->
</div>
