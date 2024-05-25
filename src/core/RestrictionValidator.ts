class RestrictionValidator {
    static validate(restriction: string): boolean {
        const overallPattern = /^([+-]?\d*x\d+\s*([+-]\s*)?)+([<>=]=?)\s*[+-]?\d+$/;

        if (!overallPattern.test(restriction)) {
            return false;
        }

        const operatorMatch = restriction.match(/<=|>=|=/);
        if (!operatorMatch) {
            return false;
        }

        const operator = operatorMatch[0];
        const [lhs, rhs] = restriction.split(operator).map(part => part.trim());

        if (isNaN(Number(rhs))) {
            return false;
        }

        const termPattern = /([+-]?\d*)x(\d+)/g;
        const seenVariables = new Set<string>();

        let match: RegExpExecArray | null;
        let remainingLHS = lhs;

        while ((match = termPattern.exec(lhs)) !== null) {
            const coefficient = match[1];
            const variable = match[2];

            if (seenVariables.has(variable)) {
                return false;
            }

            seenVariables.add(variable);

            remainingLHS = remainingLHS.replace(match[0], '').trim();
        }

        const independentTermPattern = /([+-]?\d+)(?!x\d+)/;
        if (independentTermPattern.test(remainingLHS)) {
            return false;
        }

        return true;
    }
}

export default RestrictionValidator;
