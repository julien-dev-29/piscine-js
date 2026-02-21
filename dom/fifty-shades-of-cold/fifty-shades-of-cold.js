import { colors } from "./fifty-shades-of-cold.data.js";

export const generateClasses = () => {
  const $style = document.createElement("style");
  colors.map(
    (color) =>
      ($style.textContent += `.${color} {background-color: ${color}}\n`),
  );
  document.querySelector("head").append($style);
};
export const generateColdShades = () => {
  colors.map((color) => {
    if (coldShades(color)) {
      const $color = document.createElement("div");
      $color.classList.add(color);
      $color.textContent = color;
      document.querySelector("body").append($color);
    }
  });
};
export const choseShade = (color) => {
  document.querySelectorAll("div").forEach((elmt) => {
    elmt.classList.remove(elmt.className);
    elmt.classList.add(color);
  });
};

const coldShades = (color) =>
  ["aqua", "blue", "turquoise", "green", "cyan", "navy", "purple"].includes(
    color,
  );
