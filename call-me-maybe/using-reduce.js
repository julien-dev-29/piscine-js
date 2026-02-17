/**
 *
 * @param {number[]} arrNum
 * @returns number
 */
const adder = (arrNum, ...args) =>
  arrNum.reduce((acc, number) => acc + number, ...args);

/**
 *
 * @param {number[]} arrNum
 * @returns number
 */
const sumOrMul = (arrNum, ...args) =>
  arrNum.reduce(
    (acc, number) => (number % 2 === 0 ? acc * number : acc + number),
    ...args,
  );

/**
 *
 * @param {Function[]} callbackFns
 * @returns
 */
const funcExec = (callbackFns, ...args) =>
  callbackFns.reduce((acc, callbackFn) => callbackFn(acc), ...args);

console.log(adder([2, 4, 8]));
console.log(sumOrMul([1, 2, 3, 5, 8], 5));
console.log(funcExec([adder], [5, 3]));
