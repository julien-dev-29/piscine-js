const indexOf = (arr, value, index = 0) => {
  for (let i = index; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};

const lastIndexOf = (arr, value, index = 0) => {
  let lastIndexOf = null;
  for (let i = index; i < arr.length; i++) {
    if (arr[i] === value) lastIndexOf = i;
  }
  return lastIndexOf ?? -1;
};

const includes = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true;
  }
  return false;
};

console.log(indexOf(["yolo", 2, "kikis", true], "kikis"));
console.log(lastIndexOf(["yolo", 2, "kikis", true, "kikis"], "lulu"));
console.log(includes(["yolo", "les", "kikis"], "yolo"));
