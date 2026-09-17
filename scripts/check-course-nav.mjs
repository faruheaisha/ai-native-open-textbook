#!/usr/bin/env node
// 课程型来源必须有可追溯的上游导航；不接受静默目录树兜底作为完成状态。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog/catalog.json"), "utf8"));
const nav = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog/upstream-nav.json"), "utf8"));
const kinds = new Set(["系统课程", "课时教程", "工程手册", "实践案例集"]);
const bad = [];
// 仅引用且没有 Markdown 课程页的站点文章没有可落地的站内课时导航；
// 它们由来源清单与外链入口负责追踪，不应被误判为缺失课程侧栏。
const checkedSources = catalog.sources.filter((x) => kinds.has(x.kind) && !(x.publishable === false && Number(x.md || 0) === 0));
const excluded = catalog.sources.filter((x) => kinds.has(x.kind) && x.publishable === false && Number(x.md || 0) === 0);
for (const s of checkedSources) {
  const tree = nav[s.id];
  if (!Array.isArray(tree) || !tree.length) bad.push(`${s.id} (missing nav)`);
}
console.log("course nav: checked=" + checkedSources.length + " excluded-cite-only=" + excluded.length + " bad=" + bad.length);
for (const s of excluded) console.log("NAV-SKIP " + s.id + " (cite-only external material)");
for (const x of bad) console.error(`NAV ${x}`);
if (bad.length) process.exit(1);
