import PolynomialParser from './PolynomialParser';
import Restriction from './Restriction';

class RestrictionParser {
    static parse(restriction: string): Restriction {
        const operatorMatch = restriction.match(/<=|>=|=/);
        const operator = operatorMatch ? operatorMatch[0] : '=';
        const [lhs, rhs] = restriction.split(operator).map(part => part.trim());
        const lhsMonomials: Restriction['lhs'] = PolynomialParser.parse(lhs);

        return {
            lhs: lhsMonomials,
            operator: operator as Restriction['operator'],
            rhs: parseFloat(rhs)
        };       
    }
}

export default RestrictionParser;
