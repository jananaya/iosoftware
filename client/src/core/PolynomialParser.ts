import Monomial from './Monomial';

class PolynomialParser {
    static parse(polynomial: string): Monomial[] {
        const termPattern = /([+-]?\s*\d*)\s*x(\d+)/g;
        const monomials: Monomial[] = [];

        let match: RegExpExecArray | null;
        while ((match = termPattern.exec(polynomial)) !== null) {
            let coefficientStr = match[1].replace(/\s+/g, '');

            if (coefficientStr === '' || coefficientStr === '+') {
                coefficientStr = '1';
            } else if (coefficientStr === '-') {
                coefficientStr = '-1';
            }

            const coefficient = parseFloat(coefficientStr);
            const variable = match[2];

            monomials.push({ coefficient, variable });
        }

        return monomials;
    }
}

export default PolynomialParser;
