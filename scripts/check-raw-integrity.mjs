#!/usr/bin/env node
// 校验 raw-manifest.json 中登记的原件是否仍与归档字节一致。

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "site", "docs", "public");
const manifestPath = path.join(PUBLIC, "raw-manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("raw-manifest.json missing; run build-raw-archive first");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const digest = (file) => new Promise((resolve, reject) => {
  const h = crypto.createHash("sha256");
  const stream = fs.createReadStream(file);
  stream.on("data", (chunk) => h.update(chunk));
  stream.on("error", reject);
  stream.on("end", () => resolve(h.digest("hex")));
});
const checks = [];
for (const s of manifest.sources || []) for (const f of s.files || []) checks.push({ s, f });
let bad = 0;
let count = 0;
const concurrency = 256;
for (let i = 0; i < checks.length; i += concurrency) {
  const batch = checks.slice(i, i + concurrency);
  const results = await Promise.all(batch.map(async ({ s, f }) => {
    const file = path.join(PUBLIC, "raw", s.id, ...f.path.split("/"));
    if (!fs.existsSync(file)) return `MISSING ${s.id}/${f.path}`;
    const st = fs.statSync(file);
    const sha = await digest(file);
    return st.size !== f.bytes || sha !== f.sha256
      ? `MISMATCH ${s.id}/${f.path} bytes=${st.size}/${f.bytes} sha=${sha}/${f.sha256}`
      : null;
  }));
  count += batch.length;
  for (const result of results) if (result) { bad++; console.error(result); }
  if (count % 1024 < concurrency || count === checks.length) console.log(`raw integrity progress: ${count}/${checks.length}`);
}
console.log(`raw integrity: files=${count} bad=${bad}`);
if (bad) process.exit(1);
