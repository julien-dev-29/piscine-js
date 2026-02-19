/**
 *
 * @param {object} src
 * @param {string} path
 */
const get = (src, path) => {
  if (path == null || path === "") return src;
  const parts = path.split(".");
  let current = src;
  for (let i = 0; i < parts.length; i++) {
    if (current == null) return undefined;
    current = current[parts[i]];
  }
  return current;
};

const src = {
  nested: {
    key: {
      yolo: "kikis",
    },
  },
};
const path = "nested.key.yolo";
console.log(get(src, path));
