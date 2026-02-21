const SIZE = 100;
const FREE = 0;
const FILLED = 1;
const MAP = new Int8Array(SIZE * SIZE);
const isFree = ({ x, y }) => MAP[y * SIZE + x] === FREE;
const setFilled = ({ x, y }) => (MAP[y * SIZE + x] = FILLED);
const inBounds = (n) => n < SIZE && n >= 0;
const isInBounds = ({ x, y }) => inBounds(x) && inBounds(y);
const DIR = {
  F: 0,
  R: 1,
  B: 2,
  L: 3,
};

const byDir = (coords, dir) =>
  coords.find((c) => c.direction === dir && isInBounds(c) && isFree(c));

const forward = (coords) => byDir(coords, DIR.F);
const right = (coords) => byDir(coords, DIR.R);
const left = (coords) => byDir(coords, DIR.L);
const back = (coords) => byDir(coords, DIR.B);

// Compte combien de sorties libres autour d'une case (anti-cul-de-sac)
const exits = ({ x, y }) => {
  let n = 0;
  if (isInBounds({ x: x + 1, y }) && isFree({ x: x + 1, y })) n++;
  if (isInBounds({ x: x - 1, y }) && isFree({ x: x - 1, y })) n++;
  if (isInBounds({ x, y: y + 1 }) && isFree({ x, y: y + 1 })) n++;
  if (isInBounds({ x, y: y - 1 }) && isFree({ x, y: y - 1 })) n++;
  return n;
};

const predictEnemyZones = (enemy) => {
  const zones = [];
  enemy.coords.forEach((c) => {
    if (!isInBounds(c) || !isFree(c)) return;
    if (c.direction === DIR.F) zones.push({ i: c.index, w: 3 });
    if (c.direction === DIR.R) zones.push({ i: c.index, w: 2 });
    if (c.direction === DIR.L) zones.push({ i: c.index, w: 1 });
  });
  return zones;
};

const scoreMove = (coord, predictedZones) => {
  let score = 0;

  // espace autour (survie)
  score += exits(coord) * 2;

  // éviter les zones prédites ennemies
  predictedZones.forEach(({ i, w }) => {
    if (coord.index === i) score -= 5 * w;
  });

  // léger bonus si on va vers l'ennemi (pression)
  return score;
};

const update = ({ ai, ais }) => {
  ais.forEach(setFilled);

  const predictedZones = ais
    .filter(isOtherAI)
    .filter(isAlive)
    .flatMap(predictEnemyZones);

  const possibleCoords = ai.coords.filter(isInBounds).filter(isFree);

  if (!possibleCoords.length) return null;

  const best = possibleCoords
    .map((c) => ({
      c,
      score: scoreMove(c, predictedZones),
    }))
    .sort((a, b) => b.score - a.score)[0];

  return best.c;
};
