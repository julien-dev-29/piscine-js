const DNA_TO_RNA = {
  G: "C",
  C: "G",
  T: "A",
  A: "U",
};

const RNA_TO_DNA = {
  C: "G",
  G: "C",
  A: "T",
  U: "A",
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
const RNA = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (!DNA_TO_RNA[ch]) throw new Error("Invalid DNA strand!");
    result += DNA_TO_RNA[ch];
  }
  return result;
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
const DNA = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (!RNA_TO_DNA[ch]) return new Error("Invalid RNA strand!");
    result += RNA_TO_DNA[ch];
  }
  return result
};

console.log(RNA("ATCGGCTA"));
console.log(DNA("UAGCCGAU"));
