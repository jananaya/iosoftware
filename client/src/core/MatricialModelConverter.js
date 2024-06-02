"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatricialModelConverter = /** @class */ (function () {
    function MatricialModelConverter() {
    }
    MatricialModelConverter.convert = function (objectiveFunction, restrictions) {
        var _this = this;
        var model = {
            costVector: [],
            coefficentMatrix: [],
            variableVector: [],
            restrictionConstants: []
        };
        var variables = new Set();
        objectiveFunction.rhs.forEach(function (monomial) { return variables.add("".concat(_this.VariablePrefix).concat(monomial.variable)); });
        var restrictionIndex = 0;
        for (var _i = 0, restrictions_1 = restrictions; _i < restrictions_1.length; _i++) {
            var restriction = restrictions_1[_i];
            model.restrictionConstants.push(restriction.rhs);
            if (restriction.operator === '=') {
                variables.add("".concat(this.SurplusVariablePrefix).concat(restrictionIndex + 1));
            }
            else if (restriction.operator === '<=') {
                variables.add("".concat(this.SlackVariablePrefix).concat(restrictionIndex + 1));
            }
            else if (restriction.operator === '>=') {
                variables.add("".concat(this.SlackVariablePrefix).concat(restrictionIndex + 1));
                variables.add("".concat(this.SurplusVariablePrefix).concat(restrictionIndex + 1));
            }
            restrictionIndex += 1;
        }
        var commonVariables = Array.from(variables).filter(function (v) { return v.startsWith(_this.VariablePrefix); }).sort();
        var slackVariables = Array.from(variables).filter(function (v) { return v.startsWith(_this.SlackVariablePrefix); }).sort();
        var surplusVariables = Array.from(variables).filter(function (v) { return v.startsWith(_this.SurplusVariablePrefix); }).sort();
        model.variableVector = commonVariables.concat(slackVariables, surplusVariables);
        model.costVector = model.variableVector.map(function (variable) {
            var commonVariable = objectiveFunction.rhs.find(function (monomial) { return "".concat(_this.VariablePrefix).concat(monomial.variable) === variable; });
            if (commonVariable) {
                return commonVariable.coefficient;
            }
            if (variable.startsWith(_this.SlackVariablePrefix)) {
                return 0;
            }
            if (variable.startsWith(_this.SurplusVariablePrefix)) {
                return -_this.LongNumber;
            }
            return 0;
        });
        restrictionIndex = 0;
        for (var _a = 0, restrictions_2 = restrictions; _a < restrictions_2.length; _a++) {
            var restriction = restrictions_2[_a];
            var row = [];
            var _loop_1 = function (variable) {
                if (variable === "".concat(this_1.SlackVariablePrefix).concat(restrictionIndex + 1)) {
                    if (restriction.operator === '>=') {
                        row.push(-1);
                    }
                    else if (restriction.operator === '<=') {
                        row.push(1);
                    }
                    else {
                        row.push(0);
                    }
                }
                else if (variable === "".concat(this_1.SurplusVariablePrefix).concat(restrictionIndex + 1)) {
                    row.push(1);
                }
                else {
                    var monomial = restriction.lhs.find(function (monomial) { return "".concat(_this.VariablePrefix).concat(monomial.variable) === variable; });
                    row.push(monomial ? monomial.coefficient : 0);
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = model.variableVector; _b < _c.length; _b++) {
                var variable = _c[_b];
                _loop_1(variable);
            }
            model.coefficentMatrix.push(row);
            restrictionIndex += 1;
        }
        return model;
    };
    MatricialModelConverter.VariablePrefix = 'x';
    MatricialModelConverter.SlackVariablePrefix = 's';
    MatricialModelConverter.SurplusVariablePrefix = 'u';
    MatricialModelConverter.LongNumber = 500;
    return MatricialModelConverter;
}());
exports.default = MatricialModelConverter;
