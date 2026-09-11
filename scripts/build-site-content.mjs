#!/usr/bin/env node
// 编排整合流水线：把上游课程正文原样搬进站内。
//
// 原则：
//   1. 正文一律照搬。本脚本不改写、不摘要、不润色、不增删段落。
//   2. 只做必要的机械处理：
//      a. 链接重写——同时上架的同课程文档改成站内相对链接，其余指回上游原文；
//      b. 图片指向上游仓库在 pinned commit 的原图，站内不复制媒体；
//      c. 转义 {{ }} 与 <script，避免被 Vue 当模板求值（渲染结果不变）；
//      d. 去掉仓库门面（徽章、logo、许可尾巴），课程内容一律保留。
//   3. 站内入口页、来源页、目录页由脚本生成，不混入课程正文。
//
// 用法：
//   node scripts/build-site-content.mjs
//   node scripts/build-site-content.mjs --kinds=系统课程,课时教程 --volumes=09-harness
//   node scripts/build-site-content.mjs --maxDocs=40

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM = path.join(ROOT, "upstream");
const DOCS = path.join(ROOT, "site", "docs");
const LIB = path.join(DOCS, "lib");
const SOURCES_DIR = path.join(DOCS, "sources");
const GEN = path.join(DOCS, ".vitepress", "theme", "generated");
const CATALOG = path.join(ROOT, "catalog", "catalog.json");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  })
);
const BATCH_KINDS = args.kinds ? new Set(args.kinds.split(",").filter(Boolean)) : null;
const BATCH_VOLUMES = args.volumes ? new Set(args.volumes.split(",")) : null;
const MAX_DOCS = Number(args.maxDocs || 24);

const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));

// 人工分级：1 = 主线，2 = 进阶，3 = 参考。顺序即建议学习顺序。
const curation = (() => {
  const f = path.join(ROOT, "curation.json");
  if (!fs.existsSync(f)) return { mainline: [], advanced: [] };
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return { mainline: [], advanced: [] };
  }
})();
// 人工标题与入口覆盖：仓库 README 的首行标题常常不是课程名（如 “Clone code”），
// 这里用人工标题替换显示名；正文一字不动。
for (const s of catalog.sources) {
  const t = curation.titles && curation.titles[s.id];
  if (t) s.title = t;
}

const tierOf = new Map();
curation.mainline.forEach((id) => tierOf.set(id, 1));
(curation.advanced || []).forEach((id) => tierOf.set(id, 2));
const mainlineRank = new Map(curation.mainline.map((id, i) => [id, i]));
const tierOfSource = (id) => tierOf.get(id) || 3;

// 面向读者的分类：按「怎么用」归并，而不是按仓库形态。
const CATEGORY_OF = {
  系统课程: "系统课程",
  课时教程: "系统课程",
  工程手册: "工程手册与指南",
  实践案例集: "实践案例与产品",
  产品仓库: "实践案例与产品",
  官方资料集: "实践案例与产品",
  源码研读: "源码与实现研读",
  技能与配置库: "技能、配置与模板",
  清单与速查: "速查清单与索引",
  其他材料: "速查清单与索引",
  官方文档: "官方文献（外链原文）",
  官方博客: "官方文献（外链原文）",
};
const CATEGORY_ORDER = [
  "系统课程",
  "工程手册与指南",
  "实践案例与产品",
  "源码与实现研读",
  "技能、配置与模板",
  "速查清单与索引",
  "官方文献（外链原文）",
];

// 学习路径的一句话说明。
const VOLUME_BLURB = {
  "01-foundations": "从模型原理到可用产品的基本功：生成式 AI 入门、提示与工程化直觉。",
  "04-work": "把 Agent 用进真实办公场景：文档、表格、流程与知识工作。",
  "07-coding": "从提示到交付的编码工作流：AI 编程、Vibe Coding 与工程规范。",
  "08-agents": "单 Agent 到多 Agent 的系统化构建：工具、记忆、编排与评测。",
  "09-harness": "编码 Agent 的工程实践与原理：上下文装配、权限、循环与工具面。",
  "10-context-memory": "上下文工程、MCP 与技能体系：让模型在正确的信息里工作。",
  "11-personal-agents": "个人助理型智能体：搭建方法、用例集与配置。",
  "13-local-ai": "端侧推理与本地部署：把模型放回自己的机器。",
};

// 每条学习路径适合谁（首页与路径页共用，避免多处维护）。
const VOLUME_WHO = {
  "01-foundations": "想先建立大模型与生成式 AI 的基本认知",
  "04-work": "想立刻用 Agent 处理文档、表格、流程与知识库",
  "07-coding": "想用 AI 写代码、做产品、跑通从需求到上线",
  "08-agents": "想自己搭 Agent、做 RAG、做多智能体系统",
  "09-harness": "想弄懂 Claude Code / Codex 这类编码 Agent 内部怎么运作",
  "10-context-memory": "想提升上下文工程、记忆机制与技能体系",
  "11-personal-agents": "想搭自己的个人助理与自动化工作流",
  "13-local-ai": "想在本机 / 边缘设备上跑模型",
};

// 对外地址：站内文档与主题组件都从这里取，避免多处维护。
const SITE = {
  repo: "https://github.com/faruheaisha/ai-native-open-textbook",
  repoLabel: "faruheaisha/ai-native-open-textbook",
  profile: "https://github.com/faruheaisha",
  profileLabel: "@faruheaisha",
  notice: "https://github.com/faruheaisha/ai-native-open-textbook/blob/main/NOTICE.md",
};

const TIER_LABEL = { 1: "主线", 2: "进阶", 3: "参考" };

function blobUrl(s, rel) {
  if (s.repo && s.commit) return `https://github.com/${s.repo}/blob/${s.commit}/${rel}`;
  if (s.repo) return `https://github.com/${s.repo}/blob/HEAD/${rel}`;
  return s.site || null;
}

// 每条来源都必须给出一个可点的原文地址：优先入口文档，其次仓库首页，最后站点。
function upstreamUrl(s) {
  if (s.entry) {
    const u = blobUrl(s, s.entry);
    if (u) return u;
  }
  if (s.repo) return `https://github.com/${s.repo}`;
  return s.site || null;
}

function rawUrl(s, rel) {
  if (s.repo && s.commit) return `https://raw.githubusercontent.com/${s.repo}/${s.commit}/${rel}`;
  return null;
}

// 递归收集文档：有些课程把正文放在多层目录里，只认一级目录会整片丢正文。
function walkDocs(dir, out) {
  out = out || [];
  let ents;
  try {
    ents = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of ents) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDocs(p, out);
    else if (/\.(md|mdx)$/i.test(e.name)) out.push(p);
  }
  return out;
}

function mdFilesIn(dir) {
  try {
    return fs.readdirSync(dir).filter((n) => /\.(md|mdx)$/i.test(n));
  } catch {
    return [];
  }
}

// 读取集：入口文档 + 每个课时目录里的主文档。这是「编排」，不是删改原文。
function readingSet(s) {
  // 少数来源只有网站导出文件（JSON / 单文件 HTML），正文由 scripts/import-web-exports.mjs
  // 先转成 markdown 落到 derived/ 下；这类来源用 plan.dir 指向派生目录，上游快照保持只读。
  const planEarly = curation.readingPlan && curation.readingPlan[s.id];
  const srcDir = planEarly && planEarly.dir
    ? path.join(ROOT, ...String(planEarly.dir).split("/"))
    : path.join(UPSTREAM, ...s.dir.split("/"));
  const list = [];
  const seen = new Set();
  const add = (abs, outRel) => {
    if (!abs || seen.has(outRel)) return;
    let st;
    try {
      st = fs.statSync(abs);
    } catch {
      return;
    }
    if (!st.isFile()) return;
    seen.add(outRel);
    list.push({ abs, outRel, relInSource: path.relative(srcDir, abs).split(path.sep).join("/") });
  };

  const forced = curation.entries && curation.entries[s.id];
  let entryRel = forced && fs.existsSync(path.join(srcDir, ...forced.split("/"))) ? forced : s.entry && /\.(md|mdx)$/i.test(s.entry) ? s.entry : null;
  if (!entryRel) {
    const rootMd = mdFilesIn(srcDir);
    const pick = ["README.md", "readme.md", "index.md", "README.MD", "Readme.md"].find((n) => rootMd.includes(n)) || rootMd.find((n) => !/^_/.test(n));
    if (pick) entryRel = pick;
  }
  if (entryRel) add(path.join(srcDir, ...entryRel.split("/")), "overview.md");

  // 有些上游把整门课放在多层目录里（units/en/unit1/xxx.mdx、docs/zh/01-xxx.md），
  // lessonList 只到一级目录，正文会整片丢失。这类课程在 curation.json 里登记阅读范围。
  const plan = planEarly;
  if (plan && Array.isArray(plan.roots) && plan.roots.length) {
    const skip = (plan.exclude || []).map((x) => String(x).replace(/[\\/]+$/, ""));
    const collected = [];
    for (const root of plan.roots) {
      const absRoot = path.join(srcDir, ...String(root).split("/"));
      let st;
      try {
        st = fs.statSync(absRoot);
      } catch {
        continue;
      }
      if (st.isFile()) collected.push(absRoot);
      else walkDocs(absRoot, collected);
    }
;
// 仓库事务文件与隐藏目录不是课程正文。
const PLAN_SKIP_FILE = /(^|\/)(AGENTS|CHANGELOG|CODE_OF_CONDUCT|CONTRIBUTING|SECURITY|SUPPORT|NOTICE|PATENTS|LICENSE|_sidebar|_navbar|_\u5feb\u7167\u4fe1\u606f|_\u5feb\u7167\u7d22\u5f15)(\.mdx?)?$/i;

function planOutRel(rel) {
  return rel
    .replace(/\.mdx?$/i, "")
    // 标题里带 .md（如「双层 SKILL.md 与 WORKBUDDY.md」）时，站点会生成 xxx.md.md。
    // 这种双扩展名的页面 VitePress 解析不了，指向它的链接一律判定为死链、构建直接失败；
    // 段内的 .md 换成 _md，站内链接与文件名保持一致。
    .replace(/\.mdx?(?=$|[-_\s.])/gi, "_md")
    .split("/")
    .map((seg) => seg.replace(/[^\w.\u4e00-\u9fff-]+/g, "_"))
    .join("-");
}
    collected.sort((a, b) => {
      const ra = path.relative(srcDir, a).split(path.sep).join("/");
      const rb = path.relative(srcDir, b).split(path.sep).join("/");
      return ra.localeCompare(rb, "zh-Hans-CN", { numeric: true, sensitivity: "base" });
    });
    for (const abs of collected) {
      const rel = path.relative(srcDir, abs).split(path.sep).join("/");
      if (skip.some((p) => rel === p || rel.startsWith(p + "/"))) continue;
      if (/(^|\/)\./.test(rel)) continue;
      if (PLAN_SKIP_FILE.test(rel)) continue;
      if (/(^|\/)(assets?|images?|img|media|public|static|figures?|documents)(\/|$)/i.test(rel)) continue;
      if (/(^|\/)source\.md$/i.test(rel)) continue;
      if (/(^|\/)QwenWorkGuide(\/|$)/.test(rel)) continue;
      // 上游导出工具会在章节里再套一层同名镜像目录（…/第一部分 X/ide/第一部分 X/…），
      // 目录名重复说明整棵子树是副本，跳过。
      const dirSegs = rel.split("/").slice(0, -1).map((x) => x.trim().toLowerCase());
      if (new Set(dirSegs).size !== dirSegs.length) continue;
      if (entryRel && rel === entryRel) continue;
      const base = planOutRel(rel);
      if (!base) continue;
      let outRel = base + ".md";
      let n = 2;
      while (seen.has(outRel)) outRel = base + "-" + n++ + ".md";
      add(abs, outRel);
    }
    return { entryRel, list: list.slice(0, plan.limit || 600) };
  }

  for (const l of s.lessonList || []) {
    const dir = path.join(srcDir, l.dir);
    let picked = null;
    for (const c of ["README.md", "readme.md", "index.md", "README.MD"]) {
      if (fs.existsSync(path.join(dir, c))) {
        picked = path.join(dir, c);
        break;
      }
    }
    if (!picked) {
      const f = mdFilesIn(dir)[0];
      if (f) picked = path.join(dir, f);
    }
    if (picked) add(picked, `${String(l.dir).replace(/[^\w.\u4e00-\u9fff-]/g, "_").replace(/\.mdx?$/i, "_md")}.md`);
  }
  return { entryRel, list: list.slice(0, MAX_DOCS) };
}

function stripFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return text;
  for (let i = 1; i < Math.min(lines.length, 60); i++) {
    if (lines[i].trim() === "---") return lines.slice(i + 1).join("\n").replace(/^\n+/, "");
  }
  return text;
}

function firstHeadingOf(text, fallback) {
  // 同样要跳过代码块：配置文件里的 # 注释不是标题
  let m = null;
  {
    let inFence = null;
    for (const line of text.split("\n")) {
      const t = line.trim();
      const f = /^(`{3,}|~{3,})/.exec(t);
      if (inFence) {
        if (f && /^(`{3,}|~{3,})$/.test(t) && f[1][0] === inFence[0] && f[1].length >= inFence.length) inFence = null;
        continue;
      }
      if (f) {
        inFence = f[1];
        continue;
      }
      const hm = /^\s{0,3}#\s+(.+?)\s*$/.exec(line);
      if (hm) {
        m = hm;
        break;
      }
    }
  }
  if (!m) return fallback;
  const t = m[1].replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*`_>#|]/g, "").replace(/\s+/g, " ").trim();
  return t && t.length <= 110 ? t : fallback;
}

// 正文里的 <data_path>、<task_name> 这类占位符会被 Vue 当成没闭合的标签，整个站的构建
// 会因此失败。标准 HTML 标签原样放行，其余一律转义成文本——读者看到的仍是原文那几个字符。
function escapeUnknownTags(text) {
  return text.replace(/<\/?([A-Za-z][A-Za-z0-9_-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g, (m, name, rest) => {
    if (HTML_TAGS.has(String(name).toLowerCase())) return m;
    // 自动链接（<https://…>、<user@example.com>）不是标签，交给 markdown 处理。
    if (/^[:@]/.test(rest)) return m;
    return "&lt;" + m.slice(1);
  });
}

// LaTeX 片段（$…$ 与行内 $…$）里的 }} 是公式语法，转义之后公式文本就坏了；
// 所以数学区只挡 Vue 插值的左花括号，不碰其余字符。
function mapOutsideMath(text, fnOutside, fnInside) {
  const keep = fnInside || ((x) => x);
  let out = "";
  let i = 0;
  while (i < text.length) {
    const dollar = text.indexOf("$", i);
    if (dollar === -1) {
      out += fnOutside(text.slice(i));
      break;
    }
    out += fnOutside(text.slice(i, dollar));
    let len = 0;
    if (text.startsWith("$", dollar)) {
      const end = text.indexOf("$", dollar + 2);
      if (end > -1) len = end + 2 - dollar;
    }
    if (!len) {
      const m = /^\$(?!\s)(?:[^$\n\\]|\\.)*?(?<!\s)\$/.exec(text.slice(dollar));
      if (m) len = m[0].length;
    }
    if (len) {
      out += keep(text.slice(dollar, dollar + len));
      i = dollar + len;
    } else {
      out += fnOutside("$");
      i = dollar + 1;
    }
  }
  return out;
}

// markdown-it 不会替作者补闭合：正文里漏一个 </strong>，段落收尾时就会留下一个没闭合的
// 元素，Vue 编译整页时会直接报错。这里按 markdown 的段落边界核对行内标签，落单的转义成文本，
// 读者看到的字符不变，只是不再参与模板解析。整段 HTML 块（<div>、<details> 之类）不在此列。
const MD_HTML_BLOCK_START = /^ {0,3}<\/?(address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(\s|\/?>|$)/i;
const INLINE_TAGS = new Set(["a","b","strong","em","i","u","s","del","ins","sub","sup","code","kbd","samp","var","mark","small","abbr","cite","q","span","big","tt","font"]);
const TAG_RE = /<\/?([A-Za-z][A-Za-z0-9_-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;

function fixInlineBalance(text) {
  const matches = [...text.matchAll(TAG_RE)].filter((m) => INLINE_TAGS.has(m[1].toLowerCase()));
  if (!matches.length) return text;
  const stack = [];
  const stray = new Set();
  for (const m of matches) {
    const closing = text[m.index + 1] === "/";
    const name = m[1].toLowerCase();
    if (!closing) {
      stack.push({ name, idx: m.index, len: m[0].length });
    } else {
      const k = stack.map((x) => x.name).lastIndexOf(name);
      if (k >= 0) stack.splice(k, 1);
      else stray.add(m.index);
    }
  }
  for (const x of stack) stray.add(x.idx);
  if (!stray.size) return text;
  let out = "";
  let last = 0;
  for (const idx of [...stray].sort((a, b) => a - b)) {
    const m = TAG_RE.exec(text.slice(idx)) || /^<[^>]*>/.exec(text.slice(idx));
    TAG_RE.lastIndex = 0;
    const raw = m ? m[0] : "";
    out += text.slice(last, idx) + "&lt;" + raw.slice(1);
    last = idx + (raw ? raw.length : 1);
  }
  return out + text.slice(last);
}

function balanceInlineTags(text) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  let inHtmlBlock = false;
  while (i < lines.length) {
    const line = lines[i];
    if (inHtmlBlock) {
      if (!line.trim()) inHtmlBlock = false;
      out.push(line);
      i++;
      continue;
    }
    if (MD_HTML_BLOCK_START.test(line)) {
      inHtmlBlock = true;
      out.push(line);
      i++;
      continue;
    }
    if (!line.trim()) {
      out.push(line);
      i++;
      continue;
    }
    let j = i;
    while (j < lines.length && lines[j].trim() && !MD_HTML_BLOCK_START.test(lines[j])) j++;
    out.push(...fixInlineBalance(lines.slice(i, j).join("\n")).split("\n"));
    i = j;
  }
  return out.join("\n");
}

const MATH_OPEN_ONLY = (chunk) => chunk.replace(/\{\{/g, "&#123;&#123;");
const safeForVueText = (chunk) => escapeUnknownTags(escapeForVue(chunk));
const escapeVueAndTags = (chunk) => mapOutsideMath(chunk, safeForVueText, MATH_OPEN_ONLY);

// 渲染结果等价的转义：避免 Vue 把正文里的 {{ }} 与 <script> 当模板。
// 另外，以 {% 开头的段落会被 VitePress 的 markdown 当成指令，渲染成一个属性重复的
// 假标签，整个站的构建都会因此失败；把开头的 { 换成实体后渲染结果不变、构建恢复正常。
const VUE_DIRECTIVE_LINE = /^([ \t]*(?:>[ \t]*|(?:[-*+]|\d+[.)])[ \t]+)*)\{%/gm;
function escapeForVue(text) {
  return text
    .replace(/\{\{/g, "&#123;&#123;")
    .replace(/\}\}/g, "&#125;&#125;")
    .replace(/<script/gi, "&lt;script")
    .replace(VUE_DIRECTIVE_LINE, "$1&#123;%");
}

// 围栏代码块会被 VitePress 加 v-pre 原样输出，其中的 {{ }} 与标签都不必转义；
// 行内代码没有 v-pre，只把 {{ }} 转义掉，标签交给 markdown 自己转义。
// 之前整篇转义会让读者在代码里看到 &lt; 与 &#123;，这里按位置分开处理。
function unescapeTagsInInlineCode(text) {
  return text.replace(/(`+)([^`\n]*?)\1/g, (m, ticks, body) =>
    ticks + body.replace(/&lt;/g, "<").replace(/&gt;/g, ">") + ticks
  );
}

// 行内代码里的 {{ }} 有两种坏法：不转义会被 Vue 当插值求值（内容整段消失），
// 转义成 &#123; 又会被 markdown 在代码片段里再转义一次，读者看到的就是 &#123; 这串源码。
// 所以这类代码片段不再用反引号，而是换成带 v-pre 的元素：渲染结果与原文一致。
function vPreInlineCode(text) {
  return text.replace(/(`+)([^`\n]*?)\1/g, (m, ticks, body) => {
    if (!/&#123;|&#125;/.test(body)) return m;
    const inner = body.replace(/&#123;/g, "{").replace(/&#125;/g, "}");
    return "<code v-pre>" + inner + "</code>";
  });
}

function rewriteLinks(text, s, currentSourceRel, bySourceRel, currentOutRel) {
  const decode = (u) => {
    if (!/%[0-9A-Fa-f]{2}/.test(u)) return u;
    try {
      return decodeURIComponent(u);
    } catch {
      return u;
    }
  };
  const resolve = (url, isImage) => {
    const clean = decode(url.split("#")[0].split("?")[0]);
    const hash = url.includes("#") ? "#" + decode(url.slice(url.indexOf("#") + 1)) : "";
    if (!clean) return { url, hash };
    // 以 / 开头的是仓库内的根相对路径，按仓库根解析。
    const fromRoot = clean.startsWith("/");
    const base = fromRoot ? "" : path.posix.dirname(currentSourceRel);
    let target = path.posix.normalize(path.posix.join(base, fromRoot ? clean.slice(1) : clean));
    let hit = bySourceRel.get(target);
    if (!hit && (clean.endsWith("/") || !path.posix.extname(clean))) {
      target = path.posix.join(target, "README.md");
      hit = bySourceRel.get(target);
    }
    if (isImage) {
      const raw = rawUrl(s, target);
      return raw ? { url: raw } : { url: null };
    }
    if (hit) {
      // 站内链接写成根绝对路径且不带扩展名：cleanUrls 下就是最终地址，
      // 也不再依赖渲染器对 .md 链接的二次改写（原始 HTML 里的链接同样适用）。
      return { url: "/lib/" + hit.replace(/\.md$/, "") + hash };
    }
    const blob = blobUrl(s, target);
    return blob ? { url: blob + hash } : { url: null };
  };

  text = text.replace(/(!\[[^\]]*\]\()([^)\s]+)(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|data:)/i.test(url)) return m;
    const r = resolve(url, true);
    return r.url ? open + r.url + (title || "") + close : "";
  });

  // 徽章写法「图片当链接文字」优先处理，否则嵌套的方括号会被拆错。
  text = text.replace(/(\[!\[[^\]]*\]\([^)]*\)\]\()([^)\s]+)(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    const r = resolve(url, false);
    if (r.url) return open + r.url + (title || "") + close;
    // 链接目标不可达时只保留图片本身（内容不丢，只是不再可点）
    return m.replace(/^\[/, "").replace(/\]\([^)]*\)$/, "");
  });

  // 普通链接：链接文字里不再允许方括号，避免吞掉嵌套结构。
  text = text.replace(/(\[[^\[\]]*\]\()([^)\s]+)(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    const r = resolve(url, false);
    if (r.url) return open + r.url + (title || "") + close;
    // 链接目标不可达时保留链接文字
    return open.slice(1, -2);
  });

  // 少数上游把「带方括号的标题」整段写进链接文字（[[实战案例]｜…](…)），第一遍吃不下。
  text = text.replace(/(\[[^\[\]\n]*\[[^\[\]\n]*\][^\[\]\n]*\]\()([^)\s]+)(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    const r = resolve(url, false);
    return r.url ? open + r.url + (title || "") + close : open.slice(1, -2);
  });

  // 引用式链接定义：[标签]: 路径（Markdown 的另一种链接写法）
  text = text.replace(/^([ \t]*\[[^\[\]]+\]:[ \t]*\r?\n?[ \t]*)(\S+)([^\n]*)$/gm, (m, prefix, url, rest) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    return prefix + resolve(url, false).url + rest;
  });

  // 原始 HTML 里的 src / poster：单双引号都要认。微软官方课用的是 src='images/x.jpg'，
  // 只认双引号时相对路径会漏网，VitePress 会把它当待打包的静态资源，整站构建直接失败。
  // 指不回上游的（占位符等）整条属性去掉：不写 null，也不留一条指向空地址的破图。
  text = text.replace(/(\s(?:src|poster)=)(["'])([^"']*)\2/gi, (m, head, q, url) => {
    if (/^(https?:|data:)/i.test(url)) return m;
    const r = resolve(url.trim(), true);
    return r.url ? head + q + r.url + q : "";
  });

  text = text.replace(/(\bsrcset=")([^"]+)(")/gi, (m, open, value, close) => {
    const next = value
      .split(",")
      .map((part) => {
        const seg = part.trim();
        if (!seg) return seg;
        const bits = seg.split(/\s+/);
        if (/^(https?:|data:)/i.test(bits[0])) return seg;
        const u = resolve(bits[0], true).url;
        // 解析不到的候选直接丢弃，避免 srcset 里出现空地址
        if (!u) return "";
        bits[0] = u;
        return bits.join(" ");
      })
      .filter(Boolean)
      .join(", ");
    return next ? open + next + close : "";
  });

  text = text.replace(/(<a\b[^>]*?\bhref=")([^"]+)(")/gi, (m, open, url, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    const r = resolve(url, false);
    return r.url ? open + r.url + close : m.replace(/^<a\b[^>]*>/, "");
  });

  return text;
}

// 上游 README 里常见不成对的标签（多出来的 </a>、没闭合的 <I>）。Vue 编译器遇到会
// 直接报错，所以这里先做一次配对检查：白名单内且成对的标签原样保留，其余——未知标签、
// 无配对的闭合标签、未闭合的开标签——一律转义成文字。渲染结果与原文一致，只是不再参与模板解析。
const HTML_TAGS = new Set([
  "div","span","p","a","img","br","hr","strong","em","b","i","u","s","del","ins","sub","sup","mark","small","abbr",
  "code","kbd","samp","var","pre","blockquote","q","cite","ul","ol","li","dl","dt","dd",
  "h1","h2","h3","h4","h5","h6","table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col",
  "details","summary","figure","figcaption","picture","source","video","audio","iframe","center","font","tt","big","nav","section","article","header","footer","main","aside",
]);
const HTML_VOID = new Set(["img","br","hr","source","col","input","meta","link","area","base","embed","param","track","wbr"]);
for (const t of ["data","datalist","dialog","fieldset","form","label","legend","meter","optgroup","option","output","progress","select","slot","style","template","textarea","title","time"]) HTML_TAGS.add(t);
// 块级标签：跨段不成对就丢弃（markdown-it 的 HTML 块规则会把跨段的配对拆散）。
const BLOCK_TAGS = new Set(["details","summary","div","p","table","thead","tbody","tfoot","tr","th","td","caption","ul","ol","li","dl","dt","dd","blockquote","section","article","nav","header","footer","main","aside","figure","figcaption","center","picture","video","audio","iframe","colgroup"]);

function sanitizeHtml(text) {
  const comments = [];
  for (const m of text.matchAll(/<!--[\s\S]*?-->/g)) comments.push([m.index, m.index + m[0].length]);
  const inComment = (pos) => comments.some(([s, e]) => pos >= s && pos < e);

  // 段落（空行分隔）编号：块级标签只在同一段内成对才算安全。
  // 跨段配对会被 markdown-it 的 HTML 块规则拆散，正是 Vue 报「元素缺少结束标签」的根源。
  const segments = [];
  {
    let s = 0;
    const sep = /\n[ \t]*\n/g;
    let mm;
    while ((mm = sep.exec(text)) !== null) {
      segments.push([s, mm.index]);
      s = mm.index + mm[0].length;
    }
    segments.push([s, text.length]);
  }
  const segAt = (pos) => {
    for (let i = 0; i < segments.length; i++) if (pos < segments[i][1]) return i;
    return segments.length - 1;
  };

  const tags = [];
  const re = /<\/?([A-Za-z][A-Za-z0-9:-]*)((?:"[^"]*"|'[^']*'|[^<>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (inComment(m.index)) continue;
    // <https://...> <mailto:...> 是 markdown 自动链接，不是 HTML 标签
    if (/^<(?:https?:\/\/|mailto:|tel:)/i.test(m[0])) continue;
    const name = m[1].toLowerCase();
    tags.push({
      start: m.index,
      end: m.index + m[0].length,
      raw: m[0],
      name,
      isClose: m[0].startsWith("</"),
      isVoid: HTML_VOID.has(name) || m[3] === "/",
      keep: HTML_TAGS.has(name),
      seg: segAt(m.index),
      paired: false,
    });
  }

  const stack = [];
  for (const t of tags) {
    if (!t.keep) continue;
    if (t.isClose) {
      const top = stack[stack.length - 1];
      // 块级标签可以跨段配对（<details>…</details> 中间常有空行）；
      // 行内标签必须同段配对，否则会渲染出孤立 </sub> 这种非法结束标签。
      const sameSegment = top && (BLOCK_TAGS.has(t.name) || top.seg === t.seg);
      if (top && top.name === t.name && sameSegment) {
        stack.pop().paired = true;
        t.paired = true;
      }
    } else if (t.isVoid) {
      t.paired = true;
    } else {
      stack.push(t);
    }
  }

  let out = "";
  let cursor = 0;
  for (const t of tags) {
    out += text.slice(cursor, t.start);
    if (!t.keep) out += "&lt;" + t.raw.slice(1);
    else if (t.paired) out += t.raw;
    // 块级标签没能配对：整块标记直接丢掉（标记不是内容），避免渲染层报错。
    else if (!BLOCK_TAGS.has(t.name)) out += "&lt;" + t.raw.slice(1);
    cursor = t.end;
  }
  out += text.slice(cursor);
  return out;
}

// 围栏代码块（多行代码样本）里的内容一律不动：改代码示例就不叫照搬了。
// 行内代码不在此列——README 里大量链接的文字本身是行内代码，保护它会把链接切断。
function fenceOpen(line) {
  const m = /^( {0,3})(`{3,}|~{3,})(.*)$/.exec(line);
  if (!m) return null;
  // CommonMark：反引号围栏的 info string 里不允许再出现反引号。
  // 上游大量出现「```npm install -g xxx```」这种单行写法，渲染器把它当行内代码，
  // 一旦这里误判成围栏，后面的链接就全被当成代码跳过，站内链接会烂掉。
  if (m[2][0] === "`" && m[3].includes("`")) return null;
  return m[2];
}
function fenceClose(line, marker) {
  const m = /^( {0,3})(`{3,}|~{3,})\s*$/.exec(line);
  if (!m) return null;
  if (m[2][0] !== marker[0] || m[2].length < marker.length) return null;
  return m[2];
}

function mapOutsideCode(text, fn) {
  const lines = text.split("\n");
  const out = [];
  let buf = [];
  let fence = null;
  const flush = () => {
    if (!buf.length) return;
    out.push(fn(buf.join("\n")));
    buf = [];
  };
  for (const line of lines) {
    if (fence) {
      out.push(line);
      if (fenceClose(line, fence)) fence = null;
      continue;
    }
    const marker = fenceOpen(line);
    if (marker) {
      flush();
      fence = marker;
      out.push(line);
      continue;
    }
    buf.push(line);
  }
  flush();
  return out.join("\n");
}

// ---------- 展示层处理：只去掉仓库门面，课程内容一律保留 ----------

const CHROME_IMAGE = /(shields\.io|badge|visitorbadge|star-history|github-readme-stats|komarev|profile-counter|badgen\.net|codecov|travis|circleci|npmjs\.com\/package|pypi\.org\/project)/i;
const TAIL_HEADING = /^#{1,3}\s*(license|licence|许可|license\s*&|citation|how to cite|cite this|contributing|acknowledg|star history|support (us|the project)|赞助|打赏|other courses|community thanks|other projects|more courses|related (courses|projects))/i;
// 语言切换行（[English](README.md) | [中文](README-zh.md) …）属于仓库门面，不进阅读页。
const LANG_SWITCH = /^\s*(?:\[[^\]]{1,12}\]\([^)]*\)\s*(?:[|·,、]\s*)?)+$/;
// 课程报名、贡献指引、引用格式一类的仓库事务段落，不进阅读页。
const CHROME_SECTION = /(from the creator of|multi-language support|meet other learners|building a startup|want to help|special thanks|community thanks|thanks to our sponsors|sponsors?\b|other courses|other projects|more courses|getting help|star history|support (us|the project)|related (courses|projects)|\u8d5e\u52a9|\u6253\u8d4f|\u5176\u4ed6\u8bfe\u7a0b|\u9700\u8981\u5e2e\u52a9|\u83b7\u53d6\u5e2e\u52a9)/i;
const ADMIN_LINE = /^\s*(?:[-*+]\s*)?(?:additional translations? languages? supported|or submit a pr|submit a pull request|sign ?up here|you can access the course here|if you want to contribute|if you find a small typo|if you want to add a new unit|to cite this repository|feel free to open an issue|how to contribute|contributions are welcome|don'?t forget to .{0,40}star|join (?:our|the) .{0,40}discord|do you have suggestions or found|our team produces other courses|if you get stuck or have any questions|if you have product feedback|visit \[?microsoft for startups)/i;

// 仓库门面（徽章、居中 logo、许可与引用尾巴）不进阅读页；原文入口一直在，要看原件随时可去。
const BAUBLE = /(shields\.io|badgen\.net|visitorbadge|github-readme-stats|star-history|komarev|profile-counter|codecov\.io)/i;

// 有些上游把 XML / HTML 示例写成裸文本，markdown 会把它当标签吃掉（读者什么都看不到）。
// 连续三行以上都是标记行时，套上代码块，让例子照原样显示。
function markupLine(line) {
  const t = line.trim();
  if (/^\|/.test(t)) return false;
  const m = /^<\/?([A-Za-z_][A-Za-z0-9_.:-]*)/.exec(t);
  if (!m) return false;
  if (HTML_TAGS.has(m[1].toLowerCase())) return false; // 这些是真 HTML，markdown 认得，别动
  return /^\s*(?:<\/?[A-Za-z_][A-Za-z0-9_.:-]*(?:\s[^<>]*)?\/?>|<[A-Za-z_][^<>]*>[^<>]*<\/[A-Za-z_][A-Za-z0-9_.:-]*>)\s*$/.test(t);
}
function wrapBareMarkup(text) {
  const lines = text.split("\n");
  const out = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    const m = /^(`{3,}|~{3,})/.exec(t);
    if (fence) {
      out.push(lines[i]);
      if (m && /^(`{3,}|~{3,})$/.test(t) && m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
      continue;
    }
    if (m) {
      fence = m[1];
      out.push(lines[i]);
      continue;
    }
    if (markupLine(lines[i])) {
      let j = i;
      while (j < lines.length && markupLine(lines[j])) j += 1;
      if (j - i >= 3) {
        out.push("```");
        for (let k = i; k < j; k++) out.push(lines[k]);
        out.push("```");
        i = j - 1;
        continue;
      }
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

// 上游文档站自己的 Vue 交互组件（<el-row>、<ChapterIntroduction> 之类）在静态书里
// 既不渲染也不通顺，整块去掉；判断依据是带连字符的自定义元素标签，逐个配对。
// Hugging Face 课程用 MDX 组件做「多语言标签页」，静态书里这些标签本身就是噪音。
// ── 上游 MDX 交互组件 ─────────────────────────────────────────────
// 这些是文档站自己的 MDX 组件，静态书里跑不起来；留在正文里就是一堆
// <Question choices={[...]} /> 源码。做法：带内容的还原成可读 Markdown，
// 纯交互外壳整块丢掉，原文一字不改。
const MDX_BLOCK = new Set(["Question", "NavCard", "StepBar", "RelatedArticlesSection", "ChapterIntroduction", "hfoptions", "hfoption"]);
const MDX_STRAY = /^[ \t]*<\/?(?:Question|NavCard|StepBar|RelatedArticlesSection|ChapterIntroduction|hfoptions|hfoption)\b[^<>]*\/?>\s*$/;

function mdxAttr(props, name) {
  const m = new RegExp(name + "\\s*=\\s*[\"']([\\s\\S]*?)[\"']").exec(props);
  return m ? m[1] : "";
}
function jsxItems(src) {
  const out = [];
  let depth = 0, start = -1;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "{") { if (depth === 0) start = i + 1; depth += 1; }
    else if (c === "}") { depth -= 1; if (depth === 0 && start >= 0) { out.push(src.slice(start, i)); start = -1; } }
  }
  return out;
}
function jsxValue(obj, key) {
  const m = new RegExp(key + "\\s*:\\s*([\"'`])([\\s\\S]*?)\\1").exec(obj);
  return m ? m[2] : "";
}

function renderQuestion(props) {
  const arr = /choices\s*=\s*\{\s*\[([\s\S]*)\]\s*\}/.exec(props);
  if (!arr) return "";
  const items = jsxItems(arr[1]).map((o) => ({
    text: jsxValue(o, "text"),
    explain: jsxValue(o, "explain"),
    correct: /correct\s*:\s*true/.test(o),
  })).filter((o) => o.text);
  if (!items.length) return "";
  const letter = (i) => "ABCDEFGHIJ"[i] || String(i + 1);
  const lines = ["**选项**", ""];
  items.forEach((o, i) => lines.push("- " + letter(i) + ". " + o.text));
  if (items.some((o) => o.explain)) {
    lines.push("", "**答案解析**", "");
    items.forEach((o, i) => lines.push("- **" + letter(i) + (o.correct ? "（正确答案）" : "") + "**" + (o.explain ? " — " + o.explain : "")));
  }
  return lines.join("\n");
}

function renderStepBar(props) {
  const arr = /:?items\s*=\s*\{\s*\[([\s\S]*)\]\s*\}/.exec(props);
  if (!arr) return "";
  const items = jsxItems(arr[1]).map((o) => ({ title: jsxValue(o, "title"), description: jsxValue(o, "description") })).filter((o) => o.title);
  if (!items.length) return "";
  return items.map((o, i) => (i + 1) + ". **" + o.title + "**" + (o.description ? " — " + o.description : "")).join("\n");
}

function renderNavCard(props) {
  const title = mdxAttr(props, "title");
  if (!title) return "";
  const desc = mdxAttr(props, "description");
  return "- **" + title + "**" + (desc ? " — " + desc : "");
}

// 按行扫描：组件在自己的行上开头，以单独一行的 `/>` 收尾（容器组件以单独一行的 `>` 开始插槽）。
function renderMdxComponents(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (MDX_STRAY.test(line)) continue;
    const m = /^[ \t]*<([A-Za-z][A-Za-z0-9]*)\b/.exec(line);
    if (!m || !MDX_BLOCK.has(m[1])) { out.push(line); continue; }
    const name = m[1];
    if (name === "hfoptions" || name === "hfoption") continue;
    let j = i;
    const buf = [];
    let closed = false;
    while (j < lines.length) {
      buf.push(lines[j]);
      if (/\/>\s*$/.test(lines[j])) { closed = true; break; }
      if (/^[ \t]*>\s*$/.test(lines[j]) && buf.length > 1) { closed = true; break; }
      if (buf.length > 400) break;
      j += 1;
    }
    if (!closed) { out.push(line); continue; }
    const props = buf.join("\n").replace(/^[ \t]*<[A-Za-z][A-Za-z0-9]*/, "").replace(/\/?>\s*$/, "");
    let body = "";
    if (name === "Question") body = renderQuestion(props);
    else if (name === "StepBar") body = renderStepBar(props);
    else if (name === "NavCard") body = renderNavCard(props);
    if (body.trim()) { out.push("", body, ""); }
    i = j;
  }
  return out.join("\n");
}

const MDX_TAG_LINE = /^(?:\s*<\/?(?:hfoptions|hfoption|Tip|Note|Warning|Caution|Exercise|Quiz|Accordion|CourseFigma|Youtube)\b[^<>]*\/?>\s*)+$/;

function dropVueTemplates(text) {
  const OPEN = /<[a-z][a-z0-9]*-[a-z0-9-]+(?=[\s/>]|$)/g;
  const SELF = /<[a-z][a-z0-9]*-[a-z0-9-]+[^>]*\/>/g;
  const CLOSE = /<\/[a-z][a-z0-9]*-[a-z0-9-]+>/g;
  const count = (re, s) => (s.match(re) || []).length;
  const out = [];
  let depth = 0;
  for (const line of text.split("\n")) {
    if (MDX_TAG_LINE.test(line)) continue;
    const delta = count(OPEN, line) - count(SELF, line) - count(CLOSE, line);
    if (!depth && delta > 0) {
      depth = delta;
      continue;
    }
    if (!depth && count(SELF, line) > 0) continue;
    if (depth) {
      depth += delta;
      if (depth < 0) depth = 0;
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

function stripChrome(text) {
  // HTML 注释包裹的样板区（CO-OP TRANSLATOR 语言表、其他课程表等）整块去掉
  const src = mapOutsideCode(text, (chunk) =>
    chunk
      // 只清「徽章按钮」这种 <a><img></a>，作者头像一类的图片要留着
      .replace(/<a\b[^>]*>\s*<img\b[^>]*(?:shields\.io|badgen\.net|visitorbadge|github-readme-stats|star-history|komarev|profile-counter|codecov\.io)[^>]*>\s*<\/a>/gi, "")
      .replace(/<img\b[^>]*(?:shields\.io|badgen\.net|visitorbadge|github-readme-stats|star-history|komarev|profile-counter|codecov\.io)[^>]*>/gi, "")
      .replace(/!\[[^\]]*\]\(<?https?:\/\/[^)\s]*(?:shields\.io|badgen\.net|visitorbadge|github-readme-stats|star-history|komarev|profile-counter|codecov\.io)[^)]*\)/gi, "")
  )
    .replace(/<!--[^>]*\bSTART\b[^>]*-->[\s\S]*?<!--[^>]*\bEND\b[^>]*-->/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const lines = wrapBareMarkup(dropVueTemplates(renderMdxComponents(src))).split("\n");
  const kept = [];
  let centered = 0;
  let pendingHref = null;
  let pendingText = [];
  let pendingLines = 0;
  for (const line of lines) {
    const t = line.trim();
    // 裸 <a href="…">文字</a>：还原成 markdown 链接，别让读者看到 &lt;a href=…&gt;
    const inline = /^<a\s[^>]*href="([^"]+)"[^>]*>\s*([^<>]*?)\s*<\/a>$/i.exec(t);
    if (inline) {
      if (inline[2]) kept.push(`[${inline[2]}](${inline[1]})`);
      continue;
    }
    if (pendingHref) {
      if (/^<\/a>$/i.test(t)) {
        const label = pendingText.join(" ").replace(/\s+/g, " ").trim();
        if (label) kept.push(`[${label}](${pendingHref})`);
        pendingHref = null;
        pendingText = [];
        pendingLines = 0;
        continue;
      }
      if (pendingLines < 6 && t && !/^<[^>]+>$/.test(t)) {
        pendingText.push(t);
        pendingLines += 1;
        continue;
      }
      pendingHref = null;
      pendingText = [];
      pendingLines = 0;
    }
    const anchorOpen = /^<a\s[^>]*href="([^"]+)"[^>]*>$/i.exec(t);
    if (anchorOpen) {
      pendingHref = anchorOpen[1];
      pendingText = [];
      pendingLines = 0;
      continue;
    }
    if (/^<div\s+align="?center"?>$/i.test(t) || /^<p\s+align="?center"?>$/i.test(t)) {
      centered += 1;
      continue;
    }
    if (/^<\/(div|p)>$/i.test(t) && centered > 0) {
      centered -= 1;
      continue;
    }
    if (/^\[?!\[[^\]]*\]\(.+\)\]?$/.test(t) && CHROME_IMAGE.test(t)) continue;
    // 徽章类链接引用定义（[xx-shield]: https://img.shields.io/... ）不是正文
    if (/^\[[^\]]+\]:\s*<?\S*(shields\.io|badgen\.net|visitorbadge|github-readme-stats|star-history|komarev|codecov)/i.test(t)) continue;
    if (LANG_SWITCH.test(t) && /readme/i.test(t)) continue;
    // 求 star / 求关注一类的仓库门面，不进阅读页
    if (t.length < 200 && /(⭐|star this repo|star the repo|give (it|us) a star|点个 ?star|给个 ?star|求 ?star)/i.test(t)) continue;
    if (t.length < 400 && ADMIN_LINE.test(t)) continue;
    if (/^<a\b[^>]*>\s*<\/a>$/i.test(t)) continue;
    // star 历史图（外链图床）与移除后留下的空壳标签 / 空链接
    if (/^\[\]\([^)]*\)$/.test(t)) continue;
    if (/^<\/?(?:picture|a|img|source)>?$/i.test(t)) continue;
    if (/star-history/i.test(t) && /^(?:&lt;<a|<a|<source|<img|\[\]\(|!\[|[-*+]\s*\[[^\]]*\]\(#)/i.test(t)) continue;
    // 上游 .md 里混进来的 Vue 组件标签（<HomePage /> 之类）我们渲染不了，也不是课程内容
    if (/^<\/?[A-Z][A-Za-z0-9]*(?:\s[^<>]*)?\/?>$/.test(t)) continue;
    // 仓库上手步骤（fork / clone / 加 Discord）不是课程内容
    if (/^(?:[-*+]|\d+\.)\s/.test(t) && /(fork the repo|clone the repo|join (?:the|our) .{0,60}(discord|slack))/i.test(t)) continue;
    if (/^follow these steps to get started/i.test(t)) continue;
    if (/^\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)$/.test(t) && CHROME_IMAGE.test(t)) continue;
    // 页脚里的多语言链接 / 许可声明，属于仓库门面
    if (/readme-i18n\.com/i.test(t)) continue;
    if (/^<sub>.*\b(license|licence|mit|apache|gpl|bsd)\b/i.test(t)) continue;
    if (centered > 0 && (/^<img\b/i.test(t) || /^<\/?a\b/i.test(t) || /^\[?!\[/i.test(t))) continue;
    kept.push(line);
  }

  // 第一个 H1 之前的内容（徽章墙、语言表、课程宣传）不是课程正文。
  // 注意：代码块里的 # 注释行不是标题，找 H1 必须跳过代码块，否则会把正文整段切掉。
  let h1 = -1;
  {
    let inFence = null;
    for (let i = 0; i < kept.length; i++) {
      const t = kept[i].trim();
      const m = /^(`{3,}|~{3,})/.exec(t);
      if (inFence) {
        if (m && /^(`{3,}|~{3,})$/.test(t) && m[1][0] === inFence[0] && m[1].length >= inFence.length) inFence = null;
        continue;
      }
      if (m) {
        inFence = m[1];
        continue;
      }
      if (/^\s{0,3}#\s+\S/.test(kept[i])) {
        h1 = i;
        break;
      }
    }
  }
  let body0 = h1 > 0 ? kept.slice(h1) : kept;

  // 表格里整列都是徽章（star 数、构建状态、社交图标）就整列删掉，别把空列留在正文里
  {
    const cleaned = [];
    let i = 0;
    while (i < body0.length) {
      if (!body0[i].trim().startsWith("|")) {
        cleaned.push(body0[i]);
        i += 1;
        continue;
      }
      let j = i;
      while (j < body0.length && body0[j].trim().startsWith("|")) j += 1;
      const block = body0.slice(i, j);
      const isTable = block.length >= 2 && /^\|[\s:|-]+\|$/.test(block[1].trim());
      if (!isTable) {
        for (let k = i; k < j; k++) cleaned.push(body0[k]);
        i = j;
        continue;
      }
      const rows = block.map((l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|"));
      const cols = Math.max(...rows.map((r) => r.length));
      const drop = new Set();
      for (let c = 0; c < cols; c++) {
        let badge = 0;
        let other = 0;
        for (let ri = 0; ri < rows.length; ri++) {
          if (ri === 0) continue; // 表头不算：整列都是徽章就该整列删掉
          const cell = (rows[ri][c] || "").trim();
          if (!cell || /^:?-{2,}:?$/.test(cell)) continue;
          if (BAUBLE.test(cell)) badge += 1;
          else other += 1;
        }
        if (badge && !other) drop.add(c);
      }
      if (!drop.size) {
        for (let k = i; k < j; k++) cleaned.push(body0[k]);
      } else {
        for (const r of rows) {
          const cells = r.filter((_, c) => !drop.has(c)).map((x) => x.trim());
          if (cells.length < 2) continue;
          cleaned.push("| " + cells.join(" | ") + " |");
        }
      }
      i = j;
    }
    body0 = cleaned;
  }

  // 整节样板（多语言支持 / 找同伴 / 拉赞助 / 特别致谢 / 其他课程 …）按标题层级整段去掉
  const cuts = [];
  for (let i = 0; i < body0.length; i++) {
    const m = body0[i].trim().match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (!m || !CHROME_SECTION.test(m[2])) continue;
    const level = m[1].length;
    let j = i + 1;
    while (j < body0.length) {
      const mm = body0[j].trim().match(/^(#{1,6})\s+/);
      if (mm && mm[1].length <= level) break;
      j += 1;
    }
    cuts.push([i, j]);
    i = j - 1;
  }
  if (cuts.length) {
    const drop = new Set();
    for (const [a, b] of cuts) for (let k = a; k < b; k++) drop.add(k);
    body0 = body0.filter((_, i) => !drop.has(i));
  }

  let end = body0.length;
  for (let i = 0; i < body0.length; i++) {
    if (TAIL_HEADING.test(body0[i].trim())) {
      end = i;
      break;
    }
  }
  let out = body0.slice(0, end);

  // 开头：标题之前散落的单图/横线清掉
  let start = 0;
  while (start < out.length) {
    const t = out[start].trim();
    if (t === "" || t === "---" || /^<img\b/i.test(t) || (/^\[?!\[/i.test(t) && CHROME_IMAGE.test(t))) start += 1;
    else break;
  }
  out = out.slice(start);

  // 结尾：压掉连续空行与收尾横线
  while (out.length && (out[out.length - 1].trim() === "" || out[out.length - 1].trim() === "---" || out[out.length - 1].trim() === "</div>")) out.pop();
  const finalText = out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(?:^|\n)---(\s*\n---)+/g, "\n")
    .trim();

  // 有些上游把 VitePress 站点的页面骨架（<script setup> / <style> / <template>）也放进了 md，
  // 那不是课程内容，整篇不要，免得读者看到一堆 &lt;script setup>。
  const bodyLines = finalText.split("\n").filter((l) => l.trim());
  const scaffold = bodyLines.filter((l) => /^<\/?(script|style|template)\b/i.test(l.trim())).length;
  if (scaffold >= 2) return "";

  // 整篇以裸 HTML/JSX 标记为主（上游把界面骨架写进 md）的文档不是课程内容，整篇不要
  const markup = bodyLines.filter((l) => /^<\/?[A-Za-z][^>]*>/.test(l.trim())).length;
  if (markup >= 4 && bodyLines.length && markup / bodyLines.length > 0.25) return "";

  return finalText;
}

function splitBlocks(text) {
  const blocks = [];
  let cur = [];
  let fence = null;
  const flush = () => {
    if (!cur.length) return;
    const raw = cur.join("\n");
    cur = [];
    const t = raw.trim();
    if (!t) return;
    let type = "para";
    if (/^(```|~~~)/.test(t)) type = "fence";
    else if (/^#{1,6}\s/.test(t)) type = "heading";
    else if (/^</.test(t)) type = "html";
    else if (/^([-*+]|\d+\.)\s/.test(t)) type = "list";
    else if (/^>/.test(t)) type = "quote";
    else if (/^\|/.test(t)) type = "table";
    else if (/^!\[/.test(t)) type = "image";
    blocks.push({ type, text: raw });
  };
  for (const line of text.split("\n")) {
    if (fence) {
      cur.push(line);
      if (/^\s*(```|~~~)/.test(line)) {
        fence = null;
        flush();
      }
      continue;
    }
    if (/^\s*(```|~~~)/.test(line)) {
      flush();
      fence = line;
      cur.push(line);
      continue;
    }
    if (line.trim() === "") flush();
    else if (/^#{1,6}\s/.test(line)) {
      flush();
      cur.push(line);
    } else cur.push(line);
  }
  flush();
  return blocks;
}

function escapeHtmlText(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 逐段中文释义：译文按「原文段落顺序」写在 translations/<路径>/<课程>.json 里。
// 站内默认收起，点段落或页面右上角开关即可展开；原文一字不动。
// 可挂释义的块：段落、列表、引用。
// 教学内容大量以列表承载（步骤、要点、自测选项），只给段落挂释义会漏掉一大片。
const TR_BLOCK = new Set(["para", "list", "quote"]);
const TR_MARK = { list: "⟨列表⟩ ", quote: "⟨引用⟩ " };

// 有些块本身已是中文（例如自测题里的「选项」「答案解析」小标题），
// 它们没有可翻译的英文，若也占一个槽位，读者会看到一条重复自己的释义。
function needsGloss(text) {
  return /[A-Za-z]/.test(String(text).replace(/[\u4e00-\u9fff]/g, ""));
}

function trBlocks(text) {
  return splitBlocks(text).filter((b) => TR_BLOCK.has(b.type) && needsGloss(b.text));
}

// 释义是「补充阅读」，不是第二份原文：去掉标记符号，只留可读正文。
// 原段落里的链接与加粗仍然完整保留在英文原文中，释义里重复一遍反而变成乱码。
function cleanGloss(t) {
  return String(t)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function withTranslations(text, zh) {
  if (!Array.isArray(zh) || !zh.length) return text;
  const out = [];
  let n = 0;
  for (const b of splitBlocks(text)) {
    out.push(b.text);
    if (TR_BLOCK.has(b.type) && needsGloss(b.text)) {
      const t = zh[n];
      const gloss = typeof t === "string" ? cleanGloss(t) : "";
      if (gloss) {
        out.push(`<div class="tb-zh"><p>${escapeHtmlText(gloss)}</p></div>`);
      }
      n += 1;
    }
  }
  return out.join("\n\n");
}

function firstParagraph(text) {
  for (const b of splitBlocks(text)) {
    if (b.type !== "para") continue;
    const t = b.text.trim();
    if (t.length < 20) continue;
    if (/^\[?!\[/.test(t)) continue;
    if (/<[A-Za-z/]/.test(t)) continue; // 含裸 HTML 的段落不适合当课程简介
    return t.length > 320 ? t.slice(0, 320).replace(/\s+\S*$/, "") + "…" : t;
  }
  return "";
}

const TRANS_DIR = path.join(ROOT, "translations");
function loadTranslation(s) {
  const f = path.join(TRANS_DIR, s.volume, `${s.local}.json`);
  if (!fs.existsSync(f)) return {};
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return {};
  }
}

// 只剩一个标题（或一句话目录说明）的页面是仓库里的空壳，不是课程内容。
function isStubBody(body) {
  return body.replace(/[#>*\-`|:\s]/g, "").length < 60;
}
function isStubDoc(d) {
  try {
    const body = stripChrome(stripFrontmatter(fs.readFileSync(d.abs, "utf8")));
    return !body.trim() || isStubBody(body);
  } catch {
    return true;
  }
}

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function writeFile(p, text) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text.replace(/\r\n/g, "\n"), "utf8");
}

// ---------- 译文提取模式 ----------
// 用法：node scripts/build-site-content.mjs --dumpParagraphs=09-harness/learn-claude-code
// 输出该课程每篇文档的段落清单（编号与翻译文件里的数组下标一一对应），供人工逐段翻译。
if (args.dumpParagraphs) {
  const s = catalog.sources.find((x) => x.id === args.dumpParagraphs);
  if (!s) {
    console.error("找不到来源：" + args.dumpParagraphs);
    process.exit(1);
  }
  const { list: set } = readingSet(s);
  const outDir = path.posix.join(s.volume, s.local);
  const bySourceRel = new Map(set.map((d) => [d.relInSource, path.posix.join(outDir, d.outRel)]));
  const dump = {};
  for (const d of set) {
    const raw = fs.readFileSync(d.abs, "utf8");
    const body = stripChrome(stripFrontmatter(raw));
    let text = mapOutsideCode(body, (chunk) => rewriteLinks(chunk, s, d.relInSource, bySourceRel, path.posix.join(outDir, d.outRel)));
    text = mapOutsideCode(text, sanitizeHtml);
    text = mapOutsideCode(text, balanceInlineTags);
    text = mapOutsideCode(text, escapeVueAndTags);
    text = mapOutsideCode(text, vPreInlineCode);
    text = mapOutsideCode(text, unescapeTagsInInlineCode);
    dump[d.relInSource] = trBlocks(text).map((x) => (TR_MARK[x.type] || "") + x.text.trim());
  }
  console.log(JSON.stringify(dump, null, 2));
  process.exit(0);
}

// ---------- 译文下标迁移 ----------
// 释义机制从「只认段落」扩到「段落 + 列表 + 引用」后，旧译文的下标会整体左移。
// 用法：node scripts/build-site-content.mjs --migrateTranslations=<卷/课程>
if (args.migrateTranslations) {
  const s = catalog.sources.find((x) => x.id === args.migrateTranslations);
  if (!s) { console.error("找不到来源：" + args.migrateTranslations); process.exit(1); }
  const { list: set } = readingSet(s);
  const outDir = path.posix.join(s.volume, s.local);
  const bySourceRel = new Map(set.map((d) => [d.relInSource, path.posix.join(outDir, d.outRel)]));
  const file = path.join(TRANS_DIR, s.volume, s.local + ".json");
  const cur = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  const next = {};
  let moved = 0, lost = 0, dropped = 0;
  for (const d of set) {
    const oldArr = Array.isArray(cur[d.relInSource]) ? cur[d.relInSource] : null;
    if (!oldArr) continue;
    const raw = fs.readFileSync(d.abs, "utf8");
    const body = stripChrome(stripFrontmatter(raw));
    let text = mapOutsideCode(body, (chunk) => rewriteLinks(chunk, s, d.relInSource, bySourceRel, path.posix.join(outDir, d.outRel)));
    text = mapOutsideCode(text, sanitizeHtml);
    text = mapOutsideCode(text, balanceInlineTags);
    text = mapOutsideCode(text, escapeVueAndTags);
    text = mapOutsideCode(text, vPreInlineCode);
    text = mapOutsideCode(text, unescapeTagsInInlineCode);
    const out = [];
    let oldIdx = 0;
    for (const b of splitBlocks(text)) {
      if (!TR_BLOCK.has(b.type)) continue;
      const v = oldArr[oldIdx];
      if (needsGloss(b.text)) out.push(typeof v === "string" ? v.trim() : "");
      else if (typeof v === "string" && v.trim()) dropped += 1;
      oldIdx += 1;
    }
    for (let i = oldIdx; i < oldArr.length; i++) {
      if (typeof oldArr[i] === "string" && oldArr[i].trim()) lost += 1;
    }
    if (out.some((x) => x && x.trim())) next[d.relInSource] = out;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(next, null, 2) + "\n", "utf8");
  let slots = 0, filled = 0;
  for (const v of Object.values(next)) { slots += v.length; filled += v.filter((x) => x && x.trim()).length; }
  console.log("译文下标迁移完成：文档 " + Object.keys(next).length + " 篇 · 槽位 " + slots + " · 有译文 " + filled + " · 移动 " + moved + " · 新规则剔除 " + dropped + " · 越界丢弃 " + lost);
  process.exit(0);
}

// 用法：node scripts/build-site-content.mjs --debugDoc=09-harness/xxx:README.md
// 把单篇文档在各道处理工序后的样子写到 scripts/tmp/dbg/，用来定位内容是哪一步被改坏的。
if (args.debugDoc) {
  const [id, rel] = args.debugDoc.split(":");
  const s0 = catalog.sources.find((x) => x.id === id);
  if (!s0) {
    console.error("找不到来源：" + id);
    process.exit(1);
  }
  const { list: set0 } = readingSet(s0);
  const doc = set0.find((x) => x.relInSource === rel) || set0[0];
  const outDir0 = path.posix.join(s0.volume, s0.local);
  const map0 = new Map(set0.map((x) => [x.relInSource, path.posix.join(outDir0, x.outRel)]));
  const dir = path.join(ROOT, "scripts/tmp/dbg");
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const raw0 = fs.readFileSync(doc.abs, "utf8");
  fs.writeFileSync(path.join(dir, "0-raw.md"), raw0, "utf8");
  let t0 = stripChrome(stripFrontmatter(raw0));
  fs.writeFileSync(path.join(dir, "1-stripChrome.md"), t0, "utf8");
  t0 = mapOutsideCode(t0, (chunk) => rewriteLinks(chunk, s0, doc.relInSource, map0, path.posix.join(outDir0, doc.outRel)));
  fs.writeFileSync(path.join(dir, "2-links.md"), t0, "utf8");
  t0 = mapOutsideCode(t0, sanitizeHtml);
  t0 = mapOutsideCode(t0, balanceInlineTags);
  fs.writeFileSync(path.join(dir, "3-sanitize.md"), t0, "utf8");
  t0 = mapOutsideCode(t0, escapeVueAndTags);
  t0 = mapOutsideCode(t0, vPreInlineCode);
  t0 = mapOutsideCode(t0, unescapeTagsInInlineCode);
  fs.writeFileSync(path.join(dir, "4-final.md"), t0, "utf8");
  console.log("工序快照已写入 scripts/tmp/dbg/：" + fs.readdirSync(dir).join(" "));
  process.exit(0);
}

// ---------- 主流程 ----------

const selected = catalog.sources.filter((s) => {
  if (BATCH_VOLUMES && !BATCH_VOLUMES.has(s.volume)) return false;
  if (BATCH_KINDS && !BATCH_KINDS.has(s.kind)) return false;
  if (!BATCH_KINDS && !s.publishable) return false; // 仅引用的官方文献不整篇搬入
  return true;
});

rmrf(LIB);
rmrf(SOURCES_DIR);
fs.mkdirSync(GEN, { recursive: true });

const registered = [];
let docCount = 0;

for (const s of selected) {
  const { entryRel, list: set } = readingSet(s);
  if (set.length < 2) continue;
  const outDir = path.posix.join(s.volume, s.local);
  // 上游有些页面整页都是组件壳子，清洗后是空的、不会进书；链接指向它们就会变成死链。
  const usable = set.filter((d) => !isStubDoc(d));
  const bySourceRel = new Map(usable.map((d) => [d.relInSource, path.posix.join(outDir, d.outRel)]));

  const trans = loadTranslation(s);
  const pages = [];
  const processed = new Map();
  for (const d of set) {
    const raw = fs.readFileSync(d.abs, "utf8");
    const body = stripChrome(stripFrontmatter(raw));
    if (!body.trim() || isStubBody(body)) { if (process.env.TB_TRACE) console.error('SKIP ' + d.relInSource + ' len=' + body.replace(/\s/g,'').length); continue; }
    const title = firstHeadingOf(body, s.title);
    let text = mapOutsideCode(body, (chunk) => rewriteLinks(chunk, s, d.relInSource, bySourceRel, path.posix.join(outDir, d.outRel)));
    text = mapOutsideCode(text, sanitizeHtml);
    text = mapOutsideCode(text, balanceInlineTags);
    text = mapOutsideCode(text, escapeVueAndTags);
    text = mapOutsideCode(text, vPreInlineCode);
    text = mapOutsideCode(text, unescapeTagsInInlineCode);
    text = withTranslations(text, trans[d.relInSource]);
    const outPath = path.join(LIB, s.volume, s.local, ...d.outRel.split("/"));
    const fm = {
      title,
      sourceId: s.id,
      sourceTitle: s.title,
      sourceKind: s.kind,
      licenseLabel: s.licenseLabel,
      lang: s.lang,
      tier: tierOfSource(s.id),
      volume: s.volume,
      sourceUrl: s.repo ? `https://github.com/${s.repo}` : s.site || "",
      entryUrl: entryRel ? blobUrl(s, entryRel) : s.site || "",
      zh: Array.isArray(trans[d.relInSource]) && trans[d.relInSource].length ? "on" : "",
    };
    const fmText = Object.entries(fm)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join("\n");
    writeFile(outPath, `---\n${fmText}\n---\n\n${text}\n`);
    processed.set(d.outRel, text);
    pages.push({ title, rel: d.outRel.replace(/\.md$/, ""), sourceRel: d.relInSource });
    docCount++;
  }
  if (!pages.length) continue;

  // 课程入口页：打开就是课程简介与课时目录。
  const entryDoc = set.find((d) => d.outRel === "overview.md" && entryRel && d.relInSource === entryRel);
  const lessons = pages.filter((d) => d.rel !== "overview");
  let intro = entryDoc ? firstParagraph(processed.get(entryDoc.outRel) || "") : "";
  if (!intro && set[0]) intro = firstParagraph(processed.get(set[0].outRel) || "");
  const hasZh = Object.keys(trans).some((k) => Array.isArray(trans[k]) && trans[k].length);
  const landingFm = {
    title: s.title,
    landing: true,
    tier: tierOfSource(s.id),
    sourceId: s.id,
    sourceTitle: s.title,
    sourceKind: s.kind,
    licenseLabel: s.licenseLabel,
    lang: s.lang,
    volume: s.volume,
    sourceUrl: s.repo ? `https://github.com/${s.repo}` : s.site || "",
    entryUrl: entryRel ? blobUrl(s, entryRel) : s.site || "",
    zh: hasZh ? "on" : "",
  };
  const landing = [
    "---",
    Object.entries(landingFm)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join("\n"),
    "---",
    "",
    `# ${s.title}`,
    "",
    intro,
    "",
    "## 课时",
    "",
    ...lessons.map((d, i) => `${i + 1}. [${d.title}](${d.rel}.md)`),
    "",
    lessons.length ? `开始学习 → [${lessons[0].title}](${lessons[0].rel}.md)` : "",
    "",
    // 只折叠连续空行；把空行一并删掉会把列表和后面那行并成同一个列表项。
  ].filter((x, i, a) => x !== "" || a[i - 1] !== "");
  writeFile(path.join(LIB, s.volume, s.local, "index.md"), landing.join("\n"));
  pages.unshift({ title: "课程首页", rel: "index", sourceRel: "" });

  // 来源页：登记出处与许可，供溯源与署名使用。
  writeFile(
    path.join(SOURCES_DIR, s.volume, `${s.local}.md`),
    [
      "---",
      `title: ${JSON.stringify("出处：" + s.title)}`,
      "---",
      "",
      `# ${s.title}`,
      "",
      "| 项 | 内容 |",
      "|---|---|",
      `| 上游 | ${s.repo ? `[${s.repo}](https://github.com/${s.repo})` : s.site ? `[${s.site}](${s.site})` : "—"} |`,
      `| 锚定版本 | ${s.commit ? `\`${s.commit}\`` : "站点快照"} |`,
      `| 许可 | ${s.license}（${s.licenseLabel}）|`,
      `| 许可要求 | ${s.licenseNote} |`,
      `| 原文语言 | ${s.lang} |`,
      `| 本地快照 | \`upstream/${s.dir}\` |`,
      "",
      "## 原文入口",
      "",
      s.repo && s.commit && entryRel ? `- [仓库](https://github.com/${s.repo})　·　[入口文档](${blobUrl(s, entryRel)})` : s.site ? `- [${s.site}](${s.site})` : "- 无外链",
      "",
      "## 站内阅读",
      "",
      `- [进入课程](/lib/${outDir}/index)`,
      "",
    ]
      .filter((x) => x !== "")
      .join("\n")
  );

  registered.push({
    id: s.id,
    volume: s.volume,
    local: s.local,
    title: s.title,
    kind: s.kind,
    category: CATEGORY_OF[s.kind] || "其他",
    tier: tierOfSource(s.id),
    license: s.license,
    licenseLabel: s.licenseLabel,
    lang: s.lang,
    publishable: s.publishable,
    repo: s.repo,
    site: s.site,
    commit: s.commit,
    entry: entryRel,
    featured: tierOfSource(s.id) === 1,
    sourceUrl: s.repo ? `https://github.com/${s.repo}` : s.site,
    docs: pages,
  });

  writeFile(
    path.join(SOURCES_DIR, s.volume, `${s.local}.json`),
    JSON.stringify(
      {
        id: s.id,
        volume: s.volume,
        local: s.local,
        title: s.title,
        kind: s.kind,
        license: s.license,
        licenseLabel: s.licenseLabel,
        licenseNote: s.licenseNote,
        lang: s.lang,
        needsTranslation: s.needsTranslation,
        publishable: s.publishable,
        repo: s.repo,
        site: s.site,
        commit: s.commit,
        entryUrl: entryRel ? blobUrl(s, entryRel) : s.site,
        docs: pages.length,
      },
      null,
      2
    ) + "\n"
  );
}

// 站点数据：导航与页面都读它，避免手写清单。
const allSources = catalog.sources.map((s) => ({
  id: s.id,
  volume: s.volume,
  local: s.local,
  title: s.title,
  kind: s.kind,
  category: CATEGORY_OF[s.kind] || "其他",
  tier: tierOfSource(s.id),
  licenseLabel: s.licenseLabel,
  lang: s.lang,
  lessons: s.lessons,
  md: s.md,
  repo: s.repo,
  site: s.site,
  commit: s.commit,
  entryUrl: upstreamUrl(s),
  publishable: s.publishable,
  ported: registered.some((r) => r.id === s.id),
}));

writeFile(
  path.join(GEN, "catalog.ts"),
  [
    "// 由 scripts/build-site-content.mjs 生成，请勿手改。",
    `export const generatedAt = ${JSON.stringify(new Date().toISOString().slice(0, 10))}`,
    `export const volumes = ${JSON.stringify(catalog.volumes.map((v) => ({ ...v, blurb: VOLUME_BLURB[v.id] || "", who: VOLUME_WHO[v.id] || "" })), null, 2)} as const`,
    `export const kindOrder = ${JSON.stringify(catalog.kindOrder)} as const`,
    `export const categoryOrder = ${JSON.stringify(CATEGORY_ORDER)} as const`,
    `export const tierLabel = ${JSON.stringify(TIER_LABEL)} as const`,
    `export const totals = ${JSON.stringify(catalog.totals, null, 2)} as const`,
    `export const byKind = ${JSON.stringify(catalog.byKind, null, 2)} as const`,
    `export interface SourceEntry { id: string; volume: string; local: string; title: string; kind: string; category: string; tier: number; licenseLabel: string; lang: string; lessons: number; md: number; repo: string | null; site: string | null; commit: string | null; entryUrl: string | null; publishable: boolean; ported: boolean }`,
    `export interface CourseDoc { title: string; rel: string; sourceRel: string }`,
    `export interface Course { id: string; volume: string; local: string; title: string; kind: string; category: string; tier: number; license: string; licenseLabel: string; lang: string; publishable: boolean; repo: string | null; site: string | null; commit: string | null; sourceUrl: string | null; docs: CourseDoc[] }`,
    `export const courses: Course[] = ${JSON.stringify(registered, null, 2)}`,
    `export const sources: SourceEntry[] = ${JSON.stringify(allSources, null, 2)}`,
    "",
  ].join("\n")
);

writeFile(
  path.join(GEN, "site.ts"),
  [
    "// 由 scripts/build-site-content.mjs 生成，请勿手改。",
    `export const SITE = ${JSON.stringify(SITE, null, 2)} as const`,
    "",
  ].join("\n")
);

// ---------- 导航页：由目录自动生成，随来源增减自动更新 ----------

const portedIds = new Set(registered.map((r) => r.id));
const volById = new Map(catalog.volumes.map((v) => [v.id, v]));
const T = catalog.totals;

const sortCourses = (group) =>
  [...group].sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    const ra = mainlineRank.has(a.id) ? mainlineRank.get(a.id) : 9999;
    const rb = mainlineRank.has(b.id) ? mainlineRank.get(b.id) : 9999;
    const da = a.docs ? a.docs.length : a.md;
    const db = b.docs ? b.docs.length : b.md;
    return ra - rb || db - da;
  });

const stars = (t) => (t === 1 ? "★★★" : t === 2 ? "★★" : "★");

// 首页（layout: home，主视觉与数据由主题组件渲染）
const home = [];
home.push("---", "layout: home", "");
home.push("hero:");
home.push("  name: AI 原生开放教材");
home.push("  text: 读得完、找得到、有出处的 AI 课程");
home.push(`  tagline: ${JSON.stringify("把散落在各个仓库与站点里的高质量课程、工程手册与官方文献，按知识依赖顺序重新编排。正文与上游逐字一致，每一页都标注出处与许可。")}`);
home.push("  actions:");
home.push("    - theme: brand");
home.push("      text: 开始学习");
home.push("      link: /paths/01-foundations");
home.push("    - theme: alt");
home.push("      text: 课程库");
home.push("      link: /library/");
home.push("    - theme: alt");
home.push("      text: GitHub 仓库");
home.push(`      link: ${SITE.repo}`);
home.push("---", "");
home.push("<ResumeCard />", "");
home.push("## 学习路径", "");
home.push("八条路径按「先能用起来，再理解原理，最后自己造」的顺序排列，每张卡片都是可以点进去的入口。", "");
home.push("<PathGrid />", "");
home.push("## 收录构成", "");
home.push("<HomeComposition />", "");
home.push("## 检索入口", "");
home.push("<EntryGrid />", "");
home.push("页面右上角的搜索框可以直接检索所有课程正文，中英文均可。", "");
home.push("## 开源与协作", "");
home.push("<HomeGithub />", "");
writeFile(path.join(DOCS, "index.md"), home.join("\n"));

// 路径页
for (const v of catalog.volumes) {
  const list = catalog.sources.filter((s) => s.volume === v.id);
  if (!list.length) continue;
  const portedHere = registered.filter((c) => c.volume === v.id);
  const out = [];
  out.push("---", `title: ${JSON.stringify(v.name)}`, "---", "");
  out.push(`# ${v.order}. ${v.name}`, "");
  out.push(VOLUME_BLURB[v.id] || "", "");
  out.push(`共 ${list.length} 条来源，其中 ${portedHere.length} 门可在站内直接阅读。`, "");
  const mainline = sortCourses(portedHere.filter((c) => c.tier === 1));
  if (mainline.length) {
    out.push("## 主线", "");
    out.push("| 课程 | 分类 | 课时 | 原文 |");
    out.push("|---|---|---|---|");
    for (const c of mainline) {
      out.push(`| ★★★ [${c.title}](/lib/${c.volume}/${c.local}/index) | ${c.category} | ${c.docs.length} | ${c.sourceUrl ? `[↗](${c.sourceUrl})` : "—"} |`);
    }
    out.push("");
  }
  const rest = sortCourses(portedHere.filter((c) => c.tier !== 1));
  if (rest.length) {
    out.push("## 进阶与参考", "");
    out.push("| 课程 | 分类 | 分级 | 课时 | 原文 |");
    out.push("|---|---|---|---|---|");
    for (const c of rest) {
      out.push(`| [${c.title}](/lib/${c.volume}/${c.local}/index) | ${c.category} | ${stars(c.tier)} ${TIER_LABEL[c.tier]} | ${c.docs.length} | ${c.sourceUrl ? `[↗](${c.sourceUrl})` : "—"} |`);
    }
    out.push("");
  }
  const outside = list.filter((s) => !portedIds.has(s.id));
  if (outside.length) {
    out.push("## 官方文献与外链", "");
    out.push("| 来源 | 类型 · 许可 · 语言 | 课时 | 原文 |");
    out.push("|---|---|---|---|");
    for (const s of outside) {
      out.push(`| ${s.title} | ${s.kind} · ${s.licenseLabel} · ${s.lang} · ${s.md} md | ${s.lessons || "—"} | ${upstreamUrl(s) ? `[原文 ↗](${upstreamUrl(s)})` : "—"} |`);
    }
    out.push("");
  }
  writeFile(path.join(DOCS, "paths", `${v.id}.md`), out.join("\n"));
}

// 课程库
writeFile(
  path.join(DOCS, "library", "index.md"),
  [
    "---",
    'title: "课程库"',
    "---",
    "",
    "# 课程库",
    "",
    `已上架 ${registered.length} 门课程，全部可在站内直接读完。按分类、分级、语言或关键词筛选。`,
    "",
    "<CourseLibrary />",
    "",
  ].join("\n")
);

// 来源总表
const src = [];
src.push("---", 'title: "来源总表"', "---", "");
src.push("# 来源总表", "");
src.push(`共 ${T.sources} 条来源。许可分三级：可转载、限非商用、仅引用。`, "");
src.push("| # | 来源 | 学习路径 | 类型 · 许可 · 语言 | 入口 |");
src.push("|---|---|---|---|---|");
catalog.sources.forEach((s, i) => {
  const staged = portedIds.has(s.id);
  const v = volById.get(s.volume);
  src.push(
    `| ${i + 1} | ${s.title} | ${v ? v.name : s.volume} | ${s.kind} · ${s.licenseLabel} · ${s.lang} · ${s.md} md | ${staged ? `[站内](/lib/${s.volume}/${s.local}/index)` : "—"} · ${upstreamUrl(s) ? `[原文 ↗](${upstreamUrl(s)})` : "—"} |`
  );
});
src.push("");
writeFile(path.join(DOCS, "sources", "index.md"), src.join("\n"));

// 关于本站
const m = [];
m.push("---", 'title: "关于本站"', "---", "");
m.push("# 关于本站", "");
m.push("本站是一份开放课程与官方文献的编排索引：把散落在各个仓库与站点里的高质量材料，按学习路径组织成一条可以读下去的顺序。", "");
m.push("## 正文从哪里来", "");
m.push("| 环节 | 做法 |");
m.push("|---|---|");
m.push("| 正文 | 与上游快照逐字一致 |");
m.push("| 链接 | 同课程内文档走站内，其余指回上游原文 |");
m.push("| 图片 | 指向上游仓库在锚定版本的原图 |");
m.push("| 可见文本 | 仅去掉仓库门面（徽章、居中 logo、许可与引用尾巴）|");
m.push("| 翻译 | 英文材料附逐段中文释义，默认收起，不替换原文 |");
m.push("");
m.push("## 分类口径", "");
m.push("| 维度 | 取值 |");
m.push("|---|---|");
m.push(`| 学习路径 | ${catalog.volumes.length} 条，代表知识依赖顺序 |`);
m.push(`| 分类 | ${CATEGORY_ORDER.join(" / ")} |`);
m.push("| 分级 | ★★★ 主线 / ★★ 进阶 / ★ 参考 |");
m.push("| 许可 | 可转载 / 限非商用 / 仅引用（仅引用者只提供外链与索引）|");
m.push("");
m.push("## 目录数据", "");
m.push(`- 来源 ${T.sources} 条 · Markdown ${T.markdown} 篇 · 文件 ${T.files} 个`);
m.push("- 机器目录：`catalog/catalog.json`");
m.push("");
m.push("## 开源与反馈", "");
m.push("本站的编排、站点源码与全部课程资源都在 GitHub 上公开维护：", "");
m.push(`- 仓库：[${SITE.repoLabel}](${SITE.repo})`);
m.push(`- 作者：[${SITE.profileLabel}](${SITE.profile})`);
m.push("");
m.push(`课程内容的著作权归各上游作者与组织所有；逐条署名、锚定版本与许可清单见仓库的 [NOTICE.md](${SITE.notice})。发现错误或想推荐新的来源，欢迎在仓库提 Issue。`);
m.push("");
writeFile(path.join(DOCS, "method", "index.md"), m.join("\n"));

console.log("编排整合完成");
console.log(`  上架课程 ${registered.length} 门 · 站内正文 ${docCount} 篇 · 登记来源 ${allSources.length} 条`);
console.log(`  批次：${BATCH_KINDS ? [...BATCH_KINDS].join(" / ") : "全部可转载类目"}${BATCH_VOLUMES ? "　路径：" + [...BATCH_VOLUMES].join(",") : ""}`);