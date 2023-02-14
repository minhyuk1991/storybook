import { sum } from '../sum';
import Button from '../components/button/Button.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('sum ', () => {
    it('sum', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe('button ', () => {
    it('button_props_test: text', () => {
        const testButton = render(Button, {
            props: {
                text: 'testButton',
                size: 'sm',
                onClickF: () => {},
            },
        });
        const text = testButton.getByText('testButton');
        expect(text).toBeInTheDocument();
    });

    it('button_props_test: size', () => {
        render(Button, {
            props: {
                text: 'testButton',
                size: 'sm',
                onClickF: () => {},
            },
        });
        const buttonEl = screen.getByText('testButton');
        expect(buttonEl).toBeInTheDocument();
        expect(buttonEl.classList.contains('sm')).toBe(true);
        expect(buttonEl.classList.contains('text-[10px]')).toBe(true);
        expect(buttonEl.classList.contains('lg')).toBe(false);
        expect(buttonEl.classList.contains('text-[20px]')).toBe(false);
    });

    it('button_props_test: color', () => {
        render(Button, {
            props: {
                text: 'testButton',
                size: 'sm',
                color: '#ffffff',
                onClickF: () => {},
            },
        });
        const buttonEl = screen.getByText('testButton');
        expect(buttonEl).toBeInTheDocument();
        expect(buttonEl.style.backgroundColor === 'rgb(255, 255, 255)').toBe(true);
    });
});
