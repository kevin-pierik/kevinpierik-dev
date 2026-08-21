import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_API_READ_TOKEN?.trim();

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. This script writes documents, so it needs a token with Editor rights.",
  );
}

const apiVersion = "2026-08-21";
const base = `https://${projectId}.api.sanity.io/v${apiVersion}`;
const replace = process.argv.includes("--replace");
const seedPath = join(process.cwd(), "seed", "content.ndjson");

type Doc = Record<string, unknown>;

async function uploadFile(reference: string): Promise<string> {
  const path = reference.replace(/^file@file:\/\//, "");
  const absolute = resolve(dirname(seedPath), path);
  const bytes = await readFile(absolute);
  const filename = absolute.split("/").pop() ?? "file";

  const response = await fetch(
    `${base}/assets/files/${dataset}?filename=${encodeURIComponent(filename)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
      body: new Uint8Array(bytes),
    },
  );

  if (!response.ok) {
    throw new Error(`Upload of ${filename} failed: ${await response.text()}`);
  }

  const { document } = (await response.json()) as { document: { _id: string } };
  console.log(`Uploaded ${filename} as ${document._id}`);
  return document._id;
}

async function resolveAssets(doc: Doc): Promise<Doc> {
  const file = doc.file as { _sanityAsset?: string } | undefined;
  if (!file?._sanityAsset) return doc;

  const assetId = await uploadFile(file._sanityAsset);
  return {
    ...doc,
    file: { _type: "file", asset: { _type: "reference", _ref: assetId } },
  };
}

const raw = await readFile(seedPath, "utf8");
const documents: Doc[] = raw
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => JSON.parse(line) as Doc);

const prepared = await Promise.all(documents.map(resolveAssets));

const mutations = prepared.map((doc) =>
  replace ? { createOrReplace: doc } : { createIfNotExists: doc },
);

const response = await fetch(`${base}/data/mutate/${dataset}?returnIds=true`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ mutations }),
});

if (!response.ok) {
  throw new Error(`Import failed: ${await response.text()}`);
}

const result = (await response.json()) as {
  results: { id: string; operation: string }[];
};

for (const entry of result.results) {
  console.log(`${entry.operation.padEnd(8)} ${entry.id}`);
}

console.log("");
console.log(
  replace
    ? "Done. Existing documents were overwritten."
    : "Done. Existing documents were left alone; pass --replace to overwrite.",
);
