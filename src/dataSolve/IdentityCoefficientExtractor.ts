class IdentityCoefficientExtractor {
    static extractIdentityCoefficients(identityVariables: string[], allVariables: string[], allCoefficients: number[]): number[] {
        const identityCoefficients: number[] = [];

        for (const identityVariable of identityVariables) {
            const index = allVariables.indexOf(identityVariable);
            if (index !== -1) {
                identityCoefficients.push(allCoefficients[index]);
            } else {
                identityCoefficients.push(0); // If the variable is not found, coefficient is 0
            }
        }

        return identityCoefficients;
    }
}

export default IdentityCoefficientExtractor;
