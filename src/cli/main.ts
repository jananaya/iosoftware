import * as readline from 'readline';
import ObjectiveFunctionParser from '../core/ObjectiveFunctionParser';
import RestrictionValidator from '../core/RestrictionValidator';
import MatricialModelConverter from '../core/MatricialModelConverter';
import RestrictionParser from '../core/RestrictionParser';
import ObjectiveFunctionNormalizer from '../core/ObjetiveFunctionMaximize';
import ObjectiveFunctionValidator from '../core/ObjectiveFunctionValidator';
import InputCleaner from "../core/InputCleaner";
import IdentityMatrixExtractor from '../dataSolve/IdentityMatrixExtractor';
import IdentityCoefficientExtractor from '../dataSolve/IdentityCoefficientExtractor';
import Convert from "../dataSolve/Convert";
import MatrixCalculate from "../dataSolve/MatrixCalculate";
import VectorCalculate from "../dataSolve/VectorCalculate";
import ColumnToVectorConvert from "../dataSolve/ColumnToVectorConvert";
import VariableUpdater from "../dataSolve/VariableUpdater";
import ColumnUpdater from "../dataSolve/ColumnUpdater";
import SimplexSolve from "../dataSolve/SimplexSolve";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    let objectiveFunction = await getInput("Ingrese la función objetivo (ej: max z = x1 + x2 + x3 + x4): ");
    while (!ObjectiveFunctionValidator.validate(objectiveFunction)){
        console.log("La función objetivo ingresada no es válida. Por favor, inténtelo de nuevo.");
        objectiveFunction = await getInput("Ingrese la función objetivo (ej: max z = x1 + x2 + x3 + x4): ");
    }

    let objectiveFunctionObj = ObjectiveFunctionParser.parse(objectiveFunction);
    while (!objectiveFunctionObj) {
        console.log("La función objetivo ingresada no fue parseada. Por favor, inténtelo de nuevo.");
        objectiveFunction = await getInput("Ingrese la función objetivo (ej: max z = x1 + x2 + x3 + x4): ");
        objectiveFunctionObj = ObjectiveFunctionParser.parse(objectiveFunction);
    }

    objectiveFunctionObj = ObjectiveFunctionNormalizer.normalize(objectiveFunctionObj);

    let restrictions = [];
    let restriction = InputCleaner.clean(await getInput("Ingrese una restricción (ej: x1 >= 4, 2x1 - 2x2 = 6) (o 'fin' para terminar): "));
    while (restriction.toLowerCase() !== 'fin') {
        if (RestrictionValidator.validate(restriction, objectiveFunctionObj)) {
            restrictions.push(RestrictionParser.parse(restriction));
        } else {
            console.log("La restricción ingresada no es válida. Por favor, inténtelo de nuevo.");
        }
        restriction = InputCleaner.clean(await getInput("Ingrese una restricción (ej: x1 >= 4, 2x1 - 2x2 = 6) (o 'fin' para terminar): "));
    }

    const matricialModel = MatricialModelConverter.convert(objectiveFunctionObj, restrictions);
    const matrixCoefficent = matricialModel.coefficentMatrix;
    const costVector = matricialModel.costVector;
    const restrictionConst = matricialModel.restrictionConstants;
    const variableVector = matricialModel.variableVector;
    console.log("Vector de costos:", costVector);
    console.log("Matriz de coeficientes:");
    matrixCoefficent.forEach(row => {
        console.log(row.join(' '));
    });
    console.log("Vector de variables:", matricialModel.variableVector);
    console.log("Constantes de restricciones:", restrictionConst);

    let { identityMatrix, identityVariables } = IdentityMatrixExtractor.extractIdentityMatrix(matricialModel);
    console.log("Matriz Identidad:");
    identityMatrix.forEach(row => {
        console.log(row.join(' '));
    });
    console.log("Variables Identidad:", identityVariables);

    // Envía los datos necesarios a IdentityCoefficientExtractor y recibe lo retornado
    let identityCoefficients = IdentityCoefficientExtractor.extractIdentityCoefficients(
        identityVariables,
        variableVector,
        costVector
    );
    console.log("");
    console.log("");
    console.log("");
    SimplexSolve.solve(matrixCoefficent, costVector, restrictionConst, variableVector, identityMatrix, identityCoefficients, identityVariables);
}

main().catch(err => console.error(err));
