import { getStory } from "../api.js";
import { ItemId } from "./ItemId.js";
import { ItemTitle } from "./ItemTitle.js";

export async function ListItem(storyId, count) {
  const story = await getStory(storyId);
  const $element = document.createElement("div");
  $element.classList.add("listItem");
  $element.append(ItemId(count), ItemTitle(story.title, story.url));
  return $element;
}
