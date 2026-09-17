#!/usr/bin/env node
// 编排整合流水线：把上游课程正文原样搬进站内。
//
// 原则：
//   1. 正文一律照搬。本脚本不改写、不摘要、不润色、不增删段落。
//   2. 只做必要的机械处理：
//      a. 链接重写——同时上架的同课程文档改成站内相对链接，其余指回上游原文；
//      b. 图片指向 pinned commit 的原图：站内已镜像的走站内路径（mirror-index.json），
//         其余经加速通道，不把读者直接丢给被墙的 raw.githubusercontent.com；
//      c. 转义 {{ }} 与 <script，避免被 Vue 当模板求值（渲染结果不变）；
//      d. 去掉仓库门面（徽章、logo、许可尾巴），课程内容一律保留。
//   3. 站内入口页、来源页、目录页由脚本生成，不混入课程正文。
//
// 用法：
//   node scripts/build-site-content.mjs
//   node scripts/build-site-content.mjs --kinds=系统课程,课时教程 --volumes=09-harness
//   node scripts/build-site-content.mjs --maxDocs=40

import fs from "node:fs";
import crypto from "node:crypto";
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
// 发布边界：默认只生成允许公开转载的来源；完整原件只允许显式 local-full 模式。
// 这样即使部署平台直接执行 `npm run docs:build`，也不会把「仅引用」正文带入公开产物。
const CONTENT_MODE = args.mode || process.env.TB_CONTENT_MODE || "public";
const PUBLIC_BUILD = CONTENT_MODE !== "local-full";
// 每门课的正文篇数上限。默认不设限 —— 课程要整门搬完，从中间截断比不收还糟。
// 「默认 24 篇」那版让 113 门课里 70 门正好停在 24~28 篇：上游 17411 篇候选正文，
// 站上只落了 2281 篇，长课全被腰斩（实例：千问办公绿皮书 413 篇只上了 24 篇）。
//   --maxDocs=N   只用于试跑压规模；正式构建不要带。
//   plan.limit    单门课的显式上限，只在确认该仓库混有大量非课程文件时才写。
// 页面数直接决定 VitePress 的构建内存（整站页面在同一进程里渲染），
// 目前靠 build.ps1 里的 --max-old-space-size 扛；再上一个量级要改成分批渲染。
const MAX_DOCS = args.maxDocs ? Number(args.maxDocs) : 0;

const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));

// 上游自带的侧栏树（由 scripts/extract-upstream-nav.mjs 从各仓库的 sidebar.ts /
// mkdocs.yml / SUMMARY.md / _sidebar.md / 站点快照里抽出来）。有它就用它，
// 没有才退回按目录名编树 —— 上游怎么分章、怎么起标题，站上就怎么排。
const UPSTREAM_NAV = (() => {
  const f = path.join(ROOT, "catalog", "upstream-nav.json");
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return {};
  }
})();
const navOverrideOf = (id) => UPSTREAM_NAV[id] || null;

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
  const p = encodePathForUrl(rel);
  if (s.repo && s.commit) return `https://github.com/${s.repo}/blob/${s.commit}/${p}`;
  if (s.repo) return `https://github.com/${s.repo}/blob/HEAD/${p}`;
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

// 图片地址：站内镜像优先，其次走加速通道。
// 表由 scripts/mirror-images.mjs 产出（原始 URL -> 站内路径 / 已逐字节核实的替代地址）。
// 表不存在或读坏了都只是退化为「全部走加速通道」，不能让生成流程失败。
const RAW_HOST = "https://raw.githubusercontent.com/";
const RAW_PROXY = process.env.TB_RAW_PROXY === undefined ? "https://gh-proxy.com/" : process.env.TB_RAW_PROXY;
const PUBLIC_DIR = path.join(DOCS, "public");
const MIRROR_INDEX = (() => {
  const f = path.join(DOCS, "mirror-index.json");
  const m = new Map();
  try {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const [k, v] of Object.entries(j)) if (typeof v === "string" && v) m.set(k, v);
  } catch {
    /* 没有表就整段跳过 */
  }
  return m;
})();
const imgStat = { local: 0, remap: 0, proxied: 0 };

