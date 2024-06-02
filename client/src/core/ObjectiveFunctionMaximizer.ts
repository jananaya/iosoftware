import ObjectiveFunction from './ObjectiveFunction';

class ObjectiveFunctionNormalizer {
    static normalize(objectiveFunction: ObjectiveFunction): ObjectiveFunction {
        if (objectiveFunction.operator === 'min') {
            const normalizedRhs = objectiveFunction.rhs.map(monomial => {
                const coefficient = monomial.coefficient * -1;
                return { coefficient, variable: monomial.variable };
            });

            return {
                rhs: normalizedRhs,
                operator: 'max',
                variables: objectiveFunction.variables
            };
        }

        return objectiveFunction;
    }
}

export default ObjectiveFunctionNormalizer;
