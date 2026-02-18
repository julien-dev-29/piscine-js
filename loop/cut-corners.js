/**
 *
 * @param {number} number
 */
const round = (number) => {
  if (number / 1 === number) return number;
};

const nums = [3.7, -3.7, 3.1, -3.1];
console.log(nums.map(round));
console.log(nums.map(floor));
console.log(nums.map(trunc));
console.log(nums.map(ceil));
