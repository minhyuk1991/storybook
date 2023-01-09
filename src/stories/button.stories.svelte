<script>
import { Meta, Story, Template } from "@storybook/addon-svelte-csf";

import Button from "../lib/Button.svelte";

let count = 0;
function handleClick() {
  count += 1;
}
const argss = { args: { rounded: true, text: "dd", name: "aa" } };
</script>

<!-- <Meta title="Button" component="{Button}" />

<Template let:args>
  <Button {...args} on:click="{handleClick}">
    You clicked: {count}
  </Button>
</Template>

<Story name="Button" /> -->

<!-- <Story name="Square" source args="{{ rounded: false }}" /> -->

<!-- Dynamic snippet should be disabled for this story -->
<!-- <Story name="Button No Args">
  <Button>Label</Button>
</Story> -->
