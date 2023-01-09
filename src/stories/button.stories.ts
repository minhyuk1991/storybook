import { action } from "@storybook/addon-actions";

import Button from "../lib/Button.svelte";
let count = 0;
function handleClick() {
  count += 1;
}
export default {
  title: "Button",
};

export const withSassStyleTag = () => ({
  Component: Button,
  props: { text: "Hello" },
  on: { click: handleClick },
});
