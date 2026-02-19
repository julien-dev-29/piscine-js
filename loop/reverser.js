/**
 *
 * @param {Array | string} elemt
 * @returns {Array | string}
 */
const reverse = (elemt) => {
  let result;
  if (typeof elemt === "string") {
    result = "";
  } else {
    result = [];
  }
  for (let i = elemt.length - 1; i >= 0; i--) {
    if (typeof elemt === "string") {
      result += elemt[i];
    } else {
      result.push(elemt[i]);
    }
  }
  return result;
};

console.log(reverse(["yolo", "les", "kikis"]));
console.log(reverse("yolo les kikis!"));
