/**
 *
 * @param {object[]} arr
 * @returns {string[]}
 */
const citiesOnly = (arr) => arr.map((obj) => obj.city);

/**
 *
 * @param {string[]} states
 * @returns {string[]}
 */
const upperCasingStates = (states) =>
  states.map((str) =>
    str
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "),
  );

/**
 *
 * @param {string[]} temperatures
 * @returns {string[]}
 */
const fahrenheitToCelsius = (temperatures) =>
  temperatures.map(
    (temp) =>
      `${Math.round((Number(temp.split("°")[0]) - 32) / (9 / 5)).toString()}°C`,
  );

/**
 *
 * @param {object[]} arr
 */
const trimTemp = (arr) =>
  arr.map((obj) => ({
    ...obj,
    temperature: obj.temperature.trim().split(" ").join(""),
  }));

/**
 *
 * @param {object[]} arr
 */
const tempForecasts = (arr) =>
  arr.map(
    (obj) =>
      `${fahrenheitToCelsius([Object.values(obj)[1]])}°Celsius in ${Object.values(obj)[0]}, ${Object.values(
        obj,
      )[2]
        .split(" ")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ")}`,
  );

console.log(
  citiesOnly([
    {
      city: "Los Angeles",
      temperature: "  101 °F   ",
    },
    {
      city: "San Francisco",
      temperature: " 84 ° F   ",
    },
  ]),
); // -> ['Los Angeles', 'San Francisco']

console.log(upperCasingStates(["alabama", "new jersey"]));

console.log(fahrenheitToCelsius(["68°F", "59°F", "25°F"]));

console.log(
  trimTemp([
    { city: "Los Angeles", temperature: "  101 °F   " },
    { city: "San Francisco", temperature: " 84 ° F   " },
  ]),
);

console.log(
  tempForecasts([
    {
      city: "Pasadena",
      temperature: " 101 °F",
      state: "california",
      region: "West",
    },
  ]),
);
