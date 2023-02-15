import Button from '../components/button/Button.svelte';
const argTypes = {
    color: { control: 'color' },
    size: {
        control: 'select',
        options: ['sm', 'lg'],
    },
    onClickF: { control: 'function' },
    text: { control: 'text' },
};
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/svelte/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Button',
    component: Button,
    argTypes,
    docs: { page: false },
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/svelte/api/csf
 * to learn how to use render functions.
 */
export const Default = {
    render: (args: unknown) => ({
        Component: Button,
        props: args,
    }),
    args: {
        color: 'red',
        size: 'sm',
        text: 'button',
    },
};
