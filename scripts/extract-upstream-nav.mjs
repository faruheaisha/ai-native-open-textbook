// 从上游仓库自带的导航配置里抽出侧栏树，原样照搬到站内。
//
// 为什么要有这一步：站内侧栏原先一律按目录结构生成，标题与顺序都来自导出工具的 slug。
// 上游自己写的导航（千问办公的 sidebar.ts、豆包工作的站点快照、openai-agents 的 mkdocs nav…）
// 带着真实的分章、别名与顺序，照搬过来才对得上。
//
//   node scripts/extract-upstream-nav.mjs
//   node scripts/extract-upstream-nav.mjs --only=04-work/qwenwork-guide
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildIndexNav } from "./lib/nav-sources.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const esbuild = require(path.join(ROOT, "site/node_modules/esbuild"));

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog/catalog.json"), "utf8"));
const curation = JSON.parse(fs.readFileSync(path.join(ROOT, "curation.json"), "utf8"));
const onlyArg = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);
const OUT = path.join(ROOT, "catalog/upstream-nav.json");

// 站上真正落地的页面清单（来自上一次生成产物）。
// 上游导航常指到另一语言目录（docs/en）或未镜像的路径，这里以「站上确实有这一页」为准校正。
const PAGE_SETS = (() => {
  const file = path.join(ROOT, "site/docs/.vitepress/theme/generated/catalog.ts");
  const map = new Map();
  try {
    const cat = fs.readFileSync(file, "utf8");
    const i0 = cat.indexOf("export const courses: Course[] = ");
    const i1 = cat.indexOf("\nexport const sources: SourceEntry[] = ");
    if (i0 < 0 || i1 < 0) return map;
    const courses = JSON.parse(cat.slice(i0 + "export const courses: Course[] = ".length, i1).trim().replace(/;$/, ""));
    for (const c of courses) {
      const set = new Set();
      for (const d of c.docs || []) if (d.sourceRel) set.add(String(d.sourceRel).replace(/\\/g, "/"));
      if (set.size) map.set(c.id, set);
    }
  } catch {}
  return map;
})();

const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => { try { return fs.existsSync(p); } catch { return false; } };
const snapshotDir = (s) => path.join(ROOT, "upstream", s.dir);
const planOf = (s) => (curation.readingPlan || {})[s.id] || {};
const sourceDir = (s) => (planOf(s).dir ? path.join(ROOT, planOf(s).dir) : snapshotDir(s));

// 一个 NavItem：{ text, route?, href?, items? }
const cleanText = (t) => String(t == null ? "" : t)
  .replace(/<[^>]+>/g, "")
  .replace(/^\s*[-*+]\s*/, "")
  .replace(/\s+/g, " ")
  .trim();

