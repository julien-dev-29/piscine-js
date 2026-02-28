/**
 *
 * @param {Object} object
 * @param {string | string[]} str
 * @returns {Object}
 */
const pick = (object, str) =>
  str
    ? Object.fromEntries(
        Object.entries(object).filter(([key]) => str.includes(key)),
      )
    : "Pas de string";

/**
 *
 * @param {Object} object
 * @param {string | string[]} str
 * @returns {Object}
 */
const omit = (object, str) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) =>
      typeof str === "string" ? !str.match(key) : !str.includes(key),
    ),
  );

console.log(pick({ name: "jurol", age: 43 }, ["age"]));
console.log(omit({ name: "jurol", age: 43 }, ["age"]));
