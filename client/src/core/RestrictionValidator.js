"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RestrictionValidator = /** @class */ (function () {
    function RestrictionValidator() {
    }
    RestrictionValidator.validate = function (restriction, objectiveVariables) {
        var overallPattern = /^([+-]?\d*\w\d+([+-]\d*\w\d+)*)([<>=]=?)[+-]?\d+$/;
        if (!overallPattern.test(restriction)) {
            return false;
        }
        var operatorMatch = restriction.match(/<=|>=|=/);
        if (!operatorMatch) {
            return false;
        }
        var operator = operatorMatch[0];
        var _a = restriction.split(operator).map(function (part) { return part.trim(); }), lhs = _a[0], rhs = _a[1];
        var rhsNumber = Number(rhs);
        if (isNaN(rhsNumber) || rhsNumber < 0) {
            return false;
        }
        var termPattern = /([+-]?\d*)(\w\d+)/g;
        var seenVariables = new Set();
        var match;
        var remainingLHS = lhs;
        while ((match = termPattern.exec(lhs)) !== null) {
            var variable = match[2];
            console.log('Variable encontrada:', variable);
            console.log('Variable objetivo:', objectiveVariables);
            if (!objectiveVariables.includes(variable)) {
                return false;
            }
            if (seenVariables.has(variable)) {
                return false;
            }
            seenVariables.add(variable);
            remainingLHS = remainingLHS.replace(match[0], '').trim();
        }
        var independentTermPattern = /([+-]?\d+)(?!\w\d+)/;
        return !independentTermPattern.test(remainingLHS);
    };
    return RestrictionValidator;
}());
exports.default = RestrictionValidator;
