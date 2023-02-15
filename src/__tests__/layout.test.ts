import Layout from '../components/layout/Layout.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('button ', () => {
    it('layout dom render test', () => {
        render(Layout, {
            props: {
                isOpen: false,
            },
        });
        const layout = screen.getByTestId('main');
        expect(layout.classList.contains('main')).toBe(true);
    });

    it('[layout_props_test] open - true', () => {
        render(Layout, {
            props: {
                isOpen: true,
            },
        });
        const layout = screen.getByTestId('main');
        expect(layout.classList.contains('open')).toBe(true);
        expect(layout.classList.contains('close')).toBe(false);
    });

    it('[layout_props_test]: open - false', () => {
        render(Layout, {
            props: {
                isOpen: false,
            },
        });
        const layout = screen.getByTestId('main');
        expect(layout.classList.contains('open')).toBe(false);
        expect(layout.classList.contains('close')).toBe(true);
    });
});
