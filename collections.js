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

const superTypeOf = (element) => {
  if (element === null) return "null";
  if (element === undefined) return "undefined";
  if (element instanceof Map) return "Map";
  if (element instanceof Set) return "Set";
  if (Array.isArray(element)) return "Array";
  if (element instanceof Object && !(element instanceof Function)) return "Object";
  if (typeof element === "number" && isNaN(element)) return "NaN";
  if (typeof element === "number") return "Number";
  if (typeof element === "string") return "String";
  if (typeof element === "function") return "Function";
  if (typeof element === "boolean") return "Boolean";
  return typeof element;
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
