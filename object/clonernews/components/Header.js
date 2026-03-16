import { H1 } from "./H1.js";
import { Logo } from "./Logo.js";
import { Navigation } from "./Navigation.js";

export function Header({ title = "", parent = null } = {}) {
  const $element = document.createElement("header");
  $element.classList.add("header");
  $element.append(Logo(), H1({ title: title }), Navigation());
  return $element;
}