function stripQuery(p) {
  return String(p).replace(/[?#].*$/, "");
}
// 把导航里的相对路径解析成「相对仓库根」的路径（与生成器侧的 sourceRel 对齐）。
function resolveRoute(baseDir, rel) {
  let s = stripQuery(rel).trim();
  try { s = decodeURIComponent(s); } catch {}
  if (!s || /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s)) return null; // 外链不入导航树
  if (s.startsWith("#")) return null;
  const abs = path.posix.normalize(path.posix.join(baseDir.split(path.sep).join("/"), s));
  return abs.replace(/^\.\//, "").replace(/^\/+/, "");
}

function findFiles(dir, test, depth = 6, out = []) {
  if (depth < 0 || !exists(dir)) return out;
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    if (e.name === "node_modules" || e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) findFiles(full, test, depth - 1, out);
    else if (test(e.name, full)) out.push(full);
  }
  return out;
}

// ---------- 一、TS/JS 侧栏配置：原样跑一遍上游的配置代码 ----------
async function runConfigModule(file) {
  const out = await esbuild.build({
    entryPoints: [file], bundle: true, format: "esm", platform: "node",
    write: false, logLevel: "silent", absWorkingDir: path.dirname(file),
    external: ["vitepress", "vuepress", "vuepress/config", "@docusaurus/*", "node:*"],
  });
  if (!out.outputFiles || !out.outputFiles.length) return null;
  const tmp = path.join(path.dirname(file), `__nav_extract_${Date.now().toString(36)}.mjs`);
  fs.writeFileSync(tmp, out.outputFiles[0].text);
  try { return await import(pathToFileURL(tmp).href); }
  finally { try { fs.unlinkSync(tmp); } catch {} }
}

function normVitePressItems(items) {
  const out = [];
  for (const it of items || []) {
    if (!it) continue;
    if (typeof it === "string") { out.push({ text: cleanText(it) }); continue; }
    const node = {};
    if (it.text != null) node.text = cleanText(it.text);
    if (it.link) node.route = String(it.link);
    const kids = normVitePressItems(it.items);
    if (kids.length) node.items = kids;
    if (!node.text && !node.items) continue;
    if (!node.text && node.items) node.text = "";
    out.push(node);
  }
  return out;
}

function normVuePressItems(items, prefix, baseDir) {
  const out = [];
  for (const it of items || []) {
    if (!it) continue;
    if (typeof it === "string") {
      const r = resolveRoute(baseDir, it);
      if (r) out.push({ text: cleanText(path.posix.basename(it).replace(/\.mdx?$/i, "")), route: r });
      continue;
    }
    const node = {};
    const label = it.title != null ? it.title : (it.text != null ? it.text : "");
    if (label) node.text = cleanText(label);
    if (it.path) { const r = resolveRoute(baseDir, it.path); if (r) node.route = r; }
    const kids = normVuePressItems(it.children || it.items, prefix, baseDir);
    if (kids.length) node.items = kids;
    if (!node.text && !node.items && !node.route) continue;
    out.push(node);
  }
  return out;
}

// ---------- 二、mkdocs.yml 的 nav ----------
function indentOf(line) { return (line.match(/^ */) || [""])[0].length; }

function parseYamlNav(lines, startIdx) {
  const baseIndent = indentOf(lines[startIdx]);
  const items = [];
  const stack = [{ indent: baseIndent, items }];
  let i = startIdx + 1;
  for (; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (/^\s*#/.test(line)) continue;
    const ind = indentOf(line);
    if (ind <= baseIndent) break;
    const m = line.match(/^\s*-\s*(.*)$/);
    if (!m) continue;
    const body = m[1].trim();
    let key = null;
    let val = null;
    const ci = body.indexOf(":");
    if (ci >= 0 && !/^https?:/i.test(body)) { key = body.slice(0, ci).trim(); val = body.slice(ci + 1).trim(); }
    else val = body;
    while (stack.length > 1 && stack[stack.length - 1].indent >= ind) stack.pop();
    const parent = stack[stack.length - 1].items;
    const node = {};
    const isPath = val && /\.(md|mdx|markdown)$/i.test(val) || (val && /^\.{0,2}\//.test(val));
    if (key) node.text = cleanText(key);
    else if (val) node.text = cleanText(path.posix.basename(val).replace(/\.mdx?$/i, ""));
    if (val && isPath) node.route = val;
    if (!val && key) node.items = [];
    if (val && !isPath && !node.text) node.text = cleanText(val);
    parent.push(node);
    if (!val && key) stack.push({ indent: ind, items: node.items });
  }
  return [items, i];
}

function fromMkdocsNav(file, srcDir) {
  const lines = read(file).split(/\r?\n/);
  const relBase = path.relative(srcDir, path.dirname(file)).split(path.sep).join("/");
  const langs = [];
  lines.forEach((line, i) => {
    const m = line.match(/^(\s*)-\s*locale:\s*([A-Za-z_-]+)\s*$/);
    if (!m) return;
    const locale = m[2];
    for (let k = i + 1; k < lines.length; k += 1) {
      if (/^\s*-\s*locale:/.test(lines[k])) break;
      if (/^(\s*)nav:\s*$/.test(lines[k])) { langs.push({ locale, navLine: k }); break; }
    }
  });
  if (!langs.length) {
    const nl = lines.findIndex((l) => /^nav:\s*$/.test(l));
    if (nl < 0) return null;
    const [items] = parseYamlNav(lines, nl);
    return { items, base: relBase };
  }
  const pick = langs.find((x) => /^zh([-_]|$)/i.test(x.locale))
  const dd = (read(file).match(/^docs_dir:[ \t]*(\S+)[ \t]*$/m) || [])[1] || "docs";
  // docs_structure: folder —— 默认语种的正文在 docs/ 根下，其余语种在 docs/<locale>/。
  const isDefaultLocale = !pick.locale || /^en([-_]|$)/i.test(pick.locale);
  const [items] = parseYamlNav(lines, pick.navLine);
  return { items, base: isDefaultLocale ? path.posix.join(relBase, dd) : path.posix.join(relBase, dd, pick.locale) };
}

// ---------- 三、mdBook 的 SUMMARY.md ----------
function fromMdBookSummary(file, srcDir) {
  const lines = read(file).split(/\r?\n/);
  const relBase = path.relative(srcDir, path.dirname(file)).split(path.sep).join("/");
  const root = [];
  let part = null;
  const stack = [{ indent: -1, items: root }];
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const title = cleanText(h[2]);
      if (!title) continue;
      part = { text: title, items: [] };
      root.push(part);
      stack.length = 1;
      stack[0] = { indent: -1, items: part.items };
      continue;
    }
    const li = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (!li) continue;
    const ind = li[1].length;
    const body = li[2].trim();
    const link = body.match(/^\[([^\]]*)\]\(([^)]+)\)/) || body.match(/^\[([^\]]*)\]\[[^\]]*\]/);
    const target = link ? link[2] : null;
    const text = cleanText(link ? link[1] : body);
    if (!text && !target) continue;
    while (stack.length > 1 && stack[stack.length - 1].indent >= ind) stack.pop();
    const parent = stack[stack.length - 1].items;
    const node = { text: text || path.posix.basename(stripQuery(target || "")).replace(/\.mdx?$/i, "") };
    const r = target ? resolveRoute(relBase, target) : null;
    if (r) node.route = r;
    else if (!target) node.items = [];
    parent.push(node);
    if (!target) stack.push({ indent: ind, items: node.items });
  }
  return { items: root, base: relBase };
}

