#!/usr/bin/env node
// 把目录登记与原件归档收口成一份可审阅的来源证据清单。
// 该清单不复制正文，只登记版本、许可、范围和原件哈希；原件仍由 public/raw 提供。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = path.join(ROOT, "catalog", "catalog.json");
const RAW = path.join(ROOT, "site", "docs", "public", "raw-manifest.json");
const OUT = path.join(ROOT, "catalog", "source-manifest.json");

if (!fs.existsSync(RAW)) {
  console.error("raw-manifest.json missing; run build-raw-archive first");
  process.exit(1);
}
const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const raw = JSON.parse(fs.readFileSync(RAW, "utf8"));
const byId = new Map((raw.sources || []).map((s) => [s.id, s]));
const sources = (catalog.sources || []).map((s) => {
  const r = byId.get(s.id);
  return {
    id: s.id,
    volume: s.volume || null,
    local: s.local || null,
    title: s.title || null,
    repo: s.repo || null,
    site: s.site || null,
    commit: s.commit || null,
    entry: s.entry || null,
    kind: s.kind || null,
    lang: s.lang || null,
    license: s.license || null,
    licenseClass: s.licenseClass || null,
    licenseLabel: s.licenseLabel || null,
    publishable: Boolean(s.publishable),
    raw: r ? {
      mode: raw.mode || null,
      sourceSha256: r.sourceSha256 || null,
      fileCount: r.fileCount || (r.files || []).length,
      bytes: r.bytes || (r.files || []).reduce((n, f) => n + Number(f.bytes || 0), 0),
      // 仅保存路径与哈希，不复制正文；用于逐页来源指针的快速核对。
      files: (r.files || []).map((f) => ({ path: f.path, bytes: f.bytes, sha256: f.sha256 })),
    } : null,
    evidenceStatus: r ? "raw-archived-hash-verified" : "missing-raw-archive",
  };
});

const missing = sources.filter((s) => !s.raw).map((s) => s.id);
const out = {
  schema: 1,
  generatedAt: new Date().toISOString(),
  rawManifest: "site/docs/public/raw-manifest.json",
  sourceCount: sources.length,
  missingRawCount: missing.length,
  missingRaw: missing,
  sources,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("source manifest: sources=" + sources.length + " missingRaw=" + missing.length + " -> " + path.relative(ROOT, OUT));
if (missing.length) process.exit(1);
