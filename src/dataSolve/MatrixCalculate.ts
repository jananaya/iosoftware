import { create, all, multiply, matrix, Matrix } from 'mathjs';

const math = create(all);

export class MatrixCalculate {
    static calculeInverse(matrix: number[][]): number[][] {
        return math.inv(matrix) as number[][];
    }

    static multiply(A: number[][], B: number[][]): number[][] {
        const matrixA: Matrix = math.matrix(A);
        const matrixB: Matrix = math.matrix(B);

        // Perform matrix multiplication
        const resultMatrix = math.multiply(matrixA, matrixB) as Matrix;

        // Convert the result matrix back to a 2D array
        const resultArray = resultMatrix.toArray() as number[][];

        // Round values to 10 decimal places
        return resultArray.map(row =>
            row.map(value => parseFloat(value.toFixed(10)))
        );
    }
}

export default MatrixCalculate;