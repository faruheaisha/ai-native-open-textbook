// 渲染前校验：把站内每一页 markdown 按 VitePress 的渲染器转成 HTML，再交给 Vue 的模板
// 编译器和「相对资源」检查。两类问题都会让整站构建失败：
//   1. Vue 模板编译不过（标签不配对、未转义的占位符等）；
//   2. 原始 HTML 里出现相对的 src / srcset，VitePress 会把它当成待打包的静态资源，
//      文件不在仓库里时 Rollup 直接报 "failed to resolve import"。
// 这里提前把问题页全部找出来。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const LIB = path.join(ROOT, "site", "docs", "lib");

const { createMarkdownRenderer } = await import(
  pathToFileURL(path.join(ROOT, "site", "node_modules", "vitepress", "dist", "node", "index.js")).href
);
const compiler = require(path.join(ROOT, "site", "node_modules", "@vue", "compiler-dom", "dist", "compiler-dom.cjs.js"));
const md = await createMarkdownRenderer(path.join(ROOT, "site", "docs"), {});

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(LIB);

// VitePress 会把 <img src="相对路径"> 交给打包器解析；根路径 / http / data 不受影响。
const REL_ASSET = /<(?:img|source)\b[^>]*?\b(src|srcset)=(["'])([^"']+)\2/gi;
function relativeAssets(html) {
  const out = [];
  let m;
  REL_ASSET.lastIndex = 0;
  while ((m = REL_ASSET.exec(html))) {
    // 只有 srcset 用逗号分隔候选；src 里的逗号是 URL 的一部分，拆开会误报。
    for (const cand of m[1].toLowerCase() === "srcset" ? m[3].split(",") : [m[3]]) {
      const u = cand.trim().split(/\s+/)[0];
      if (!u) continue;
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(u)) continue;
      out.push(u);
    }
  }
  return out;
}

const bad = [];
for (const f of files) {
  const src = fs.readFileSync(f, "utf8").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  let html;
  try {
    html = md.render(src);
  } catch (e) {
    bad.push([f, "render: " + e.message]);
    continue;
  }
  for (const u of relativeAssets(html)) bad.push([f, "相对资源会被打包器解析，须指回上游： " + u]);
  try {
    compiler.parse(html);
  } catch (e) {
    const loc = e.loc?.start;
    let where = "";
    if (loc && typeof loc.offset === "number") where = JSON.stringify(html.slice(Math.max(0, loc.offset - 120), loc.offset + 80));
    bad.push([f, e.message + "  " + where]);
  }
}

console.log("检查页面 " + files.length + " 篇，问题 " + bad.length + " 篇");
for (const [f, msg] of bad.slice(0, 40)) console.log("  " + path.relative(LIB, f) + "\n      " + msg);
process.exit(bad.length ? 1 : 0);
