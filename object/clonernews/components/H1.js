export function H1({ title = "" } = {}) {
  const $element = document.createElement("h1");
  $element.textContent = title;
  return $element;
}
