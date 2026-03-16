export function TopStory(topStory) {
  const $element = document.createElement("div");
  $element.textContent = topStory.title;
  return $element;
}
