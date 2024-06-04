class VariableUpdater {
    static updateVariables(indexMinPositive: number, indexMinNegative: number, allVariables: string[], identityVariables: string[], restrictionConstants: number[], identityRestrictionConstants: number[]): { variableToExit: string; variableToEnter: string; identityVariables: string[]; identityRestrictionConstants: number[] } {
        const variableToExit = identityVariables[indexMinPositive]; // Variable a salir (de la matriz identidad)
        const enteringVariable = allVariables[indexMinNegative]; // Variable a entrar
        const enteringConstant = restrictionConstants[indexMinNegative]; // Constante de restricción para la variable a entrar

        // Eliminar la variable a salir del vector de variables de la matriz identidad y de las constantes de restricciones de la matriz identidad
        identityVariables.splice(indexMinPositive, 1);
        identityRestrictionConstants.splice(indexMinPositive, 1);

        // Colocar la variable a entrar en el mismo índice que la variable a salir en el vector de variables de la matriz identidad
        identityVariables.splice(indexMinPositive, 0, enteringVariable);
        // Colocar la constante de restricción de la variable a entrar en el mismo índice que la variable a salir en el vector de constantes de restricciones de la matriz identidad
        identityRestrictionConstants.splice(indexMinPositive, 0, enteringConstant);

        return { variableToExit, variableToEnter: enteringVariable, identityVariables, identityRestrictionConstants };
    }
}
    export default VariableUpdater;

