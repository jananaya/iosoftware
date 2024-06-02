"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputCleaner = /** @class */ (function () {
    function InputCleaner() {
    }
    InputCleaner.clean = function (input) {
        return input.replace(/\s+/g, '').trim();
    };
    return InputCleaner;
}());
exports.default = InputCleaner;