// ---------- 四、docsify 的 _sidebar.md ----------
function fromDocsifySidebar(file, srcDir) {
  const lines = read(file).split(/\r?\n/);
  const relBase = path.relative(srcDir, path.dirname(file)).split(path.sep).join("/");
  const root = [];
  const stack = [{ indent: -1, items: root }];
  for (const line of lines) {
    const li = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (!li) continue;
    const ind = li[1].length;
    const body = li[2].trim();
    if (!body) continue;
    const link = body.match(/^\[([^\]]*)\]\(([^)]+)\)/);
    let text = "";
    let target = null;
    if (link) { text = cleanText(link[1]); target = link[2]; }
    else text = cleanText(body);
    const strong = text.match(/^(?:\*\*|<strong>)?\s*(.*?)\s*(?:\*\*|<\/strong>)?$/);
    text = cleanText(strong ? strong[1] : text);
    if (!text && !target) continue;
    while (stack.length > 1 && stack[stack.length - 1].indent >= ind) stack.pop();
    const parent = stack[stack.length - 1].items;
    const node = { text: text || path.posix.basename(stripQuery(target)).replace(/\.mdx?$/i, "") };
    const r = target ? resolveRoute(relBase, target) : null;
    if (r) node.route = r;
    else node.items = [];
    parent.push(node);
    if (!target) stack.push({ indent: ind, items: node.items });
  }
  return { items: root, base: relBase };
}

// ---------- 五、Docusaurus 的 sidebars.js ----------
function normDocusaurusItems(items) {
  const out = [];
  for (const it of items || []) {
    if (typeof it === "string") { out.push({ text: "", route: it.endsWith(".md") || it.endsWith(".mdx") ? it : it + ".md" }); continue; }
    if (!it) continue;
    const node = {};
    if (it.label) node.text = cleanText(it.label);
    if (it.id) node.route = String(it.id).endsWith(".md") ? String(it.id) : String(it.id) + ".md";
    if (it.link && it.link.type === "doc" && it.link.id) node.route = String(it.link.id) + ".md";
    const kids = normDocusaurusItems(it.items);
    if (kids.length) node.items = kids;
    if (node.route || node.items) out.push(node);
  }
  return out;
}

