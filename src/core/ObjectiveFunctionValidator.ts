    class ObjectiveFunctionValidator {
        static validate(objectiveFunction: string): boolean {
            const pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;
            const cleanObjectiveFunction = objectiveFunction.replace(/\s+/g, '').trim();
            return pattern.test(cleanObjectiveFunction);
        }
    }

    export default ObjectiveFunctionValidator;
