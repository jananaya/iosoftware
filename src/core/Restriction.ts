import Monomial from './Monomial';

type Operator = '<=' | '>=' | '=';

interface Restriction {
    lhs: Monomial[];
    operator: Operator;
    rhs: number;

}

export default Restriction;