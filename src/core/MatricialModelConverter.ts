import MatricialModel from './MatricialModel';
import ObjectiveFunction from './ObjectiveFunction';
import Restriction from './Restriction';

class MatricialModelConverter {
    private static readonly VariablePrefix = 'x';
    private static readonly SlackVariablePrefix = 's';
    private static readonly SurplusVariablePrefix = 'u';
    private static readonly LongNumber = 500;

    static convert(objectiveFunction: ObjectiveFunction, restrictions: Restriction[]): MatricialModel {
        const model: MatricialModel = {
            costVector: [],
            coefficentMatrix: [],
            variableVector: [],
            restrictionConstants: []
        };

        model.costVector = objectiveFunction.rhs.map(monomial => monomial.coefficient);

        const variables = new Set<string>();
        let restrictionIndex = 0;

        objectiveFunction.rhs.forEach(monomial => variables.add(`${this.VariablePrefix}${monomial.variable}`));

        for (const restriction of restrictions) {
            model.restrictionConstants.push(restriction.rhs);

            if (restriction.operator === '=') {
                continue;
            }

            variables.add(`${this.SlackVariablePrefix}${restrictionIndex + 1}`);

            if (restriction.operator === '<=') {
                model.costVector.push(0);
            }

            if (restriction.operator === '>=') {
                variables.add(`${this.SurplusVariablePrefix}${restrictionIndex + 1}`);

                model.costVector.push(-this.LongNumber);
            }

            restrictionIndex += 1;
        }

        model.variableVector = Array.from(variables);
        restrictionIndex = 0;

        for (const restriction of restrictions) {
            const row: number[] = [];

            for (const variable of model.variableVector) {
                const isSlackVariable = variable === `${this.SlackVariablePrefix}${restrictionIndex + 1}`;
                const isSurplusVariable = variable === `${this.SurplusVariablePrefix}${restrictionIndex + 1}`;

                if (isSlackVariable && restriction.operator === '>=') {
                    row.push(-1);
                    continue;
                }

                if (isSlackVariable || isSurplusVariable) {
                    row.push(1);
                    continue;
                }

                const monomial = restriction.lhs.find(monomial => `${this.VariablePrefix}${monomial.variable}` === variable);
                row.push(monomial ? monomial.coefficient : 0);
            }

            model.coefficentMatrix.push(row);
            restrictionIndex += 1;
        }

        return model;
    }
}

export default MatricialModelConverter;