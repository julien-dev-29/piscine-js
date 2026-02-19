/**
 *
 * @param {Array} arr
 */
const flat = (arr, depth = 1) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }
  if (depth < 1) return arr.slice();
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (Array.isArray(value) && depth > 0) {
      const flatten = flat(value, depth === Infinity ? Infinity : depth - 1);
      for (let j = 0; j < flatten.length; j++) {
        result.push(flatten[j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
};

const arr1 = [0, 1, 2, [3, 4]];
console.log(flat(arr1));

const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(flat(arr2));

console.log(flat(arr2, 2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.log(flat(arr2, Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]
