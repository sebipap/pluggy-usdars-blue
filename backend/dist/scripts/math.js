"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentageDiff = exports.arrAverage = exports.arrSum = void 0;
const arrSum = (arr) => arr.reduce((last, current) => last + current);
exports.arrSum = arrSum;
const arrAverage = (arr) => {
    const numbersArray = arr.filter((val) => val);
    return (0, exports.arrSum)(numbersArray) / numbersArray.length;
};
exports.arrAverage = arrAverage;
const percentageDiff = (first, second) => ((first - second) / second) * 100;
exports.percentageDiff = percentageDiff;
//# sourceMappingURL=math.js.map