import { sum } from '../aa';
import Button from '../components/button/Button.svelte';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('sum ', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('button ', () => {
  it('button text props', () => {
    const testButton = render(Button, {
      props: {
        text: 'testButton',
        size: 'sm',
        onClickF: () => {
          console.log('aaa');
        },
      },
    });
    console.log(testButton);
    const text = testButton.getByText('testButton');
    expect(text).toBeInTheDocument();
    // expect(testButton.getByText('testButton')).toBe(true);
  });
});
