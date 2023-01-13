<script>
import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
import Button from './../components/Button.svelte';
</script>

<Meta title="Button" component="{Button}" />

<Template let:args>
	<Button {...args} {...args} {...args} {...args} {...args} {...args} />
</Template>

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Button No Args">
	<Button>Label</Button>
</Story>
