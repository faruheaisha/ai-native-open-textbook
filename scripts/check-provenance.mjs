#!/usr/bin/env node
// 校验展示页的来源指针不会漂移：每一页必须能回到 raw archive 中的原始文件，
// 且 sourceSha256 必须是完整上游文件的哈希（拆分页另有 pageSha256）。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "site", "docs", "lib");
const RAW_ROOT = path.join(ROOT, "site", "docs", "public", "raw");
const SOURCE_MANIFEST = path.join(ROOT, "catalog", "source-manifest.json");
const OUT = path.join(ROOT, "catalog", "provenance-check.json");

if (!fs.existsSync(SOURCE_MANIFEST)) {
  console.error("catalog/source-manifest.json missing; run build:manifest first");
  process.exit(1);
}

// 不在每次门禁中解析 1GB 级 raw-manifest 的逐文件数组；source-manifest 已登记
// 每个来源的聚合哈希，逐文件存在性由下面的路径检查负责，字节哈希由 check-raw-integrity 负责。
const raw = JSON.parse(fs.readFileSync(SOURCE_MANIFEST, "utf8"));
const sourceMap = new Map((raw.sources || []).map((s) => [s.id, s]));
const fileMaps = new Map((raw.sources || []).map((s) => [
  s.id,
  new Map((s.raw?.files || []).map((f) => [f.path, f])),
]));
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(DOCS);

function frontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    try { out[key] = JSON.parse(value); } catch { out[key] = value.replace(/^['"]|['"]$/g, ""); }
  }
  return out;
}

const bad = [];
let landing = 0;
let checked = 0;
for (const file of files) {
  const fm = frontmatter(fs.readFileSync(file, "utf8"));
  if (!fm || !fm.sourceId) continue;
  checked++;
  const src = sourceMap.get(fm.sourceId);
  const relPage = path.relative(ROOT, file).split(path.sep).join("/");
  if (!src) {
    bad.push({ page: relPage, reason: "sourceId-not-in-raw-manifest", sourceId: fm.sourceId });
    continue;
  }
  if (fm.contentMode === "public" && !src.publishable) {
    bad.push({ page: relPage, reason: "cite-only-source-in-public-build", sourceId: fm.sourceId });
  }
  if (!fm.sourceRel) {
    landing++;
    continue;
  }
  const rel = String(fm.sourceRel).replace(/\\/g, "/");
  if (rel.startsWith("/") || rel.split("/").includes("..")) {
    bad.push({ page: relPage, reason: "unsafe-sourceRel", sourceId: fm.sourceId, sourceRel: rel });
    continue;
  }
  const rawFile = path.join(RAW_ROOT, fm.sourceId, ...rel.split("/"));
  if (!fs.existsSync(rawFile) || !fs.statSync(rawFile).isFile()) {
    bad.push({ page: relPage, reason: "raw-file-missing", sourceId: fm.sourceId, sourceRel: rel });
    continue;
  }
  const fileEntry = fileMaps.get(fm.sourceId)?.get(rel);
  const expected = fileEntry?.sha256 || null;
  if (!expected || fm.sourceSha256 !== expected) {
    bad.push({ page: relPage, reason: "source-hash-mismatch", sourceId: fm.sourceId, sourceRel: rel, expected, actual: fm.sourceSha256 || null });
  }
}

const result = {
  schema: 1,
  generatedAt: new Date().toISOString(),
  mode: raw.sources?.[0]?.raw?.mode || null,
  pages: files.length,
  checked,
  landing,
  bad: bad.length,
  failures: bad.slice(0, 200),
};
fs.writeFileSync(OUT, JSON.stringify(result, null, 2) + "\n", "utf8");
console.log(`provenance: pages=${files.length} checked=${checked} landing=${landing} bad=${bad.length}`);
console.log(`evidence: ${path.relative(ROOT, OUT)}`);
if (bad.length) {
  for (const x of bad.slice(0, 20)) console.error(`${x.reason}: ${x.page}`);
  process.exit(1);
}
