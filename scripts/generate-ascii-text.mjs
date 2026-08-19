import { writeFileSync } from "node:fs";
import figlet from "figlet";

const OUT = "src/content/ascii-text.ts";

const entries = [
  { name: "moreIsComing", text: "MORE\nIS COMING", font: "Big Money-ne" },
];

function toTemplate(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

const parts = entries.map(({ name, text, font }) => {
  const art = figlet
    .textSync(text, { font })
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/^\n+|\n+$/g, "");

  const columns = Math.max(...art.split("\n").map((line) => line.length));

  console.log(art);
  return [
    `export const ${name}Columns = ${columns};`,
    `export const ${name} = \`${toTemplate(art)}\`;`,
  ].join("\n");
});

writeFileSync(OUT, `${parts.join("\n\n")}\n`);
console.log(`\n→ ${OUT}`);
