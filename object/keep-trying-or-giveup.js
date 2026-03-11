/**
 *
 * @param {number} count
 * @param {Function} callback
 * @returns
 */
const retry =
  (count, callback) =>
  async (...args) => {
    for (let i = 0; i <= count; i++) {
      try {
        return await callback(...args);
      } catch (error) {
        if (i === count) throw new Error("max retries reached");
      }
    }
  };

/**
 *
 * @param {number} delay
 * @param {Function} callback
 * @returns
 */
const timeout =
  (delay, callback) =>
  async (...args) =>
    Promise.race([
      callback(...args),
      new Promise((resolve) =>
        setTimeout(() => resolve(new Error("timeout")), delay),
      ),
    ]);

const fetchData = async () => {
  throw new Error("fail");
};

const retryFetch = retry(3, fetchData);

retryFetch().then(console.log).catch(console.error);

const slow = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("done"), 3000);
  });
};

const safeSlow = timeout(1000, slow);

safeSlow().then(console.log);
