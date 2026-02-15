/**
 *
 * @param {Date} date
 * @param {String} format
 */
const format = (/**@type Date */ date, /** @type String*/ formatStr) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const patterns = {
    yyyy: date.getFullYear().toString().padStart(4, "0"),
    y: date.getFullYear().toString(),
    GGGG: date.getFullYear() > 0 ? "Anno Domini" : "Before Christ",
    G: date.getFullYear() > 0 ? "AD" : "BC",
    MMMM: months[date.getMonth()],
    MMM: months[date.getMonth()].slice(0, 3),
    MM: date.getMonth().toString().padStart(2, "0"),
    M: date.getMonth().toString(),
    dd: date.getDate().toString().padStart(2, "0"),
    d: date.getDate().toString(),
    EEEE: days[date.getDay()],
    E: days[date.getDay()].slice(0, 3),
    hh: date.getHours().toString().padStart(2, "0"),
    h: date.getHours().toString(),
    mm: date.getMinutes().toString().padStart(2, "0"),
    m: date.getMinutes().toString(),
    ss: date.getSeconds().toString().padStart(2, "0"),
    s: date.getSeconds().toString(),
    HH: date.getHours().toString().padStart(2, "0"),
    H: date.getHours().toString(),
  };
  let result = formatStr;
  for (const [key, value] of Object.entries(patterns)) {
    result = result.replace(new RegExp(key, "g"), value);
  }
  return result;
};

const d = new Date("7 January 1985, 3:08:19");

console.log(format(d, "HH(mm)ss [dd] <MMM>")); // -> '03(08)19 [07] <Jan>'
