"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectiveFunctionNormalizer = /** @class */ (function () {
    function ObjectiveFunctionNormalizer() {
    }
    ObjectiveFunctionNormalizer.normalize = function (objectiveFunction) {
        if (objectiveFunction.operator === 'min') {
            var normalizedRhs = objectiveFunction.rhs.map(function (monomial) {
                var coefficient = monomial.coefficient * -1;
                return { coefficient: coefficient, variable: monomial.variable };
            });
            return {
                rhs: normalizedRhs,
                operator: 'max',
            };
        }
        return objectiveFunction;
    };
    return ObjectiveFunctionNormalizer;
}());
exports.default = ObjectiveFunctionNormalizer;
