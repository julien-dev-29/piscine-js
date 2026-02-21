const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const generateLetters = () => {
  for (let i = 0; i < 120; i++) {
    const $div = document.createElement("div");
    $div.textContent = randomLetter();
    $div.style.fontSize = `${11 + i}px`;
    if (i < 40) {
      $div.style.fontWeight = 300;
    } else if (i < 80) {
      $div.style.fontWeight = 400;
    } else {
      $div.style.fontWeight = 600;
    }
    document.querySelector("body").append($div);
  }
};

const randomLetter = () => LETTERS[Math.floor(Math.random() * 26)];
