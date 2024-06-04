import matricialModel from "../core/MatricialModel";
import MatrixCalculate from "./MatrixCalculate";
import Convert from "./Convert";
import convert from "./Convert";
import VectorCalculate from "./VectorCalculate";
import vectorCalculate from "./VectorCalculate";
import ColumnToVectorConvert from "./ColumnToVectorConvert";
import VariableUpdater from "./VariableUpdater";
import ColumnUpdater from "./ColumnUpdater";


class SimplexSolve{
    static solve(matrixCoefficent: number[][], costVector: number[], restrictionConst: number[], variableVector: string[], identityMatrix: number[][], identityCoefficents: number[], identityVariables: string[]) :void{
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
        let exit: string;
        let enter: string;
        let inverseIndentityMatrix: number[][];

        do{
            inverseIndentityMatrix = MatrixCalculate.calculeInverse(identityMatrix);

            console.log("Matriz Identidad inversa:");
            inverseIndentityMatrix.forEach(row => {
                console.log(row.join(' '));
            });
            console.log("")
            console.log("")

            console.log("A impresa:");
            matrixCoefficent.forEach(row => {
                console.log(row.join(' '));
            });
            console.log("")
            console.log("")

            B_1A = MatrixCalculate.multiply(inverseIndentityMatrix, matrixCoefficent);
            console.log("------- Todo el calculo de r ------")
            console.log("B-1 * A")
            B_1A.forEach(row => {
                console.log(row.join(' '));
            });

            interface IterationData {
                iteration: number;
                modelSolution: number;
                solutionVariables: string[];
                reducedCostVector: number[];
                variableToEnter: string;
                variableToExit: string;
            }

            let identityCoefficentsConvert = Convert.toMatrix(identityCoefficents, 1, identityCoefficents.length);
            C_bB_1A =  convert.toVector(MatrixCalculate.multiply(identityCoefficentsConvert, B_1A));
            r = VectorCalculate.subtract(C_bB_1A, costVector);
            console.log("");
            console.log("");

            console.log("Calculo C_bB_1A");
            console.log(C_bB_1A);

            console.log("");
            console.log("");

            console.log("Calculo de r");
            console.log(r)

            console.log("");
            console.log("");


            let restConstConvert = convert.toMatrix(restrictionConst, restrictionConst.length, 1);
            B_inverse_b = convert.toVector(MatrixCalculate.multiply(inverseIndentityMatrix, restConstConvert));

            console.log("constante de restricciones");
            console.log(restConstConvert);


            console.log("");
            console.log("");


            console.log("Calculo de B^-1 * b");
            console.log(B_inverse_b);

            minIndexColumn = VectorCalculate.findMinNegativeValueAndIndex(r).index;
            isNegative = vectorCalculate.findMinNegativeValueAndIndex(r).foundNegative;

            console.log("");
            console.log("");

            console.log("Index minimo de r " + minIndexColumn);
            console.log("es negativo: " + isNegative);

            console.log("");
            console.log("");
            if (!isNegative){
                break;
            }

            columnVec = ColumnToVectorConvert.convertColumnToVector(B_1A, minIndexColumn);

            console.log("Vector que sale de A");
            console.log(columnVec);

            console.log("");
            console.log("");

            teta = VectorCalculate.divide(B_inverse_b, columnVec);

            console.log("Calculo de teta");
            console.log(teta);

            console.log("");
            console.log("");

            minIndexPositive = VectorCalculate.findMinPositiveValueAndIndex(teta);

            console.log("Index minimo que sale de teta " + minIndexPositive);

            console.log("");
            console.log("");

            let modelChange = VariableUpdater.updateVariables(minIndexPositive, minIndexColumn, variableVector, identityVariables, costVector, identityCoefficents);
            exit = modelChange.variableToExit;
            enter = modelChange.variableToEnter;
            identityVariables = modelChange.identityVariables;
            identityCoefficents = modelChange.identityRestrictionConstants;

            console.log("Variable que sale " + exit);
            console.log("Variable que entra " + enter);

            console.log("");
            console.log("");

            console.log("Variables de identidad");
            console.log(identityVariables);

            console.log("");
            console.log("");

            console.log("Coeficientes de identidad");
            console.log(identityCoefficents);

            console.log("");
            console.log("");


            identityMatrix = ColumnUpdater.updateColumn(identityMatrix, minIndexColumn, minIndexPositive, matrixCoefficent);

            console.log("Matriz identidad actualizada: ");
            identityMatrix.forEach(row => {
                console.log(row.join(' '));
            });

            i = i + 1;
            console.log("");
            console.log("");
        }while (isNegative);

        console.log("--- Finish ---")
    }
}

export default SimplexSolve;