import ObjectiveFunctionValidator from "../../src/core/ObjectiveFunctionValidator";

describe('ObjectiveFunctionValidator', () => {
    test('valid objective function "max z = 3x1 + 2x2"', () => {
        expect(ObjectiveFunctionValidator.validate("max z = 3x1 + 2x2")).toBe(true);
    });

    test('valid objective function "min z = 2x1 - x2"', () => {
        expect(ObjectiveFunctionValidator.validate("min z = 2x1 - x2")).toBe(true);
    });

    test('invalid objective function "max z = 3x1 2x2"', () => {
        expect(ObjectiveFunctionValidator.validate("max z = 3x1 2x2")).toBe(false);
    });

    test('invalid objective function "max z 3x1 + 2x2"', () => {
        expect(ObjectiveFunctionValidator.validate("max z 3x1 + 2x2")).toBe(false);
    });

    test('invalid objective function "maximize z = 3x1 + 2x2"', () => {
        expect(ObjectiveFunctionValidator.validate("maximize z = 3x1 + 2x2")).toBe(false);
    });

    test('valid objective function "min y = -x1 + 5x2"', () => {
        expect(ObjectiveFunctionValidator.validate("min y = -x1 + 5x2")).toBe(true);
    });

    test('valid objective function "max y = 2x1 + 3.5x2"', () => {
        expect(ObjectiveFunctionValidator.validate("max y = 2x1 + 3.5x2")).toBe(true);
    });
});
