const multiply = (a, b) => {
  let sign;
  [a, b, sign] = handleSign(a, b);
  let result = 0;
  for (let i = 0; i < b; i++) {
    result += a;
  }
  return result * sign;
};
const divide = (a, b) => {
  if (b === 0) return "Infinity";
  let sign;
  [a, b, sign] = handleSign(a, b);
  let count = 0;
  while (a >= b) {
    a -= b;
    count++;
  }
  return count * sign;
};
const modulo = (a, b) => {
  if (b === 0) return "Infinity";
  let sign;
  [a, b, sign] = handleSign(a, b);
  while (a >= b) {
    a -= b;
  }
  return a * sign;
};

function handleSign(a, b) {
  let sign = (a < 0) ^ (b < 0) ? -1 : 1;
  a = Math.abs(a);
  b = Math.abs(b);
  return [a, b, sign];
}
console.log(multiply(2, -5));
console.log(divide(20, -3));
console.log(modulo(20, 3));
