"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolynomialParser = /** @class */ (function () {
    function PolynomialParser() {
    }
    PolynomialParser.parse = function (polynomial) {
        var termPattern = /([+-]?\s*\d*)\s*x(\d+)/g;
        var monomials = [];
        var match;
        while ((match = termPattern.exec(polynomial)) !== null) {
            var coefficientStr = match[1].replace(/\s+/g, '');
            if (coefficientStr === '' || coefficientStr === '+') {
                coefficientStr = '1';
            }
            else if (coefficientStr === '-') {
                coefficientStr = '-1';
            }
            var coefficient = parseFloat(coefficientStr);
            var variable = match[2];
            monomials.push({ coefficient: coefficient, variable: variable });
        }
        return monomials;
    };
    return PolynomialParser;
}());
exports.default = PolynomialParser;
