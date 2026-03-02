const deepCopy = (value) => {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepCopy);
  const result = {};
  for (const key in value) {
    result[key] = deepCopy(value[key]);
  }
  return result;
};
