class RestrictionValidator {
    static validate(restriction: string, objectiveVariables: string[]): boolean {
        const cleanedRestriction = restriction.replace(/\s+/g, '').trim();

        const overallPattern = /^([+-]?\d*\w\d+([+-]\d*\w\d+)*)([<>=]=?)[+-]?\d+$/;

        if (!overallPattern.test(cleanedRestriction)) {
            return false;
        }

        const operatorMatch = cleanedRestriction.match(/<=|>=|=/);
        if (!operatorMatch) {
            return false;
        }

        const operator = operatorMatch[0];
        const [lhs, rhs] = cleanedRestriction.split(operator).map(part => part.trim());

        if (isNaN(Number(rhs))) {
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
