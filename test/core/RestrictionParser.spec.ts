import RestrictionParser from '../../src/core/RestrictionParser';

describe('RestrictionParser', () => {
    test('Parse restriction: 2x1 + 3x2 - 5x3 >= 10', () => {
        const restriction = RestrictionParser.parse('2x1 + 3x2 - 5x3 >= 10');

        expect(restriction).toEqual({
            lhs: [
                { coefficient: 2, variable: '1' },
                { coefficient: 3, variable: '2' },
                { coefficient: -5, variable: '3' }
            ],
            rhs: 10,
            operator: '>='
        });
    });

    test('Parse restriction: x1 + 5x2 - x3 = 4', () => {
        const restriction = RestrictionParser.parse('x1 + 5x2 - x3 = 4');

        expect(restriction).toEqual({
            lhs: [
                { coefficient: 1, variable: '1' },
                { coefficient: 5, variable: '2' },
                { coefficient: -1, variable: '3' }
            ],
            rhs: 4,
            operator: '='
        });
    });
});
