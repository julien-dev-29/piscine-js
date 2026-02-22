export const compose = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelector("body").replaceChildren();
    } else if (e.key === "Backspace") {
      document.querySelector("body").lastElementChild.remove();
    } else {
      const $div = document.createElement("div");
      $div.classList.add("note");
      $div.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      console.log($div.style.backgroundColor);
      $div.textContent = e.key;
      document.querySelector("body").append($div);
    }
  });
};
