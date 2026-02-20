/**
 *
 * @param {string} str
 * @param {RegExp} regex1
 * @param {RegExp} regex2
 * @returns {boolean}
 */
const sameAmount = (str, regex1, regex2) =>
  str.match(regex1).length === str.match(regex2).length;

console.log(sameAmount("a1b2c3", /\d/g, /[0-9]/g));
// true → both match 3 times

console.log(sameAmount("hello 123 world", /\d/g, /\w/g));
// false → digits match 3 times, word chars match many more

console.log(sameAmount("aa bb cc", /a/g, /b/g));
// true → each matches 2 times
