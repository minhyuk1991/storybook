import { action } from "@storybook/addon-actions";

import Layout from "../components/layout/Layout.svelte";

export default {
  title: "Layout",
};

export const Aa = () => ({
  Component: Layout,
  props: { text: "Hello" },
});
