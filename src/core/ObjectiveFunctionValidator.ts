class ObjectiveFunctionValidator {
    static validate(objectiveFunction: string): boolean {
        const pattern = /^(max|min)\s+[a-zA-Z]\s*=\s*(([+-]?\d*\.?\d*[a-zA-Z]\d+)(\s*[+-]\s*\d*\.?\d*[a-zA-Z]\d+)*)$/;

        return pattern.test(objectiveFunction.trim());
    }
}

export default ObjectiveFunctionValidator;
