#!/usr/bin/env node
// 为本地全量教学版建立不可变原件归档。
// 原件不经过 Markdown/Vue/链接处理；站内页面只是它的一个展示层。

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM = path.join(ROOT, "upstream");
const PUBLIC = path.join(ROOT, "site", "docs", "public");
const OUT = path.join(PUBLIC, "raw");
const CATALOG = path.join(ROOT, "catalog", "catalog.json");
const CURATION = path.join(ROOT, "curation.json");
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v = "true"] = a.replace(/^--/, "").split("=");
  return [k, v];
}));
const mode = args.mode || process.env.TB_CONTENT_MODE || "public";
const publicOnly = mode !== "local-full";

const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const curation = fs.existsSync(CURATION) ? JSON.parse(fs.readFileSync(CURATION, "utf8")) : {};
const selected = catalog.sources.filter((s) => {
  if (args.only && s.id !== args.only) return false;
  return !publicOnly || s.publishable;
});
const hash = (file) => {
  const h = crypto.createHash("sha256");
  h.update(fs.readFileSync(file));
  return h.digest("hex");
};
const sourceDigest = (files) => {
  const h = crypto.createHash("sha256");
  for (const f of [...files].sort((a, b) => a.path.localeCompare(b.path, "en"))) {
    h.update(f.path);
    h.update("\0");
    h.update(String(f.bytes));
    h.update("\0");
    h.update(f.sha256);
    h.update("\n");
  }
  return h.digest("hex");
};
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile()) out.push(p);
  }
  return out;
};
const safeJoin = (...parts) => {
  const p = path.resolve(...parts);
  const root = path.resolve(OUT) + path.sep;
  if (!p.startsWith(root)) throw new Error(`unsafe archive path: ${p}`);
  return p;
};

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const manifest = {
  schema: 1,
  generatedAt: new Date().toISOString(),
  mode,
  sources: [],
};

for (const s of selected) {
  const src = path.join(UPSTREAM, s.dir);
  if (!fs.existsSync(src)) {
    throw new Error(`missing upstream snapshot: ${s.id} -> ${s.dir}`);
  }
  const files = [];
  const seenFiles = new Set();
  const copyTree = (root, label = "") => {
    if (!fs.existsSync(root)) return;
    for (const file of walk(root)) {
      const rel0 = path.relative(root, file).split(path.sep).join("/");
      // 派生网页导出与上游快照共用来源根目录：页面的 sourceRel 可以直接回到
      // /raw/<sourceId>/<sourceRel>；README 等被排除的冲突文件不重复覆盖。
      const rel = rel0;
      if (seenFiles.has(rel)) continue;
      const target = safeJoin(OUT, s.id, rel);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(file, target);
      const st = fs.statSync(file);
      files.push({ path: rel, bytes: st.size, sha256: hash(file), origin: label || "upstream" });
      seenFiles.add(rel);
    }
  };
  copyTree(src);
  const derivedDir = curation.readingPlan?.[s.id]?.dir;
  if (derivedDir) copyTree(path.join(ROOT, ...String(derivedDir).split("/")), "derived");
  const sourceSha256 = sourceDigest(files);
  manifest.sources.push({
    id: s.id,
    dir: s.dir,
    repo: s.repo || null,
    site: s.site || null,
    commit: s.commit || null,
    license: s.license || null,
    licenseClass: s.licenseClass || null,
    licenseLabel: s.licenseLabel || null,
    publishable: Boolean(s.publishable),
    kind: s.kind || null,
    lang: s.lang || null,
    entry: s.entry || null,
    derivedDir: derivedDir || null,
    sourceSha256,
    fileCount: files.length,
    bytes: files.reduce((n, f) => n + f.bytes, 0),
    files,
  });
  console.log(`raw ${s.id}: ${files.length} files`);
}

const manifestPath = path.join(PUBLIC, "raw-manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
const total = manifest.sources.reduce((n, s) => n + s.files.length, 0);
console.log(`raw archive: sources=${manifest.sources.length} files=${total} mode=${mode}`);
