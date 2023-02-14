// Button.stories.js

import Layout from '../components/layout/Layout.svelte';
const argTypes = {
    isOpen: {
        control: 'select',
        options: [true, false],
    },
};
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/svelte/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Layout',
    component: Layout,
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
        Component: Layout,
        props: args,
    }),
    args: {
        isOpen: false,
    },
};
