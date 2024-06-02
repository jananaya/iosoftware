import ObjectiveFunction from './ObjectiveFunction';
import PolynomialParser from './PolynomialParser';

class ObjectiveFunctionParser {
    static parse(objectiveFunction: string) {
        const pattern = /^(max|min)\s+[a-zA-Z]\s*=\s*([+-]?\s*\d*\.?\d*[a-zA-Z]\d+(\s*[+-]\s*\d*\.?\d*[a-zA-Z]\d+)*)$/;
        const match = objectiveFunction.match(pattern);

        if (!match) {
            return null;
        }

        const operator  = match[1];
        const rhs = PolynomialParser.parse(match[2]);

        return { operator, rhs };
    }
}

export default ObjectiveFunctionParser;
