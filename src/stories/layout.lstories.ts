import { action } from "@storybook/addon-actions";

import Layout from "../components/layout/Layout.svelte";
let count = 0;
function handleClick() {
  count += 1;
}
export default {
  title: "Button",
};

export const Aa = () => ({
  Component: Layout,
  props: { text: "Hello" },
  on: { click: handleClick },
});
