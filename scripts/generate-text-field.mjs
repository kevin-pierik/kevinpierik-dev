import { writeFileSync } from "node:fs";

const COLS = 200;
const ROWS = 40;
const SEED = 20260819;
const SEPARATOR = " · ";
const PHRASES = ["MORE IS COMING", "KEVIN PIERIK", "KEVINPIERIK.DEV"];
const OUT = "src/content/text-field.ts";

function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const random = createRandom(SEED);

const stream = PHRASES.join(SEPARATOR) + SEPARATOR;
const filler = stream.repeat(Math.ceil((COLS * 2) / stream.length));

const lines = Array.from({ length: ROWS }, () => {
  const offset = Math.floor(random() * stream.length);
  return filler.slice(offset, offset + COLS).padEnd(COLS, " ");
});

const art = lines.join("\n");

writeFileSync(
  OUT,
  [
    `export const textFieldColumns = ${COLS};`,
    `export const textFieldRows = ${ROWS};`,
    "",
    `export const textField = \`${art.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;`,
    "",
  ].join("\n"),
);

console.log(lines.slice(0, 4).map((line) => line.slice(0, 110)).join("\n"));
console.log(`\n${COLS}x${ROWS} → ${OUT} (${art.length} chars)`);
