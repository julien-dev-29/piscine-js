import { handleNavigationClick } from "../app.js";

export function Link({ link = "", url = "", onClick } = {}) {
  const $element = document.createElement("a");
  $element.classList.add("link");
  $element.href = url;
  $element.textContent = link;
  $element.addEventListener("click", (e) => {
    e.preventDefault();
    handleNavigationClick(e);
  });
  return $element;
}
