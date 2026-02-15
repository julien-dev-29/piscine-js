const isFriday = (date) => date.getDay() === 4;
const isWeekend = (date) => date.getDay() === 0 || date.getDay() > 4;
const isLeapYear = (date) => {
  const year = date.getFullYear();
  return (year % 4 == 0 && year % 100 !== 0) || year % 400 === 0;
};
const isLastDayOfMonth = (date) => {
  const month = date.getMonth();
  const day = date.getDay();
  const year = date.getFullYear();
  const monthWith31Days = [0, 2, 4, 6, 7, 9, 11];
  if (month === 1) {
    return isLeapYear(year) ? day === 29 : day === 28;
  } else if (monthWith31Days.includes(month)) {
    return day === 31;
  } else {
    return day === 30;
  }
};
