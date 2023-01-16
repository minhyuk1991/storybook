import './app.css';
import App from './App.svelte';
const name = 'aa';
const app = new App({
  target: document.getElementById('app') as Element,
});
export default app;
