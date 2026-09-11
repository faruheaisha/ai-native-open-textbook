#!/usr/bin/env node
// 生成《课程编排总目录》。
//
// 定位：本脚本只做「编排」——分类、排序、许可分级、语言判定、课时结构识别。
// 它不写课程内容、不改上游文本、不做摘要。所有正文一律来自 upstream/ 的原始快照。
//
// 真源：
//   机器索引  upstream/_快照索引.json      （每条来源的 repo / commit / license）
//   人工台账  upstream/<卷>/上游资源台账.md （中文标题、语言、规模等登记）
//   磁盘快照  upstream/<卷>/<目录>/        （课时结构、入口文档、文件统计、正文语言）
//
// 产物：
//   catalog/catalog.json        —— 站点构建用的机器目录
//   catalog/课程编排总目录.md    —— 供人工复核的分类总表

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM = path.join(ROOT, "upstream");
const OUT_DIR = path.join(ROOT, "catalog");
const INDEX = path.join(UPSTREAM, "_快照索引.json");

const VOLUMES = [
  { id: "01-foundations", order: 1, name: "AI 基础与模型认知" },
  { id: "04-work", order: 2, name: "办公与知识工作" },
  { id: "07-coding", order: 3, name: "AI 编程与 Vibe Coding" },
  { id: "08-agents", order: 4, name: "智能体工程" },
  { id: "09-harness", order: 5, name: "Harness 与编码 Agent" },
  { id: "10-context-memory", order: 6, name: "上下文、记忆与技能" },
  { id: "11-personal-agents", order: 7, name: "个人智能体" },
  { id: "13-local-ai", order: 8, name: "本地与端侧 AI" },
];

// 站内阅读顺序：先能跟着学的，再查的，最后是仓库与清单。
const KIND_ORDER = ["系统课程", "课时教程", "工程手册", "实践案例集", "源码研读", "官方文档", "官方博客", "官方资料集", "技能与配置库", "清单与速查", "产品仓库", "其他材料"];

const LICENSE_RULES = [
  { cls: "cite-only", test: (s) => /未声明|站点条款|官方文档|官方博客/.test(s), label: "仅引用", note: "不可整篇转载，站内只做导航与引用" },
  { cls: "conditional", test: (s) => /NC/i.test(s), label: "限非商用", note: "可翻译转载，限非商用并按原许可相同方式共享" },
  { cls: "republish", test: () => true, label: "可转载", note: "可转载可翻译，须保留署名与许可声明" },
];

function licenseClass(lic) {
  return LICENSE_RULES.find((r) => r.test(String(lic || "")));
}

// 判定顺序即优先级：先认官方站点身份，再认课程形态，最后才落到仓库与清单。
// 规则同时测试本地目录名与仓库名，两条都不中才算未定——注意锚定式正则（如 -lab$）
// 在拼接字符串上会失效，所以这里分开测。
const KIND_RULES = [
  { kind: "官方文档", test: (t) => t(/-official-docs|official-help|docs-official|platform-docs|api-docs|api-reference|developer-docs|docs-en|-docs$/) },
  { kind: "官方博客", test: (t) => t(/-blog|blog$/) },
  { kind: "技能与配置库", test: (t) => t(/(^|-)skills?$|-skills-|skills-archive|superpowers|agent-skill/) },
  { kind: "官方资料集", test: (t) => t(/cookbook|recipes|-examples$/) },
  { kind: "实践案例集", test: (t) => t(/bluebook|usecases|in-action|showcase|case/) },
  { kind: "源码研读", test: (t) => t(/from-scratch|build-your-own|how-.*-works|system-prompts|coze-studio|coze-loop/) },
  { kind: "系统课程", test: (t) => t(/for-beginners|-course|course-|-courses$|agents-course|mcp-course|context-course|cs146|fastcampus|-lab$|coach|ed-donner|agentic-ai|vibe-coding-101/) },
  { kind: "课时教程", test: (t) => t(/^learn-|^hello-|^easy-vibe|^vibe-vibe|^ai-agents-from-zero|^zero2agent|^baby-|^how-to-use-|^fufan-|^vibefast|^vibe-coding|^ai-coding|^datawhale/) },
  { kind: "工程手册", test: (t) => t(/handbook|harness|howto|how-to|-guide|guide$|best-practice|engineering-from-cc|agentic-engineering|-book$|context-engineering|claude-code-everything|codex-orange/) },
  { kind: "清单与速查", test: (t) => t(/^awesome-|-awesome-|-zh$|-101-|wonderful-prompts/) },
  { kind: "产品仓库", test: (t) => t(/studio|cli$|-cli$|kit$|bench$|proxy|-sdk$|vibesdk|agents-python|deepagents|grok-build|pocket-manus/) },
];

