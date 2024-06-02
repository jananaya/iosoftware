import React, { useState } from 'react';
import './App.css';
import MatricialModelConverter from './core/MatricialModelConverter';
import InputCleaner from './core/InputCleaner';
import ObjectiveFunctionValidator from './core/ObjectiveFunctionValidator';
import ObjectiveFunctionParser from './core/ObjectiveFunctionParser';
import ObjectiveFunctionMaximizer from './core/ObjectiveFunctionMaximizer';
import RestrictionValidator from './core/RestrictionValidator';
import RestrictionParser from './core/RestrictionParser';

function App() {
    const [objectiveFunction, setObjectiveFunction] = useState("");
    const [restrictionInput, setRestrictionInput] = useState("");
    const [restrictions, setRestrictions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const cleanInput = (input) => {
        return InputCleaner.clean(input);
    };

    const handleObjectiveFunctionInput = async () => {
        try {
            const input = prompt("Ingrese la función objetivo:");
            if (input !== null) {
                const cleanedObjectiveFunction = cleanInput(input);
                setObjectiveFunction(cleanedObjectiveFunction);
            }
        } catch (error) {
            console.error("Error al procesar los datos:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Función Objetivo:", objectiveFunction);

            if (!ObjectiveFunctionValidator.validate(objectiveFunction)) {
                setErrorMessage("La función objetivo ingresada no es válida. Por favor, inténtelo de nuevo.");
                return;
            }

            let objectiveFunctionObj = ObjectiveFunctionParser.parse(objectiveFunction);
            if (!objectiveFunctionObj) {
                setErrorMessage("Error al parsear la función objetivo. Por favor, inténtelo de nuevo.");
                return;
            }

            objectiveFunctionObj = ObjectiveFunctionMaximizer.maximize(objectiveFunctionObj);

            const parsedRestrictions = [];
            for (let restr of restrictions) {
                const cleanedRestriction = cleanInput(restr);
                if (RestrictionValidator.validate(cleanedRestriction, objectiveFunctionObj)) {
                    parsedRestrictions.push(RestrictionParser.parse(cleanedRestriction));
                } else {
                    setErrorMessage("Una de las restricciones ingresadas no es válida. Por favor, inténtelo de nuevo.");
                    return;
                }
            }

            const model = MatricialModelConverter.convert(objectiveFunctionObj, parsedRestrictions);

            setErrorMessage(""); // Limpia cualquier mensaje de error anterior

            console.log("Vector de costos:", model.costVector);
            console.log("Matriz de coeficientes:");
            model.coefficentMatrix.forEach(row => {
                console.log(row.join(' '));
            });
            console.log("Vector de variables:", model.variableVector);
            console.log("Constantes de restricciones:", model.restrictionConstants);

        } catch (error) {
            setErrorMessage("Error al procesar los datos: " + error.message);
            console.error("Error al procesar los datos:", error);
        }
    };

    const handleAddRestriction = () => {
        const cleanedInput = cleanInput(restrictionInput);
        if (cleanedInput) {
            setRestrictions([...restrictions, cleanedInput]);
            setRestrictionInput("");
        }
    };

    return (
        <div>
            <h1>Generador de Modelos Matriciales</h1>
            <button onClick={handleObjectiveFunctionInput}>Ingresar Función Objetivo</button>
            <form onSubmit={handleSubmit}>
                <label>Función Objetivo:</label>
                <input type="text" value={objectiveFunction} onChange={(e) => setObjectiveFunction(e.target.value)} />

                <h2>Restricciones:</h2>
                <input type="text" value={restrictionInput} onChange={(e) => setRestrictionInput(e.target.value)} />
                <button type="button" onClick={handleAddRestriction}>Agregar Restricción</button>

                <button type="submit">Generar Modelo</button>
            </form>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    );
}

export default App;
