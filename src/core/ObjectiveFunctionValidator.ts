    class ObjectiveFunctionValidator {
        static validate(objectiveFunction: string): boolean {
            const pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;

            return pattern.test(objectiveFunction);
        }
    }

    export default ObjectiveFunctionValidator;
