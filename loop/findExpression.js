const add4 = "+4";
const mul2 = "*2";

/**
 *
 * @param {number} number
 * @returns {string}
 */
const findExpression = (number) => {
  const helper = (current, expr) => {
    if (current === number) return expr;
    if (current > number) return undefined;
    let res = helper(current + 4, expr + " " + add4);
    if (res !== undefined) return res;
    res = helper(current * 2, expr + " " + mul2);
    if (res !== undefined) return res;
    return undefined;
  };
  return helper(1, "1");
};

// Test
console.log(findExpression(14)); // "1 +4 *2 +4"
console.log(findExpression(10)); // "1 +4 *2"
console.log(findExpression(7)); // undefined
