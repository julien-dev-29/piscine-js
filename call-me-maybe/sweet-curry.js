const mult2 = (a) => (b) => a * b;
const add3 = (a) => (b) => (c) => a + b + c;
const sub4 = (a) => (b) => (c) => (d) => a - b - c - d;

console.log(mult2(2)(3));
console.log(add3(2)(3)(4));
console.log(sub4(10)(3)(2)(1));
