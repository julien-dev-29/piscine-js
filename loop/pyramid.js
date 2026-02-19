const pyramid = (str, number) => {
  let result = "";
  let current = "";
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number - i - 1; j++) {
      result += " ";
    }
    current += str;
    result += current;
    for (let k = 0; k < i; k++) {
      result += str;
    }
    if (i !== number - 1) result += "\n";
  }
  return result;
};

console.log(pyramid("*", 5));
