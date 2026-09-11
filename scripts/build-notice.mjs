#!/usr/bin/env node
// 生成 NOTICE.md：第三方内容的出处、锚定版本与许可，逐条列出。
//
// 定位：本仓库对外发布的署名与许可声明载体。内容全部来自 catalog/catalog.json，
// 不写课程正文、不改上游文本。
//
// 真源：catalog/catalog.json（由 scripts/build-catalog.mjs 生成）
// 产物：NOTICE.md
//
// 用法：node scripts/build-notice.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = path.join(ROOT, "catalog", "catalog.json");
const LIB = path.join(ROOT, "site", "docs", "lib");

const catalog = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const hasLib = (dir) => fs.existsSync(path.join(LIB, ...dir.split("/")));

const CLASS_LABEL = { republish: "可转载", conditional: "限非商用", "cite-only": "仅引用" };
const CLASS_ORDER = { republish: 1, conditional: 2, "cite-only": 3 };

const esc = (s) => String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");
const volumeName = new Map(catalog.volumes.map((v) => [v.id, v.name]));

function upstreamCell(s) {
  if (s.repo) return `[${esc(s.repo)}](https://github.com/${s.repo})`;
  if (s.site) return `[${esc(s.site.replace(/^https?:\/\//, "").replace(/\/$/, ""))}](${s.site})`;
  return "—";
}

function entryCell(s) {
  if (s.repo && s.entry) return `[原文](${blob(s, s.entry)})`;
  if (s.repo) return `[原文](https://github.com/${s.repo})`;
  if (s.site) return `[原文](${s.site})`;
  return "—";
}

function blob(s, rel) {
  if (s.repo && s.commit) return `https://github.com/${s.repo}/blob/${s.commit}/${rel}`;
  if (s.repo) return `https://github.com/${s.repo}/blob/HEAD/${rel}`;
  return s.site || null;
}

const rows = catalog.sources.map((s) => ({ ...s, live: hasLib(s.dir) }));
const live = rows
  .filter((r) => r.live)
  .sort((a, b) => a.volumeOrder - b.volumeOrder || a.title.localeCompare(b.title, "zh"));
const dead = rows
  .filter((r) => !r.live)
  .sort(
    (a, b) =>
      a.volumeOrder - b.volumeOrder ||
      CLASS_ORDER[a.licenseClass] - CLASS_ORDER[b.licenseClass] ||
      a.title.localeCompare(b.title, "zh")
  );

const count = (cls) => rows.filter((r) => r.licenseClass === cls).length;

const L = [];
const push = (...xs) => L.push(...xs);

push("# 第三方内容许可与署名（NOTICE）", "");
push("本仓库是一份**教育与学习用途**的资料汇编，收录了大量第三方课程与文档。");
push("这些内容的著作权归各自的上游作者与组织所有，**不适用本仓库根目录 `LICENSE` 中的 MIT 许可**。");
push("本文件逐条列出全部来源的出处、锚定版本与许可，作为署名与许可声明的载体。", "");
push("## 0. 许可分级", "");
push("| 级别 | 含义 | 本仓库的处理 | 条数 |");
push("|---|---|---|---|");
push(`| 可转载 | MIT / Apache-2.0 / CC0 / CC-BY / CC-BY-SA / GPL 等允许再分发的许可 | 收录全文，按上游要求保留署名与许可声明 | ${count("republish")} |`);
push(`| 限非商用 | CC BY-NC / CC BY-NC-SA / 厂商自定义条款，禁止商业使用 | 收录全文，仅限非商业的教育与学习用途 | ${count("conditional")} |`);
push(`| 仅引用 | 官方文档与博客站点条款、未声明许可 | **不收录正文**，只登记来源并提供原文入口 | ${count("cite-only")} |`);
push("");
push(`合计 ${rows.length} 条来源，其中 ${live.length} 条已在站内提供可直读全文，${dead.length} 条仅登记来源。`, "");
push("> **权利人请注意**：若你是此处任何一份内容的著作权人，并希望我们调整收录方式（例如补充署名、替换链接或移除正文），请在仓库提 Issue，我们会立即处理。", "");

