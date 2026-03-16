export function ItemTitle(title, url) {
  const $element = document.createElement("a");
  $element.classList.add("itemTitle")
  $element.textContent = title;
  $element.href = url;
  return $element;
}
