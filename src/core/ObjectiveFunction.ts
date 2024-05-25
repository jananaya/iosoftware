import Monomial from './Monomial';

type Operator = 'max' | 'min';

interface ObjectiveFunction {
    rhs: Monomial[];
    operator: Operator;
};

export default ObjectiveFunction;