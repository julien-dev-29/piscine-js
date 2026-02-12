const escapeStr = "\`\\/\"\'";
const arr = [4, "2"];
const obj = {
  str: "yolo",
  num: 44,
  bool: true,
  undef: undefined,
};
const nested = Object.freeze({
  arr: Object.freeze([4, undefined, "2"]),
  obj: Object.freeze({
    str: "kikis",
    num: 42,
    bool: false,
  }),
});
