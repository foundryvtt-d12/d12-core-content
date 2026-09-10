import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import fs from "node:fs";
import path from "node:path";

const PACKS_DIR = "packs";
const SOURCE_DIR = path.join(PACKS_DIR, "_source");

const packNames = fs
  .readdirSync(SOURCE_DIR)
  .filter((name) => fs.statSync(path.join(SOURCE_DIR, name)).isDirectory());

const mode = process.argv[2];

if (mode === "compile") {
  for (const name of packNames) {
    await compilePack(path.join(SOURCE_DIR, name), path.join(PACKS_DIR, name), {
      recursive: true,
      log: true,
    });
  }
} else if (mode === "extract") {
  for (const name of packNames) {
    await extractPack(path.join(PACKS_DIR, name), path.join(SOURCE_DIR, name), {
      yaml: false,
      log: true,
    });
  }
} else if (mode === "clean") {
  for (const name of packNames) {
    fs.rmSync(path.join(PACKS_DIR, name), { recursive: true, force: true });
  }
} else {
  console.error("Usage: node tools/packs.mjs <compile|extract|clean>");
  process.exit(1);
}
