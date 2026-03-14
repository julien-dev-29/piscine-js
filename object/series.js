const series = async (functions) => {
  const results = [];
  for (const fn of functions) {
    results.push(await fn());
  }
  return results;
};

const f1 = async () =>
  new Promise((resolve) => setTimeout(() => resolve("yolo 1"), 100));
const f2 = async () =>
  new Promise((resolve) => setTimeout(() => resolve("yolo 2"), 200));
const f3 = async () =>
  new Promise((resolve) => setTimeout(() => resolve("yolo 3"), 300));

series([f1, f3, f2]).then(console.log);
