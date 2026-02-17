/**
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
const filterShortStateName = (arr) => arr.filter((str) => str.length < 7);

/**
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
const filterStartVowel = (arr) => arr.filter((str) => /^[aeiou]/i.test(str));

/**
 *
 * @param {string[]} arr
 */
const filter5Vowels = (arr) =>
  arr.filter((str) => (str.match(/[aeiou]/gi) ?? []).length >= 5);

/**
 *
 * @param {string[]} arr
 * @returns {string[]}
 */
const filter1DistinctVowel = (arr) =>
  arr.filter((str) => {
    const vowels = str.match(/[aeiou]/gi) ?? [];
    const uniqueVowel = [...new Set(vowels)];
    return uniqueVowel.length === 1;
  });

/**
 *
 * @param {object[]} arr
 * @returns {object[]}
 */
const multiFilter = (arr) =>
  arr.filter(
    (obj) =>
      obj.capital.length >= 8 &&
      !/^[aeiou]/i.test(obj.name) &&
      (obj.tag.match(/[aeiou]/gi) ?? []).length >= 1 &&
      obj.region !== "South",
  );

const array = ["yolo", "oles", "kisgfdogfdgfd"];
console.log(filterShortStateName(array));
console.log(filterStartVowel(array));
console.log(filter1DistinctVowel(array));

const obj1 = {
  capital: "Paris6666",
  name: "France",
  tag: "Fra",
  region: "North",
};

const obj2 = {
  capital: "Berlin",
  name: "Allemagne",
  tag: "De",
  region: "North",
};

const obj3 = {
  capital: "Madrid666",
  name: "Espagne",
  tag: "Es",
  region: "Sud",
};

const arrObj = [obj1, obj2, obj3];
console.log(multiFilter(arrObj));
