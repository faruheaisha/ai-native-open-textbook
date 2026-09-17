// 上游「目录索引」解析：官方文档站点的 llms.txt、仓库自带的 nav.yml / navigation.json、
// 生成型课程的目录数据（site/data.js、volumes.json）、以及仓库 README 里自己列的章节链接。
// 目标只有一个：标题与顺序照抄上游，不自己编。
import fs from "node:fs";
import path from "node:path";

const read = (p) => { try { return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""); } catch { return ""; } };
const clean = (t) => String(t == null ? "" : t).replace(/<[^>]+>/g, "").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
const toPosix = (p) => p.split(path.sep).join("/");
const SKIP_DIRS = new Set(["node_modules", ".git", ".vitepress", ".vuepress", "dist", "build", ".next"]);

export function makeFileIndex(srcDir, depth = 9) {
  const files = [];
  (function walk(dir, d) {
    if (d < 0) return;
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), d - 1);
        continue;
      }
      if (!/\.mdx?$/i.test(e.name)) continue;
      files.push(toPosix(path.relative(srcDir, path.join(dir, e.name))));
    }
  })(srcDir, depth);
  const set = new Set(files);
  const tails = new Map();
  for (const f of files) {
    const segs = f.split("/");
    const maxK = Math.min(4, segs.length);
    for (let k = 1; k <= maxK; k += 1) {
      const key = segs.slice(segs.length - k).join("/");
      if (!tails.has(key)) tails.set(key, []);
      tails.get(key).push(f);
    }
  }
  return { files, set, tails };
}

const isIndexName = (f) => /(^|\/)(index|README|readme)\.mdx?$/.test(f);

