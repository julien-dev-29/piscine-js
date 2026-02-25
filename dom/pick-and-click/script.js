const $hsl = document.createElement("div");
$hsl.classList.add("hsl");
const $hue = document.createElement("div");
$hue.classList.add("hue", "text");
const $luminosity = document.createElement("div");
$luminosity.classList.add("luminosity", "text");
document.body.append($hsl);
document.body.append($hue);
document.body.append($luminosity);

const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
$svg.setAttribute("width", "100%");
$svg.setAttribute("height", "100%");

const $axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
$axisX.setAttribute("stroke", "black");
$axisX.setAttribute("stroke-width", "2");

const $axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
$axisY.setAttribute("stroke", "black");
$axisY.setAttribute("stroke-width", "5");

$svg.append($axisX);
$svg.append($axisY);
document.body.append($svg);

export const pick = () => {
  window.addEventListener("mousemove", (e) => {
    const hue = Math.round((e.clientX * 360) / window.innerWidth);
    const luminosity = Math.round((e.clientY * 100) / window.innerHeight);
    $hsl.textContent = `hsl(${hue} 100% ${luminosity}%)`;
    $hue.textContent = `${hue}°`;
    $luminosity.textContent = `${luminosity}%`;
    document.body.style.background = `hsl(${hue} 100% ${luminosity}%)`;
  });
};

window.addEventListener("click", (e) => {
  const rgbMatch = /(\d+),\s(\d+),\s(\d+)/gi.exec(
    document.querySelector("body").style.background,
  );
  if (!rgbMatch) return;
  const r = parseInt(rgbMatch[1]) / 255;
  const g = parseInt(rgbMatch[2]) / 255;
  const b = parseInt(rgbMatch[3]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  const hsl = `hsl(${h}°, ${s}%, ${l}%)`;
  console.log(hsl);
  setClipboard(hsl);
});

window.addEventListener("mousemove", (e) => {
  $axisX.setAttribute("x1", e.clientX);
  $axisX.setAttribute("x2", e.clientX);
  $axisX.setAttribute("y1", 0);
  $axisX.setAttribute("y2", window.innerHeight);
  $axisY.setAttribute("x1", 0);
  $axisY.setAttribute("x2", window.innerWidth);
  $axisY.setAttribute("y1", e.clientY);
  $axisY.setAttribute("y2", e.clientY);
});

async function setClipboard(text) {
  const type = "text/plain";
  const clipboardItemData = {
    [type]: text,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}