// 上游目录名里带空格与全角冒号（「第一篇 使用手册：先把 WorkBuddy 用起来」）。
// 把这种路径原样拼进 ![](…) 或 […](…) ，markdown 会在**空格**处截断地址：
// 读者看到的是半截地址，后半段变成正文里「一堆看不懂的内容」，图片和链接全废。
// 只编码会破坏 markdown 语法的字符；中文等交给浏览器自己处理，
// 这样 mirror-index 里按原始地址存的键还能对上。
const URL_NEEDS_ESCAPE = /[ ()<>"'\u0060]/g;
function encodePathForUrl(rel) {
  return String(rel).replace(URL_NEEDS_ESCAPE, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
}

// 查表用的键：查询串与片段对图片本体没有意义，去掉后才好对齐。
function rawKey(u) {
  return String(u).split("#")[0].split("?")[0];
}

// 把一个 raw.githubusercontent.com 地址换成站内可用的地址：
//   1. 表里有站内路径 -> 用它（本地镜像）；
//   2. 表里有核实过的替代地址 -> 用它（上游真实位置，仍走加速通道）；
//   3. 其余 -> 原地址套加速通道前缀；通道关掉（TB_RAW_PROXY=""）时原样返回。
function localizeRaw(url) {
  if (!url || url.indexOf(RAW_HOST) !== 0) return url;
  let hit = MIRROR_INDEX.get(rawKey(url)) || MIRROR_INDEX.get(url);
  if (!hit && /%[0-9A-Fa-f]{2}/.test(url)) {
    // 表是按原始地址（含空格）存的，这里把编码还原后再查一次
    try {
      const plain = decodeURIComponent(rawKey(url));
      hit = MIRROR_INDEX.get(plain) || MIRROR_INDEX.get(decodeURIComponent(url));
    } catch {
      /* 还原失败就当作没命中 */
    }
  }
  if (hit) {
    if (hit.startsWith("/")) {
      // 表里的站内路径只在 public 下真有这个文件时才用。
      // 镜像目录（约 570MB 第三方截图）不进仓库：clone 出来直接构建时这里会落空，
      // 必须退回加速通道，否则整站图片都是死链。
      if (fs.existsSync(path.join(PUBLIC_DIR, hit.slice(1)))) {
        imgStat.local += 1;
        return hit;
      }
    } else {
      imgStat.remap += 1;
      return RAW_PROXY ? RAW_PROXY + hit : hit;
    }
  }
  if (!RAW_PROXY) return url;
  imgStat.proxied += 1;
  return RAW_PROXY + url;
}

function rawUrl(s, rel) {
  if (s.repo && s.commit) {
    return localizeRaw(`https://raw.githubusercontent.com/${s.repo}/${s.commit}/${encodePathForUrl(rel)}`);
  }
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
  const contentSeen = new Map();
  const mirrorSkipped = [];
  const splitLog = [];
  const add = (abs, outRel, extra) => {
    if (!abs || seen.has(outRel)) return;
    let st;
    try {
      st = fs.statSync(abs);
    } catch {
      return;
    }
    if (!st.isFile()) return;
    seen.add(outRel);
    list.push(
      Object.assign(
        { abs, outRel, relInSource: path.relative(srcDir, abs).split(path.sep).join("/") },
        extra || {}
      )
    );
  };

  const forced = curation.entries && curation.entries[s.id];
  let entryRel = forced && fs.existsSync(path.join(srcDir, ...forced.split("/"))) ? forced : s.entry && /\.(md|mdx)$/i.test(s.entry) ? s.entry : null;
  if (!entryRel) {
    const rootMd = mdFilesIn(srcDir);
    const pick = ["README.md", "readme.md", "index.md", "README.MD", "Readme.md"].find((n) => rootMd.includes(n)) || rootMd.find((n) => !/^_/.test(n));
    if (pick) entryRel = pick;
  }
  if (entryRel) add(path.join(srcDir, ...entryRel.split("/")), "overview.md");

  // 阅读范围：curation.json 的 readingPlan 可显式登记 roots / exclude / limit。
  // 没登记的课程默认读整棵源树。
  // 原兜底是「每个课时目录只取一个主文档、全课最多 24 篇」—— 上游几百篇正文连同配图
  // 会整片丢失（实例：一份 502 篇的仓库只上了 6 篇，65 门课一张图都没有）。
  const plan = planEarly && Array.isArray(planEarly.roots) && planEarly.roots.length
    ? planEarly
    : { roots: ["."] };
  if (plan) {
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
// 纯仓库事务目录：CI 配置、模板、依赖缓存、发布片段。这些不是课程正文。
// .github 整枝挡掉 —— 里面偶尔有 docs/，但全站合计不到 60 篇，换来的是不用再判 workflows；
// 真正成体系的技能文档几乎都放 .agents/.claude/.cursor/.kiro 这些目录下，那些一律保留。
const PLAN_SKIP_DOT_DIR = /^(?:\.git|\.changeset|\.devcontainer|\.vscode|\.idea|\.husky|\.circleci|\.gitlab|\.cache|\.next|\.venv|\.pnpm-store|\.yarn|\.turbo|\.parcel-cache|\.out-of-scope|\.greptile|\.adal|\.atom|\.nova|\.history)$/i;
// .github 单独判断：CI 流水线、Issue 模板、依赖机器人不是课程正文，
// 但很多技能型仓库把主体内容放在 .github/plugins、.github/skills、.github/agents 下
// ——microsoft-skills 的 1324 篇插件技能定义全在 .github/plugins/，一刀切等于整门课清空。
const PLAN_SKIP_GITHUB_SUB = /^(?:workflows|ISSUE_TEMPLATE|PULL_REQUEST_TEMPLATE|actions|dependabot)$/i;
// AGENTS / CLAUDE 是「写给编码助手看的仓库说明」，只认全大写那一种写法。
// 小写的 agents.md 是正文页：OpenAI Agents SDK 的核心文档、Anthropic 与 OpenAI 的
// API 指南都叫这个名字，跟着一起挡掉等于把这几门课的主干章节整篇删掉。
const PLAN_SKIP_FILE = /(^|\/)(CHANGELOG|CODE_OF_CONDUCT|CONTRIBUTING|SECURITY|SUPPORT|NOTICE|PATENTS|LICENSE|_sidebar|_navbar|_\u5feb\u7167\u4fe1\u606f|_\u5feb\u7167\u7d22\u5f15)([-_][A-Za-z0-9]{2,6})?(\.mdx?)?$/i;
const PLAN_SKIP_AGENT_DOC = /(^|\/)(AGENTS|CLAUDE)([-_][A-Za-z0-9]{2,6})?(\.mdx?)?$/;

// 多语种仓库会把同一份正文摊成十几个语种目录（i18n/ja、docs/ko、ar-pages…）。
// 站点面向中文读者，只保留中文与英文，其余语种整枝跳过；中文的 zh-tw / zh-hant 也保留。
const LOCALE_CODES = "ar|ja|ko|es|fr|de|pt|ru|hi|vi|th|id|tr|it|nl|pl|uk|fa|he|bn|el|cs|ro|hu|sv|da|fi|no|sk|bg|hr|sr|lt|lv|et|sl|ca|gl|eu|af|ms|tl|ne|ur|ta|te|ml|kn|mr|gu|pa|si|km|lo|my|am";
const PLAN_SKIP_LOCALE = new RegExp("^(" + LOCALE_CODES + ")([-_][a-z0-9]{2,6})?$", "i");
// 目录之外，上游还会把同一篇正文写成「文件名 + 语种后缀」（README.ja.md、chapter5.ko.md）。
// zh / en 保留（中文版对本站读者有用），其余语种整篇跳过。
const PLAN_SKIP_LOCALE_FILE = new RegExp("\\.(" + LOCALE_CODES + ")([-_][A-Za-z0-9]{2,6})?\\.mdx?$", "i");
const PLAN_KEEP_LOCALE_DIR = /^(i18n|locales|lang|translations|locale)$/i;
// 第三种写法是「文件名 + 大写语种后缀」：README-KO.md、README-PT-BR.md、README_UK.md。
// 语种码一律大写，避免把 how-to-use-it.md 这种正常文件名误判成意大利语版；zh / en 一律保留。
const PLAN_SKIP_LOCALE_SUFFIX = new RegExp("(?:^|[-_])(" + LOCALE_CODES.toUpperCase() + ")(?:-[A-Z]{2})?\\.mdx?$");
function isForeignLocaleDir(seg) {
  const t = seg.trim().toLowerCase();
  if (PLAN_KEEP_LOCALE_DIR.test(t)) return false; // 容器目录本身保留，交给下一层判断
  return PLAN_SKIP_LOCALE.test(t);
}

function planOutRel(rel) {
  return rel
    .replace(/\.mdx?$/i, "")
    // 「课时目录/README.md」会拼成 s13_agent_teams-README，
    // 目录名本身已经说清楚了，去掉冗余尾段，URL 回到 s13_agent_teams。
    .replace(/[\/]?(?:README|readme|Readme|index|INDEX)$/, "")
    // 标题里带 .md（如「双层 SKILL.md 与 WORKBUDDY.md」）时，站点会生成 xxx.md.md。
    // 这种双扩展名的页面 VitePress 解析不了，指向它的链接一律判定为死链、构建直接失败；
    // 段内的 .md 换成 _md，站内链接与文件名保持一致。
    .replace(/\.mdx?(?=$|[-_\s.])/gi, "_md")
    .split("/")
    // 段首的点和 VitePress 冲突：以「.」开头的文件名会被当成隐藏文件整篇忽略，
    // 页面根本不生成，指向它的站内链接全变成死链（.claude/skills/xxx/SKILL.md 这类）。
    // 段首点换成下划线，页面才真的存在。
    .map((seg) => seg.replace(/^\.+/, "_").replace(/[^\w.\u4e00-\u9fff-]+/g, "_"))
    .join("-");
}
    // 顺序即上游目录顺序：用码点序 + 数字序，不要用中文拼音序
    // （拼音序会把「第二部分」排到「第一部分」前面，导航与上游对不上）。
    collected.sort((a, b) => {
      const ra = path.relative(srcDir, a).split(path.sep).join("/");
      const rb = path.relative(srcDir, b).split(path.sep).join("/");
      return ra.localeCompare(rb, "en", { numeric: true, sensitivity: "variant" });
    });
    // 第一遍：按规则筛掉非课程文件，并为每条正文算出「内容摘要」。
    const staged = [];
    for (const abs of collected) {
      const rel = path.relative(srcDir, abs).split(path.sep).join("/");
      // 上游偶尔把整站文档拼成一个大文件（llms-full.md 之类）—— 那些不是一节内容；
      // 但「一本书就是一个文件」更常见（Codex 手册 2.2MB、Claude Code 全指南 1MB、
      // ChatGPT 橙皮书 120KB），一律跳过等于整份文档没上站。这里只记体量，切不切另说。
      let size = 0;
      try {
        size = fs.statSync(abs).size;
      } catch {
        continue;
      }
      if (skip.some((p) => rel === p || rel.startsWith(p + "/"))) continue;
      // 隐藏目录不都是垃圾。很多课程把技能、规则、笔记、命令放在 .agents/.claude/.cursor/
      // .kiro/.opencode 这类目录下，整片跳过等于把正文丢掉 —— deepseek-harness 的 601 篇
      // 架构笔记全在 .agents/notes/archived 下，一刀切之后这门课只剩 24 篇 README，
      // 看着就是个空壳。只挡真正的仓库事务目录与发布流水线产物，其余按正文照搬。
      if (rel.split("/").some((seg) => PLAN_SKIP_DOT_DIR.test(seg.trim()))) continue;
      {
        const segs = rel.split("/").map((x) => x.trim());
        const gi = segs.indexOf(".github");
        if (gi >= 0 && segs[gi + 1] && PLAN_SKIP_GITHUB_SUB.test(segs[gi + 1])) continue;
      }
      if (PLAN_SKIP_FILE.test(rel)) continue;
      if (PLAN_SKIP_AGENT_DOC.test(rel)) continue;
      if (rel.split("/").some(isForeignLocaleDir)) continue;
      if (PLAN_SKIP_LOCALE_FILE.test(rel)) continue;
      if (PLAN_SKIP_LOCALE_SUFFIX.test(rel)) continue;
      // 配图目录整枝跳过（里面的 .md 基本都是占位桩）。
      // public/ 不在此列：只有 .md/.mdx 会成为页面，而 public 下的 md 恰恰是可下载的正文
      // —— 千问办公绿皮书把 73 篇教师技能定义放在 docs/public/skills/ 下，一刀切等于整片丢失。
      if (/(^|\/)(assets?|images?|img|media|static|figures?|documents)(\/|$)/i.test(rel)) continue;
      if (/(^|\/)source\.md$/i.test(rel)) continue;
      // 上游导出工具会在章节里再套一层同名镜像目录（…/第一部分 X/ide/第一部分 X/…），
      // 目录名重复说明整棵子树是副本，跳过。
      // 广义词目录名重复 ≠ 副本：Docusaurus 的 docs/docs/、Next.js 的 agents/.claude/agents/、
      // API 文档的 xxx/subresources/xxx/subresources/ 都是上游自己的正常布局。
      // 只有「长的内容目录名，隔着至少一层又出现一次」才是导出工具套的镜像壳。
      const GENERIC_DIR = new Set(["docs", "doc", "src", "source", "content", "contents", "website", "web", "site", "app", "apps", "packages", "package", "public", "static", "assets", "asset", "images", "image", "img", "media", "tests", "test", "examples", "example", "shared", "common", "skills", "skill", "agents", "agent", "references", "reference", "subresources", "resources", "resource", "api", "tools", "tool", "demo", "demos", "projects", "project", "templates", "template", "scripts", "lib", "libs", "core", "data", "main"]);
      const segsRaw = rel.split("/").slice(0, -1).map((x) => x.trim());
      const segsLow = segsRaw.map((x) => x.toLowerCase());
      const dirSegs = segsLow;
      let dupMirror = false;
      for (let i = 0; i < segsLow.length; i += 1) {
        const first = segsLow.indexOf(segsLow[i]);
        if (first === i || i - first < 2) continue;
        if (GENERIC_DIR.has(segsLow[i])) continue;
        if (segsRaw[i].length < 8) continue;
        dupMirror = true;
        break;
      }
      if (dupMirror) continue;
      // 上游导出工具还会把整章再套一层「去掉序号」的同名目录
      // （…/第二部分 实战案例 从具体任务，走向AI Native/部分 实战案例 从具体任务，走向AI Native/…），
      // 目录名互为子串、正文字字相同。这类子树同样是副本。
      if (dirSegs.some((seg, i) => i > 0 && seg.length >= 8 && dirSegs[i - 1].includes(seg))) continue;
      if (entryRel && rel === entryRel) continue;
      // 内容摘要：去掉标题行与空行再比。导出工具产出的副本常常只差一句章节标题，
      // 逐字节比不出来（千问办公绿皮书正本多一行「# 第1章 …」，副本没有，正文一字不差）。
      // 正文太短的页面不参与去重，短页面撞车是正常的。
      let digest = "";
      try {
        const norm = fs
          .readFileSync(abs, "utf8")
          .split(/\r?\n/)
          .filter((l) => !/^\s*#{1,6}\s/.test(l))
          .map((l) => l.trim())
          .filter(Boolean)
          .join("\n");
        if (norm.length >= 400) digest = crypto.createHash("sha1").update(norm).digest("hex");
      } catch {
        digest = "";
      }
      // 标题键：上游自己会出同一份正文的两个版本（「5个技巧教你用 TRAE 做复杂数据分析」
      // 与「5个技巧教你用 千问 做复杂数据分析」正文一字不差），只按正文比会把其中一页整页丢掉。
      // 去重要求「标题 + 正文」都对上，才认定是同一份。
      let titleKey = "";
      try {
        const raw = fs.readFileSync(abs, "utf8");
        const h1 = raw.match(/^[ \t]{0,3}#[ \t]+(.+?)[ \t]*$/m);
        const t = h1 ? h1[1] : path.basename(rel).replace(/\.mdx?$/i, "");
        titleKey = t
          .replace(/[\s\u3000]+/g, "")
          .replace(/[\u3010\u3011\[\]]/g, "")
          .replace(/[\uff5c|\uff1a:]/g, "")
          .toLowerCase();
      } catch {
        titleKey = rel;
      }
      staged.push({ abs, rel, digest, titleKey, size });
    }

    if (process.env.TB_TRACE_FILTER) {
      const pre = process.env.TB_TRACE_FILTER;
      const hit = staged.filter((x) => x.rel.startsWith(pre));
      console.error("STAGED " + s.id + " " + pre + " → " + hit.length + " 篇可上架" + (hit.length ? "" : "（已被过滤规则挡掉）"));
    }

    // 同一份正文出现多次时只留一条，而且必须留「正本」。
    // 早先按排序取第一条：副本树的名字（QwenWorkGuide/第一篇…）排在中文目录之前，
    // 结果副本把正本顶掉 —— 站上同一章一会儿来自副本、一会儿来自正本，看着就是一锅粥。
    // 现在比层级：层级最浅的那条是正本。
    const repOf = new Map();
    for (const it of staged) {
      if (!it.digest) continue;
      const key = it.titleKey + "\u0000" + it.digest;
      const depth = it.rel.split("/").length;
      const cur = repOf.get(key);
      if (!cur || depth < cur.depth || (depth === cur.depth && it.rel < cur.rel)) {
        repOf.set(key, { rel: it.rel, depth });
      }
    }

    // 整棵子树的副本，逐文件比是比不干净的：导出工具会连文件名带标题一起改
    // （「第一部分」→「第一篇」、「【实战案例】」→「[实战案例]」），摘要对不上。
    // 这里给每棵子树算指纹 —— 把「子树内相对路径 + 该文件的内容摘要」排序后取 sha1。
    // 指纹相同的子树是同一棵树，只留层级最浅的一棵。
    const dirFiles = new Map();
    for (const it of staged) {
      const segs = it.rel.split("/");
      for (let k = 0; k < segs.length - 1; k++) {
        const d = segs.slice(0, k + 1).join("/");
        const suffix = segs.slice(k + 1).join("/");
        if (!dirFiles.has(d)) dirFiles.set(d, []);
        dirFiles.get(d).push(suffix + "|" + (it.digest || "raw:" + suffix));
      }
    }
    const byFp = new Map();
    for (const [d, arr] of dirFiles) {
      arr.sort();
      const fp = crypto.createHash("sha1").update(arr.join("\n")).digest("hex");
      if (!byFp.has(fp)) byFp.set(fp, []);
      byFp.get(fp).push(d);
    }
    // 同一棵树只留一棵：把指纹相同的目录并成连通块，一个块里只有一个赢家。
    // 早先每个指纹组各自挑根、互相把对方挑掉过 —— 「5个技巧教你用 TRAE」与「5个技巧教你用 千问」
    // 两篇正文一模一样，A 组判 TRAE 是副本、B 组判 千问 是副本，结果两页一起从站上消失。
    // 另外要求目录同名（副本树的目录名总是一样的），避免把名字不同、内容相近的两章并成一章。
    const dirParent = new Map();
    const dirFind = (x) => {
      let r = x;
      while (dirParent.get(r) !== r) r = dirParent.get(r);
      return r;
    };
    const dirUnion = (a, b) => {
      const ra = dirFind(a);
      const rb = dirFind(b);
      if (ra !== rb) dirParent.set(rb, ra);
    };
    const dirBaseName = (d) =>
      d.split("/").filter(Boolean).pop().trim().toLowerCase().replace(/\s+/g, " ");
    const byFpRoot = new Map();
    for (const [fp, dirsRaw] of byFp) {
      if (dirsRaw.length < 2) continue;
      for (const d of dirsRaw) if (!dirParent.has(d)) dirParent.set(d, d);
      for (let i = 0; i < dirsRaw.length; i++) {
        for (let j = i + 1; j < dirsRaw.length; j++) {
          if (dirBaseName(dirsRaw[i]) !== dirBaseName(dirsRaw[j])) continue;
          dirUnion(dirsRaw[i], dirsRaw[j]);
        }
      }
    }
    const components = new Map();
    for (const d of dirParent.keys()) {
      const r = dirFind(d);
      if (!components.has(r)) components.set(r, []);
      components.get(r).push(d);
    }
    const mirrorDirOf = new Map();
    for (const [, members] of components) {
      if (members.length < 2) continue;
      // 互为祖孙的目录不参与删除（那是同一棵树往下套了一层空壳）。
      const flat = members.filter(
        (d) => !members.some((k) => k !== d && (k.startsWith(d + "/") || d.startsWith(k + "/")))
      );
      if (flat.length < 2) continue;
      flat.sort((a, b) => a.split("/").length - b.split("/").length || a.length - b.length || (a < b ? -1 : 1));
      for (const d of flat.slice(1)) mirrorDirOf.set(d, flat[0]);
    }

    // 单文件成书 / 超长文档：照它自己的标题层级切开，正文一字不动。
    // 不切的话，一页两三万字翻不到底（橙皮书 120KB、Codex 手册 2.2MB 都是这样），
    // 而超过 512KB 的以前干脆整篇丢掉。切开只改分页，不改文字。
    const SPLIT_MIN = 60 * 1024;
    const MAX_PARTS = 120;
    const MAX_PART_BYTES = 120 * 1024;
    const splitSections = (abs, base) => {
      let text = "";
      try {
        text = fs.readFileSync(abs, "utf8");
      } catch {
        return null;
      }
      const lines = text.split(/\r?\n/);
      const heads = [];
      const slug = (t) =>
        t
          .replace(/[^\w.\u4e00-\u9fff-]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .slice(0, 40) || "section";
      let fence = null;
      for (let i = 0; i < lines.length; i += 1) {
        const f = /^\s{0,3}(`{3,}|~{3,})/.exec(lines[i]);
        if (f) {
          fence = fence ? null : f[1][0];
          continue;
        }
        if (fence) continue;
        const h = /^(#{1,6})\s+(\S.*?)\s*$/.exec(lines[i]);
        if (h) heads.push({ line: i, level: h[1].length, text: h[2].replace(/[*`_]/g, "").trim() });
      }
      if (heads.length < 4) return null;
      const byLevel = new Map();
      for (const h of heads) byLevel.set(h.level, (byLevel.get(h.level) || 0) + 1);
      const levels = [...byLevel.keys()].sort((a, b) => a - b);
      // 选层：优先「最浅、且每一块都不超过 MAX_PART_BYTES」的那层。
      //   · 只认最浅层：5MB 的 API 参考如果只有 4 个一级标题，切出来每块 1.2MB，等于没切；
      //   · 只认「最大块最小」：80KB 的小文件会被切成 85 页，每页一行。
      // 先压体量、再取最浅，两头都躲开；实在都超标就退回「最大块最小」。
      const sizeOf = (a, b) => {
        let n = 0;
        for (let i = a; i < b; i += 1) n += lines[i].length + 1;
        return n;
      };
      let marks = null;
      let fallback = null;
      let fallbackWorst = Infinity;
      for (const L of levels) {
        const ms = heads.filter((h) => h.level === L);
        if (ms.length < 3 || ms.length > MAX_PARTS) continue;
        let worst = 0;
        ms.forEach((h, k) => {
          const to = k + 1 < ms.length ? ms[k + 1].line : lines.length;
          worst = Math.max(worst, sizeOf(h.line, to));
        });
        if (worst <= MAX_PART_BYTES) {
          marks = ms;
          break;
        }
        if (worst < fallbackWorst) {
          fallbackWorst = worst;
          fallback = ms;
        }
      }
      if (!marks) marks = fallback;
      if (!marks) return null;
      const parts = [];
      const pre = lines.slice(0, marks[0].line).join("\n");
      marks.forEach((h, k) => {
        const from = h.line;
        const to = k + 1 < marks.length ? marks[k + 1].line : lines.length;
        const body = lines.slice(from, to).join("\n").replace(/\s+$/, "");
        if (!body.trim()) return;
        parts.push({
          outRel: base + "/" + String(parts.length + 1).padStart(2, "0") + "-" + slug(h.text) + ".md",
          content: body,
          title: h.text,
        });
      });
      if (parts.length < 3) return null;
      const toc = parts.map((p) => {
        const rel = p.outRel.slice(base.length + 1).replace(/\.md$/, "");
        return "- [" + p.title + "](" + rel + ".md)";
      });
      const head = pre.trim() || "# " + (parts[0].title || base);
      return [
        {
          outRel: base + "/index.md",
          content: head + "\n\n## 本篇目录\n\n" + toc.join("\n") + "\n",
        },
        ...parts,
      ];
    };

    // 第二遍：留下代表条目，按正本的书目顺序上架。
    const dropped = new Map();
    for (const it of staged) {
      if (!it.digest) continue;
      const rep = repOf.get(it.titleKey + "\u0000" + it.digest);
      if (rep && rep.rel !== it.rel) dropped.set(it.rel, rep.rel);
      const segs = it.rel.split("/");
      for (let k = 1; k < segs.length; k++) {
        const d = segs.slice(0, k).join("/");
        if (mirrorDirOf.has(d)) {
          if (!dropped.has(it.rel)) dropped.set(it.rel, mirrorDirOf.get(d));
          break;
        }
      }
    }
    for (const it of staged) {
      const why = dropped.get(it.rel);
      if (why && process.env.TB_TRACE_FILTER && it.rel.startsWith(process.env.TB_TRACE_FILTER)) {
        console.error("DROP " + s.id + " " + it.rel + " ⟵ 与 " + why + " 判为同一份");
      }
      if (why) {
        mirrorSkipped.push(it.rel + "  与 " + why + " 是同一份正文，只留正本");
        continue;
      }
      const base = planOutRel(it.rel);
      if (!base) continue;
      // 单文件成书 / 超长文档按它自己的标题切开；切不动就整篇照搬，
      // 只有大到渲染不动的才按原样丢掉。
      if (it.size >= SPLIT_MIN) {
        const parts = splitSections(it.abs, base);
        if (parts) {
          for (const p of parts) add(it.abs, p.outRel, { content: p.content, noTrans: true, splitFrom: it.rel });
          splitLog.push(it.rel + "  " + it.size + "B  →  " + parts.length + " 页");
          continue;
        }
        // 无法按标题切分时仍保留完整正文。展示层可以接受超长单页，
        // 而 raw archive 始终保存原始字节；任何情况下都不能静默丢课。
        if (it.size > 512 * 1024) {
          splitLog.push(it.rel + "  " + it.size + "B  切不动，按原样保留单页");
        }
      }
      let outRel = base + ".md";
      let n = 2;
      while (seen.has(outRel)) outRel = base + "-" + n++ + ".md";
      add(it.abs, outRel);
    }
    const cap = plan.limit || MAX_DOCS;
    return { entryRel, list: cap ? list.slice(0, cap) : list, mirrorSkipped, splitLog };
  }

  return { entryRel, list: MAX_DOCS ? list.slice(0, MAX_DOCS) : list, mirrorSkipped, splitLog };
}

function stripFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return text;
  // 第一行的 --- 未必是 YAML 头，也可能就是一条分隔线。要求紧随其后出现 key: value，
  // 否则原样返回 —— 免得把以分隔线开头的正文从中间切断。
  let looksYaml = false;
  for (let i = 1; i < Math.min(lines.length, 12); i++) {
    if (lines[i].trim() === "---") break;
    if (/^[A-Za-z_][A-Za-z0-9_-]*\s*:/.test(lines[i])) { looksYaml = true; break; }
  }
  if (!looksYaml) return text;
  // 头部可以很长：教师技能包的定义块有 70~80 行（带 # 注释与嵌套列表），
  // 早先只找前 60 行，找不到闭合就当没有头 —— 结果整块 YAML 被当正文渲染到页面上，
  // 读者看到的是一屏 name:/description:/skill_id:（实例：千问办公 73 篇 skill 定义）。
  for (let i = 1; i < Math.min(lines.length, 400); i++) {
    if (lines[i].trim() === "---") return lines.slice(i + 1).join("\n").replace(/^\n+/, "");
  }
  return text;
}

// 正文里是否已经有一级标题。和 firstHeadingOf 一样要跳过代码块，
// 否则配置文件里的 "# 注释" 会被当成标题。
function hasH1(text) {
  let inFence = null;
  for (const line of text.split("\n")) {
    const t = line.trim();
    const f = /^(\x60{3,}|~{3,})/.exec(t);
    if (inFence) {
      if (f && /^(\x60{3,}|~{3,})$/.test(t) && f[1][0] === inFence[0] && f[1].length >= inFence.length) inFence = null;
      continue;
    }
    if (f) { inFence = f[1]; continue; }
    if (/^\s{0,3}#\s+\S/.test(line)) return true;
  }
  return false;
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
    // 列表项在 HTML 中必须各自闭合；上游偶尔把 <strong> 开在一项、
    // </strong> 放到下一项，Markdown 会把标签跨过 <li>，Vue 解析即失败。
    // 对列表项逐行平衡，孤立标记转成可见文本，不改正文字符。
    if (/^\s*(?:[-*+]\s+|\d+[.)]\s+)/.test(line)) {
      out.push(fixInlineBalance(line));
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
  return (
    text
      .replace(/\{\{/g, "&#123;&#123;")
      .replace(/\}\}/g, "&#125;&#125;")
      .replace(/<script/gi, "&lt;script")
      // 单个花括号也有坑：VitePress 的 markdown-it-attrs 会把行尾的 {...} 当 HTML 属性块。
      // 上游正文里的「… section.type ∈ { heading | paragraph | bullet }」会被整段吃掉，
      // 读者看到的是半句话；属性名撞车时（里面带两个竖线）Vue 直接报 Duplicate attribute，
      // 整站构建失败。花括号是 ASCII 标点，反斜杠转义后渲染结果与原文一致，
      // 但这个块不再是属性语法，Vue 也不会再认它。
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(VUE_DIRECTIVE_LINE, "$1&#123;%")
  );
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

// 上游偶尔多写一个孤立的 \`\`\` 围栏（手误），围栏之后的正文会被所有工序当成代码跳过，
// 里面的相对链接就一直没改写，构建时被判成死链（实测 3 条让整站构建失败）。
// 这里做最后一次兜底：全篇扫一遍剩下的相对 .md 链接，只改写「确实指向本站已发布页面」的，
// 指不到的一律原样留着，交给上游地址或后续人工处理。
function resolveLeftoverLinks(text, bySourceRel, currentSourceRel) {
  const decode = (u) => {
    if (!/%[0-9A-Fa-f]{2}/.test(u)) return u;
    try {
      return decodeURIComponent(u);
    } catch {
      return u;
    }
  };
  return text.replace(/(?<!!)(\[[^\[\]]*\]\()([^)\s]+)(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url)) return m;
    const clean = decode(url.split("#")[0].split("?")[0]);
    if (!clean) return m;
    const hash = url.includes("#") ? "#" + decode(url.slice(url.indexOf("#") + 1)) : "";
    const base = path.posix.dirname(currentSourceRel);
    const target = path.posix.normalize(path.posix.join(base, clean));
    // 「指向目录」的写法（../03-skills/）也要认：依次试目录里的 README / index，再试同名 .md
    const tries = [target, path.posix.join(target, "README.md"), path.posix.join(target, "index.md"), target + ".md"];
    let hit = null;
    for (const t of tries) {
      hit = bySourceRel.get(t);
      if (hit) break;
    }
    if (!hit) return m;
    return open + "/lib/" + hit.replace(/\.md$/, "") + hash + (title || "") + close;
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
  // Markdown 尖括号地址可包含空格。中文转载工具偶尔把“转存失败”提示和真实
  // 图片 URL 一起包进尖括号；展示层取出其中的远程 URL，原始字节仍由 raw 归档保留。
  const normalizeWrappedUrl = (value) => {
    const v = String(value || "").trim();
    const inner = v.startsWith("<") && v.endsWith(">") ? v.slice(1, -1).trim() : v;
    const embedded = /https?:\/\/\S+/i.exec(inner);
    return embedded ? embedded[0].replace(/[>]+$/, "") : inner;
  };
  const resolve = (url, isImage) => {
    const normalized = normalizeWrappedUrl(url);
    const clean = decode(normalized.split("#")[0].split("?")[0]);
    const hash = normalized.includes("#") ? "#" + decode(normalized.slice(normalized.indexOf("#") + 1)) : "";
    if (!clean) return { url, hash };
    // 站内已经落了盘的资源优先。
    // 「/workbuddy-harness/fig-02.png」这种写法指的是站内路径（文件就在 public 下），
    // 但下面会把开头的 / 当成「仓库根相对」再去拼上游地址拼接，
    // 结果是页面绕开本地文件、改从第三方加速通道取图。
    // 判定顺序：优化脚本转出来的同名 .webp 优先，其次是原文件本身。
    if (isImage && clean.startsWith('/') && !clean.startsWith('//')) {
      const rel = clean.slice(1);
      const webp = rel.replace(/\.(png|jpe?g|gif)$/i, '.webp');
      if (webp !== rel && fs.existsSync(path.join(PUBLIC_DIR, webp))) return { url: '/' + webp };
      if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return { url: clean };
    }
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
    // 某些上游文档把“站点根”链接写成 /reference/...、/api-reference/...。
    // 它们不是本仓库的文件，不能按仓库根拼成 GitHub blob；根据课程所属文档站点
    // 还原为可访问的绝对地址。未知来源继续走原有 blob 回退，不做猜测。
    if (!isImage && clean.startsWith("/")) {
      let host = "";
      if (s.site) {
        try { host = new URL(s.site).origin; } catch { host = ""; }
      }
      if (s.id === "07-coding/vibe-coding-cn") {
        if (/coingecko/i.test(currentSourceRel)) host = "https://docs.coingecko.com";
        else if (/polymarket/i.test(currentSourceRel)) host = "https://docs.polymarket.com";
        else if (/hummingbot/i.test(currentSourceRel)) host = "https://hummingbot.org";
      }
      if (host) return { url: host + clean + hash };
    }
    const blob = blobUrl(s, target);
    return blob ? { url: blob + hash } : { url: null };
  };

  text = text.replace(/(!\[[^\]]*\]\()((?:<[^>]*>|[^)\s]+))(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    const normalized = normalizeWrappedUrl(url);
    if (/^https?:/i.test(normalized)) {
      const l = localizeRaw(normalized);
      return open + (l === normalized ? normalized : l) + (title || "") + close;
    }
    if (/^data:/i.test(url)) return m;
    const r = resolve(url, true);
    return r.url ? open + r.url + (title || "") + close : "";
  });

  // 徽章写法「图片当链接文字」优先处理，否则嵌套的方括号会被拆错。
  text = text.replace(/(\[!\[[^\]]*\]\([^)]*\)\]\()((?:<[^>]*>|[^)\s]+))(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(normalizeWrappedUrl(url))) return m;
    const r = resolve(url, false);
    if (r.url) return open + r.url + (title || "") + close;
    // 链接目标不可达时只保留图片本身（内容不丢，只是不再可点）
    return m.replace(/^\[/, "").replace(/\]\([^)]*\)$/, "");
  });

  // 普通链接：链接文字里不再允许方括号，避免吞掉嵌套结构。
  // 开头加 (?<!!) 是为了不碰图片语法——![alt](url) 里的 [alt](url) 长得和普通链接一样，
  // 先改图片再改链接时会把刚写好的站内路径当成相对链接二次解析（站内镜像路径尤其明显）。
  text = text.replace(/(?<!!)(\[[^\[\]]*\]\()((?:<[^>]*>|[^)\s]+))(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(normalizeWrappedUrl(url))) return m;
    const r = resolve(url, false);
    if (r.url) return open + r.url + (title || "") + close;
    // 链接目标不可达时保留链接文字
    return open.slice(1, -2);
  });

  // 少数上游把「带方括号的标题」整段写进链接文字（[[实战案例]｜…](…)），第一遍吃不下。
  text = text.replace(/(\[[^\[\]\n]*\[[^\[\]\n]*\][^\[\]\n]*\]\()((?:<[^>]*>|[^)\s]+))(\s*(?:"[^"]*"|'[^']*'))?(\))/g, (m, open, url, title, close) => {
    if (/^(https?:|mailto:|data:|#)/i.test(normalizeWrappedUrl(url))) return m;
    const r = resolve(url, false);
    return r.url ? open + r.url + (title || "") + close : open.slice(1, -2);
  });

  // 模板占位符行「[DATE]: [PLACEHOLDER]」会被 markdown 当成引用式链接定义，
  // 生成一条指向 ./[PLACEHOLDER] 的死链，整站构建因此失败。
  // URL 段以方括号开头的一律不是地址，把行首方括号转义掉：可见文字不变，定义不再成立。
  // 行首可能还有列表符号（「- [DATE]: [PLACEHOLDER]」），一并认掉。
  text = text.replace(/^([ \t]*(?:[-*+][ \t]+|\d+[.)][ \t]+)?)\[([^\[\]]+)\]:([ \t]*)\[/gm, "$1\\[$2]:$3[");

  // 引用式链接定义：[标签]: 路径（Markdown 的另一种链接写法）
  text = text.replace(/^([ \t]*\[[^\[\]]+\]:[ \t]*\r?\n?[ \t]*)(\S+)([^\n]*)$/gm, (m, prefix, url, rest) => {
    if (/^(https?:|mailto:|data:|#)/i.test(url)) return m;
    return prefix + resolve(url, false).url + rest;
  });

  // 原始 HTML 里的 src / poster：单双引号都要认。微软官方课用的是 src='images/x.jpg'，
  // 只认双引号时相对路径会漏网，VitePress 会把它当待打包的静态资源，整站构建直接失败。
  // 指不回上游的（占位符等）整条属性去掉：不写 null，也不留一条指向空地址的破图。
  text = text.replace(/(\s(?:src|poster)=)(["'])([^"']*)\2/gi, (m, head, q, url) => {
    if (/^https?:/i.test(url.trim())) {
      const l = localizeRaw(url.trim());
      return l === url.trim() ? m : head + q + l + q;
    }
    if (/^data:/i.test(url)) return m;
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
        if (/^https?:/i.test(bits[0])) {
          const l = localizeRaw(bits[0]);
          if (l === bits[0]) return seg;
          bits[0] = l;
          return bits.join(" ");
        }
        if (/^data:/i.test(bits[0])) return seg;
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

// 上游正文里真的会出现「一句话以 <li 开头」的写法：
//   <li Only messages that actually came from the user (user-role turns) count as user messages. …
// 它会被 markdown 当成 HTML 块交给渲染器，Vue 编译时报 Duplicate attribute。
// 判定：标签名后面跟了一串「不是 attr / attr="…" 形式的裸词」，那就是句子不是标签，整体转义成文字。
function proseTagAttrs(raw) {
  if (!raw) return false;
  // 先把属性值掏空再判断：URL 和 alt 里出现括号、逗号、空格都是正常的
  const stripped = raw.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''");
  if (stripped.length > 100) return true;
  if (/[()\[\],;—–。，、！？]/.test(stripped)) return true;
  const inner = stripped.replace(/^<\/?[A-Za-z][A-Za-z0-9:-]*/, "").replace(/\/?>$/, "").trim();
  if (!inner) return false;
  const toks = inner.split(/\s+/).filter(Boolean);
  if (toks.length < 3) return false;
  let bare = 0;
  for (const t of toks) if (!/^[A-Za-z_:@.#-]+(=(""|''))?$/.test(t)) bare += 1;
  return bare >= 2;
}

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
      keep: HTML_TAGS.has(name) && !proseTagAttrs(m[0]),
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
      // MDX 的 <video src={某个变量} …>…</video>：静态书里没有这个变量，播不了，
      // 留在正文里就是一段渲染器过不去的坏标签。整块去掉，其余 <video src="…"> 照旧保留。
      .replace(/<video\b[^>]*\{[^>]*>[\s\S]*?<\/video>/gi, "")
      // Docusaurus 风格的类属性语法「[文字](链接){:.external}」在 VitePress 里会生成
      // 空的属性对象，Vue 编译成 _mergeProps(a, , b) 直接是语法错误、整站构建失败。
      // 只去属性声明，链接与文字一字不动。{#anchor} 是有效写法，保留。
      .replace(/\{:\s*[^}\n]*\}/g, "")
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
    // 居中块里原来把 <img> 也一并丢掉，结果上游最标准的插图写法
    // 「<div align="center"><img src="…" width="90%"></div>」整片消失。
    // 实测全站因此丢掉 5874 张图（hello-agents 461 张、codex-orange-book 123 张全没了）。
    // 徽章另有 shields.io 等规则兜底，这里只丢链接壳，图片留下。
    if (centered > 0 && (/^<\/?a\b/i.test(t) || /^\[?!\[/i.test(t))) continue;
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
  let finalText = out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(?:^|\n)---(\s*\n---)+/g, "\n")
    .trim();

  // 有些上游把 VitePress 站点的页面骨架（<script setup> / <style> / <template>）也放进了 md，
  // 那不是课程内容，整篇不要，免得读者看到一堆 &lt;script setup>。
  // 上游的 md 里常带站点的 <style> / <script> 块（VitePress 允许在页面正文里写样式与脚本）。
  // 那是页面皮肤，不是课程内容：整篇丢掉等于整页蒸发（千问办公的案例集首页就是这么没的），
  // 原样留着读者又会看到一大段 CSS。这里只把这两类块剪掉，正文一个字不动。
  finalText = finalText
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!finalText) return "";

  const bodyLines = finalText.split("\n").filter((l) => l.trim());
  const scaffold = bodyLines.filter((l) => /^<\/?(script|style|template)\b/i.test(l.trim())).length;
  // 剪完仍然只剩界面壳子（整篇是 <template> / <script setup>，没有散文）才整篇不要。
  if (scaffold >= 2 && finalText.replace(/<[^>]*>/g, "").replace(/[#>*-`|:\s]/g, "").length < 200) return "";

  // 整篇以裸 HTML/JSX 标记为主（上游把界面骨架写进 md）的文档不是课程内容，整篇不要
  // 整篇以标记语言为主、几乎没有散文的文档才是界面骨架。
  // 早先只比「以 < 开头的行数占比」，把正文里正常用 <img>/<span>/<Tip> 的页面整篇判死：
  // 千问办公「6.13 工作台-写作」53 行里 15 行是 <img>/<span>，整页连同 4 张插图一起消失；
  // 全站实测 400 篇被这条规则误杀（Anthropic 官方文档 39 篇、Claude Code 文档 30 篇、
  // 扣子开发文档 47 篇）。现在补一个必要条件：去掉标签后的散文不足 200 字才算骨架。
  const markup = bodyLines.filter((l) => /^<\/?[A-Za-z][^>]*>/.test(l.trim())).length;
  const prose = finalText.replace(/<[^>]*>/g, "").replace(/[#>*-`|:\s]/g, "").length;
  if (markup >= 4 && prose < 200) return "";

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

// Windows 上刚写完的文件会被实时扫描/索引短暂占用，直接写会抛
// UNKNOWN: unknown error, open '…'，一次就中断整轮生成。这里做几次退避重试。
function writeFile(p, text) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const data = text.replace(/\r\n/g, "\n");
  for (let attempt = 0; ; attempt += 1) {
    try {
      fs.writeFileSync(p, data, "utf8");
      return;
    } catch (err) {
      if (attempt >= 6) throw err;
      const until = Date.now() + 60 * (attempt + 1);
      while (Date.now() < until) {
        /* 忙等：生成流程是单线程的，这里没有别的事可做 */
      }
    }
  }
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
    // escapeVueAndTags 可能把一个孤立的开标签转成实体，导致其配对的闭标签
    // 变成新的孤立标签；再平衡一次，确保展示 Markdown 不向 Vue 泄漏非法闭合标签。
    text = mapOutsideCode(text, balanceInlineTags);
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

// 把一门课的课时按上游目录结构编成导航树。
//
// 为什么要有这一步：站点原先给每门课生成一条一维侧栏，把整门课摊成一列。
// 上游自己分好的章（「第一部分 使用手册」「第6章 桌面端核心功能」…）在侧栏里全没了，
// 一门 1150 页的课就变成一条一千多行的列表，读者根本找不到自己在哪。
// 这里直接用课时在上游仓库里的目录层级建树，上游怎么分章，站上就怎么分。
// 上游仓库自带导航定义时，标题与顺序一律照搬上游（VitePress sidebar / mdBook SUMMARY / mkdocs nav），
// 只有上游没列到的页面才按目录结构补在后面——既不自己编顺序，也不漏页。
// 目录名对读者没有信息量的（public / cases / src …），换一个读得懂的说法。
const NAV_DIR_LABEL = {
  public: "配套资源",
  cases: "案例集",
  submissions: "社区投稿",
  community: "社区与共建",
  plans: "更新计划",
  help: "常见问题",
  quiz: "练习与测验",
  quizzes: "练习与测验",
  projects: "动手项目",
  examples: "示例",
  solutions: "参考答案",
  exercises: "练习",
  assets: "素材与资源",
  src: "源码",
  docs: "文档",
};
const labelOfDir = (name) => NAV_DIR_LABEL[String(name).trim().toLowerCase()] || name;

function buildNav(lessons, vol, local, navOverride) {
  const link = (d) => `/lib/${vol}/${local}/${d.rel}`;
  const segsOf = (d) => d.sourceRel.split("/").slice(0, -1);
  const isDirIndex = (d) => /^(index|README)\.mdx?$/i.test(d.sourceRel.split("/").pop() || "");

  // 所有课时共有的目录前缀（如 docs/greenbook）在导航里不带信息，先去掉。
  const dirs = lessons.map(segsOf);
  // 挂在仓库根上的入口文档（README.md）没有目录层级，让它参与公共前缀计算会把前缀算成空，
  // 侧栏第一层就变成 docs / content 这种仓库内部目录名。只拿真正有层级的课时算前缀。
  const leveled = dirs.filter((d) => d.length);
  const prefix = [];
  if (leveled.length) {
    for (let i = 0; ; i += 1) {
      const seg = leveled[0][i];
      if (seg === undefined) break;
      if (leveled.every((x) => x[i] === seg)) prefix.push(seg);
      else break;
    }
  }

  const root = { kids: new Map(), items: [], index: null };
  lessons.forEach((d, k) => {
    const segs = dirs[k].slice(prefix.length);
    let node = root;
    for (const seg of segs) {
      if (!node.kids.has(seg)) node.kids.set(seg, { label: seg, kids: new Map(), items: [], index: null });
      node = node.kids.get(seg);
    }
    if (isDirIndex(d)) node.index = d;
    else node.items.push(d);
  });

  // 目录分两种：自己带 index 的，index 当这一级的入口（点标题就进去）；
  // 不带 index 的，标题只是分组名，点不开。
  const walk = (node) => {
    const out = node.items.map((d) => ({ text: d.title, link: link(d) }));
    for (const kid of node.kids.values()) {
      const sub = walk(kid);
      if (!sub.length && !kid.index) continue;
      // 分组标题优先用该目录 index 页自己的 H1 —— 上游的章节标题写在正文里，
      // 目录名却是导出工具生成的 slug（cases/submissions/annual-report-…）。
      const item = { text: kid.index ? kid.index.title : labelOfDir(kid.label), items: sub };
      if (kid.index) item.link = link(kid.index);
      // 长课程默认折叠：一屏铺开几百行，反而没人用侧栏。
      if (sub.length > 8) item.collapsed = true;
      out.push(item);
    }
    return out;
  };

  const items = walk(root);
  if (root.index) items.unshift({ text: root.index.title, link: link(root.index) });

  if (!navOverride || !navOverride.length) return items;

  const used = new Set();
  // 把上游导航里的路径解析到某一课时上：route 可能写成目录（/greenbook/第1章…/）
  // 也可能写成相对文件（Chapter1/README.md、agents.md）。
  // 把上游导航里的路径解析到某一课时上。上游写法有两类：
  //   文件式 —— Chapter1/README.md、docs/zh/quickstart.md、AI/xxx/yyy.md
  //   目录式 —— /greenbook/第一部分…/第1章…/（站点路由，去掉仓库里的公共前缀后与目录同名）
  const matchRoute = (route) => {
    let raw = String(route || "").trim();
    if (!raw) return null;
    try { raw = decodeURIComponent(raw); } catch {}
    raw = raw.replace(/^\/+/, "").replace(/\/+$/, "");
    if (!raw) return null;
    const free = lessons.filter((d) => !used.has(d));
    if (!free.length) return null;
    const isIndex = (d) => /(^|\/)(index|README)\.mdx?$/i.test(d.sourceRel);
    const stemOf = (d) => d.sourceRel.split("/").pop().replace(/\.mdx?$/i, "");

    if (/\.mdx?$/i.test(raw)) {
      const rel = raw.replace(/^\.\//, "");
      const exact = free.find((d) => d.sourceRel === rel);
      if (exact) return exact;
      const byTail = free.filter((d) => d.sourceRel.endsWith("/" + rel));
      // 同名的候选里先看层级最浅的那个：docs/index.md 不该被指到 docs/zh/index.md。
      byTail.sort((a, b) => a.sourceRel.split("/").length - b.sourceRel.split("/").length);
      if (byTail.length) return byTail.find(isIndex) || byTail[0];
      return null;
    }

    const segs = raw.split("/").filter(Boolean);
    // 从最长的后缀开始试，逐段放宽：上游路由的站点前缀（greenbook、bluebook）
    // 与仓库目录（docs/greenbook）对不上，但结尾几段一定同名。
    for (let take = segs.length; take >= 1; take -= 1) {
      const tail = segs.slice(segs.length - take);
      const pool = free.filter((d) => {
        const dirs = d.sourceRel.split("/").slice(0, -1);
        if (take > dirs.length) return false;
        return tail.every((x, i) => dirs[dirs.length - take + i] === x);
      });
      if (!pool.length) continue;
      const idx = pool.find(isIndex);
      if (idx) return idx;
      // 目录名本身就是文件名（第1章 初识 千问办公.md）时优先取这一篇。
      const last = tail[tail.length - 1];
      const stem = pool.find((d) => stemOf(d) === last);
      return stem || pool[0];
    }
    const last = segs[segs.length - 1];
    return free.find((d) => stemOf(d) === last) || null;
  };
  const build = (list) => {
    const out = [];
    for (const raw of list) {
      const node = { text: raw.text };
      if (raw.items && raw.items.length) {
        const kids = build(raw.items);
        if (kids.length) node.items = kids;
      }
      if (raw.route) {
        const hit = matchRoute(raw.route);
        if (hit) { node.link = link(hit); used.add(hit); }
      }
      if (node.link || (node.items && node.items.length)) out.push(node);
    }
    return out;
  };
  const upstream = build(navOverride);
  // 上游导航如果只认出零星几篇（多是占位式侧栏，或本仓库的目录结构与它不一致），
  // 直接采信会把整门课压成两三个条目，剩下的全变成尾巴。覆盖率太低就退回按目录编树。
  const minCov = Math.min(8, Math.max(3, Math.ceil(lessons.length * 0.1)));
  if (used.size < minCov) {
    if (process.env.TB_NAV_DEBUG) {
      console.log(`     · 导航覆盖不足，退回目录结构：${vol}/${local} 认出 ${used.size}/${lessons.length}`);
    }
    return items;
  }
  if (process.env.TB_NAV_DEBUG) {
    console.log(`     · 导航照搬上游：${vol}/${local} ${used.size}/${lessons.length} 篇`);
  }
  // 上游导航没列到的页面（案例集、技能库、阅读指南这类），按目录结构补在后面。
  const rest = lessons.filter((d) => !used.has(d) && d.rel !== "overview");
  const extra = rest.length ? buildNav(rest, vol, local, null) : [];
  return upstream.concat(extra);
}

// 课程页的目录：同一棵树，渲染成嵌套列表。
function navToMarkdown(items, indent) {
  const pad = "  ".repeat(indent);
  const out = [];
  for (const it of items) {
    const head = it.link ? `[${it.text}](${it.link}.md)` : `**${it.text}**`;
    out.push(pad + "- " + head);
    if (it.items && it.items.length) out.push(...navToMarkdown(it.items, indent + 1));
  }
  return out;
}

// ---------- 主流程 ----------

const selected = catalog.sources.filter((s) => {
  if (args.onlySrc && s.id !== args.onlySrc) return false;
  if (BATCH_VOLUMES && !BATCH_VOLUMES.has(s.volume)) return false;
  if (BATCH_KINDS && !BATCH_KINDS.has(s.kind)) return false;
  if (PUBLIC_BUILD && !s.publishable) return false;
  return true;
});

rmrf(LIB);
rmrf(SOURCES_DIR);
fs.mkdirSync(GEN, { recursive: true });

const registered = [];
let docCount = 0;

for (const s of selected) {
  const { entryRel, list: set, splitLog } = readingSet(s);
  if (splitLog && splitLog.length && process.env.TB_SPLIT_LOG) {
    splitLog.forEach((x) => console.error("SPLIT  " + s.id + "  " + x));
  }
  // 原来「少于 2 篇就跳过」，于是 5 份「可转载」的单文档清单（一份长 README，
  // 113KB–307KB）整份没上站。改成：空壳才跳，单篇要有实质体量才收。
  if (set.length < 2) {
    const only = set[0];
    let big = false;
    try {
      big = Boolean(only) && fs.statSync(only.abs).size >= 20000;
    } catch {
      big = false;
    }
    if (!big) continue;
  }
  const outDir = path.posix.join(s.volume, s.local);
  // 上游有些页面整页都是组件壳子，清洗后是空的、不会进书；链接指向它们就会变成死链。
  const usable = set.filter((d) => !isStubDoc(d));
  // 一个源文件拆成多页时，指向这个文件的站内链接要落到目录页。
  const bySourceRel = new Map();
  for (const d of usable) {
    const cur = path.posix.join(outDir, d.outRel);
    const prev = bySourceRel.get(d.relInSource);
    if (!prev || /\/index$/.test(cur)) bySourceRel.set(d.relInSource, cur);
  }

  const trans = loadTranslation(s);
  const pages = [];
  const processed = new Map();
  for (const d of set) {
    const raw = d.content != null ? d.content : fs.readFileSync(d.abs, "utf8");
    // d.content 可能是按标题拆出的展示页；来源校验必须始终指向完整上游文件，
    // 因此 sourceSha256 取 d.abs 的原始字节，pageSha256 单独记录当前展示片段。
    const sourceBytes = fs.readFileSync(d.abs);
    const body = stripChrome(stripFrontmatter(raw));
    if (!body.trim() || isStubBody(body)) { if (process.env.TB_TRACE_FILTER && String(d.relInSource || "").startsWith(process.env.TB_TRACE_FILTER)) console.error('STUB-DROP ' + s.id + ' ' + d.relInSource + ' len=' + body.replace(/\s/g, '').length); if (process.env.TB_TRACE) console.error('SKIP ' + d.relInSource + ' len=' + body.replace(/\s/g,'').length); continue; }
    const title = firstHeadingOf(body, s.title);
    let text = mapOutsideCode(body, (chunk) => rewriteLinks(chunk, s, d.relInSource, bySourceRel, path.posix.join(outDir, d.outRel)));
    text = mapOutsideCode(text, sanitizeHtml);
    text = mapOutsideCode(text, balanceInlineTags);
    text = mapOutsideCode(text, escapeVueAndTags);
    text = mapOutsideCode(text, vPreInlineCode);
    text = mapOutsideCode(text, unescapeTagsInInlineCode);
    text = resolveLeftoverLinks(text, bySourceRel, d.relInSource);
    text = withTranslations(text, d.noTrans ? undefined : trans[d.relInSource]);
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
      entryUrl: d.relInSource ? blobUrl(s, d.relInSource) : (entryRel ? blobUrl(s, entryRel) : s.site || ""),
      sourceRel: d.relInSource || "",
      rawUrl: d.relInSource ? `/raw/${s.id}/${d.relInSource}` : "",
      sourceSha256: crypto.createHash("sha256").update(sourceBytes).digest("hex"),
      pageSha256: crypto.createHash("sha256").update(raw, "utf8").digest("hex"),
      contentMode: CONTENT_MODE,
      zh: Array.isArray(trans[d.relInSource]) && trans[d.relInSource].length ? "on" : "",
    };
    const fmText = Object.entries(fm)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join("\n");
    // 上游有些页面正文本身没有一级标题（README 直接以链接列表开头）。
    // 这类页面打开后顶部只有面包屑，读者看不出自己在哪一课，所以补一个标题。
    // 拆出来的分页本身以小节标题开头，再补一级标题会变成「标题重复两行」。
    const body0 = d.content != null || hasH1(text) ? text : `# ${title}\n\n${text}`;
    writeFile(outPath, `---\n${fmText}\n---\n\n${body0}\n`);
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
    sourceRel: "",
    contentMode: CONTENT_MODE,
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
    ...navToMarkdown(buildNav(lessons, s.volume, s.local, navOverrideOf(s.id)), 0),
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
    nav: buildNav(pages, s.volume, s.local, navOverrideOf(s.id)),
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
    `export interface CourseDoc { title: string; rel: string; sourceRel: string; rawUrl?: string; sourceSha256?: string; pageSha256?: string }`,
    `export interface NavItem { text: string; link?: string; items?: NavItem[]; collapsed?: boolean }\nexport interface Course { id: string; volume: string; local: string; title: string; kind: string; category: string; tier: number; license: string; licenseLabel: string; lang: string; publishable: boolean; repo: string | null; site: string | null; commit: string | null; sourceUrl: string | null; docs: CourseDoc[]; nav: NavItem[] }`,
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
home.push("页面顶部的搜索可以直接检索所有课程正文，中英文均可。", "");
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
      out.push(`| ★★★ [${c.title}](/lib/${c.volume}/${c.local}/index) | ${c.category} | ${c.docs.length} | ${c.sourceUrl ? `[打开 ↗](${c.sourceUrl})` : "—"} |`);
    }
    out.push("");
  }
  const rest = sortCourses(portedHere.filter((c) => c.tier !== 1));
  if (rest.length) {
    out.push("## 进阶与参考", "");
    out.push("| 课程 | 分类 | 分级 | 课时 | 原文 |");
    out.push("|---|---|---|---|---|");
    for (const c of rest) {
      out.push(`| [${c.title}](/lib/${c.volume}/${c.local}/index) | ${c.category} | ${stars(c.tier)} ${TIER_LABEL[c.tier]} | ${c.docs.length} | ${c.sourceUrl ? `[打开 ↗](${c.sourceUrl})` : "—"} |`);
    }
    out.push("");
  }
  const outside = list.filter((s) => !portedIds.has(s.id));
  if (outside.length) {
    out.push("## 官方文献与外链", "");
    out.push("| 来源 | 类型 · 许可 · 语言 | 课时 | 原文 |");
    out.push("|---|---|---|---|");
    for (const s of outside) {
      out.push(`| ${s.title} | <span class="tb-nb">${s.kind}</span> · <span class="tb-nb">${s.licenseLabel}</span> · <span class="tb-nb">${s.lang}</span> · <span class="tb-nb">${s.md} md</span> | <span class="tb-nb">${s.lessons || "—"}</span> | <span class="tb-nb">${upstreamUrl(s) ? `[原文 ↗](${upstreamUrl(s)})` : "—"}</span> |`);
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
    `| ${i + 1} | ${s.title} | <span class="tb-nb">${v ? v.name : s.volume}</span> | <span class="tb-nb">${s.kind}</span> · <span class="tb-nb">${s.licenseLabel}</span> · <span class="tb-nb">${s.lang}</span> · <span class="tb-nb">${s.md} md</span> | <span class="tb-nb">${staged ? `[站内](/lib/${s.volume}/${s.local}/index)` : "—"} · ${upstreamUrl(s) ? `[原文 ↗](${upstreamUrl(s)})` : "—"}</span> |`
  );
});
src.push("");
writeFile(path.join(DOCS, "sources", "index.md"), src.join("\n"));

// 关于本站
const zhStat = (function () {
  let courses = 0, pages = 0, slots = 0;
  try {
    for (const vol of fs.readdirSync(TRANS_DIR)) {
      const dir = path.join(TRANS_DIR, vol);
      if (!fs.statSync(dir).isDirectory()) continue;
      for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith(".json")) continue;
        const obj = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
        let filled = 0;
        for (const v of Object.values(obj)) {
          if (!Array.isArray(v)) continue;
          filled += v.filter((x) => typeof x === "string" && x.trim()).length;
        }
        if (!filled) continue;
        courses += 1;
        pages += Object.keys(obj).length;
        slots += filled;
      }
    }
  } catch {
    /* 还没有译文目录时按 0 处理 */
  }
  return { courses: courses, pages: pages, slots: slots };
})();
const enPages = registered.reduce((n, s) => n + (s.lang === "英文" ? s.docs.length : 0), 0);
const m = [];
m.push("---", 'title: "关于本站"', "---", "");
m.push("# 关于本站", "");
m.push("本站是一份开放课程与官方文献的编排索引：把散落在各个仓库与站点里的高质量材料，按学习路径组织成一条可以读下去的顺序。", "");
m.push("## 正文从哪里来", "");
m.push("| 环节 | 做法 |");
m.push("|---|---|");
m.push("| <span class=\"tb-nb\">正文</span> | 与上游快照逐字一致 |");
m.push("| <span class=\"tb-nb\">链接</span> | 同课程内文档走站内，其余指回上游原文 |");
m.push("| <span class=\"tb-nb\">图片</span> | 上游锚定版本的原图；站内已镜像的走站内，其余经加速通道 |");
m.push("| <span class=\"tb-nb\">可见文本</span> | 仅去掉仓库门面（徽章、居中 logo、许可与引用尾巴）|");
m.push("| <span class=\"tb-nb\">翻译</span> | 英文材料附逐段中文释义，默认收起，不替换原文；未覆盖的仍以原文呈现 |");
m.push("");
m.push("## 分类口径", "");
m.push("| 维度 | 取值 |");
m.push("|---|---|");
m.push(`| <span class="tb-nb">学习路径</span> | ${catalog.volumes.length} 条，代表知识依赖顺序 |`);
m.push(`| <span class="tb-nb">分类</span> | ${CATEGORY_ORDER.join(" / ")} |`);
m.push("| <span class=\"tb-nb\">分级</span> | ★★★ 主线 / ★★ 进阶 / ★ 参考 |");
m.push("| <span class=\"tb-nb\">许可</span> | 可转载 / 限非商用 / 仅引用（仅引用者只提供外链与索引）|");
m.push("");
m.push("## 目录数据", "");
m.push(`- 来源 ${T.sources} 条 · Markdown ${T.markdown} 篇 · 文件 ${T.files} 个`);
if (zhStat.courses) {
  m.push(`- 逐段中文释义：${zhStat.courses} 门 · ${zhStat.pages} 篇 · 已译 ${zhStat.slots} 段（英文材料 ${enPages} 篇）`);
} else {
  m.push(`- 逐段中文释义：英文材料 ${enPages} 篇，译文陆续补入`);
}
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
console.log(`  图片：站内镜像 ${imgStat.local} · 核实替代地址 ${imgStat.remap} · 加速通道 ${imgStat.proxied}`);
