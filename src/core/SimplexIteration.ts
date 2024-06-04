interface SimplexIterationResult {
    iteration: number;
    modelSolution: number;
    solutionVariables: string[]; // Identity variables representing the solution
    reducedCostVector: number[]; // Coefficients of identity variables
    variableToEnter: string; // Variable entering the basis (if applicable)
    variableToExit: string; // Variable leaving the basis (if applicable)
}

export default SimplexIterationResult;