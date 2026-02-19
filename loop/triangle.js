const triangle = (str, number) => {
  let result = "";
  let current = "";
  for (let i = 0; i < number; i++) {
    current += str;
    result += current;
    if (i !== number - 1) result += "\n";
  }
  return result;
};

console.log(triangle("*", 5));