function detectKind(ctx) {
  const t = (re) => re.test(ctx.local) || re.test(ctx.repo || "");
  for (const r of KIND_RULES) if (r.test(t)) return r.kind;
  return "其他材料";
}

function cjkRatio(text) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  const total = cjk + latin;
  return total === 0 ? 0 : cjk / total;
}

// 语言判定看正文本体，不只看 README：优先取课时目录里的文档。
function detectLang(dir, entry) {
  const skip = new Set([".git", "node_modules", ".github", ".vscode", ".devcontainer", "translations", "translated_images", "images", "img", "assets"]);
  const deep = [];
  const shallow = [];
  const stack = [[dir, 0]];
  while (stack.length && deep.length + shallow.length < 60) {
    const [cur, depth] = stack.shift();
    let entries = [];
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) {
        if (!skip.has(e.name)) stack.push([full, depth + 1]);
        continue;
      }
      if (!/\.(md|mdx)$/i.test(e.name)) continue;
      if (depth === 0) shallow.push(full);
      else deep.push(full);
    }
  }
  const pick = deep.length >= 6 ? deep.slice(0, 12) : deep.concat(shallow).slice(0, 12);
  let text = "";
  for (const f of pick) {
    try {
      text += fs.readFileSync(f, "utf8").slice(0, 5000) + "\n";
    } catch {
      /* ignore */
    }
  }
  const r = cjkRatio(text);
  if (r >= 0.25) return { lang: "中文", ratio: Number(r.toFixed(3)) };
  if (r <= 0.04) return { lang: "英文", ratio: Number(r.toFixed(3)) };
  return { lang: "中英混排", ratio: Number(r.toFixed(3)) };
}

