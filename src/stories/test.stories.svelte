<script>
import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Meta title="Test" />

<Template let:args>
  <div>{args.value}</div>
</Template>

<Story
  name="test"
  args="{{
    value: 'Built with Storybook',
  }}" />
