#!/usr/bin/env node
// 检查站内 Markdown 的绝对路径链接和公共资源是否存在。
// 与 VitePress 的 ignoreDeadLinks 解耦，作为正式发布门禁使用。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "site", "docs");
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === "public" || e.name === "node_modules" || e.name === ".vitepress") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(DOCS);
const have = new Set();
for (const f of files) {
  const rel = "/" + path.relative(DOCS, f).split(path.sep).join("/");
  have.add(rel);
  have.add(rel.replace(/\.md$/, ""));
  have.add(rel.replace(/\/index\.md$/, "/"));
}
const pub = path.join(DOCS, "public");
const pubFiles = new Set();
if (fs.existsSync(pub)) (function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    // 原件归档由 check-raw-integrity 逐文件校验；不要在链接检查中再次遍历 1GB+ 的归档目录。
    if (d === pub && e.name === "raw") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else pubFiles.add("/" + path.relative(pub, p).split(path.sep).join("/"));
  }
})(pub);
const bad = new Map();
// 仅匹配完整 Markdown 链接；上游偶尔留下 Title](/path) 这类本身就不成立
// 的片段，不能把它误算成本站路由。
const RE = /\[[^\]\n]{1,240}\]\((\/[^)\s]*)\)/g;
// 代码围栏中的 /path 通常是 API 示例、CLI 参数或上游站点的路径，不是本站
// Markdown 路由。构建器也会按原样保留代码块，因此不应把示例文本误报成死链。
const withoutFencedCode = (txt) => txt.replace(
  /(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?(?:\n[ \t]*\2[ \t]*(?=\n|$)|$)/g,
  "$1"
);
const scan = (f, txt) => {
  txt = withoutFencedCode(txt);
  let m;
  while ((m = RE.exec(txt))) {
    let u = m[1];
    if (/^\/\//.test(u)) continue;
    u = u.split("#")[0].split("?")[0];
    if (!u || u === "/") continue;
    let dec = u;
    try { dec = decodeURIComponent(u); } catch {}
    if (dec === "/raw" || dec.startsWith("/raw/")) continue;
    if (have.has(dec) || have.has(dec.replace(/\/$/, "")) || pubFiles.has(dec)) continue;
    const item = bad.get(u) || { n: 0, from: [] };
    item.n++;
    if (item.from.length < 3) item.from.push(path.relative(DOCS, f).split(path.sep).join("/"));
    bad.set(u, item);
  }
};
const concurrency = 64;
for (let i = 0; i < files.length; i += concurrency) {
  const batch = files.slice(i, i + concurrency);
  const texts = await Promise.all(batch.map((f) => fs.promises.readFile(f, "utf8")));
  for (let j = 0; j < batch.length; j++) scan(batch[j], texts[j]);
}
const total = [...bad.values()].reduce((s, x) => s + x.n, 0);
console.log(`Markdown files=${files.length} public assets=${pubFiles.size} dead-link-kinds=${bad.size} total=${total}`);
for (const [u, v] of [...bad.entries()].sort((a, b) => b[1].n - a[1].n)) {
  console.error(`${v.n} ${u} <- ${v.from.join(" | ")}`);
}
if (bad.size) process.exit(1);