// ---------- 六、站点快照（豆包工作蓝皮书）自带的目录树 ----------
function fromSiteContentJson(file, derivedDir) {
  const j = JSON.parse(read(file));
  const docs = j.documents || [];
  if (!docs.length) return null;
  const byTok = new Map(docs.map((d) => [d.nodeToken, d]));
  const kids = new Map();
  const roots = [];
  for (const d of docs) {
    const p = d.parentToken && byTok.has(d.parentToken) ? d.parentToken : "";
    if (!p) roots.push(d);
    else { if (!kids.has(p)) kids.set(p, []); kids.get(p).push(d); }
  }
  const sortByOrder = (arr) => arr.sort((a, b) => (a.order || 0) - (b.order || 0));
  const leaves = [];
  const build = (d) => {
    sortByOrder(kids.get(d.nodeToken) || []);
    const node = { text: cleanText(d.title) };
    const ch = kids.get(d.nodeToken) || [];
    if (ch.length) node.items = ch.map(build);
    else leaves.push(d);
    return node;
  };
  const items = sortByOrder(roots).map(build);
  // 页面文件由上游快照展开成「序号-标题.md」，叶子的先后顺序与文件名序号一一对应。
  let files = [];
  try {
    files = fs.readdirSync(derivedDir).filter((f) => /\.mdx?$/i.test(f) && !/^README\.mdx?$/i.test(f));
  } catch { return null; }
  files.sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "variant" }));
  if (files.length !== leaves.length) {
    console.log(`       ! ${path.basename(derivedDir)} 叶子 ${leaves.length} 篇 / 页面文件 ${files.length} 篇，序号对不上，跳过`);
    return null;
  }
  const flat = [];
  const assign = (list) => {
    for (const n of list) {
      if (n.items) assign(n.items);
      else { n.route = files[flat.length]; flat.push(n); }
    }
  };
  assign(items);
  return { items, base: "" };
}

// ---------- 收口：把 route 对着磁盘上的真实文件校一遍 ----------
// 上游导航写的路径与仓库实际位置经常差一层：Docusaurus 的 doc id 相对内容目录，
// 而内容目录又嵌在 docs/docs 里；mdBook 的 SUMMARY 有时用 .md 指 .mdx。
// 这里用「整条路由在文件表里做后缀匹配」把偏差校回来，取层级最浅的那一个。
function repairRoutes(items, srcDir, pageSet) {
  const files = [];
  (function walk(dir) {
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (["node_modules", ".git"].includes(e.name)) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/\.mdx?$/i.test(e.name)) continue;
      files.push(path.relative(srcDir, full).split(path.sep).join("/"));
    }
  })(srcDir);
  if (!files.length) return items;
  const pick = (r) => {
    // 站上确实有这一页时，直接采信（哪怕上游导航写的是另一个语言目录）
    if (pageSet && pageSet.size) {
      if (pageSet.has(r)) return r;
      const onSite = [...pageSet].filter((f) => f.endsWith("/" + r));
      if (onSite.length) {
        onSite.sort((a, b) => a.split("/").length - b.split("/").length || a.length - b.length);
        return onSite[0];
      }
    }
    const hits = files.filter((f) => f === r || f.endsWith("/" + r));
    hits.sort((a, b) => a.split("/").length - b.split("/").length || a.length - b.length);
    return hits[0] || null;
  };
  const LOCALES = ["en", "zh", "zh-cn", "zh-hans", "zh-hant", "zh-tw", "en-us", "ja", "ko", "fr", "de", "es", "pt", "ru", "ar"];
  const fix = (route) => {
    const r0 = String(route).replace(/\/+$/, "");
    if (pageSet && pageSet.size) {
      const segs = r0.split("/");
      const hasLocale = segs.some((s) => LOCALES.includes(s.toLowerCase()));
      if (hasLocale) {
        for (const i of segs.map((s, k) => [s.toLowerCase(), k]).filter(([s]) => LOCALES.includes(s)).map(([, k]) => k)) {
          for (const to of LOCALES) {
            if (to === segs[i].toLowerCase()) continue;
            const cand = segs.map((s, k) => (k === i ? to : s)).join("/");
            if (pageSet.has(cand)) return cand;
            const hits2 = [...pageSet].filter((f) => f.endsWith("/" + cand));
            if (hits2.length) {
              hits2.sort((a, b) => a.split("/").length - b.split("/").length);
              return hits2[0];
            }
          }
        }
      }
    }
    const tries = [
      r0,
      r0.replace(/\.md$/i, ".mdx"),
      r0.replace(/\.mdx$/i, ".md"),
      r0 + ".md",
      r0 + ".mdx",
      r0 + "/index.md",
      r0 + "/README.md",
    ];
    const seen = new Set();
    for (const t of tries) {
      if (!t || seen.has(t)) continue;
      seen.add(t);
      const hit = pick(t);
      if (hit) return hit;
    }
    return null;
  };
  const walk = (list) => {
    for (const it of list || []) {
      if (it.route) { const r = fix(it.route); if (r) it.route = r; }
      if (it.items) walk(it.items);
    }
  };
  walk(items);
  return items;
}

