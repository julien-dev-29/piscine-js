const invert = (/** @type {Object}*/ object) => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [value, key]),
  );
};

console.log(invert({ name: "jurol", age: 43 }));
