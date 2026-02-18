/**
 *
 * @param {string} str
 * @returns {string}
 */
const cutFirst = (str) => str.slice(2);

/**
 *
 * @param {string} str
 * @returns {string}
 */
const cutLast = (str) => str.slice(0, -2);

/**
 *
 * @param {string} str
 * @returns string
 *
 */
const cutFirstLast = (str) => str.slice(2, -2);

/**
 *
 * @param {string} str
 * @returns
 */
const keepFirst = (str) => str.slice(0, 2);

/**
 *
 * @param {string} str
 * @returns
 */
const keepLast = (str) => str.slice(-2);

/**
 * 
 * @param {string} str 
 * @returns 
 */
const keepFirstLast = (str) => keepFirst(str) + keepLast(str);

console.log(cutFirst("yolo les kikis!"));
console.log(cutLast("yolo les kikis!"));
console.log(cutFirstLast("yolo les kikis!"));
console.log(keepFirst("yolo les kikis!"));
console.log(keepLast("yolo les kikis!"));
console.log(keepFirstLast("yolo les kikis!"));
