<script lang="ts">
import { onMount } from "svelte";
import InterSectionItem from "./InterSectionItem.svelte";
import { v4 as uuidv4 } from "uuid";

export let itemHeight: string = "40px";

export let array: { id: number }[];
export let margin: string = "10px";
let width;
let height;
let id = uuidv4();
let currentScrollY;
let scrollHeight;
let currentListHieght;
let curentIndexStart = 0;
let inViewItem;

const scrollHanlder = (
  e: UIEvent & {
    currentTarget: EventTarget & HTMLUListElement;
  }
) => {
  console.log("zz");
  const el = e.currentTarget;
  currentScrollY = el.scrollTop;
  console.log(el);
};

function pxToNumber(px: string) {
  console.log(px.slice(0, px.length - 2));
  if (px.slice(px.length - 2, px.length) !== "px") {
    console.log("빼엑!");
  } else {
    return Number(px.slice(0, px.length - 2));
  }
}

pxToNumber("450px");
onMount(() => {
  const el = document.getElementById(id + "_list");
  const rect = el.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  console.log(el.scrollTop);

  scrollHeight = el.scrollHeight;
  // curentIndexStart = scrollHeight / pxToNumber(itemHeight);
  console.log(curentIndexStart);
  inViewItem = Math.ceil(height / pxToNumber(itemHeight));

  console.log(inViewItem);
});
</script>

<div id="{`${id}_list`}" class=" w-full  h-[300px] relative">
  <ul
    on:scroll="{scrollHanlder}"
    class=" w-full overflow-hidden"
    style="{`height:${pxToNumber(itemHeight) * array.length}; max-height:${
      pxToNumber(itemHeight) * array.length
    }px`}">
    {#each new Array(60).fill(0).map((item, i) => {
      return { id: i };
    }) as item, i}
      <InterSectionItem
        id="{item.id}"
        margin="{margin}"
        top="{pxToNumber(itemHeight) * (i ? i + 1 : 1) +
          pxToNumber(margin) * (i + 1)}" />
    {/each}
  </ul>
</div>
