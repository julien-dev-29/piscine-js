/**
 *
 * @param {string} str
 * @returns {Array}
 */
const letterSpaceNumber = (str) => {
  const result = [];
  const regex = /[a-zA-Z]\s\d(?![a-zA-Z0-9])/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    result.push(match[0]);
  }
  return result;
};

console.log(letterSpaceNumber("example 1, example 20"));
// output: ['e 1']
