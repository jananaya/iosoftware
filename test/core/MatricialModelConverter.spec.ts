import MatricialModelConverter from '../../src/core/MatricialModelConverter';
import ObjectiveFunction from '../../src/core/ObjectiveFunction';
import Restriction from '../../src/core/Restriction';

describe('MatricialModelConverter', () => {
    test('Converts a model with one restriction and one variable', () => {
        const objectiveFunction: ObjectiveFunction = {
            operator: 'max',
            rhs: [
                { variable: '1', coefficient: 2 }
            ],
            variables: ['x1']
        };
        const restrictions: Restriction[] = [
            {
                lhs: [
                    { variable: '1', coefficient: 3 }
                ],
                operator: '<=',
                rhs: 5
            }
        ];

        const matricialModel = MatricialModelConverter.convert(objectiveFunction, restrictions);

        expect(matricialModel.costVector).toEqual([2, 0]);
        expect(matricialModel.coefficentMatrix).toEqual([[3, 1]]);
        expect(matricialModel.variableVector).toEqual(['x1', 's1']);
        expect(matricialModel.restrictionConstants).toEqual([5]);
    });

    test('Converts a model with three restrictions and two variables', () => {
        const objectiveFunction: ObjectiveFunction = {
            operator: 'max',
            rhs: [
                { variable: '1', coefficient: 5 },
                { variable: '2', coefficient: 4 }
            ],
            variables: ['x1', 'x2']
        };
        const restrictions: Restriction[] = [
            {
                lhs: [
                    { variable: '1', coefficient: 2 },
                    { variable: '2', coefficient: 1 }
                ],
                operator: '<=',
                rhs: 20
            },
            {
                lhs: [
                    { variable: '1', coefficient: 1 },
                    { variable: '2', coefficient: 1 }
                ],
                operator: '<=',
                rhs: 18
            },
            {
                lhs: [
                    { variable: '1', coefficient: 1 },
                    { variable: '2', coefficient: 2 }
                ],
                operator: '>=',
                rhs: 12
            }
        ];

        const matricialModel = MatricialModelConverter.convert(objectiveFunction, restrictions);

        expect(matricialModel.costVector).toEqual([5, 4, 0, 0, 0, -MatricialModelConverter.LongNumber]);
        expect(matricialModel.coefficentMatrix).toEqual([[2, 1, 1, 0, 0, 0], [1, 1, 0, 1, 0, 0], [1, 2, 0, 0, -1, 1]]);
        expect(matricialModel.variableVector).toEqual(['x1', 'x2', 's1', 's2', 's3', 'u3']);
        expect(matricialModel.restrictionConstants).toEqual([20, 18, 12]);
    });
});
