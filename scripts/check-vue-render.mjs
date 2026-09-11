// 渲染前校验：把站内每一页markdown按 VitePress 的渲染器转成 HTML，再交给 Vue 的模板编译
// 器解析。Vue 报错的页面会让整站构建失败，这里提前把问题页全部找出来。
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
  try {
    compiler.parse(html);
  } catch (e) {
    const loc = e.loc?.start;
    let where = "";
    if (loc && typeof loc.offset === "number") where = JSON.stringify(html.slice(Math.max(0, loc.offset - 120), loc.offset + 80));
    bad.push([f, e.message + "  " + where]);
  }
}

console.log("检查页面 " + files.length + " 篇，编译失败 " + bad.length + " 篇");
for (const [f, msg] of bad.slice(0, 40)) console.log("  " + path.relative(LIB, f) + "\n      " + msg);
process.exit(bad.length ? 1 : 0);
