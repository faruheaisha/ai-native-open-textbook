#!/usr/bin/env node
// 站内搜索索引
//
// 为什么不直接用 VitePress 自带的本地搜索：它把每一页的**整篇正文**灌进 MiniSearch，
// 本仓 2700 页的产物是 37MB，浏览器要先把 37MB 拉完才能出第一个字；而且它的分词
// 对中文只是聊胜于无。
//
// 这里只索引真正会被检索的四样东西：课程名、课时名、小节标题、开篇摘要。
// 体积降到 1MB 量级，中文直接按子串命中，排序按「命中位置越靠前越相关」。
//
// 输入：site/docs 下已经生成好的 md（build-site-content.mjs 的产物）
// 输出：site/docs/public/search-index.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const DOCS = path.join(ROOT, "site", "docs");
const OUT = path.join(DOCS, "public", "search-index.json");

const MAX_HEADINGS = 40;
const EXCERPT_CHARS = 150;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "public" || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function splitFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) v = v.slice(1, -1).replace(/\\"/g, '"');
    data[kv[1]] = v;
  }
  return { data, body: text.slice(m[0].length) };
}

function plain(s) {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readHeadings(body) {
  const out = [];
  let fence = false;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (/^(```|~~~)/.test(line)) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const t = plain(m[2]);
    if (t) out.push(t);
    if (out.length >= MAX_HEADINGS) break;
  }
  return out;
}

function readExcerpt(body) {
  const buf = [];
  let fence = false;
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (/^(```|~~~)/.test(line)) {
      fence = !fence;
      continue;
    }
    if (fence || !line) continue;
    if (/^#{1,6}\s/.test(line)) continue;
    if (/^[|>]/.test(line)) continue;
    if (/^!\[/.test(line)) continue;
    if (/^[-*+]\s/.test(line) && buf.length) continue;
    const t = plain(line);
    if (!t || t.length < 4) continue;
    buf.push(t);
    if (buf.join(" ").length >= EXCERPT_CHARS) break;
  }
  return buf.join(" ").slice(0, EXCERPT_CHARS).trim();
}

function toUrl(file) {
  let rel = path.relative(DOCS, file).split(path.sep).join("/");
  rel = rel.replace(/\.md$/, "");
  rel = rel.replace(/(^|\/)index$/, "$1");
  rel = rel.replace(/\/$/, "");
  return "/" + rel.replace(/^\/+/, "");
}

// 卷名来自 paths/*.md 的 frontmatter title
const volDir = path.join(DOCS, "paths");
const volName = new Map();
if (fs.existsSync(volDir)) {
  for (const f of fs.readdirSync(volDir)) {
    if (!f.endsWith(".md")) continue;
    const { data } = splitFrontmatter(fs.readFileSync(path.join(volDir, f), "utf8"));
    volName.set(f.replace(/\.md$/, ""), data.title || f.replace(/\.md$/, ""));
  }
}

const files = walk(DOCS);
const courses = [];
const pages = [];
let skipped = 0;

for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const { data, body } = splitFrontmatter(text);
  const url = toUrl(f);
  const title = (data.title || "").trim();
  if (!title) {
    skipped++;
    continue;
  }

  // 课程门面页：/lib/<卷>/<课程>/
  if (/^\/lib\/[^/]+\/[^/]+$/.test(url)) {
    courses.push({
      t: title,
      u: url + "/",
      v: volName.get(data.volume) || data.volume || "",
      k: data.sourceKind || "",
      l: data.licenseLabel || "",
      g: data.lang || "",
      r: Number(data.tier) || 3,
    });
    continue;
  }

  const heads = readHeadings(body);
  const ex = readExcerpt(body);
  const entry = { t: title, u: url };
  if (data.sourceTitle && data.sourceTitle !== title) entry.c = data.sourceTitle;
  const vn = volName.get(data.volume);
  if (vn) entry.v = vn;
  if (heads.length) entry.h = heads;
  if (ex) entry.x = ex;
  pages.push(entry);
}

const payload = { v: 1, built: new Date().toISOString().slice(0, 10), courses, pages };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload), "utf8");

const bytes = fs.statSync(OUT).size;
const headCount = pages.reduce((n, p) => n + (p.h ? p.h.length : 0), 0);
console.log(
  "search-index: courses=" + courses.length +
  " pages=" + pages.length +
  " headings=" + headCount +
  " skipped=" + skipped +
  " size=" + (bytes / 1024).toFixed(0) + "KB"
);
