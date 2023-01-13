import Layout from "../components/layout/Layout.svelte";

export default {
  component: Layout,
  title: "Layout",
};

const Template = (args) => ({
  Component: Layout,
  props: args,
});

export const Default = Template.bind({});
