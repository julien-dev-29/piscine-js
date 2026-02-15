const sunnySunday = (/** @type Date*/ date) => {
  const referenceDate = new Date(0, 0, 1);
  const diffTime = date.getTime() - referenceDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayOfWeek = diffDays % 6;
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayOfWeek];
};
const today = new Date();
console.log(sunnySunday(today)); // Affiche le jour de la semaine selon le calendrier sans dimanche
