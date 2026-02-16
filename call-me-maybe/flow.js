const flow =
  (fns) =>
  (...args) =>
    fns.slice(1).reduce((result, fn) => fn(result), fns[0](...args));

const square = (nbr) => nbr * nbr;
const add2Numbers = (nbr1, nbr2) => nbr1 + nbr2;

const flowedFunctions = flow([add2Numbers, square]);
console.log(flowedFunctions(2, 3));