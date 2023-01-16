import Layout from '../components/layout/Layout.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('button ', () => {
  it('button_props_test: size', () => {
    render(Layout, {
      props: {
        isOpen: false,
      },
    });
    const layout = screen.queryByRole('main');
    console.log(layout);
    // expect(buttonEl).toBeInTheDocument();
    // expect(buttonEl.classList.contains('sm')).toBe(true);
    // expect(buttonEl.classList.contains('text-[10px]')).toBe(true);
    // expect(buttonEl.classList.contains('lg')).toBe(false);
    // expect(buttonEl.classList.contains('text-[20px]')).toBe(false);
  });
});
