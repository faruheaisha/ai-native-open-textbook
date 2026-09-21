// 目录换装开关：on=换成 19 门精简版（catalog.ts + catalog-batch.ts），off=还原完整版
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GEN = path.join(ROOT, "site", "docs", ".vitepress", "theme", "generated");
const CATALOG = path.join(GEN, "catalog.ts");
const BAK = CATALOG + ".full-bak";
const SMALL = path.join(ROOT, "tmp", "catalog-19.ts");
const BATCH = path.join(GEN, "catalog-batch.ts");
const mode = process.argv[2];

if (mode === "on") {
  fs.rmSync(BAK, { force: true });
  fs.renameSync(CATALOG, BAK);
  fs.copyFileSync(SMALL, CATALOG);
  fs.copyFileSync(SMALL, BATCH);
  console.log("catalog.ts / catalog-batch.ts -> 19 门精简版");
} else if (mode === "off") {
  if (fs.existsSync(BAK)) {
    fs.rmSync(CATALOG, { force: true });
    fs.renameSync(BAK, CATALOG);
  }
  fs.rmSync(BATCH, { force: true });
  console.log("catalog.ts -> 完整版");
} else {
  throw new Error("用法: node swap-catalog.mjs on|off");
}
