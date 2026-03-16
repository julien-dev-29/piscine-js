export function ItemAuthor(author) {
  const $element = document.createElement("span");
  $element.innerText = `(${author})`;
  return $element;
}
