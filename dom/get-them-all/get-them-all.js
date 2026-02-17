export function getBonannoPisano() {
  const actives = Array.from(getActive()[0]);
  const bonannoPisano = document.getElementById("BonannoPisano");
  const others = actives.filter((active) => active.id !== "BonannoPisano");
  return [bonannoPisano, others];
}

/**
 *
 * @returns
 */
export function getActive() {
  const classicals = Array.from(getClassical()[0]);
  const targetted = classicals.filter((classical) =>
    classical.classList.contains("active"),
  );
  const others = classicals.filter(
    (classical) => !classical.classList.contains("active"),
  );
  return [targetted, others];
}

/**
 *
 * @returns
 */
export const getArchitects = () => {
  const targetted = document.querySelectorAll("a");
  const others = document.querySelectorAll("span");
  return [targetted, others];
};

/**
 *
 * @returns
 */
export const getClassical = () => {
  const architects = Array.from(getArchitects()[0]);
  const targetted = architects.filter((arch) =>
    arch.classList.contains("classical"),
  );
  const others = architects.filter(
    (arch) => !arch.classList.contains("classical"),
  );
  return [targetted, others];
};
