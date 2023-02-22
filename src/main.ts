import './app.css';
import App from './App.svelte';
import HMR from '@roxi/routify/hmr';

const app = HMR(App, { target: document.body }, 'storybook');
export default app;
