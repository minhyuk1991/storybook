import '@testing-library/jest-dom';
import { autoWidth } from '../grid/gtid_utils';

describe('grid util autoWidth ', () => {
    it('function', () => {
        const value = autoWidth(
            [
                { id: 223, width: 200 },
                { id: 223, width: 200 },
            ],
            1400,
        );
        expect(value === 700).toBe(true);
        // expect(layout.classList.contains('main')).toBe(true);
    });
});
