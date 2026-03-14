const race = async (promises) =>
  new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });

const promise1 = new Promise((resolve, _) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, _) => {
  setTimeout(resolve, 800, "two");
});

//race([promise1, promise2]).then(console.log);

const some = (promises, count) => {
  if (promises.length === 0 || count === 0) return Promise.resolve(undefined);
  if (count > promises.length)
    return Promise.reject(new Error("Not enough promises"));
  return new Promise((resolve, reject) => {
    const result = [];
    let resolvedCount = 0;
    let rejectedCount = 0;
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((value) => {
          if (resolvedCount < count) {
            result.push(value);
            resolvedCount++;
            if (resolvedCount === count) resolve(result);
          }
        })
        .catch(() => {
          rejectedCount++;
          if (rejectedCount > promises.length - count)
            reject(new Error("Not enough promises resolved"));
        });
    });
  });
};

some([promise1, promise2], 4).then(console.log).catch(console.error);
