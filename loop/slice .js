/**
 *
 * @param {string | Array} elemt
 * @param {number} start
 * @param {number} end
 */
const slicer = (elemt, start = 0, end = elemt.length) => {
  if (end < 0) end = elemt.length + end;
  if (start < 0) start = elemt.length + start;
  let result;
  if (typeof elemt === "string") {
    result = "";
  } else {
    result = [];
  }
  for (let i = start; i < end; i++) {
    if (typeof elemt === "string") {
      result += elemt[i];
    } else {
      result.push(elemt[i]);
    }
  }
  return result;
};

const str = "The quick brown fox jumps over the lazy dog.";
console.log(slicer("yolo", 2));
console.log(slicer(str, -9, -5));
