import { create, all, Matrix , inv} from 'mathjs';

const math = create(all);

export class MatrixCalculate{
    static calculeInverse(matrix: number[][]): number[][]{
        return inv(matrix) as number[][];
    }

    static multiply(matrixA: number[][], matrixB: number[][]): number[][] {
        const result = math.multiply(matrixA, matrixB) as any;

        // Verifica si el resultado es una matriz
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('La multiplicación de matrices no produjo una matriz válida.');
        }
    }
}

export default MatrixCalculate;