/**
 *
 * @param {string[]} lines
 * @returns {Object}
 */
const neuron = (lines) => {
  const result = {
    questions: {},
    orders: {},
  };
  for (const line of lines) {
    const [left, responsePart] = line.split(" - Response: ");
    const response = responsePart.trim();
    const [typePart, content] = left.split(": ");
    const type = typePart.toLowerCase();
    if (type === "questions") {
      const key = content.toLowerCase().replaceAll(" ", "_").replace("?", "");
      if (!result.questions[key]) {
        result.questions[key] = {
          question: content,
          responses: [],
        };
      }
      result.questions[key].responses.push(response);
    }

    if (type === "orders") {
      const key = content.toLowerCase().replaceAll(" ", "_").replace("!", "");
      if (!result.orders[key]) {
        result.orders[key] = {
          order: content,
          responses: [],
        };
      }
      result.orders[key].responses.push(response);
    }
  }
  return result;
};

console.log(
  neuron([
    "Questions: what is ounces? - Response: Ounce, unit of weight in the avoirdupois system",
    "Questions: what is ounces? - Response: equal to 1/16 pound (437 1/2 grains)",
    "Questions: what is Mud dauber - Response: Mud dauber is a name commonly applied to a number of wasps",
    "Orders: shutdown! - Response: Yes Sr!",
    "Orders: Quote something! - Response: Pursue what catches your heart, not what catches your eyes.",
  ]),
);
