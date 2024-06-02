import React, { useState } from 'react';
import './App.css';

function App() {
    const [objectiveFunction, setObjectiveFunction] = useState("");
    const [restrictionInput, setRestrictionInput] = useState("");
    const [restrictions, setRestrictions] = useState([]);
    const [matricialModel, setMatricialModel] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/generarModelo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    objectiveFunction: objectiveFunction,
                    restrictions: restrictions
                }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener el modelo matricial');
            }

            const model = await response.json();
            setMatricialModel(model);
        } catch (error) {
            console.error("Error al obtener el modelo matricial:", error);
        }
    };

    const handleAddRestriction = () => {
        setRestrictions([...restrictions, restrictionInput]);
        setRestrictionInput("");
    };

    return (
        <div>
            <h1>Generador de Modelos Matriciales</h1>
            <form onSubmit={handleSubmit}>
                <label>Función Objetivo:</label>
                <input type="text" value={objectiveFunction} onChange={(e) => setObjectiveFunction(e.target.value)} />
                
                <h2>Restricciones:</h2>
                <input type="text" value={restrictionInput} onChange={(e) => setRestrictionInput(e.target.value)} />
                <button type="button" onClick={handleAddRestriction}>Agregar Restricción</button>
                
                <button type="submit">Generar Modelo</button>
            </form>

            {matricialModel && (
                <div>
                    <h2>Modelo Generado:</h2>
                    <pre>{JSON.stringify(matricialModel, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
