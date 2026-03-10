/**
 *
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
const throttle = (fn, wait = 0) => {
  let timeout = null;

  return function (...args) {
    if (timeout) return;

    timeout = setTimeout(() => (timeout = null), wait);
    fn.apply(this, args);
  };
};

/**
 *
 * @param {Function} fn
 * @param {number} wait
 * @param {*} param2
 * @returns
 */
const opThrottle = (
  fn,
  wait = 0,
  { trailing = false, leading = false } = {},
) => {
  let timeout = null;
  let lastArgs;
  return function (...args) {
    if (!timeout) {
      if (leading) fn.apply(this, args);
      else lastArgs = args;
      timeout = setTimeout(() => {
        timeout = null;
        if (trailing && lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, wait);
    } else if (trailing) lastArgs = args;
  };
};
