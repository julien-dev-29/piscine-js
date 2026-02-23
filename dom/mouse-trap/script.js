const circles = [];

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.isTrapped = false;
    this.locked = false;
    this.$element = null;
    this.box = getBox();
    this.draw();
    circles.push(this);
  }
  draw() {
    this.$element = document.createElement("div");
    this.$element.classList.add("circle");
    this.$element.style.background = "white";
    this.$element.style.top = this.y - 25 + "px";
    this.$element.style.left = this.x - 25 + "px";
    document.body.append(this.$element);
  }
  move(x, y) {
    this.x = x;
    this.y = y;

    const box = getBox();
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const radius = this.diameter / 2;
    const wall = 1;
    const minX = rect.left + wall + radius;
    const maxX = rect.right - wall - radius;
    const minY = rect.top + wall + radius;
    const maxY = rect.bottom - wall - radius;

    const wasTrapped = this.isTrapped;
    this.trapped(); // met à jour isTrapped

    // Si le cercle entre dans la box → on verrouille
    if (!wasTrapped && this.isTrapped) {
      this.locked = true;
    }

    // Clamp uniquement si verrouillé
    if (this.locked) {
      this.x = clamp(this.x, minX, maxX);
      this.y = clamp(this.y, minY, maxY);
      this.$element.style.background = "var(--purple)";
    } else {
      this.$element.style.background = "white";
    }

    this.$element.style.left = this.x - radius + "px";
    this.$element.style.top = this.y - radius + "px";
  }
  trapped() {
    const box = getBox();
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const radius = this.diameter / 2;
    this.isTrapped =
      this.x - radius > rect.left &&
      this.x + radius < rect.right &&
      this.y - radius > rect.top &&
      this.y + radius < rect.bottom;
  }
}

export const createCircle = () => {
  document.addEventListener("click", (e) => {
    console.log(e);
    new Circle(e.clientX, e.clientY);
  });
};

export const moveCircle = () => {
  document.addEventListener("mousemove", (e) => {
    if (circles.length === 0) return;
    circles[circles.length - 1].move(e.clientX, e.clientY);
  });
};

export const setBox = () => {
  const $box = document.createElement("div");
  $box.classList.add("box");
  document.body.append($box);
};

const getBox = () => document.querySelector(".box");
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
