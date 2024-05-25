import Restriction from './Restriction';

class RestrictionParser {
    static parse(restriction: string): Restriction {
        const operatorMatch = restriction.match(/<=|>=|=/);
        const operator = operatorMatch ? operatorMatch[0] : '=';
        const [lhs, rhs] = restriction.split(operator).map(part => part.trim());

        const termPattern = /([+-]?\s*\d*)\s*x(\d+)/g;
        const lhsMonomials: Restriction['lhs'] = [];

        let match: RegExpExecArray | null;
        while ((match = termPattern.exec(lhs)) !== null) {
            let coefficientStr = match[1].replace(/\s+/g, '');

            if (coefficientStr === '' || coefficientStr === '+') {
                coefficientStr = '1';
            } else if (coefficientStr === '-') {
                coefficientStr = '-1';
            }
        
            const coefficient = parseFloat(coefficientStr);
            const variable = match[2];
        
            lhsMonomials.push({ coefficient, variable });
        }

        return {
            lhs: lhsMonomials,
            rhs: parseFloat(rhs),
            operator: operator as Restriction['operator']
        };       
    }
}

export default RestrictionParser;
