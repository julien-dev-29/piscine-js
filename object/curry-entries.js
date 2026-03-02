// prettier-ignore
const personnel = {
  lukeSkywalker: { id: 5,  pilotingScore: 98, shootingScore: 56, isForceUser: true  },
  sabineWren:    { id: 82, pilotingScore: 73, shootingScore: 99, isForceUser: false },
  zebOrellios:   { id: 22, pilotingScore: 20, shootingScore: 59, isForceUser: false },
  ezraBridger:   { id: 15, pilotingScore: 43, shootingScore: 67, isForceUser: true  },
  calebDume:     { id: 11, pilotingScore: 71, shootingScore: 85, isForceUser: true  },
}

/**
 *
 * @param {Object} obj
 * @returns {Object}
 */
const defaultCurry = (obj1) => (obj2) => ({ ...obj1, ...obj2 });

/**
 *
 * @param {Function} callbackFn
 * @returns
 */
const mapCurry = (callbackFn) => (obj) =>
  Object.fromEntries(Object.entries(obj).map(callbackFn));

/**
 *
 * @param {Function} callbackFn
 * @returns
 */
const reduceCurry = (callbackFn) => (obj, initialValue) =>
  Object.entries(obj).reduce(callbackFn, initialValue);

/**
 *
 * @param {Function} callbackFn
 * @returns
 */
const filterCurry = (callbackFn) => (obj) =>
  Object.fromEntries(Object.entries(obj).filter(callbackFn));

/**
 *
 * @param {Object} obj
 * @param {*} initialValue
 * @returns
 */
const reduceScore = (obj, initialValue) =>
  reduceCurry((acc, [, v]) => {
    return (
      acc +
      reduceCurry((acc2, [k2, v2]) => {
        return k2.includes("Score") ? acc2 + v2 : acc2;
      })(v, 0)
    );
  })(obj, initialValue);

/**
 *
 * @param {Object} obj
 * @returns
 */
const filterForce = (obj) =>
  filterCurry(([, v]) => v.isForceUser === true && v.shootingScore >= 80)(obj);

/**
 *
 * @param {Object} obj
 * @returns
 */
const mapAverage = (obj) =>
  mapCurry(([k, v]) => [
    k,
    { ...v, averageScore: (v.pilotingScore + v.shootingScore) / 2 },
  ])(obj);

console.log(mapCurry(([key, value]) => [`${key}_force`, value])(personnel));

console.log(
  defaultCurry({
    http: 403,
    connection: "close",
    contentType: "multipart/form-data",
  })({
    http: 200,
    connection: "open",
    requestMethod: "GET",
  }),
);

console.log(reduceCurry((acc, [, v]) => (acc += v))({ a: 1, b: 2, c: 3 }, 0));

console.log(
  filterCurry(([k, v]) => typeof v === "string" || k === "arr")({
    str: "string",
    nbr: 1,
    arr: [1, 2],
  }),
);

console.log(reduceScore(personnel, 0));

console.log(filterForce(personnel));

console.log(mapAverage(personnel));
