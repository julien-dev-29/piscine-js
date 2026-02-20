/**
 *
 * @param {string} str
 * @returns {Array}
 */
const ionOut = (str) =>
  (str.match(/\b\w*tion\w*\b/gi) ?? []).map((word) => word.replace(/ion/, ""));

console.log(ionOut("Let's tiont to tionp top flop"));
