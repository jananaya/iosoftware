type Operator = '<=' | '>=' | '=';

interface Monomial {
    coefficient: number;
    variable: string;
};

interface Restriction {
    lhs: Monomial[];
    rhs: number;
    operator: Operator;
};

export default Restriction;