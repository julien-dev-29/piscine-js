/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 */
const every = (arr, callbackFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (!callbackFn(arr[i], i, arr)) return false;
  }
  return true;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 */
const some = (arr, callbackFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (callbackFn(arr[i], i, arr)) return true;
  }
  return false;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 */
const none = (arr, callbackFn) => !some(arr, callbackFn);

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 50, 13];

console.log(every(array1, isBelowThreshold));
// Expected output: true

const array = [1, 7, 3, 2, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(some(array, even));
// Expected output: true
const arrayOne = [4, 5, 8, 8];
const equalTo = (element) => element == 8;

console.log(none(arrayOne, equalTo));
