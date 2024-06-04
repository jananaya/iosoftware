import MatricialModel from '../core/MatricialModel';

class IdentityMatrixExtractor {
    static cleanIdentityMatrix(identityMatrix: number[][]): number[][] {
        // Find non-zero columns in the identity matrix
        const nonZeroColumns: number[] = [];
        for (let j = 0; j < identityMatrix[0].length; j++) {
            let isZeroColumn = true;
            for (let i = 0; i < identityMatrix.length; i++) {
                if (identityMatrix[i][j] !== 0) {
                    isZeroColumn = false;
                    break;
                }
            }
            if (!isZeroColumn) {
                nonZeroColumns.push(j);
            }
        }

        // Filter the identity matrix based on non-zero columns
        const trimmedIdentityMatrix = identityMatrix.map(row => nonZeroColumns.map(col => row[col]));

        return trimmedIdentityMatrix;
    }

    static extractIdentityMatrix(model: MatricialModel) {
        const identityMatrix: number[][] = [];
        const identityVariables: string[] = [];

        const { coefficentMatrix, variableVector } = model;
        const numRows = coefficentMatrix.length;

        // Loop through the columns to identify columns that form the identity matrix
        for (let j = 0; j < variableVector.length; j++) {
            if (variableVector[j].startsWith('s') || variableVector[j].startsWith('u')) {
                let isIdentityColumn = true;
                let rowWithOne = -1;

                for (let i = 0; i < numRows; i++) {
                    const value = coefficentMatrix[i][j];
                    if (value === 1) {
                        if (rowWithOne === -1) {
                            rowWithOne = i;
                        } else {
                            isIdentityColumn = false;
                            break;
                        }
                    } else if (value !== 0) {
                        isIdentityColumn = false;
                        break;
                    }
                }

                if (isIdentityColumn && rowWithOne !== -1) {
                    const identityRow = Array(variableVector.length).fill(0);
                    identityRow[j] = 1;
                    identityMatrix.push(identityRow);
                    identityVariables.push(variableVector[j]);
                }
            }
        }

        // Sort the identity variables based on the variable names
        identityVariables.sort((a, b) => {
            if (a.startsWith('s') && b.startsWith('u')) {
                return -1; // 's' variables come first
            } else if (a.startsWith('u') && b.startsWith('s')) {
                return 1; // 'u' variables come last
            } else {
                return a.localeCompare(b); // Sort alphabetically for 's' or 'u' variables
            }
        });

        const sortedIndices = identityVariables
            .map((variable, index) => ({ variable, index }))
            .sort((a, b) => a.variable.localeCompare(b.variable))
            .map(({ index }) => index);

        const sortedIdentityMatrix = sortedIndices.map(index => identityMatrix[index]);
        const cleanSortedIdentityMatrix = this.cleanIdentityMatrix(sortedIdentityMatrix);

        return {
            identityMatrix: cleanSortedIdentityMatrix,
            identityVariables: identityVariables,
        };
    }
}

export default IdentityMatrixExtractor;