function finalize(items, base) {
  const out = [];
  for (const it of items || []) {
    const node = {};
    if (it.text) node.text = cleanText(it.text);
    if (it.route) { const r = resolveRoute(base || "", it.route); if (r) node.route = r; }
    const kids = finalize(it.items, base);
    if (kids.length) node.items = kids;
    if (node.route || node.items) out.push(node);
  }
  return out;
}

function countNav(items) {
  let n = 0;
  for (const it of items || []) { n += 1; if (it.items) n += countNav(it.items); }
  return n;
}

// Microsoft AI Agents for Beginners 的 README 课程表使用统一的「显示标题 + Link」
// 表格。某些自动翻译配置会把语言表误当 sidebar，并把所有课时标题降成 Link；
// 这里直接读取课程表，保留作者给出的标题与 1→18 顺序。
function microsoftAgentsReadmeNav(srcDir, pageSet) {
  if (!/microsoft-ai-agents-for-beginners$/i.test(srcDir)) return null;
  const file = path.join(srcDir, "README.md");
  if (!exists(file)) return null;
  const lines = read(file).split(/\r?\n/);
  const lessons = [];
  for (const line of lines) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*\[Link\]\(([^)]+)\)/i);
    if (!m || !/^\.\//.test(m[2])) continue;
    const route = resolveRoute("", m[2]);
    if (!route || (pageSet && pageSet.size && !pageSet.has(route))) continue;
    lessons.push({ text: cleanText(m[1]), route });
  }
  if (lessons.length < 6) return null;
  return [{
    text: "Lessons",
    items: lessons,
  }];
}

// 没有 sidebar/SUMMARY/mkdocs 的课程仍可能有明确的仓库目录顺序（例如 ch01…、
// Stage1…、week1…）。这不是凭空编排：只使用已登记的源文件集合，按上游相对路径
// 的数字/字典顺序建立同构树，并在叶子上读取原文件 H1。结果会标注为 tree-order，
// 供人工复核时区分“作者导航”和“仓库目录顺序”。
function courseTreeNav(srcDir, pageSet) {
  if (!pageSet || pageSet.size < 1) return null;
  const files = [...pageSet].map((f) => String(f).replace(/\\/g, "/"))
    .filter((f) => /\.mdx?$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "variant" }));
  if (!files.length) return null;
  const root = { items: [], groups: new Map() };
  const leaf = (rel) => ({ text: "", route: rel });
  for (const rel of files) {
    const segs = rel.split("/");
    const file = segs.pop();
    let node = root;
    for (const seg of segs) {
      let kid = node.groups.get(seg);
      if (!kid) {
        kid = { text: seg, items: [], groups: new Map() };
        node.groups.set(seg, kid);
        node.items.push(kid);
      }
      node = kid;
    }
    node.items.push(leaf([...segs, file].join("/")));
  }
  const strip = (node) => {
    const items = [];
    for (const it of node.items) {
      if (it.route) items.push(it);
      else {
        const kids = strip(it);
        if (kids.length) items.push({ text: it.text, items: kids });
      }
    }
    return items;
  };
  return strip(root);
}

