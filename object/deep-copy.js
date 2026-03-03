const deepCopy = (value) => {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) {
    value.map(deepCopy);
  }
  const result = {};
  for (const key in value) {
    result[key] = deepCopy(value[key]);
  }
  return result;
};

const jurol = {
  name: "jurol",
  age: 43,
  yolo: {
    kiki: "Salut",
    wesh: {
      yaya: "troutrou",
    },
  },
};

const yolo = deepCopy(jurol);

console.log(jurol);
console.log(yolo);

yolo.name = "yolo";
console.log(yolo);
