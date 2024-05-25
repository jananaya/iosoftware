class ObjectiveFunctionValidator {
    static validate(objectiveFunction: string): boolean {
        // Eliminar todos los espacios y luego trim para quitar espacios al principio y al final
        const cleanedObjectiveFunction = objectiveFunction.replace(/\s+/g, '').trim();

        // Patrón para validar la función objetivo
        const pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;

        return pattern.test(cleanedObjectiveFunction);
    }
}

export default ObjectiveFunctionValidator;
