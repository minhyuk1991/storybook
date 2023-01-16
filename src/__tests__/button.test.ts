import { sum } from '../aa';
import Button from '../components/button/Button.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('sum ', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('button ', () => {
  it('button_props_test: size ', () => {
    const testButton = render(Button, {
      props: {
        text: 'testButton',
        size: 'sm',
        onClickF: () => {},
      },
    });
    console.log(testButton);
    const text = testButton.getByText('testButton');
    expect(text).toBeInTheDocument();
  });
  it('button_props_test: text ', () => {
    render(Button, {
      props: {
        text: 'testButton',
        size: 'sm',
        onClickF: () => {},
      },
    });

    const buttonEl = screen.getByText('testButton');
    console.log(buttonEl);
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl.classList.contains('sm')).toBe(true);
  });
});
