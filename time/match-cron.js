const matchCron = (cron, date) => {
  const cronTab = cron.split(" ");
  const dateTab = [
    date.getMinutes(),
    date.getHours(),
    date.getDate(),
    date.getDay(),
  ];
  for (let i = 0; i < cronTab.length; i++) {
    if (cronTab[i] === "*") continue;
    if (Number(cronTab[i]) !== dateTab[i]) return false;
  }
  return true;
};

console.log(matchCron("9 * * * *", new Date("2020-05-30 18:09:00"))); // -> true
console.log(matchCron("9 * * * *", new Date("2020-05-30 19:09:00"))); // -> true
console.log(matchCron("9 * * * *", new Date("2020-05-30 19:21:00"))); // -> false
