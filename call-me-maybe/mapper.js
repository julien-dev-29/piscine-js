/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @returns {Array}
 */
const map = (arr, callbackFn) => {
  const mappedArray = [];
  for (let i = 0; i < arr.length; i++) {
    mappedArray.push(callbackFn(arr[i], i, arr));
  }
  return mappedArray;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 */
const flatMap = (arr, callbackFn) => [].concat(...map(arr, callbackFn));

const array = [1, 4, 9, 16];

// Pass a function to map
const mapped = map(array, (x) => x * 2);

console.log(mapped);
// Expected output: Array [2, 8, 18, 32]

const arr = [1, 2, 1];

const result = arr.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]
