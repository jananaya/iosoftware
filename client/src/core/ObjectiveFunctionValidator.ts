class ObjectiveFunctionValidator {
    static validate(objectiveFunction: string): boolean {
        const cleanedObjectiveFunction = objectiveFunction.replace(/\s+/g, '').trim();

        const pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;
        console.log("estoy aqui")
        console.log("de nuevo")
        return pattern.test(cleanedObjectiveFunction);
    }
}

export default ObjectiveFunctionValidator;
