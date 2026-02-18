/**
 *
 * @returns {[HTMLElement, HTMLElement[]]}
 */
export function getBonannoPisano() {
  const [actives] = getActive();
  const bonannoPisano = document.getElementById("BonannoPisano");
  const others = Array.from(actives).filter(
    (active) => active.id !== "BonannoPisano",
  );
  return [bonannoPisano, others];
}

/**
 *
 * @returns {[HTMLElement[], HTMLElement[]]}
 */
export function getActive() {
  const [classicals] = getClassical();
  const targetted = Array.from(classicals).filter((classical) =>
    classical.classList.contains("active"),
  );
  const others = Array.from(classicals).filter(
    (classical) => !classical.classList.contains("active"),
  );
  return [targetted, others];
}

/**
 *
 * @returns {[HTMLElement[], HTMLElement[]]}
 */
export const getArchitects = () => {
  const targetted = document.querySelectorAll("a");
  const others = document.querySelectorAll("span");
  return [targetted, others];
};

/**
 *
 * @returns {[HTMLElement[], HTMLElement[]]}
 */
export const getClassical = () => {
  const [architects] = getArchitects();
  const targetted = Array.from(architects).filter((arch) =>
    arch.classList.contains("classical"),
  );
  const others = Array.from(architects).filter(
    (arch) => !arch.classList.contains("classical"),
  );
  return [targetted, others];
};
