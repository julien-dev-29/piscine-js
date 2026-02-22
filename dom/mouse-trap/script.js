export const createCircle = () => {
  document.addEventListener("click", (e) => {
    console.log(e);
    const $div = document.createElement("div");
    $div.classList.add("circle");
    $div.style.background = "white";
    $div.style.left = e.pageX - 25 + "px";
    $div.style.top = e.pageY - 25 + "px";
    document.querySelector("body").append($div);
  });
};

export const moveCircle = () => {
  document.addEventListener("mousemove", (e) => {
    const $lastElemt = document.querySelector(".circle:last-of-type");
    if (!$lastElemt) return;
    const $box = getHitBox();
    let left, top;
    if (isInBox($lastElemt)) {
      $lastElemt.style.background = "#bb73e6";
      top = e.pageY > $box.top ? $box.top : e.pageY;
      left = e.pageX > $box.right ? $box.right : e.pageX;
    } else {
      top;
    }

    $lastElemt.style.left = left;
    $lastElemt.style.top = top;
  });
};

export const setBox = () => {
  const $box = document.createElement("div");
  $box.classList.add("box");
  document.body.append($box);
};

const getBox = () => document.querySelector(".box");

const getHitBox = () => getBox().getBoundingClientRect();

const isInBox = (element) => {
  if (!element) return false;

  const box = getHitBox();
  const rect = element.getBoundingClientRect();

  return !(
    rect.right < box.left ||
    rect.left > box.right ||
    rect.bottom < box.top ||
    rect.top > box.bottom
  );
};
