/**
 *
 * @param  {...any} obj
 */
const replica = (target, ...sources) => {
  if (target === null || typeof target !== "object")
    throw new TypeError("Target is not an object");
  for (const source of sources) {
    if (source === null || typeof source !== "object") continue;
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];
      if (
        sourceValue &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue)
      ) {
        if (!targetValue || typeof target !== "object") target[key] = {};
        replica(target[key], sourceValue);
      } else {
        target[key] = Array.isArray(sourceValue)
          ? sourceValue.map((item) =>
              typeof sourceValue === "object" && item !== null
                ? replica({}, item)
                : item,
            )
          : sourceValue;
      }
    }
  }
  return target;
};

const obj1 = {
  user: {
    name: "Ezra",
    skills: ["force", "piloting"],
  },
};

const obj2 = {
  user: {
    age: 16,
  },
};

const result = replica({}, obj1, obj2);

result.user.skills.push("lightsaber");

console.log(obj1.user.skills);
