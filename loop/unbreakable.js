/**
 *
 * @param {string} str
 * @param {string} separator
 * @returns {string[]}
 */
const split = (str, separator, limit = Infinity) => {
  if (limit === 0) return [];
  if (separator == null) return [str];
  if (separator === "") {
    const out = [];
    for (let i = 0; i < str.length && out.length; i++) {
      out.push(str[i]);
    }
    return out;
  }
  if (separator instanceof RegExp) return splitByRegex(str, separator, limit);
  return splitByString(str, separator, limit);
};

/**
 *
 * @param {string} str
 * @param {string | RegExp} separator
 * @returns
 */
function splitByString(str, separator, limit) {
  let result = [];
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    if (matchesAt(str, i, separator)) {
      result.push(temp);
      if (result.length === limit) return result;
      temp = "";
      i += separator.length - 1;
    } else {
      temp += str[i];
    }
  }
  result.push(temp);
  return result.slice(0, limit);
}

const splitByRegex = (str, regex, limit) => {
  const result = [];
  let lastIndex = 0;
  const re = new RegExp(regex.source, regex.flags.replace("g", "") + "g");
  let match;
  while ((match = re.exec(str)) !== null) {
    result.push(str.slice(lastIndex, match.index));
    if (result.length === limit) return result;
    lastIndex = match.index + match[0].length;
  }
  result.push(str.slice(lastIndex));
  return result.slice(0, limit);
};

/**
 *
 * @param {string} str
 * @param {number} i
 * @param {string} separator
 * @returns
 */
const matchesAt = (str, i, separator) => {
  for (let j = 0; j < separator.length; j++) {
    if (str[i + j] !== separator[j]) return false;
  }
  return true;
};

/**
 *
 * @param {Array} arr
 * @param {string} separtor
 */
const join = (arr, separator = ",") => {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i] == null ? "" : String(arr[i]);
    result += value;
    if (i + 1 !== arr.length) result += separator;
  }
  return result;
};

const str = "The quick brown fox jumps over the lazy dog.";

const words = split(str, " ");
console.log(words[3]);
// Expected output: "fox"

const chars = split(str, "");
console.log(chars);
// Expected output: "k"

const strCopy = split(str);
console.log(strCopy);

// Expected output: Array ["The quick brown fox jumps over the lazy dog."]
console.log(split("The quick brown fox", " ")[3]);
// "fox"

console.log(split("abc", ""));
// ["a", "b", "c"]

console.log(split("1,2,3,4", ",", 2));
// ["1", "2"]

console.log(split("ab1cd2ef", /\d/));
// ["ab", "cd", "ef"]

console.log(split("hello"));
// ["hello"]

const elements = ["Fire", "Air", "Water"];

console.log(join(elements));
// Expected output: "Fire,Air,Water"

console.log(join(elements, ""));
// Expected output: "FireAirWater"

console.log(join(elements, "-"));
// Expected output: "Fire-Air-Water"

console.log(join([1, 2, 3]));
// "1,2,3"

console.log(join([1, null, 3], "-"));
// "1--3"

console.log(join([undefined, "a", null], "|"));
// "|a|"

console.log(join(["a", , "c"], "."));
// "a..c"
