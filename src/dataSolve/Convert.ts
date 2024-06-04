class VectorToMatrixConverter {
    static toMatrix(vector: number[], numRows: number, numCols: number): number[][] {
        if (vector.length !== numRows * numCols) {
            throw new Error('The length of the vector does not match the specified dimensions.');
        }

        const matrix: number[][] = [];
        for (let i = 0; i < numRows; i++) {
            const row: number[] = [];
            for (let j = 0; j < numCols; j++) {
                row.push(vector[i * numCols + j]);
            }
            matrix.push(row);
        }
        return matrix;
    }
    static toVector(matrix: number[][]): number[] {
        const vector: number[] = [];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                vector.push(matrix[i][j]);
            }
        }

        return vector;
    }
}

export default VectorToMatrixConverter;