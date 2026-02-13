const sign = (num) => {
  if (num === 0) {
    return 0;
  } else if (num > 0) {
    return 1;
  } else {
    return -1;
  }
};

const sameSign = (a, b) => {
  return sign(a) === sign(b) ? true : false;
};
