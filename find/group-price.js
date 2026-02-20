/**
 *
 * @param {string} str
 * @returns {Array[]}
 */
const groupPrice = (str) => {
  const matches = str.match(/[A-Z]+([0-9]+)\.([0-9]{2})/);
  if (!matches) return [];
  return [matches[0], matches[1], matches[2]];
};

console.log(groupPrice("USD12.31"));
