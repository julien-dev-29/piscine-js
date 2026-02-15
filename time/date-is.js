const isValid = (date) =>
  !isNaN(date) && date !== "" && typeof date === "string";
const isAfter = (d1, d2) => d1 > d2;
const isBefore = (d1, d2) => d1 < d2;
const isFuture = (date) => isValid(date) && date > Date.now();
const isPast = (date) => isValid(date) && date < Date.now();