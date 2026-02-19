/**
 *
 * @param {Array} arr
 * @param {number} size
 */
const chunk = (arr, size) => {
  if (!Array.isArray(arr)) throw new TypeError("Expected an array");
  if (size <= 0 || !Number.isInteger(size)) {
    throw new RangeError("size must be a positive integer");
  }
  const result = [];
  let subArr = [];
  for (let i = 0; i < arr.length; i++) {
    subArr.push(arr[i]);
    if (subArr.length === size) {
      result.push(subArr);
      subArr = [];
    }
  }
  if (subArr.length > 0) result.push(subArr);
  return result;
};

console.log(chunk(["string", 8, "yolo", true, 5, "les", "kikis"], 4));
