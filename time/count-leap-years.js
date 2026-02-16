const countLeapYears = (date) => {
  let count = 0;
  const year = date.getFullYear();
  for (let index = 1; index < year; index++) {
    if (isLeapYear(index)) count++;
  }
  return count;
};

const isLeapYear = (year) => {
  return (year % 4 == 0 && year % 100 !== 0) || year % 400 === 0;
};
