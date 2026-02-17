/**
 *
 * @param {object[]} bricks
 * @returns
 */
export const build = (bricks) => {
  let i = 1;
  let count = 0;
  const interval = setInterval(() => {
    createBrick(i++, count);
    if (i > bricks) clearInterval(interval);
    count = (count + 1) % 3;
  }, 100);
};

/**
 *
 * @param {number} number
 * @param {number} count
 */
const createBrick = (number, count) => {
  const $brick = document.createElement("div");
  $brick.id = `brick-${number}`;
  $brick.textContent = number;
  if (count === 2) $brick.dataset["foundation"] = true;
  document.querySelector("body").append($brick);
};

/**
 *
 * @param {Set<string>} ids
 */
export const repair = (ids) => {
  ids.forEach(
    (value) =>
      (document.getElementById(value).dataset["repaired"] =
        document.getElementById(value).dataset["foundation"] === "true"
          ? "in progress"
          : true),
  );
};

/**
 *
 */
export const destroy = () => {
  let i = 54;
  const interval = setInterval(() => {
    const $brick = document.getElementById(`brick-${i}`);
    if ($brick) $brick.remove();
    if (i === 0) clearInterval(interval);
    i--;
  }, 100);
};
