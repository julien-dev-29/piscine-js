/**
 *
 * @param {string} str
 */
const vowelDots = (str) => {
  const vowels = /[aeiou]/g;
  const newStr = str.replace(vowels, (match) => match + ".");
  return newStr;
};

console.log(vowelDots("Yolo les kikis!"));
