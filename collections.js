const str = "hello";
const arr = [1, 2, 1, 3];
const obj = { x: 45, y: 75, radius: 24 };
const set = new Set();
const map = new Map();
set.add(1);
set.add(2);
set.add(1);
set.add(3);
map.set("a", 1);
map.set("b", 2);
map.set(3, "c");
map.set(4, "d");

const arrToSet = (arr) => new Set(arr);
const arrToStr = (arr) => arr.join("");
const setToArr = (set) => [...set];
const setToStr = (set) => [...set].join("");
const strToArr = (str) => Array.from(str);
const strToSet = (str) => new Set(str);
const mapToObj = (map) => Object.fromEntries(map);
const objToArr = (obj) => Object.values(obj);
const objToMap = (obj) => new Map(Object.entries(obj));
const arrToObj = (arr) =>
  arr.reduce((acc, val, index) => ({ ...acc, [index]: val }), {});
const strToObj = () =>
  Array.from(str).reduce((acc, val, index) => ({ ...acc, [index]: val }));

const superTypeOf = (val) => {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (val instanceof Map) return "Map";
  if (val instanceof Set) return "Set";
  if (Array.isArray(val)) return "Array";
  if (val instanceof Object && !(val instanceof Function)) return "Object";
  if (typeof val === "number" && isNaN(val)) return "NaN";
  if (typeof val === "number") return "Number";
  if (typeof val === "string") return "String";
  if (typeof val === "function") return "Function";
  if (typeof val === "boolean") return "Boolean";
  return typeof val;
};

console.log(superTypeOf(map));
console.log(superTypeOf(set));
console.log(superTypeOf(obj));
console.log(superTypeOf(str));
console.log(superTypeOf(666));
console.log(superTypeOf(NaN));
console.log(superTypeOf(arr));
console.log(superTypeOf(null));
console.log(superTypeOf(undefined));
console.log(superTypeOf(superTypeOf));
