    class ObjectiveFunctionValidator {
        static validate(objectiveFunction: string): boolean {
            const cleanedObjectiveFunction = objectiveFunction.replace(/\s+/g, '').trim();

            const pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;

            return pattern.test(cleanedObjectiveFunction);
        }
    }

    export default ObjectiveFunctionValidator;
