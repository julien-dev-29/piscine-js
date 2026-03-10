/**
 *
 * @param {Object} commands
 * @returns {Object}
 */
const flag = (commands) => {
  const result = {
    alias: {},
    description: [],
  };
  const { help = [], ...actions } = commands;
  for (const name of Object.keys(actions)) {
    result.alias[name[0]] = name;
  }
  for (const name of help) {
    if (!actions[name]) continue;
    const short = name[0];
    const desc = actions[name];
    result.description.push(`-${short}, --${name}: ${desc}`);
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