function cleanHeading(raw) {
  const t = raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*`_>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!t || t.length < 4 || t.length > 110) return null;
  if (/^(docs?|readme|index|contents?|table of contents|overview|简介|目录|文档|说明)$/i.test(t)) return null;
  if (/https?:\/\//.test(raw)) return null;
  if (/^(or|and|see|note|usage|install(ation)?)\b[:,]/i.test(t)) return null;
  if (/\b(has moved|moved to|deprecated|archived)\b/i.test(t)) return null;
  return t;
}

// 标题只用来源自己的说法：先取台账登记名，再取 README 里第一个像标题的行。
function firstHeading(file) {
  try {
    const text = fs.readFileSync(file, "utf8").slice(0, 8000);
    const heads = [];
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s{0,3}#\s+(.+?)\s*$/);
      if (m) heads.push(m[1]);
      if (heads.length >= 8) break;
    }
    for (const raw of heads) {
      const t = cleanHeading(raw);
      if (t) return t;
    }
    return null;
  } catch {
    return null;
  }
}

function detectTitle(dir, ledgerTitle, repo, local) {
  if (ledgerTitle && !/[\/\\]/.test(ledgerTitle)) return ledgerTitle;
  for (const c of ["README.md", "readme.md", "README.MD", "index.md", "docs/README.md"]) {
    const h = firstHeading(path.join(dir, c));
    if (h && h.length <= 120) return h;
  }
  return repo || local;
}

function detectEntry(dir) {
  for (const c of ["README.md", "readme.md", "README.MD", "index.md", "docs/README.md", "_快照信息.md", "llms.txt", "llms-full.txt"]) {
    if (fs.existsSync(path.join(dir, c))) return c;
  }
  return null;
}

function walk(dir) {
  let files = 0;
  let md = 0;
  let bytes = 0;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) {
        if (e.name !== ".git" && e.name !== "node_modules") stack.push(full);
      } else if (e.isFile()) {
        files += 1;
        if (/\.(md|mdx)$/i.test(e.name)) md += 1;
        try {
          bytes += fs.statSync(full).size;
        } catch {
          /* ignore */
        }
      }
    }
  }
  return { files, md, bytes };
}

function detectLessons(dir) {
  let dirs = [];
  try {
    dirs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules").map((e) => e.name);
  } catch {
    return { scheme: "single", items: [] };
  }
  const sorted = (re) => dirs.filter((n) => re.test(n)).sort();
  const clean = (n) => n.replace(/^\d+[-_]?/, "").replace(/^s\d+_/, "").replace(/[-_]+/g, " ").trim();
  const numbered = sorted(/^\d\d[-_]/);
  if (numbered.length >= 3) return { scheme: "numbered", items: numbered.map((n) => ({ dir: n, title: clean(n) })) };
  const steps = sorted(/^s\d\d_/);
  if (steps.length >= 3) return { scheme: "steps", items: steps.map((n) => ({ dir: n, title: clean(n) })) };
  return { scheme: "documents", items: dirs.filter((n) => !/^\./.test(n)).map((n) => ({ dir: n, title: clean(n) })) };
}

function parseLedger(volumeId) {
  const file = path.join(UPSTREAM, volumeId, "上游资源台账.md");
  const map = new Map();
  if (!fs.existsSync(file)) return map;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length < 4) continue;
    const local = cells[2].replace(/`/g, "").replace(/\/$/, "");
    if (!local || /[^\w.-]/.test(local)) continue;
    if (map.has(local)) continue;
    map.set(local, { title: cells[1].replace(/`/g, "").trim(), rest: cells.slice(3).join(" | ") });
  }
  return map;
}

const index = JSON.parse(fs.readFileSync(INDEX, "utf8"));
const ledgers = new Map(VOLUMES.map((v) => [v.id, parseLedger(v.id)]));
const orderOfVolume = new Map(VOLUMES.map((v) => [v.id, v.order]));

const sources = [];
for (const e of index.entries) {
  const volumeId = e.volume;
  const local = e.dir.split("/").pop();
  const dir = path.join(UPSTREAM, ...e.dir.split("/"));
  const ledger = ledgers.get(volumeId)?.get(local) || null;
  const stats = walk(dir);
  const lessons = detectLessons(dir);
  const lc = licenseClass(e.license);
  const entry = detectEntry(dir);
  const { lang, ratio } = detectLang(dir, entry);
  sources.push({
    id: `${volumeId}/${local}`,
    volume: volumeId,
    volumeOrder: orderOfVolume.get(volumeId) ?? 99,
    local,
    dir: e.dir.replace(/\\/g, "/"),
    title: detectTitle(dir, ledger?.title, e.repo, local),
    repo: e.repo || null,
    site: e.site || null,
    commit: e.commit || null,
    license: e.license || null,
    licenseClass: lc.cls,
    licenseLabel: lc.label,
    licenseNote: lc.note,
    kind: detectKind({ local, repo: e.repo || "" }),
    lang,
    langRatio: ratio,
    entry,
    lessons: lessons.items.length,
    lessonScheme: lessons.scheme,
    lessonList: lessons.items.slice(0, 60),
    files: stats.files,
    md: stats.md,
    bytes: stats.bytes,
    needsTranslation: lang !== "中文",
    publishable: lc.cls !== "cite-only",
  });
}

const kindWeight = (k) => {
  const i = KIND_ORDER.indexOf(k);
  return i === -1 ? KIND_ORDER.length : i;
};
sources.sort((a, b) => a.volumeOrder - b.volumeOrder || kindWeight(a.kind) - kindWeight(b.kind) || b.md - a.md || a.local.localeCompare(b.local));

fs.mkdirSync(OUT_DIR, { recursive: true });
const count = (fn) => sources.filter(fn).length;
const catalog = {
  schema: "textbook-catalog/v1",
  generatedAt: new Date().toISOString().slice(0, 10),
  sourceIndexGeneratedAt: index.generated_at,
  note: "本目录只做编排，不含课程正文；正文一律引用 upstream/ 原始快照。",
  kindOrder: KIND_ORDER,
  volumes: VOLUMES,
  totals: {
    sources: sources.length,
    publishable: count((s) => s.publishable),
    citeOnly: count((s) => !s.publishable),
    needTranslation: count((s) => s.needsTranslation),
    chineseNative: count((s) => s.lang === "中文"),
    markdown: sources.reduce((n, s) => n + s.md, 0),
    files: sources.reduce((n, s) => n + s.files, 0),
    bytes: sources.reduce((n, s) => n + s.bytes, 0),
  },
  byKind: KIND_ORDER.map((k) => ({ kind: k, count: count((s) => s.kind === k) })).filter((x) => x.count),
  sources,
};
fs.writeFileSync(path.join(OUT_DIR, "catalog.json"), JSON.stringify(catalog, null, 2) + "\n", "utf8");

const fmtSize = (b) => (b >= 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + " MB" : Math.round(b / 1024) + " KB");
const L = [];
L.push("# 课程编排总目录", "");
L.push(`生成日期：${catalog.generatedAt}　·　来源快照：${catalog.sourceIndexGeneratedAt}`, "");
L.push("> 本目录只做**编排**（分类、排序、许可分级、语言判定），不含课程正文。");
L.push("> 正文一律使用 `upstream/` 中的原始快照，不重写、不改编。", "");
L.push("## 编排口径", "");
L.push("| 维度 | 取值 | 说明 |");
L.push("|---|---|---|");
L.push("| 学习路径 | 8 条 | 与卷册一致，代表知识依赖顺序 |");
L.push(`| 材料类型 | ${KIND_ORDER.join(" / ")} | 决定站内排版与阅读方式；表中已按此顺序排列 |`);
L.push("| 许可分级 | 可转载 / 限非商用 / 仅引用 | 决定能否整篇照搬上线 |");
L.push("| 语言 | 按正文字符统计 | 非中文一律需要逐字翻译 |", "");
L.push("## 总量", "");
L.push(`- 来源 ${catalog.totals.sources} 条　·　Markdown ${catalog.totals.markdown} 篇　·　文件 ${catalog.totals.files} 个　·　${fmtSize(catalog.totals.bytes)}`);
L.push(`- 可转载 ${catalog.totals.publishable} 条　·　仅引用 ${catalog.totals.citeOnly} 条`);
L.push(`- 原文已是中文 ${catalog.totals.chineseNative} 条　·　需要翻译 ${catalog.totals.needTranslation} 条`, "");
L.push("### 材料类型分布", "");
L.push("| 类型 | 条数 |");
L.push("|---|---|");
for (const k of catalog.byKind) L.push(`| ${k.kind} | ${k.count} |`);
L.push("");

for (const v of VOLUMES) {
  const list = sources.filter((s) => s.volume === v.id);
  if (!list.length) continue;
  L.push(`## ${v.order}. ${v.name}`, "");
  L.push(`本地目录 \`upstream/${v.id}/\`　·　${list.length} 条来源　·　按「先能跟学、后能查阅」排列`, "");
  L.push("| # | 标题 | 类型 | 许可 | 语言 | 课时 | 规模 | 目录 |");
  L.push("|---|---|---|---|---|---|---|---|");
  list.forEach((s, i) => {
    L.push(`| ${i + 1} | ${s.title} | ${s.kind} | ${s.licenseLabel} | ${s.lang} | ${s.lessons || "—"} | ${s.md} md / ${fmtSize(s.bytes)} | \`${s.local}\` |`);
  });
  L.push("");
}

L.push("## 需要翻译的来源（原文无中文）", "");
const need = sources.filter((s) => s.needsTranslation);
L.push(`共 ${need.length} 条。可转载的按逐字翻译上线；仅引用的只做导航，不整篇搬。`, "");
L.push("| 来源 | 语言 | 许可 | 可整篇上线 |");
L.push("|---|---|---|---|");
for (const s of need) L.push(`| ${s.title} | ${s.lang} | ${s.licenseLabel} | ${s.publishable ? "是" : "否"} |`);
L.push("");
L.push("## 不可整篇转载（仅引用）", "");
const cite = sources.filter((s) => !s.publishable);
L.push(`共 ${cite.length} 条。站内只登记条目、外链原文与必要引用。`, "");
for (const s of cite) L.push(`- ${s.title}　\`${s.local}\`　${s.license}`);

fs.writeFileSync(path.join(OUT_DIR, "课程编排总目录.md"), L.join("\n") + "\n", "utf8");

console.log("编排目录已生成");
console.log(`  来源 ${catalog.totals.sources} 条 · Markdown ${catalog.totals.markdown} 篇 · 文件 ${catalog.totals.files} 个 · ${fmtSize(catalog.totals.bytes)}`);
console.log(`  可转载 ${catalog.totals.publishable} · 仅引用 ${catalog.totals.citeOnly} · 原文中文 ${catalog.totals.chineseNative} · 需翻译 ${catalog.totals.needTranslation}`);
console.log(`  类型：${catalog.byKind.map((k) => k.kind + " " + k.count).join(" · ")}`);
console.log("  catalog/catalog.json · catalog/课程编排总目录.md");
