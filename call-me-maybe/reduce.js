/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @param {*} acc
 */
const fold = (arr, callbackFn, acc = 0) => {
  for (let i = 0; i < arr.length; i++) {
    acc = callbackFn(acc, arr[i], arr);
  }
  return acc;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @param {*} acc
 */
const foldRight = (arr, callbackFn, acc = 0) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    acc = callbackFn(acc, arr[i], arr);
  }
  return acc;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @param {*} acc
 */
const reduce = (arr, callbackFn) => {
  if (arr.length === 0) throw new Error();
  let acc = arr[0];
  for (let i = 1; i < arr.length; i++) {
    acc = callbackFn(acc, arr[i], arr);
  }
  return acc;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 */
const reduceRight = (arr, callbackFn) => {
  if (arr.length === 0) throw new Error();
  let acc = arr[arr.length - 1];
  for (let i = arr.length - 2; i >= 0; i--) {
    acc = callbackFn(acc, arr[i], arr);
  }
  return acc;
};

const adder = (a, b) => a + b;

console.log(fold([1, 2, 3], adder, 2)); // returns 8 (2 + 1 + 2 + 3)
console.log(foldRight([1, 2, 3], adder, 2)); // returns 8 (2 + 3 + 2 + 1)
console.log(reduce([1, 2, 3], adder)); // returns 6 (1 + 2 + 3)
console.log(reduceRight([1, 2, 3], adder)); // returns 6 (3 + 2 + 1)
