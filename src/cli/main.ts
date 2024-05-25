import MatricialModelConverter from '../core/MatricialModelConverter';
import ObjectiveFunction from '../core/ObjectiveFunction';
import ObjectiveFunctionParser from '../core/ObjectiveFunctionParser';
import Restriction from '../core/Restriction';
import RestrictionParser from '../core/RestrictionParser';

const restrictionsStr: string[] = [
    '2x1 + x2 <= 20',
    'x1 + x2 <= 18',
    'x1 + 2x2 >= 12'
];
const objectiveFunctionStr: string = 'max z = 5x1 + 4x2';

const restrictions: Restriction[] = restrictionsStr.map((restrictionStr: string) =>
    RestrictionParser.parse(restrictionStr));

const objectiveFunction: ObjectiveFunction = ObjectiveFunctionParser
    .parse(objectiveFunctionStr) as ObjectiveFunction;

const model = MatricialModelConverter.convert(objectiveFunction, restrictions);

console.log(model);
