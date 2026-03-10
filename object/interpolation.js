const interpolation = ({ step, start, end, callback, duration }) => {
  const distance = (end - start) / step;
  const delay = duration / step;
  let i = 0;
  let interval = setInterval(() => {
    if (i >= step) return clearInterval(interval);
    const x = +(start + distance * i).toFixed(1);
    const y = delay * (i + 1);
    callback([x, y]);
    i++;
  }, delay);
};

interpolation({
  step: 5,
  start: 0,
  end: 1,
  callback: console.log,
  duration: 10,
});