// ---------- 社区投稿：上游按 frontmatter 的 title / date 生成条目 ----------
// 上游的 sidebar.ts 会去读 cases/submissions/<slug>/index.md 的 frontmatter，
// 但那些文件带 BOM，`/^---/` 匹配不上，于是它自己也退回了目录名 slug。
// 这里按它本来的意图把标题和日期读出来：标题照抄作者写的 title，顺序照抄 date。
function localizeSubmissions(items, roots) {
  const readFm = (file) => {
    let t = "";
    try { t = read(file).replace(/^\uFEFF/, ""); } catch { return null; }
    const m = t.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!m) return null;
    const pick = (k) => (m[1].match(new RegExp("^" + k + ":\\s*(.+)$", "m")) || [])[1]?.trim().replace(/^[\x27\x22]|[\x27\x22]$/g, "") || "";
    return { title: pick("title"), date: pick("date") };
  };
  const cache = new Map();
  const lookup = (slug) => {
    if (cache.has(slug)) return cache.get(slug);
    let hit = null;
    for (const root of roots) {
      if (!exists(root)) continue;
      for (const f of findFiles(root, (n) => n === "index.md", 5)) {
        if (!new RegExp("/cases/submissions/" + slug + "/index\\.md$").test(f.split(path.sep).join("/"))) continue;
        hit = readFm(f);
        break;
      }
      if (hit) break;
    }
    cache.set(slug, hit);
    return hit;
  };
  const walk = (list) => {
    for (const it of list || []) {
      if (it.items && it.items.length) {
        walk(it.items);
        // 上游按 frontmatter 的 date 升序排投稿，这里照排。
        const dated = it.items.filter((x) => x.date);
        if (dated.length >= 2) {
          it.items.sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
        }
        continue;
      }
      if (!/^[a-z0-9][a-z0-9-]*$/.test(it.text || "")) continue;
      const fm = lookup(it.text);
      if (fm && fm.title) { it.text = fm.title; it.date = fm.date || ""; }
    }
  };
  walk(items);
  return items;
}
// 导航条目只有路径、没有标题时（Docusaurus 的 sidebars.js 就只写 doc id），
// 用页面自己的 H1 补上 —— 那是上游作者给这一页定的名字，不是我们编的。
function fillLeafTitles(items, srcDir) {
  const cache = new Map();
  const h1Of = (rel) => {
    if (cache.has(rel)) return cache.get(rel);
    let t = "";
    try { t = read(path.join(srcDir, ...rel.split("/"))).replace(/^\uFEFF/, ""); } catch {}
    const m = t.replace(/^---\s*\n[\s\S]*?\n---/, "").match(/^#\s+(.+)$/m);
    const v = m ? cleanText(m[1]) : "";
    cache.set(rel, v);
    return v;
  };
  const walk = (list) => {
    for (const it of list || []) {
      if (it.items && it.items.length) { walk(it.items); continue; }
      if (it.text || !it.route) continue;
      it.text = h1Of(it.route) || cleanText(path.posix.basename(it.route).replace(/\.mdx?$/i, "").replace(/[-_]/g, " "));
    }
  };
  walk(items);
  return items;
}
// ---------- 主流程 ----------
const S = path.sep;
const jobs = [];
for (const s of catalog.sources) {
  if (onlyArg && s.id !== onlyArg) continue;
  const src = sourceDir(s);
  if (!exists(src)) continue;
  jobs.push(s);
}

const result = {};
const report = [];
for (const s of jobs) {
  const src = sourceDir(s);
  const snap = snapshotDir(s);
  const found = [];
  const push = (label, fn) => found.push({ label, fn });

  // 1) VitePress / VuePress / Docusaurus 的侧栏配置
  const tsSidebars = findFiles(src, (n) => /^(sidebar|sidebars)\.(ts|js|mts|mjs)$/i.test(n), 5);
  const vitepress = tsSidebars.filter((f) => /[\\/]\.vitepress[\\/]/i.test(f));
  const vuepress = tsSidebars.filter((f) => /[\\/]\.vuepress[\\/]/i.test(f));
  const docusaurus = tsSidebars.filter((f) => /[\\/]sidebars\.(js|ts)$/i.test(f) && !/[\\/]\.(vitepress|vuepress)[\\/]/i.test(f));
  // 2) mkdocs
  const mkdocs = findFiles(src, (n) => /^mkdocs\.(yml|yaml)$/i.test(n), 2);
  // 3) mdBook
  const summaries = findFiles(src, (n) => /^SUMMARY\.md$/i.test(n), 5)
    .filter((f) => !/[\\/]Part\d+_[^\\/]+[\\/][^\\/]+[\\/]SUMMARY\.md$/i.test(f));
  // 4) docsify
  const docsify = findFiles(src, (n) => /^_sidebar\.md$/i.test(n), 4);

  push("vitepress", async () => {
    const out = [];
    for (const f of vitepress) {
      const mod = await runConfigModule(f);
      if (!mod) continue;
      const seen = new Set();
      const take = (val) => {
        if (!Array.isArray(val) || seen.has(val)) return;
        seen.add(val);
        out.push(...normVitePressItems(val));
      };
      for (const v of Object.values(mod)) {
        if (!v || typeof v !== "object") continue;
        if (Array.isArray(v)) take(v);
        else for (const val of Object.values(v)) take(val);
      }
    }
    return out.length ? { items: out, base: "" } : null;
  });

  push("vuepress", async () => {
    const out = [];
    const seen = new Set();
    for (const f of vuepress) {
      const mod = await runConfigModule(f);
      if (!mod) continue;
      const cfg = mod.default || mod;
      if (!cfg || typeof cfg !== "object" || Array.isArray(cfg)) continue;
      for (const [prefix, val] of Object.entries(cfg)) {
        if (!Array.isArray(val) || seen.has(val)) continue;
        seen.add(val);
        const items = normVuePressItems(val, prefix, "");
        if (items.length) out.push(...items);
      }
    }
    return out.length ? { items: out, base: "" } : null;
  });

  push("docusaurus", async () => {
    const out = [];
    for (const f of docusaurus) {
      const mod = await runConfigModule(f).catch(() => null);
      const cfg = mod && (mod.default || mod);
      if (!cfg || typeof cfg !== "object") continue;
      for (const val of Object.values(cfg)) out.push(...normDocusaurusItems(Array.isArray(val) ? val : [val]));
    }
    return out.length ? { items: out, base: "docs" } : null;
  });

  push("mkdocs", () => {
    for (const f of mkdocs) {
      const r = fromMkdocsNav(f, src);
      if (r && r.items.length) return { items: r.items, base: r.base };
    }
    return null;
  });

  push("mdbook", () => {
    for (const f of summaries) {
      const r = fromMdBookSummary(f, src);
      if (r && r.items.length) return { items: r.items, base: "" };
    }
    return null;
  });

  push("docsify", () => {
    const prefer = ["_sidebar.md"];
    for (const f of docsify.sort((a, b) => prefer.indexOf(path.basename(a)) - prefer.indexOf(path.basename(b)) || a.length - b.length)) {
      const r = fromDocsifySidebar(f, src);
      if (r && r.items.length > 1) return { items: r.items, base: "" };
    }
    // docsify 的侧栏经常只有一两行占位，交给目录结构兜底
    for (const f of docsify) {
      const r = fromDocsifySidebar(f, src);
      if (r && r.items.length) return { items: r.items, base: "" };
    }
    return null;
  });

  const plan = planOf(s);
  const siteJson = findFiles(snap, (n) => /^site-content\.json$/i.test(n), 2);
  if (siteJson.length && plan.dir) {
    push("site-content", () => fromSiteContentJson(siteJson[0], sourceDir(s)));
  }

  let indexKind = "";
  push("index", () => {
    const r = buildIndexNav(src);
    if (!r) return null;
    indexKind = r.label;
    return { items: r.items, base: "" };
  });

  let picked = null;
  for (const f of found) {
    let r = null;
    try { r = await f.fn(); } catch (e) { console.log(`     ! ${s.id} / ${f.label}: ${e.message}`); }
    if (r && r.items && r.items.length) {
      const items = finalize(r.items, r.base);
      repairRoutes(items, src, PAGE_SETS.get(s.id));
      fillLeafTitles(items, src);
      localizeSubmissions(items, [src, snap].filter((x, i, a) => a.indexOf(x) === i));
      const microsoftNav = microsoftAgentsReadmeNav(src, PAGE_SETS.get(s.id));
      if (microsoftNav) {
        picked = { label: "readme-course-table", items: microsoftNav };
        break;
      }
      if (countNav(items) >= 6) { picked = { label: f.label, items }; break; }
    }
  }
  if (!picked) {
    const fallback = courseTreeNav(src, PAGE_SETS.get(s.id));
    if (fallback) {
      fillLeafTitles(fallback, src);
      result[s.id] = fallback;
      report.push([s.id, "tree-order", countNav(fallback)]);
      continue;
    }
    continue;
  }
  result[s.id] = picked.items;
  report.push([s.id, picked.label + (indexKind ? `:${indexKind}` : ""), countNav(picked.items)]);
}

fs.writeFileSync(OUT, JSON.stringify(result, null, 1));
console.log(`上游导航照搬：${report.length} 门课 → ${path.relative(ROOT, OUT)}`);
for (const [id, label, n] of report) console.log(`  ${label.padEnd(12)} ${String(n).padStart(4)} 项  ${id}`);
