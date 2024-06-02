"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolynomialParser_1 = require("./PolynomialParser");
var RestrictionParser = /** @class */ (function () {
    function RestrictionParser() {
    }
    RestrictionParser.parse = function (restriction) {
        var operatorMatch = restriction.match(/<=|>=|=/);
        var operator = operatorMatch ? operatorMatch[0] : '=';
        var _a = restriction.split(operator).map(function (part) { return part.trim(); }), lhs = _a[0], rhs = _a[1];
        var lhsMonomials = PolynomialParser_1.default.parse(lhs);
        return {
            lhs: lhsMonomials,
            rhs: parseFloat(rhs),
            operator: operator
        };
    };
    return RestrictionParser;
}());
exports.default = RestrictionParser;
