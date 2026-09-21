// 单课目录换装：microsoft-skills（on=换入并备份，off=还原）
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const GEN = path.join(ROOT, "site", "docs", ".vitepress", "theme", "generated");
const CATALOG = path.join(GEN, "catalog.ts");
const BAK = CATALOG + ".full-bak";
const BATCH = path.join(GEN, "catalog-batch.ts");
const mode = process.argv[2];
const KEEP = new Set(["10-context-memory/microsoft-skills"]);

const { courses, volumes, sources, byKind, categoryOrder, kindOrder, tierLabel, totals, generatedAt } =
  await import(pathToFileURL(CATALOG).href);
const fc = courses.filter((c) => KEEP.has(c.volume + "/" + c.local));
if (mode === "on") {
  const kc = new Map();
  for (const c of fc) kc.set(c.kind, (kc.get(c.kind) || 0) + 1);
  const serial = (v) => JSON.stringify(v, null, 2);
  const text = [
    `export const generatedAt = ${serial(generatedAt)}`,
    `export const volumes = ${serial(volumes)}`,
    `export const courses = ${serial(fc)}`,
    `export const sources = ${serial(sources)}`,
    `export const byKind = ${serial(byKind.map((k) => ({ ...k, count: kc.get(k.kind) || 0 })))}`,
    `export const categoryOrder = ${serial(categoryOrder)}`,
    `export const kindOrder = ${serial(kindOrder)}`,
    `export const tierLabel = ${serial(tierLabel)}`,
    `export const totals = ${serial(totals)}`,
    "",
  ].join("\n");
  fs.rmSync(BAK, { force: true });
  fs.renameSync(CATALOG, BAK);
  fs.writeFileSync(CATALOG, text, "utf8");
  fs.writeFileSync(BATCH, text, "utf8");
  console.log("catalog -> microsoft-skills 单课版,", fc.length, "门");
} else {
  if (fs.existsSync(BAK)) {
    fs.rmSync(CATALOG, { force: true });
    fs.renameSync(BAK, CATALOG);
  }
  fs.rmSync(BATCH, { force: true });
  console.log("catalog -> 完整版");
}
