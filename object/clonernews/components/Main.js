import { ListItem } from "./ListItem.js";

export async function Main(stories) {
  let count = 0;
  const $element = document.createElement("main");
  $element.classList.add("main");
  for (const story of stories) {
    count++;
    $element.append(await ListItem(story, count));
  }
  return $element;
}
