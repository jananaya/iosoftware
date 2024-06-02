import ObjectiveFunction from "./ObjectiveFunction";

class RestrictionValidator {
    static validate(restriction: string, objectiveFunction: ObjectiveFunction): boolean {
        const overallPattern = /^([+-]?\d*\w\d+([+-]\d*\w\d+)*)([<>=]=?)[+-]?\d+$/;
        let objectiveVariables = objectiveFunction.variables;

        console.log(objectiveVariables);
        if (!overallPattern.test(restriction)) {
            return false;
        }

        const operatorMatch = restriction.match(/<=|>=|=/);
        if (!operatorMatch) {
            return false;
        }

        const operator = operatorMatch[0];
        const [lhs, rhs] = restriction.split(operator).map(part => part.trim());

        const rhsNumber = Number(rhs);
        if (isNaN(rhsNumber) || rhsNumber < 0) {
            return false;
        }

        const termPattern = /([+-]?\d*)(\w\d+)/g;
        const seenVariables = new Set<string>();

        let match: RegExpExecArray | null;
        let remainingLHS = lhs;

        while ((match = termPattern.exec(lhs)) !== null) {
            const variable = match[2];

            if (!objectiveVariables.includes(variable)) {
                return false;
            }

            if (seenVariables.has(variable)) {
                return false;
            }

            seenVariables.add(variable);

            remainingLHS = remainingLHS.replace(match[0], '').trim();
        }

        const independentTermPattern = /([+-]?\d+)(?!\w\d+)/;
        return !independentTermPattern.test(remainingLHS);
    }
}

export default RestrictionValidator;
