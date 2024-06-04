class ColumnUpdater {
    static updateColumn(matrix1: number[][], columnIndexDelete: number, columIndexAdd : number, matrix2: number[][]): number[][] {
        // Verificar si las matrices tienen el mismo número de filas
        if (matrix1.length !== matrix2.length) {
            throw new Error("Las matrices tienen diferente número de filas.");
        }

        // Actualizar la columna en la primera matriz con los datos de la segunda matriz
        for (let i = 0; i < matrix1.length; i++) {
            matrix1[i][columIndexAdd] = matrix2[i][columnIndexDelete];
        }

        return matrix1;
    }
}

export default ColumnUpdater;
