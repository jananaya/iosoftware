import ObjectiveFunction from './ObjectiveFunction';
import PolynomialParser from './PolynomialParser';

class ObjectiveFunctionParser {
    static parse(objectiveFunction: string): ObjectiveFunction | null {
        const pattern = /^(max|min)\s+[a-zA-Z]\s*=\s*([+-]?\s*\d*\.?\d*[a-zA-Z]\d+(\s*[+-]\s*\d*\.?\d*[a-zA-Z]\d+)*)$/;
        const match = objectiveFunction.match(pattern);

        if (!match) {
            return null;
        }

        const operator: ObjectiveFunction['operator'] = match[1] as ObjectiveFunction['operator'];
        const rhs: ObjectiveFunction['rhs'] = PolynomialParser.parse(match[2]);
        const variables = match[0].match(/[a-zA-Z]\d+/g) || [];

        return { operator, rhs, variables };
    }
}

export default ObjectiveFunctionParser;
