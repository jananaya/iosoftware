"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectiveFunctionValidator = /** @class */ (function () {
    function ObjectiveFunctionValidator() {
    }
    ObjectiveFunctionValidator.validate = function (objectiveFunction) {
        var pattern = /^(max|min)\w=(([+-]?\d*\.?\d*\w\d+)([+-]\d*\.?\d*\w\d+)*)$/;
        return pattern.test(objectiveFunction);
    };
    return ObjectiveFunctionValidator;
}());
exports.default = ObjectiveFunctionValidator;
