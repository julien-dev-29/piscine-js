const dayOfTheYear = (date) => {
  const start = new Date(date);
  start.setMonth(0);
  start.setDate(1);
  return Math.round(
    (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1,
  );
};
