<script lang="ts">
import type { EventMouse } from "../../../types";
import Tab from "../../Tab.svelte";
export let isOpen: boolean;
export let clickHandler: (e: EventMouse) => void;

const testData = [
  { name: "a1", isChecked: false },
  { name: "a2", isChecked: false },
  { name: "a3", isChecked: false },
  { name: "a4", isChecked: false },
];
</script>

<header
  class="{`bg-[#333333] flex w-[300px] h-[100vh] fixed left-0 top-0 items-start transition-all duration-1000 z-10 ${
    isOpen ? ' ' : 'transform translate-x-[-100%]'
  }`}">
  <button
    on:click="{clickHandler}"
    class="absolute right-0 transform translate-x-[100%] bg-red-500 px-2 py-4 z-10"
    >{isOpen ? "<" : ">"}
  </button>

  <Tab tabItems="{testData}" />
</header>
