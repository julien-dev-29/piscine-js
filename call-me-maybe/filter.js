/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @returns Array
 */
const filter = (arr, callbackFn) => {
  const filteredArray = [];
  arr.forEach((element) => {
    if (callbackFn(element)) filteredArray.push(element);
  });
  return filteredArray;
};

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @returns Array
 */
const reject = (arr, callbackFn) =>
  filter(arr, (...args) => !callbackFn(...args));

/**
 *
 * @param {Array} arr
 * @param {Function} callbackFn
 * @returns Array
 */
const partition = (arr, callbackFn) => [
  filter(arr, callbackFn),
  reject(arr, callbackFn),
];

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = partition(words, (word) => word.length > 6);

console.log(result); // Expected output: Array ["exuberant", "destruction", "present"]
