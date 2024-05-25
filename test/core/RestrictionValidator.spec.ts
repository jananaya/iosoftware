import RestrictionValidator from '../../src/core/RestrictionValidator';

describe('RestrictionValidator', () => {
    test('Valid restriction: 2x1 + 3x2 - 5x3 >= 10', () => {
        expect(RestrictionValidator.validate('2x1 + 3x2 - 5x3 >= 10')).toBe(true);
    });

    test('Invalid restriction: 2x1 + 3x1 - 5x3 >= 10 (repeated variable x1)', () => {
        expect(RestrictionValidator.validate('2x1 + 3x1 - 5x3 >= 10')).toBe(false);
    });

    test('Invalid restriction: 2x1 + 3x2 - 5 >= 10 (independent term)', () => {
        expect(RestrictionValidator.validate('2x1 + 3x2 - 5 >= 10')).toBe(false);
    });

    test('Valid restriction: 2x1 + 3x2 >= 10', () => {
        expect(RestrictionValidator.validate('2x1 + 3x2 >= 10')).toBe(true);
    });

    test('Valid restriction: x1 + x2 <= 5', () => {
        expect(RestrictionValidator.validate('x1 + x2 <= 5')).toBe(true);
    });

    test('Valid restriction: x1 + 5x2 - x3 = 4', () => {
        expect(RestrictionValidator.validate('x1 + 5x2 - x3 = 4')).toBe(true);
    });

    test('Invalid restriction: x1 + 5x2 - x3 + 5 = 4 (independent term in LHS)', () => {
        expect(RestrictionValidator.validate('x1 + 5x2 - x3 + 5 = 4')).toBe(false);
    });
});
