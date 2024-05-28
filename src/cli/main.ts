import * as readline from 'readline';
import ObjectiveFunctionParser from '../core/ObjectiveFunctionParser';
import RestrictionValidator from '../core/RestrictionValidator';
import MatricialModelConverter from '../core/MatricialModelConverter';
import RestrictionParser from "../core/RestrictionParser";
import ObjectiveFunctionNormalizer from "../core/ObjetiveFunctionNormalizer";
import ObjectiveFunctionValidator from "../core/ObjectiveFunctionValidator";

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
    let objectiveFunction = await getInput("Ingrese la función objetivo: ");
    while (!ObjectiveFunctionValidator.validate(objectiveFunction)){
        console.log("La función objetivo ingresada no es válida. Por favor, inténtelo de nuevo.");
        objectiveFunction = await getInput("Ingrese la función objetivo: ");
    }
    let objectiveFunctionObj = ObjectiveFunctionParser.parse(objectiveFunction);
    while (!objectiveFunctionObj) {
        console.log("La función objetivo ingresada no es válida. Por favor, inténtelo de nuevo.");
        objectiveFunction = await getInput("Ingrese la función objetivo: ");
        objectiveFunctionObj = ObjectiveFunctionParser.parse(objectiveFunction);
    }

    objectiveFunctionObj = ObjectiveFunctionNormalizer.normalize(objectiveFunctionObj);

    let restrictions = [];
    let restriction = await getInput("Ingrese una restricción (o 'fin' para terminar): ");
    while (restriction.toLowerCase() !== 'fin') {
        if (RestrictionValidator.validate(restriction, objectiveFunctionObj.variables)) {
            restrictions.push(RestrictionParser.parse(restriction));
        } else {
            console.log("La restricción ingresada no es válida. Por favor, inténtelo de nuevo.");
        }
        restriction = await getInput("Ingrese una restricción (o 'fin' para terminar): ");
    }

    const matricialModel = MatricialModelConverter.convert(objectiveFunctionObj, restrictions);

    console.log("Vector de costos:", matricialModel.costVector);
    console.log("Matriz de coeficientes:");
    matricialModel.coefficentMatrix.forEach(row => {
        console.log(row.join(' '));
    });
    console.log("Vector de variables:", matricialModel.variableVector);
    console.log("Constantes de restricciones:", matricialModel.restrictionConstants);

    rl.close();
}

main().catch(err => console.error(err));
