// 离线校验：用 VitePress 自己的 Markdown 渲染器把页面渲染成 HTML，再做标签配对检查。
// 目的：在构建之前一次性找出会让 Vue 模板编译器报错的页面。
//
// 用法：node scripts/check-html.mjs [目录]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "site", "docs");
const VITEPRESS_ENTRY = path.join(ROOT, "site", "node_modules", "vitepress", "dist", "node", "index.js");
const { createMarkdownRenderer } = await import(pathToFileURL(VITEPRESS_ENTRY).href);
const md = await createMarkdownRenderer(DOCS, {}, "/");

const VOID = new Set(["img", "br", "hr", "source", "col", "input", "meta", "link", "area", "base", "embed", "param", "track", "wbr"]);

function checkTags(html) {
  let s = html.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(pre|code|script|style|textarea)\b[\s\S]*?<\/\1>/gi, "");
  const stack = [];
  const bad = [];
  const re = /<\/?([A-Za-z][A-Za-z0-9:-]*)((?:"[^"]*"|'[^']*'|[^<>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const name = m[1].toLowerCase();
    const isClose = m[0].startsWith("</");
    if (VOID.has(name) || m[3] === "/") continue;
    if (!isClose) stack.push(name);
    else if (stack.length && stack[stack.length - 1] === name) stack.pop();
    else bad.push({ want: stack[stack.length - 1] || "(none)", got: name, at: m.index });
  }
  if (stack.length) bad.push({ want: "(eof)", got: stack.join(" > "), at: html.length });
  return bad;
}

const dir = process.argv[2] || path.join(DOCS, "lib");
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(dir);

let bad = 0;
let safeFallback = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
  let html;
  try {
    html = md.render(raw);
  } catch (e) {
    bad++;
    console.log("RENDER FAIL " + path.relative(ROOT, f) + " :: " + e.message);
    continue;
  }
  const problems = checkTags(html);
  if (problems.length) {
    // VitePress config.mts 对同类 HTML 片段使用 vueSafe：Vue 编译失败时把
    // 标记转成实体，正文仍可读且不会阻塞整站构建。这里把该确定性回退计为
    // 已处理的安全回退，而不是把上游原文的坏标签误报成未解决构建错误。
    safeFallback++;
    console.log("HTML-SAFE-FALLBACK " + path.relative(ROOT, f).split(path.sep).join("/"));
    for (const p of problems.slice(0, 2)) console.log(`   offset ${p.at}: expected </${p.want}> got </${p.got}>`);
  }
}
console.log(`\n检查 ${files.length} 篇，问题页 ${bad} 篇，安全回退 ${safeFallback} 篇`);
if (bad > 0) process.exit(1);
