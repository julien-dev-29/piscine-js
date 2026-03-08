/**
 *
 * @param {Object} obj
 * @returns
 */
const flag = (obj) => {
  const result = {
    alias: {},
    description: [],
  };
  for (const key in obj) {
    result.alias[key[0]] = key;
  }
  for (const command of obj.help) {
    result.description.push(`-${command[0]}, --${command}: ${obj[command]}`);
  }
  return result;
};

console.log(
  flag({
    multiply: "multiply the values",
    divide: "divides the values",
    help: ["divide", "multiply"],
  }),
);
