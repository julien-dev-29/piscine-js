const PRONOUNS = ["i", "you", "he", "she", "it", "they", "we"];

/**
 *
 * @param {string} str
 */
const pronoun = (str) => {
  const result = {};
  const words = str.match(/\b\w+\b/gi);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (PRONOUNS.includes(word)) {
      if (!result[word]) {
        result[word] = { word: [], count: 0 };
      }
      result[word].count++;
      const next = words[i + 1];
      if (next && !PRONOUNS.includes(next)) {
        result[word].word.push(next);
      }
    }
  }
  return result;
};

console.log(
  pronoun(
    "Using Array Destructuring, you you can iterate through objects easily.",
  ),
);

console.log(pronoun("'If he you want to buy something you have to pay.'"));
