import matricialModel from "../core/MatricialModel";
import MatrixCalculate from "./MatrixCalculate";
import Convert from "./Convert";
import convert from "./Convert";
import VectorCalculate from "./VectorCalculate";
import vectorCalculate from "./VectorCalculate";
import ColumnToVectorConvert from "./ColumnToVectorConvert";
import VariableUpdater from "./VariableUpdater";
import ColumnUpdater from "./ColumnUpdater";
import SimplexIterationResult from "../core/SimplexIteration";

class SimplexSolve{
    static solve(matrixCoefficent: number[][], costVector: number[], restrictionConst: number[], variableVector: string[], identityMatrix: number[][], identityCoefficents: number[], identityVariables: string[]) :SimplexIterationResult[]{
        let isNegative = true;
        let i = 1;
        let B_1A: number[][];
        let C_bB_1A: number[];
        let r: number[];
        let B_inverse_b: number[];
        let minIndexColumn: number;
        let columnVec: number[];
        let teta: number[];
        let minIndexPositive: number;
        let exit: string = '';
        let enter: string = '';
        let modelSolution: number;
        let inverseIndentityMatrix: number[][];
        let iterationResult: SimplexIterationResult[] = [];

        do{
            //Calculo de la matrix inversa
            inverseIndentityMatrix = MatrixCalculate.calculeInverse(identityMatrix);

            //Calculo de B^1 * A
            B_1A = MatrixCalculate.multiply(inverseIndentityMatrix, matrixCoefficent);
            let identityCoefficentsConvert = Convert.toMatrix(identityCoefficents, 1, identityCoefficents.length);

            //Calculo de C_b * B^1 * A
            C_bB_1A =  convert.toVector(MatrixCalculate.multiply(identityCoefficentsConvert, B_1A));

           //Calculo de r (C_b * B^1 * A - C^t)
            r = VectorCalculate.subtract(C_bB_1A, costVector);
            let restConstConvert = convert.toMatrix(restrictionConst, restrictionConst.length, 1);

            //Calculo de B_inversa * b (vector de costos reducidos)
            B_inverse_b = convert.toVector(MatrixCalculate.multiply(inverseIndentityMatrix, restConstConvert));

            //Index que se saca para saber cual variable entra
            minIndexColumn = VectorCalculate.findMinNegativeValueAndIndex(r).index;

            modelSolution = VectorCalculate.productoPunto(identityCoefficents, B_inverse_b);

            //Si no se encuentra con ningun numero negativo termina el proceso
            isNegative = vectorCalculate.findMinNegativeValueAndIndex(r).foundNegative;


            console.log("Tamaño del arreglo: " + iterationResult.length);
            if (!isNegative){
                iterationResult.push({
                    iteration: i,
                    modelSolution,
                    solutionVariables: identityVariables,
                    reducedCostVector: identityCoefficents,
                    variableToEnter: enter,
                    variableToExit: exit,
                });
                return iterationResult;
            }

            //Saca la columna que se usara para el calculo de teta
            columnVec = ColumnToVectorConvert.convertColumnToVector(B_1A, minIndexColumn);

            //calculo de teta (B:inversa * b / B:inversa * Aj (columnVec))
            teta = VectorCalculate.divide(B_inverse_b, columnVec);

            //Index que se saca de teta para saber cual variable sale
            minIndexPositive = VectorCalculate.findMinPositiveValueAndIndex(teta);

            let modelChange = VariableUpdater.updateVariables(minIndexPositive, minIndexColumn, variableVector, identityVariables, costVector, identityCoefficents);

            //Variable que sale
            exit = modelChange.variableToExit;

            //Variable que entra
            enter = modelChange.variableToEnter;

            //Vector que representa las variables
            identityVariables = modelChange.identityVariables;

            console.log("Matriz de variables: ");
            console.log(identityVariables);

            //Matrix que representa C:transpuesta_b
            identityCoefficents = modelChange.identityRestrictionConstants;
            console.log("coeficientes: ");
            console.log(identityCoefficents);

            let IV = identityVariables;
            let IC = identityCoefficents;

            iterationResult.push({
                iteration: i,
                modelSolution,
                solutionVariables: IV,
                reducedCostVector: IC,
                variableToEnter: enter,
                variableToExit: exit,
            });

            //Matrix que representa B para la siguiente iteracion
            identityMatrix = ColumnUpdater.updateColumn(identityMatrix, minIndexColumn, minIndexPositive, matrixCoefficent);
            i = i + 1;
        }while (isNegative);
        return iterationResult;
    }
}

export default SimplexSolve;