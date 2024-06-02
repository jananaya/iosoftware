import MatricialModel from './MatricialModel';
import ObjectiveFunction from './ObjectiveFunction';
import Restriction from './Restriction';

class MatricialModelConverter {
    private static readonly VariablePrefix = 'x';
    private static readonly SlackVariablePrefix = 's';
    private static readonly SurplusVariablePrefix = 'u';
    static readonly LongNumber = 500;

    static convert(objectiveFunction: ObjectiveFunction, restrictions: Restriction[]): MatricialModel {
		const model: MatricialModel = {
			costVector: [],
			coefficentMatrix: [],
			variableVector: [],
			restrictionConstants: []
		};

		model.restrictionConstants = restrictions.map(restriction => restriction.rhs);
		model.variableVector = this.getVariableVector(objectiveFunction, restrictions);
		model.costVector = this.getCostVector(objectiveFunction, model.variableVector);
		model.coefficentMatrix = this.getCoefficentMatrix(restrictions, model.variableVector);

		return model;
    }

	private static getVariableVector(objectiveFunction: ObjectiveFunction, restrictions: Restriction[]): string[] {
		const variables = new Set<string>();

		objectiveFunction.rhs.forEach(monomial => variables.add(`${this.VariablePrefix}${monomial.variable}`));
		let restrictionIndex = 0;

		for (const restriction of restrictions) {
			const surplusVariable = `${this.SurplusVariablePrefix}${restrictionIndex + 1}`;
			const operatorVariables = {
				'<=': [`${this.SlackVariablePrefix}${restrictionIndex + 1}`],
				'>=': [`${this.SlackVariablePrefix}${restrictionIndex + 1}`, surplusVariable],
				'=': [surplusVariable]
			};

			operatorVariables[restriction.operator].forEach(variable => variables.add(variable));
			restrictionIndex += 1;
		}

		const variablesArray = Array.from(variables);
		const commonVariables = variablesArray
			.filter(v => v.startsWith(this.VariablePrefix))
			.sort();
		const slackVariables = variablesArray
			.filter(v => v.startsWith(this.SlackVariablePrefix))
			.sort();
		const surplusVariables = variablesArray
			.filter(v => v.startsWith(this.SurplusVariablePrefix))
			.sort();

		return commonVariables.concat(slackVariables, surplusVariables);
	}

	private static getCostVector(objectiveFunction: ObjectiveFunction, variables: string[]): number[] {
		return variables.map(variable => {
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
	}

	private static getCoefficentMatrix(restrictions: Restriction[], variableVector: string[]): number[][] {
		const matrix: number[][] = [];

		let restrictionIndex = 0;
		for (const restriction of restrictions) {
			const row: number[] = [];

			for (const variable of variableVector) {
				const surplusVariable = `${this.SurplusVariablePrefix}${restrictionIndex + 1}`;
				const slackVariable = `${this.SlackVariablePrefix}${restrictionIndex + 1}`;

				switch (variable) {
					case slackVariable:
						const operatorCoeficients = { '<=': 1, '>=': -1, '=': 0 };
						row.push(operatorCoeficients[restriction.operator]);
						break;

					case surplusVariable:
						row.push(1);
						break;

					default:
						const monomial = restriction.lhs.find(monomial => `${this.VariablePrefix}${monomial.variable}` === variable);
						row.push(monomial ? monomial.coefficient : 0);
						break;
				}
			}

			matrix.push(row);
			restrictionIndex += 1;
		}

		return matrix;
	}
}

export default MatricialModelConverter;