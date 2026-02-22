import { styles } from "./data.js";
let count = 0;
export const pimp = () =>
  document.querySelector(".button").classList.add(styles[count++]);
