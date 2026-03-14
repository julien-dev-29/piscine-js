const all = (promises) =>
  new Promise((resolve, reject) => {
    const keys = Object.keys(promises);
    let result = {};
    let remaining = keys.length;
    if (remaining === 0) resolve(result);
    keys.forEach((key) => {
      Promise.resolve(promises[key])
        .then((value) => {
          result[key] = value;
          remaining--;
          if (remaining === 0) resolve(result);
        })
        .catch(reject);
    });
  });

all({
  a: Promise.resolve(1),
  b: new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("yolo");
    }, 100);
  }),
  c: new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("les kikis");
    }, 200);
  }),
}).then((v) => console.log(v));
