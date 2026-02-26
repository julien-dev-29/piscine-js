import { places } from "./data.js";
let currentScrollY = 0;
const parseLatitude = (coord) => {
  const match = coord.match(/([0-9]+)°([0-9]+)'([0-9.]+)"([NS])/);
  if (!match) return;
  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  const hemisphere = match[4];
  const decimal = degrees + minutes / 60 + seconds / 3600;
  return hemisphere === "S" ? -decimal : decimal;
};
const parseCoordinates = (coord) => {
  const match = coord.match(
    /([0-9]+)°([0-9]+)'([0-9.]+)"([NS])\s([0-9]+)°([0-9]+)'([0-9.]+)"([EW])/,
  );
  const decimalCoordinates = [];
  const degreesH = parseFloat(match[1]);
  const minutesH = parseFloat(match[2]);
  const secondsH = parseFloat(match[3]);
  const degreesD = parseFloat(match[5]);
  const minutesD = parseFloat(match[6]);
  const secondsD = parseFloat(match[7]);
  const hemisphere = match[4];
  const direction = match[8];
  const decimalH = degreesH + minutesH / 60 + secondsH / 3600;
  const decimalD = degreesD + minutesD / 60 + secondsD / 3600;
  hemisphere === "S"
    ? decimalCoordinates.push(-decimalH)
    : decimalCoordinates.push(decimalH);
  direction === "W"
    ? decimalCoordinates.push(-decimalD)
    : decimalCoordinates.push(decimalD);
  return decimalCoordinates;
};

places.sort(
  (a, b) => parseLatitude(b.coordinates) - parseLatitude(a.coordinates),
);

const formatPlaceName = (name) => {
  let splittedName = name.split(",");
  let nameWithoutCoutry = splittedName[0].split(" ");
  return nameWithoutCoutry.map((n) => n.trim().toLowerCase()).join("-");
};

export const explore = () => {
  initLocation();
  initCompass();
  places.forEach((p) => {
    const $section = document.createElement("section");
    $section.style.background = `center / cover url(./images/${formatPlaceName(p.name)}.jpg)`;
    document.body.append($section);
  });
};

window.addEventListener("scroll", (e) => {
  const place =
    places[
      Math.floor((window.scrollY + window.innerHeight / 2) / window.innerHeight)
    ];
  const $direction = document.querySelector(".direction");
  $direction.textContent = window.scrollY > currentScrollY ? "S" : "N";
  currentScrollY = window.scrollY;
  const $location = document.querySelector(".location");
  $location.style.color = place.color;
  $location.textContent = `${place.name}\n${place.coordinates}`;
  const decimalCoordinates = parseCoordinates(place.coordinates);
  $location.href = `https://maps.google.com/?q=${decimalCoordinates[0]},${decimalCoordinates[1]}`;
});

const initLocation = () => {
  const $location = document.createElement("a");
  $location.classList.add("location");
  const place = places[0];
  $location.style.color = place.color;
  $location.textContent = `${place.name}\n${place.coordinates}`;
  $location.target = "_blank";
  const decimalCoordinates = parseCoordinates(place.coordinates);
  $location.href = `https://maps.google.com/?q=${decimalCoordinates[0]},${decimalCoordinates[1]}`;
  document.body.append($location);
};

const initCompass = () => {
  const $compass = document.createElement("div");
  $compass.classList.add("direction");
  document.body.append($compass);
  $compass.textContent = "S";
};
