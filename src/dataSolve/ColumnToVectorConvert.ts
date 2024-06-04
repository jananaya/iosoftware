class ColumnToVectorConverter {
    static convertColumnToVector(matrix: number[][], index: number): number[] {
        if (index < 0 || index >= matrix[0].length) {
            throw new Error("El índice está fuera del rango de la matriz.");
        }

        const vector: number[] = [];
        for (let i = 0; i < matrix.length; i++) {
            vector.push(matrix[i][index]);
        }

        return vector;
    }
}

export default ColumnToVectorConverter;