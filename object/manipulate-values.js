const nutritionDB = {
  tomato: {
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    sugar: 2.6,
    fiber: 1.2,
    fat: 0.2,
  },
  vinegar: {
    calories: 20,
    protein: 0.04,
    carbs: 0.6,
    sugar: 0.4,
    fiber: 0,
    fat: 0,
  },
  oil: { calories: 48, protein: 0, carbs: 0, sugar: 123, fiber: 0, fat: 151 },
  onion: { calories: 0, protein: 1, carbs: 9, sugar: 0, fiber: 0, fat: 0 },
  garlic: {
    calories: 149,
    protein: 6.4,
    carbs: 33,
    sugar: 1,
    fiber: 2.1,
    fat: 0.5,
  },
  paprika: {
    calories: 282,
    protein: 14.14,
    carbs: 53.99,
    sugar: 1,
    fiber: 0,
    fat: 12.89,
  },
  sugar: {
    calories: 387,
    protein: 0,
    carbs: 100,
    sugar: 100,
    fiber: 0,
    fat: 0,
  },
  orange: {
    calories: 49,
    protein: 0.9,
    carbs: 13,
    sugar: 9,
    fiber: 0.2,
    fat: 0.1,
  },
};
/**
 *
 * @param {Object} obj
 * @param {Function} callbackFn
 * @returns
 */
const filterValues = (obj, callbackFn) => Object.values(obj).filter(callbackFn);

/**
 *
 * @param {Object} obj
 * @param {Function} callbackFn
 * @returns
 */
const mapValues = (obj, callbackFn) => Object.values(obj).map(callbackFn);

/**
 *
 * @param {Object} obj
 * @param {Function} callbackFn
 * @returns
 */
const reduceValues = (obj, callbackFn) => Object.values(obj).reduce(callbackFn);

const nutrients = { carbohydrates: 12, protein: 20, fat: 5 };

console.log(filterValues(nutritionDB.oil, (v) => v <= 12));
// output: { carbohydrates: 12, fat: 5 }

console.log(mapValues(nutritionDB.onion, (v) => v + 1));
// output: { carbohydrates: 13, protein: 21, fat: 6 }

console.log(reduceValues(nutritionDB.paprika, (acc, cr) => acc + cr));
// output: 37
