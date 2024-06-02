"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolynomialParser_1 = require("./PolynomialParser");
var ObjectiveFunctionParser = /** @class */ (function () {
    function ObjectiveFunctionParser() {
    }
    ObjectiveFunctionParser.parse = function (objectiveFunction) {
        var pattern = /^(max|min)\s+[a-zA-Z]\s*=\s*([+-]?\s*\d*\.?\d*[a-zA-Z]\d+(\s*[+-]\s*\d*\.?\d*[a-zA-Z]\d+)*)$/;
        var match = objectiveFunction.match(pattern);
        if (!match) {
            return null;
        }
        var operator = match[1];
        var rhs = PolynomialParser_1.default.parse(match[2]);
        return { operator: operator, rhs: rhs };
    };
    return ObjectiveFunctionParser;
}());
exports.default = ObjectiveFunctionParser;
