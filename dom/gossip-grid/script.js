import { gossips } from "./data.js";

export const grid = () => {
  update();
};

const update = () => {
  document.body.replaceChildren();
  createRanges();
  createForm();
  gossips.forEach((g) => {
    const $div = document.createElement("div");
    $div.classList.add("gossip");
    document.body.append($div);
    $div.textContent = g;
  });
};

const createForm = () => {
  const $form = document.createElement("form");
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    gossips.push(data.get("gossip"));
    e.target.reset();
    update();
  });
  const $textarea = document.createElement("textarea");
  $textarea.required = true;
  $textarea.placeholder = "Got a gossip to share!";
  $textarea.name = "gossip";
  const $button = document.createElement("button");
  $button.textContent = "Share gossip!";
  $form.append($textarea);
  $form.append($button);
  $form.classList.add("gossip");
  document.body.append($form);
};

const createRanges = () => {
  const $rangesDiv = document.createElement("div");
  $rangesDiv.classList.add("ranges");
  const $widthElemt = createRange("Width", "width");
  const $fontSizeElemt = createRange("Font Size", "fontSize");
  const $backgroundElement = createRange("Background", "background");
  $rangesDiv.append($widthElemt, $fontSizeElemt, $backgroundElement);
  document.body.append($rangesDiv);
};

const createRange = (label, id) => {
  const $div = document.createElement("div");
  $div.classList.add("range");
  const $label = document.createElement("label");
  $label.textContent = label;
  const $input = document.createElement("input");
  $input.type = "range";
  const $span = document.createElement("span");
  if (id === "width") {
    $input.min = 200;
    $input.max = 800;
    $input.value = 250;
  } else if (id === "fontSize") {
    $input.min = 20;
    $input.max = 40;
    $input.value = 20;
  } else if (id === "background") {
    $input.min = 20;
    $input.max = 75;
    $input.value = 50;
  }
  $span.textContent = $input.value;
  $input.id = id;
  $div.append($label, $input, $span);
  return $div;
};

window.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("#width").addEventListener("input", (e) => {
    document.querySelector("#width").nextElementSibling.textContent =
      e.target.value;
    document.querySelectorAll(".gossip").forEach((g) => {
      g.style.width = `${e.target.value}px`;
    });
  });
  document.querySelector("#fontSize").addEventListener("input", (e) => {
    document.querySelector("#fontSize").nextElementSibling.textContent =
      e.target.value;
    document.querySelectorAll(".gossip").forEach((g) => {
      g.style.fontSize = `${e.target.value}px`;
    });
  });
  document.querySelector("#background").addEventListener("input", (e) => {
    document.querySelector("#background").nextElementSibling.textContent =
      e.target.value;
    document.querySelectorAll(".gossip").forEach((g) => {
      g.style.background = `hsl(280, 50%, ${e.target.value}%)`;
    });
  });
});
