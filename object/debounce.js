/**
 *
 * @param {Function} fn
 * @param {number} wait
 */
const debounce = (fn, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

/**
 *
 * @param {Function} fn
 * @param {number} wait
 * @param {*} param2
 * @returns
 */
const opDebounce = (fn, wait, { leading = false } = {}) => {
  let timeout;
  return function (...args) {
    let callNow = !leading && timeout === null;
    timeout = setTimeout(() => {
      timeout = null;
      if (!leading) fn.apply(args);
    }, wait);
    if (callNow) fn.apply(args);
  };
};
