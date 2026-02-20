/**
 *
 * @param {number} number
 */
const sums = (number) => {
  const result = [];
  const backtrack = (remaining, start, path) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= remaining; i++) {
      path.push(i);
      backtrack(remaining - i, i, path);
      path.pop();
    }
  };
  backtrack(number, 1, []);
  return result;
};

console.log(sums(4));
