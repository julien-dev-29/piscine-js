/**
 *
 * @param {Array} arr
 * @returns {boolean}
 */
const longWords = (arr) =>
  arr.every((elmt) => typeof elmt === "string" && elmt.length >= 5);

/**
 *
 * @param {Array} arr
 * @returns {boolean}
 */
const oneLongWord = (arr) =>
  arr.some((elmt) => typeof elmt === "string" && elmt.length >= 10);

/**
 *
 * @param {Array} arr
 * @returns {boolean}
 */
const noLongWords = (arr) =>
  !arr.some((elmt) => typeof elmt === "string" && elmt.length >= 7);
