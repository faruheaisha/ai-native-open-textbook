#!/usr/bin/env node
// 在新电脑上恢复 upstream/ 上游快照（可再生成物，不入库）。
// 依据 catalog/catalog.json 的 repo + commit 锚点，把 124 个 Git 来源浅克隆到
// upstream/<卷>/<课程>/；19 个无 repo 的网页导出类来源无法克隆，脚本会列出清单，
// 需从旧电脑拷贝（见 RESTORE.md）。
//
// 用法：node scripts/restore-upstream.mjs [--force]
//   --force  已存在的目录也重新克隆（默认跳过，可断点续跑）
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM = path.join(ROOT, "upstream");
const FORCE = process.argv.includes("--force");
const PARALLEL = 4;

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog/catalog.json"), "utf8"));
const gitSources = catalog.sources.filter((s) => s.repo && s.commit);
const nonGit = catalog.sources.filter((s) => !s.repo || !s.commit);

fs.mkdirSync(UPSTREAM, { recursive: true });
console.log(`待恢复 ${gitSources.length} 个 Git 来源；跳过 ${nonGit.length} 个非 Git 来源。`);

function restoreOne(s) {
  const target = path.join(UPSTREAM, s.dir);
  if (fs.existsSync(path.join(target, ".git")) && !FORCE) {
    return { id: s.id, status: "skip-exists" };
  }
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  const url = `https://github.com/${s.repo}.git`;
  const run = (args) => spawnSync("git", args, { cwd: target, encoding: "utf8" });
  let r = run(["init", "-q"]);
  if (r.status !== 0) return { id: s.id, status: "fail", why: "init" };
  run(["remote", "add", "origin", url]);
  r = run(["fetch", "-q", "--depth", "1", "origin", s.commit]);
  if (r.status !== 0) {
    // 兜底：整仓浅克隆再 checkout 锚点（anchor 不在默认分支尖端时）
    fs.rmSync(target, { recursive: true, force: true });
    r = spawnSync("git", ["clone", "-q", "--filter=blob:none", url, target], { encoding: "utf8" });
    if (r.status !== 0) return { id: s.id, status: "fail", why: "clone" };
    r = spawnSync("git", ["-C", target, "checkout", "-q", s.commit], { encoding: "utf8" });
    if (r.status !== 0) return { id: s.id, status: "fail", why: "checkout" };
    return { id: s.id, status: "ok-full" };
  }
  r = run(["checkout", "-q", "FETCH_HEAD"]);
  if (r.status !== 0) return { id: s.id, status: "fail", why: "checkout" };
  return { id: s.id, status: "ok" };
}

const queue = [...gitSources];
const results = [];
async function worker() {
  while (queue.length) {
    const s = queue.shift();
    process.stdout.write(`恢复 ${s.id} ... `);
    const r = restoreOne(s);
    console.log(r.status);
    results.push(r);
  }
}
await Promise.all(Array.from({ length: PARALLEL }, worker));

const failed = results.filter((r) => r.status === "fail");
const skipped = results.filter((r) => r.status === "skip-exists");
console.log(`\n完成：新恢复 ${results.length - failed.length - skipped.length}，已存在跳过 ${skipped.length}，失败 ${failed.length}`);
if (failed.length) {
  console.log("失败清单（重跑本脚本可续）：");
  for (const f of failed) console.log(`  ${f.id} (${f.why})`);
}
if (nonGit.length) {
  console.log(`\n以下 ${nonGit.length} 个来源不是 Git 仓库，无法克隆，需从旧电脑拷贝 upstream/<路径>：`);
  for (const s of nonGit) console.log(`  ${s.id} -> upstream/${s.dir}`);
}
process.exit(failed.length ? 1 : 0);
