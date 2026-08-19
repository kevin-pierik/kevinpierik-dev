import { writeFileSync } from "node:fs";

const COLS = 128;
const ROWS = 56;
const SEED = 20260819;
const CELL_ASPECT = 0.58;
const OUT = "src/content/canvas-art.ts";

const PLANET_RADIUS = 0.3;
const RING_TILT = 0.42;
const RING_INNER = 0.52;
const RING_OUTER = 0.88;
const RING_GAPS = [
  [0.63, 0.665],
  [0.78, 0.8],
];
const LIGHT = { x: -0.55, y: -0.45 };

const PLANET_RAMP = " .:-=+o*O@@";
const RING_RAMP = "  ...'':;-=";

function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const random = createRandom(SEED);

function pick(ramp, value) {
  const index = Math.floor(value * ramp.length);
  return ramp[Math.max(0, Math.min(ramp.length - 1, index))];
}

function ringDensity(x, y) {
  const radius = Math.hypot(x, y / RING_TILT);
  if (radius < RING_INNER || radius > RING_OUTER) return 0;

  const span = (radius - RING_INNER) / (RING_OUTER - RING_INNER);
  const striations = 0.58 + 0.42 * Math.cos(radius * 78);
  let density = (0.95 - 0.3 * span) * striations;

  for (const [from, to] of RING_GAPS) {
    if (radius > from && radius < to) density *= 0.15;
  }

  const edge = Math.min(radius - RING_INNER, RING_OUTER - radius);
  return density * Math.min(1, edge * 26);
}

function planetDensity(x, y) {
  const radius = Math.hypot(x, y) / PLANET_RADIUS;
  if (radius > 1) return 0;

  const z = Math.sqrt(Math.max(0, 1 - radius * radius));
  const nx = x / PLANET_RADIUS;
  const ny = y / PLANET_RADIUS;
  const light = Math.max(0, nx * LIGHT.x + ny * LIGHT.y + z * 0.7);
  const limb = Math.min(1, (1 - radius) * 9);
  const bands = 0.88 + 0.12 * Math.sin(ny * 9);

  return Math.min(1, (0.16 + light * 0.95) * bands) * limb;
}

const lines = [];

for (let row = 0; row < ROWS; row += 1) {
  let line = "";

  for (let col = 0; col < COLS; col += 1) {
    const x = ((col - COLS / 2) * CELL_ASPECT) / (ROWS / 2);
    const y = (row - ROWS / 2) / (ROWS / 2);

    const ring = ringDensity(x, y);
    const planet = planetDensity(x, y);
    const jitter = 0.92 + random() * 0.16;
    const ringIsInFront = y > 0;

    let char = " ";

    if (ring > 0 && (ringIsInFront || planet === 0)) {
      char = pick(RING_RAMP, ring * jitter);
    } else if (planet > 0) {
      char = pick(PLANET_RAMP, planet * jitter);
    }

    line += char;
  }

  lines.push(line);
}

const filled = lines.filter((line) => line.trim().length > 0);
const left = Math.min(...filled.map((line) => line.length - line.trimStart().length));
const right = Math.max(...filled.map((line) => line.trimEnd().length));
const cropped = filled.map((line) => line.slice(left, right).padEnd(right - left, " "));

const art = cropped.join("\n");
const artColumns = right - left;
const artRows = cropped.length;

writeFileSync(
  OUT,
  [
    `export const canvasColumns = ${artColumns};`,
    `export const canvasRows = ${artRows};`,
    "",
    `export const canvasArt = \`${art.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;`,
    "",
  ].join("\n"),
);

console.log(art);
console.log(`\n${artColumns}x${artRows} → ${OUT} (${art.length} chars)`);