push(`## 1. 已收录全文的来源（${live.length} 条）`, "");
let vol = null;
live.forEach((s, i) => {
  if (s.volume !== vol) {
    vol = s.volume;
    push("", `### ${volumeName.get(vol) || vol}（\`${vol}\`）`, "");
    push("| # | 课程 | 上游 | 锚定版本 | 许可 | 级别 | 站内入口 |");
    push("|---|---|---|---|---|---|---|");
  }
  push(
    `| ${i + 1} | ${esc(s.title)} | ${upstreamCell(s)} | ${s.commit ? `\`${s.commit.slice(0, 10)}\`` : "—"} | ` +
      `${esc(s.license)} | ${CLASS_LABEL[s.licenseClass]} | ` +
      `[站内](site/docs/lib/${s.dir}/index.md) · [来源页](site/docs/sources/${s.dir}.md) |`
  );
});
push("");

push(`## 2. 仅登记来源、未收录正文（${dead.length} 条）`, "");
push("这些来源受站点条款限制或未声明许可，因此**正文未进入本仓库**。它们仍被登记在目录中，并提供原文入口，供读者前往上游阅读。", "");
vol = null;
dead.forEach((s, i) => {
  if (s.volume !== vol) {
    vol = s.volume;
    push("", `### ${volumeName.get(vol) || vol}（\`${vol}\`）`, "");
    push("| # | 来源 | 上游 | 类型 | 许可 | 级别 | 原文入口 |");
    push("|---|---|---|---|---|---|---|");
  }
  push(
    `| ${i + 1} | ${esc(s.title)} | ${upstreamCell(s)} | ${esc(s.kind)} | ` +
      `${esc(s.license)} | ${CLASS_LABEL[s.licenseClass]} | ${entryCell(s)} |`
  );
});
push("");

push("## 3. 常见许可要点", "");
push("- **MIT / MIT-0**：允许再分发与修改，须保留原始版权声明与许可声明。全文见 `LICENSES/MIT.txt`。");
push("- **Apache-2.0**：允许再分发与修改，须保留版权、许可与 NOTICE 声明，并标明改动。全文见 `LICENSES/Apache-2.0.txt`。");
push("- **CC0-1.0**：作者放弃著作权，可自由使用。");
push("- **CC-BY-4.0 / CC-BY-SA-4.0**：允许再分发，须署名；SA 版本要求演绎作品以相同许可分发。");
push("- **CC-BY-NC-4.0 / CC-BY-NC-SA-4.0**：允许再分发，须署名，**禁止商业使用**。");
push("- **GPL-3.0**：允许再分发，演绎作品须以 GPL 分发并提供源码。");
push("- **仅引用类**：来源于官方文档站、官方博客或未声明许可的仓库，本仓库不转载正文，仅提供链接。");
push("");
push("各类 Creative Commons 许可的完整文本见 <https://creativecommons.org/licenses/>。", "");

push("## 4. 本站自有的中文释义", "");
push("`translations/` 下的逐段中文释义由本项目在原文基础上翻译生成，用于辅助阅读。");
push("译文不改变原文内容，也不替代原文；原作的著作权状态不因翻译而改变。");
push("这些释义以 MIT 许可发布，可与本项目的代码一同使用。", "");

push("## 5. 引用与再分发建议", "");
push("若你要基于本仓库继续做课程汇编，请：", "");
push("1. 保留 `NOTICE.md` 与 `LICENSES/` 目录；");
push("2. 保留每门课程相对上游的出处、锚定版本与许可标注；");
push("3. 不要把「限非商用」的课程用于商业场景；");
push("4. 不要把「仅引用」类来源的正文补进你的仓库。", "");

const text = L.join("\n");
fs.writeFileSync(path.join(ROOT, "NOTICE.md"), text, "utf8");
console.log(`NOTICE.md 已生成：${text.length} 字节 · 全文 ${live.length} 条 · 仅登记 ${dead.length} 条`);
