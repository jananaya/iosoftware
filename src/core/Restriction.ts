import Monomial from './Monomial';

type Operator = '<=' | '>=' | '=';

interface Restriction {
    lhs: Monomial[];
    rhs: number;
    operator: Operator;
};

export default Restriction;