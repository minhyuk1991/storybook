const sveltePreprocess = require('svelte-preprocess');
module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
	framework: {
		name: '@storybook/svelte-vite',
		options: { docs: false }
	},
	features: {
		storyStoreV7: true
	},
	docs: {
		autodocs: true
	},
	core: {
		builder: '@storybook/builder-vite'
	},
	svelteOptions: {
		preprocess: sveltePreprocess({
			babel: {
				presets: [
					[
						'@babel/preset-env',
						{
							loose: true,
							modules: false,
							targets: {
								esmodules: true
							}
						}
					]
				]
			}
		})
	}
};
