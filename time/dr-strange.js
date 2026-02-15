const addWeek = (/** @type Date */ date) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wedneday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "secondMonday",
    "secondTuesday",
    "secondWedneday",
    "secondThursday",
    "secondFriday",
    "secondSaturday",
    "secondSunday",
  ];
  const epoch = new Date("0001-01-01");
  const daysPassed = Math.round(
    (date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24),
  );
  return days[daysPassed % 14];
};

const timeTravel = ({ date, hour, minute, second }) => {
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);
  return date;
};

console.log(addWeek(new Date("0001-01-01")));
console.log(addWeek(new Date("0001-01-02")));
console.log(addWeek(new Date("0001-01-07")));
console.log(addWeek(new Date("0001-01-08")));
console.log(addWeek(new Date("0001-01-09")));

console.log(
  timeTravel({
    date: new Date("2020-05-29 23:25:22"),
    hour: 21,
    minute: 22,
    second: 22,
  }).toString(),
);
