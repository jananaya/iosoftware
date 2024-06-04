
class VectorCalculate {
    static subtract(vectorA: number[], vectorB: number[]): number[] {
        if (vectorA.length !== vectorB.length) {
            throw new Error("Los vectores deben tener la misma longitud para realizar la resta.");
        }

        const result: number[] = [];

        for (let i = 0; i < vectorA.length; i++) {
            result.push(vectorA[i] - vectorB[i]);
        }

        return result;
    }

    static divide(vectorA: number[], vectorB: number[]): number[] {
        if (vectorA.length !== vectorB.length) {
            throw new Error("Los vectores deben tener la misma longitud para realizar la división.");
        }

        const result: number[] = [];

        for (let i = 0; i < vectorA.length; i++) {
            if (vectorB[i] === 0) {
                throw new Error("La división por cero no está permitida.");
            }
            result.push(vectorA[i] / vectorB[i]);
        }

        return result;
    }

    static findMinNegativeValueAndIndex(vector: number[]): { index: number; foundNegative: boolean } {
        if (vector.length === 0) {
            throw new Error("El vector está vacío.");
        }

        let foundNegative = false;
        let minValue = Infinity;
        let index = -1;

        for (let i = 0; i < vector.length; i++) {
            if (vector[i] < 0 && vector[i] < minValue) {
                minValue = vector[i];
                index = i;
                foundNegative = true;
            }
        }

        return { index, foundNegative };
    }


    static findMinPositiveValueAndIndex(vector: number[]): number{
        if (vector.length === 0) {
            throw new Error("El vector está vacío.");
        }

        let minValue: number | undefined = undefined;
        let index: number  = 20000;

        for (let i = 0; i < vector.length; i++) {
            if (vector[i] >= 0) {
                if (minValue === undefined || vector[i] < minValue) {
                    minValue = vector[i];
                    index = i;
                }
            }
        }

        return  index;
    }
    static productoPunto(vector1: number[], vector2: number[]): number {
        if (vector1.length !== vector2.length) {
            throw new Error("Los vectores deben tener la misma longitud");
        }

        let producto = 0;
        for (let i = 0; i < vector1.length; i++) {
            producto += vector1[i] * vector2[i];
        }

        return producto;
    }
}

export default VectorCalculate;