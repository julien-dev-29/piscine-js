/**
 *
 * @param {string} str
 * @returns {Array}
 */
const getURL = (str) => str.match(/https?:\/\/[^\s]+/g) ?? [];

/**
 *
 * @param {string} str
 * @returns {Array}
 */
const greedyQuery = (str) =>
  getURL(str).filter((url) => {
    return getParams(url).length >= 3;
  });

/**
 *
 * @param {string} str
 * @returns {Array}
 */
const notSoGreedy = (str) =>
  getURL(str).filter((url) => {
    const params = getParams(url);
    return params.length >= 2 && params.length < 4;
  });

/**
 *
 * @param {string} url
 * @returns {number}
 */
const getParams = (url) => url.match(/[?&][^=]+=[^&]+/g) || [];

const dataSet =
  "qqq http:// qqqq q qqqqq https://something.com/hello?yolo=kiki&kiki=yolo qqqqqqq qhttp://example.com/hello?you=something&something=you&yolo=kiki&kiki=yolo";

console.log(getURL(dataSet));
console.log(greedyQuery(dataSet));
console.log(notSoGreedy(dataSet));
