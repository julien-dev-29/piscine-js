/**
 * @param {number} N
 * @returns {string}
 */
const nasa = (N) => {
  if (!Number.isInteger(N) || N < 1) {
    throw new RangeError("N must be a positive integer");
  }
  const result = [];
  for (let i = 1; i <= N; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("NASA");
    } else if (i % 3 === 0) {
      result.push("NA");
    } else if (i % 5 === 0) {
      result.push("SA");
    } else result.push(String(i));
  }
  return result.join(" ");
};

console.log(nasa(35));
