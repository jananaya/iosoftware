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

        const variables = new Set<string>();

        objectiveFunction.rhs.forEach(monomial => variables.add(`${this.VariablePrefix}${monomial.variable}`));

        let restrictionIndex = 0;

        for (const restriction of restrictions) {
            model.restrictionConstants.push(restriction.rhs);

            if (restriction.operator === '=') {
                variables.add(`${this.SurplusVariablePrefix}${restrictionIndex + 1}`);
            } else if (restriction.operator === '<=') {
                variables.add(`${this.SlackVariablePrefix}${restrictionIndex + 1}`);
            } else if (restriction.operator === '>=') {
                variables.add(`${this.SlackVariablePrefix}${restrictionIndex + 1}`);
                variables.add(`${this.SurplusVariablePrefix}${restrictionIndex + 1}`);
            }

            restrictionIndex += 1;
        }

        const commonVariables = Array.from(variables).filter(v => v.startsWith(this.VariablePrefix)).sort();
        const slackVariables = Array.from(variables).filter(v => v.startsWith(this.SlackVariablePrefix)).sort();
        const surplusVariables = Array.from(variables).filter(v => v.startsWith(this.SurplusVariablePrefix)).sort();

        model.variableVector = commonVariables.concat(slackVariables, surplusVariables);

        model.costVector = model.variableVector.map(variable => {
            const commonVariable = objectiveFunction.rhs.find(monomial => `${this.VariablePrefix}${monomial.variable}` === variable);
            if (commonVariable) {
                return commonVariable.coefficient;
            }
            if (variable.startsWith(this.SlackVariablePrefix)) {
                return 0;
            }
            if (variable.startsWith(this.SurplusVariablePrefix)) {
                return -this.LongNumber;
            }
            return 0;
        });

        restrictionIndex = 0;
        for (const restriction of restrictions) {
            const row: number[] = [];

            for (const variable of model.variableVector) {
                if (variable === `${this.SlackVariablePrefix}${restrictionIndex + 1}`) {
                    if (restriction.operator === '>=') {
                        row.push(-1);
                    } else if (restriction.operator === '<=') {
                        row.push(1);
                    } else {
                        row.push(0);
                    }
                } else if (variable === `${this.SurplusVariablePrefix}${restrictionIndex + 1}`) {
                    row.push(1);
                } else {
                    const monomial = restriction.lhs.find(monomial => `${this.VariablePrefix}${monomial.variable}` === variable);
                    row.push(monomial ? monomial.coefficient : 0);
                }
            }

            model.coefficentMatrix.push(row);
            restrictionIndex += 1;
        }

        return model;
    }
}

export default MatricialModelConverter;
