const words = (str) => str.split(" ");
const sentence = (arr) => arr.join(" ");
const yell = (str) => str.toUpperCase();
const whisper = (str) => "*" + str.toLowerCase() + "*";
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();