export function resolveToFile(idx, rawPath, baseDir = "") {
  let p = String(rawPath || "").trim();
  if (!p || /^[a-z][a-z0-9+.-]*:\/\//i.test(p) || p.startsWith("#") || p.startsWith("mailto:")) return null;
  p = p.replace(/[?#].*$/, "");
  try { p = decodeURIComponent(p); } catch {}
  p = p.replace(/^\.\//, "");
  const rooted = p.startsWith("/");
  const norm = path.posix.normalize(path.posix.join(rooted ? "" : baseDir, p.replace(/^\/+/, "")));
  const cands = [norm, norm.replace(/\.md$/i, ".mdx"), norm.replace(/\.mdx$/i, ".md"), norm + ".md", norm + "/index.md", norm + "/README.md"];
  for (const c of cands) {
    if (idx.set.has(c)) return c;
    const key = c.replace(/\/+$/, "");
    if (idx.set.has(key + "/index.md")) return key + "/index.md";
    if (idx.set.has(key + "/README.md")) return key + "/README.md";
  }
  const segs = norm.split("/").filter(Boolean);
  for (let k = Math.min(4, segs.length); k >= 1; k -= 1) {
    const tailRaw = segs.slice(segs.length - k).join("/");
    const tries = [tailRaw, tailRaw.replace(/\.mdx?$/i, ".md"), tailRaw.replace(/\.md$/i, ".mdx")];
    for (const t of tries) {
      const hits = idx.tails.get(t);
      if (hits && hits.length) {
        const sorted = [...hits].sort((a, b) => a.split("/").length - b.split("/").length || a.length - b.length);
        return sorted.find(isIndexName) || sorted[0];
      }
    }
  }
  // 语言目录换了名字：上游索引写 docs/en/xxx，快照里只有 docs/zh/xxx。
  // 站点只镜像了其中一种语言时，按同义语言码再试一次。
  const LOCALE_SWAP = ["zh", "zh-cn", "zh-hans", "zh-hant", "zh-tw", "en", "en-us", "ja", "ko", "fr", "de", "es", "pt", "ru", "ar", "hi", "id"];
  const segsLow = norm.split("/").map((x) => x.toLowerCase());
  const swapped = segsLow.filter((s) => LOCALE_SWAP.includes(s));
  for (const from of swapped) {
    for (const to of LOCALE_SWAP) {
      if (to === from) continue;
      const cand = norm.replace(new RegExp("/" + from + "/", "i"), "/" + to + "/");
      if (cand === norm) continue;
      const hit = idx.set.has(cand) ? cand : (idx.set.has(cand + "/index.md") ? cand + "/index.md" : null);
      if (hit) return hit;
      for (let k = Math.min(4, cand.split("/").length); k >= 1; k -= 1) {
        const tail = cand.split("/").slice(-k).join("/");
        const hits = idx.tails.get(tail);
        if (hits && hits.length) {
          const sorted = [...hits].sort((a, b) => a.split("/").length - b.split("/").length);
          return sorted.find(isIndexName) || sorted[0];
        }
      }
    }
  }

  // 目录式：上游只给目录（章节文件夹），取该目录下的正文页
  const dirPrefix = norm.replace(/\/+$/, "") + "/";
  const inside = idx.files.filter((x) => x.startsWith(dirPrefix));
  if (inside.length) {
    const sorted = inside.sort((a, b) => a.split("/").length - b.split("/").length || a.length - b.length);
    return sorted.find(isIndexName) || sorted.find((x) => !/\/code\//.test(x)) || sorted[0];
  }
  return null;
}

function splitByFrequentPrefix(leaves) {
  const freq = new Map();
  for (const l of leaves) {
    const segs = String(l.text).split("/").map((s) => s.trim());
    for (let i = 1; i < segs.length; i += 1) {
      const pre = segs.slice(0, i).join("/");
      if (pre.length > 24) continue;
      freq.set(pre, (freq.get(pre) || 0) + 1);
    }
  }
  return leaves.map((l) => {
    const segs = String(l.text).split("/").map((s) => s.trim()).filter(Boolean);
    if (segs.length < 2) return l;
    let cut = 0;
    for (let i = 1; i < segs.length; i += 1) {
      const pre = segs.slice(0, i).join("/");
      if ((freq.get(pre) || 0) >= 3) cut = i;
    }
    if (!cut) return l;
    return { ...l, groups: segs.slice(0, cut), text: segs.slice(cut).join("/") };
  });
}

function treeFromFlat(flat) {
  const root = [];
  const stack = [{ depth: -1, items: root }];
  for (const it of flat) {
    const depth = it.depth == null ? 0 : it.depth;
    while (stack.length > 1 && stack[stack.length - 1].depth >= depth) stack.pop();
    const parent = stack[stack.length - 1].items;
    if (it.route) { parent.push({ text: it.text, route: it.route }); continue; }
    const node = { text: it.text, items: [] };
    parent.push(node);
    stack.push({ depth, items: node.items });
  }
  const prune = (list) => list.filter((n) => { if (n.items) n.items = prune(n.items); return n.route || (n.items && n.items.length); });
  return prune(root);
}

function mergeGrouped(flat) {
  const root = [];
  const cache = new Map();
  for (const it of flat) {
    let bucket = root;
    let keyPath = "";
    for (const g of it.groups || []) {
      keyPath += "/" + g;
      let node = cache.get(keyPath);
      if (!node) { node = { text: g, items: [] }; bucket.push(node); cache.set(keyPath, node); }
      bucket = node.items;
    }
    bucket.push({ text: it.text, route: it.route });
  }
  return root;
}

function findLlmsFiles(srcDir) {
  const out = [];
  (function walk(dir, d) {
    if (d < 0 || out.length > 40) return;
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), d - 1); continue; }
      if (/^_?llms(-full)?\.txt$/i.test(e.name)) out.push(path.join(dir, e.name));
    }
  })(srcDir, 4);
  out.sort((a, b) => (/full/i.test(a) ? 1 : 0) - (/full/i.test(b) ? 1 : 0));
  return out;
}

export function fromLlmsTxt(srcDir, idx = makeFileIndex(srcDir)) {
  for (const file of findLlmsFiles(srcDir)) {
    const txt = read(file);
    if (!txt) continue;
    const flat = [];
    const leaves = [];
    for (const raw of txt.split(/\r?\n/)) {
      const line = raw.trimEnd();
      const h = line.match(/^(#{2,4})\s+(.*\S)\s*$/);
      if (h) { flat.push({ text: clean(h[2]), depth: h[1].length - 2, route: null }); continue; }
      const m = line.match(/^\s*[-*+]\s+\[([^\]]+)\]\(([^)\s]+)\)/);
      if (!m) continue;
      const url = m[2];
      if (!/\.mdx?$/i.test(url.replace(/[?#].*$/, ""))) continue;
      const label = clean(m[1]);
      if (!label) continue;
      flat.push({ text: label, depth: 2, route: "PENDING" });
      leaves.push(label);
    }
    if (leaves.length < 6) continue;
    const cooked = splitByFrequentPrefix(flat.filter((x) => x.route === "PENDING").map((x) => ({ text: x.text })));
    let li = 0;
    const keep = [];
    for (const it of flat) {
      if (it.route !== "PENDING") { keep.push(it); continue; }
      const c = cooked[li]; li += 1;
      const url = (flat.filter((x) => x.route === "PENDING")[li - 1] || {}).text;
      keep.push({ ...it, text: c.text, groups: c.groups, href: url });
    }
    // 第二遍：真正解析 url（保留原始 url 列表）
    const urls = [...txt.matchAll(/^\s*[-*+]\s+\[([^\]]+)\]\(([^)\s]+)\)/gm)].map((m) => m[2]).filter((u) => /\.mdx?$/i.test(u.replace(/[?#].*$/, "")));
    let hit = 0;
    let ui = 0;
    const items = [];
    for (const it of keep) {
      if (it.route !== "PENDING") { items.push(it); continue; }
      const u = urls[ui]; ui += 1;
      const f = resolveToFile(idx, urlToPath(u));
      if (!f) continue;
      hit += 1;
      items.push({ text: it.text, depth: it.depth, route: f, groups: it.groups });
    }
    if (hit < 6) continue;
    const grouped = items.some((x) => x.groups);
    const tree = grouped ? mergeGrouped(items) : treeFromFlat(items);
    if (tree.length) return { items: tree, base: "" };
  }
  return null;
}

export function fromJsonNavigation(srcDir, idx = makeFileIndex(srcDir)) {
  const cands = [];
  (function walk(dir, d) {
    if (d < 0) return;
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), d - 1); continue; }
      if (/^(navigation|nav)\.json$/i.test(e.name)) cands.push(path.join(dir, e.name));
    }
  })(srcDir, 4);
  for (const file of cands) {
    let j = null;
    try { j = JSON.parse(read(file)); } catch { continue; }
    const groups = j.groups || j.nav || j.navigation;
    if (!Array.isArray(groups)) continue;
    const items = [];
    for (const g of groups) {
      const kids = [];
      for (const it of g.items || []) {
        const p = it.source_path || it.sourcePath || it.path || it.file || it.url;
        const f = p ? resolveToFile(idx, String(p).replace(/[?#].*$/, "")) : null;
        const node = { text: clean(it.title || it.label || it.name || ""), route: f || undefined };
        if (!node.text && !node.route) continue;
        if (!kids.some((k) => k.route === node.route && k.text === node.text)) kids.push(node);
      }
      if (kids.length) items.push({ text: clean(g.title || g.label || g.name || ""), items: kids });
    }
    if (items.length) return { items, base: "" };
  }
  return null;
}

function urlToPath(u) {
  const s = String(u || "");
  const m = s.match(/^[a-z][a-z0-9+.-]*:\/\/[^/]+(\/.*)?$/i);
  if (!m) return s;
  let p = m[1] || "/";
  try { p = decodeURIComponent(p); } catch {}
  return p;
}

const unquote = (s) => String(s).replace(/^["\u201c\u2018]|["\u201d\u2019]$/g, "").replace(/\s+#.*$/, "").trim();

export function parseSimpleYaml(text) {
  const lines = text.replace(/\t/g, "  ").split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, node: root, key: null }];
  for (const raw of lines) {
    if (!raw.trim() || /^\s*#/.test(raw)) continue;
    const indent = raw.match(/^ */)[0].length;
    const line = raw.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const top = stack[stack.length - 1];
    const li = line.match(/^-\s*(.*)$/);
    if (li) {
      if (!Array.isArray(top.node[top.key])) top.node[top.key] = [];
      const val = li[1].trim();
      if (!val) {
        const obj = {};
        top.node[top.key].push(obj);
        stack.push({ indent, node: obj, key: null });
        continue;
      }
      const kv = val.match(/^([A-Za-z0-9_\u4e00-\u9fa5-]+):\s*(.*)$/);
      if (kv) {
        const obj = { [kv[1]]: unquote(kv[2]) };
        top.node[top.key].push(obj);
        stack.push({ indent, node: obj, key: null });
      } else {
        top.node[top.key].push(unquote(val));
      }
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_\u4e00-\u9fa5-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const val = kv[2].trim();
    if (!val) { stack.push({ indent, node: top.node, key }); continue; }
    top.node[key] = unquote(val);
  }
  return root;
}

export function fromYamlNav(srcDir, idx = makeFileIndex(srcDir)) {
  const cands = [];
  (function walk(dir, d) {
    if (d < 0) return;
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), d - 1); continue; }
      if (/(^|_)(nav|navigation|toc|menu)\.ya?ml$/i.test(e.name)) cands.push(path.join(dir, e.name));
    }
  })(srcDir, 4);
  for (const file of cands) {
    const y = parseSimpleYaml(read(file));
    const groups = y.modules || y.sections || y.nav || y.items;
    if (!Array.isArray(groups) || !groups.length) continue;
    const items = [];
    for (const g of groups) {
      if (!g || typeof g !== "object") continue;
      const gTitle = clean(g.title || g.name || g.short_title || "");
      const gSlug = g.slug || g.path || "";
      const kids = [];
      const arts = g.articles || g.items || g.pages || g.lessons || [];
      for (const a of Array.isArray(arts) ? arts : []) {
        if (!a || typeof a !== "object") continue;
        const t = clean(a.title || a.name || "");
        const slug = a.slug || a.path || a.file || "";
        const rel = gSlug && slug ? `${gSlug}/${slug}` : (slug || gSlug);
        const f = rel ? resolveToFile(idx, rel, "") : null;
        if (f) kids.push({ text: t || clean(slug), route: f });
      }
      if (kids.length) items.push({ text: gTitle || clean(gSlug), items: kids });
      else if (gSlug) {
        const f = resolveToFile(idx, gSlug, "");
        if (f) items.push({ text: gTitle || clean(gSlug), route: f });
      }
    }
    const total = items.reduce((n, x) => n + 1 + (x.items ? x.items.length : 0), 0);
    if (total >= 6) return { items, base: "" };
  }
  return null;
}

export function fromGeneratedCatalog(srcDir, idx = makeFileIndex(srcDir)) {
  const dataFiles = [];
  (function walk(dir, d) {
    if (d < 0) return;
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), d - 1); continue; }
      if (!/^data\.js$/i.test(e.name)) continue;
      try { if (fs.statSync(path.join(dir, e.name)).size > 20000) dataFiles.push(path.join(dir, e.name)); } catch {}
    }
  })(srcDir, 3);
  for (const file of dataFiles) {
    const txt = read(file);
    const m = txt.match(/const PHASES = (\[[\s\S]*?\n\]);/);
    if (!m) continue;
    let phases = null;
    try { phases = JSON.parse(m[1]); } catch { continue; }
    if (!Array.isArray(phases) || !phases.length) continue;
    const items = [];
    for (const p of phases) {
      const kids = [];
      for (const l of p.lessons || []) {
        const t = clean(l.name || l.title || "");
        const u = String(l.url || "");
        const mm = u.match(/(phases\/[^"'#\s]+\/?)/);
        const rel = mm ? mm[1].replace(/\/+$/, "") : "";
        const f = rel ? resolveToFile(idx, rel) : null;
        if (f) kids.push({ text: t || clean(rel), route: f });
      }
      if (kids.length) items.push({ text: clean(p.name || p.title || ""), items: kids });
    }
    if (items.length) return { items, base: "" };
  }
  return null;
}

export function fromReadmeIndex(srcDir, idx = makeFileIndex(srcDir)) {
  // 根目录与一级子目录（zh/README.md、docs/README.md 这些上游自己的入口页也算）
  const cands = idx.files.filter((f) => {
    const segs = f.split("/");
    if (segs.length > 2) return false;
    return /^readme([._-][a-z]{2}(-[A-Z]{2})?)?\.mdx?$/i.test(segs[segs.length - 1]);
  });
  const ordered = [...cands.filter((f) => /zh|cn/i.test(f)), ...cands.filter((f) => !/zh|cn/i.test(f))];
  let best = null;
  for (const rel of ordered) {
    const dir = path.posix.dirname(rel) === "." ? "" : path.posix.dirname(rel);
    const txt = read(path.join(srcDir, ...rel.split("/")));
    if (!txt) continue;
    const flat = [];
    const hstack = [];
    const seen = new Set();
    let matched = 0;
    for (const raw of txt.split(/\r?\n/)) {
      const h = raw.match(/^(#{2,4})\s+(.*\S)\s*$/);
      if (h) { hstack.length = h[1].length - 2; hstack[h[1].length - 2] = clean(h[2]); continue; }
      // README 目录常用“章节目录/”而非显式 .md 文件；resolveToFile 会把目录
      // 解析到其 README/index。外链和图片仍会被 resolveToFile 忽略。
      const m = raw.match(/(?<!!)\[([^\]\n]{1,80})\]\(([^)\s]+)(#[^)]*)?\)/);
      if (!m) continue;
      const f = resolveToFile(idx, m[2], dir);
      if (!f || seen.has(f)) continue;
      seen.add(f);
      matched += 1;
      const depth = hstack.filter(Boolean).length || 0;
      for (let i = 0; i < depth; i += 1) {
        if (hstack[i] && !flat.some((x) => x.text === hstack[i] && x.depth === i && !x.route)) flat.push({ text: hstack[i], depth: i, route: null });
      }
      flat.push({ text: clean(m[1]), depth, route: f });
    }
    if (matched >= 3 && (!best || matched > best.matched)) best = { rel, matched, items: treeFromFlat(flat) };
  }
  return best ? { items: best.items, base: "" } : null;
}

export function buildIndexNav(srcDir) {
  const idx = makeFileIndex(srcDir);
  const tries = [
    ["generated", () => fromGeneratedCatalog(srcDir, idx)],
    ["json-nav", () => fromJsonNavigation(srcDir, idx)],
    ["yaml-nav", () => fromYamlNav(srcDir, idx)],
    ["llms", () => fromLlmsTxt(srcDir, idx)],
    ["readme", () => fromReadmeIndex(srcDir, idx)],
  ];
  for (const [label, fn] of tries) {
    let r = null;
    try { r = fn(); } catch (e) { r = null; }
    if (r && r.items && r.items.length) return { label, ...r };
  }
  return null;
}
