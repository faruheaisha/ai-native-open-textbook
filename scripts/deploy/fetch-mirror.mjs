#!/usr/bin/env node
// 在服务器上按清单补齐图片镜像。
//
// 为什么不从本地推图片：镜像有 570MB，国内到新加坡的跨境上行是瓶颈；
// 而服务器在新加坡拉 GitHub 基本是本地速度，让它自己下快一个数量级。
// 本地只推一份几百 KB 的清单（远程地址 -> 站内路径）。
//
// 用法（在服务器上）：
//   node fetch-mirror.mjs /var/www/ai-native-textbook
//   node fetch-mirror.mjs /var/www/ai-native-textbook --refetch   # 忽略已有文件重下
import fs from "node:fs";
import path from "node:path";

const dest = process.argv[2];
const refetch = process.argv.includes("--refetch");
if (!dest) {
  console.error("用法: node fetch-mirror.mjs <站点根目录> [--refetch]");
  process.exit(1);
}
if (!fs.existsSync(dest)) {
  console.error("站点根目录不存在：" + dest);
  process.exit(1);
}

// 清单可以放在网站根目录之外（默认就走站点目录，方便本地试跑）。
const manifest = process.env.MIRROR_MANIFEST || path.join(dest, ".mirror-manifest.tsv");
if (!fs.existsSync(manifest)) {
  console.error("找不到清单：" + manifest);
  process.exit(1);
}

const CONCURRENCY = Number(process.env.JOBS || 8);
const FALLBACK_PREFIX = process.env.MIRROR_FALLBACK || "https://gh-proxy.com/";

const rows = fs
  .readFileSync(manifest, "utf8")
  .split("\n")
  .filter((l) => l.trim())
  .map((line) => {
    const tab = line.indexOf("\t");
    return tab === -1 ? null : { url: line.slice(0, tab), rel: line.slice(tab + 1) };
  })
  .filter(Boolean);

if (!rows.length) {
  console.log("清单是空的，没有要补的图。");
  process.exit(0);
}

let done = 0;
let added = 0;
let skipped = 0;
let failed = 0;
let bytes = 0;
const failures = [];

function fmtMB(n) {
  return (n / 1048576).toFixed(1) + "MB";
}

async function download(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!buf.length) throw new Error("空响应");
  return buf;
}

async function one(row) {
  const out = path.join(dest, row.rel.replace(/^\//, ""));
  try {
    if (!refetch) {
      const st = fs.statSync(out, { throwIfNoEntry: false });
      if (st && st.size > 0) {
        skipped++;
        return;
      }
    }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    let buf;
    try {
      buf = await download(row.url);
    } catch (first) {
      // 直连失败时退回加速通道，别让个别图拖垮整批
      if (row.url.startsWith("https://raw.githubusercontent.com/")) {
        buf = await download(FALLBACK_PREFIX + row.url);
      } else {
        throw first;
      }
    }
    // 先写临时文件再改名：中途被打断也不会留下半张图。
    fs.writeFileSync(out + ".part", buf);
    fs.renameSync(out + ".part", out);
    added++;
    bytes += buf.length;
  } catch (e) {
    failed++;
    failures.push(row.rel + "  <-  " + row.url.slice(0, 120) + "  (" + e.message + ")");
  } finally {
    done++;
    if (done % 50 === 0 || done === rows.length) {
      process.stdout.write("\r  " + done + "/" + rows.length + "  新增 " + added + " · 已有 " + skipped + " · 失败 " + failed + " · " + fmtMB(bytes) + "   ");
    }
  }
}

const queue = rows.slice();
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) await one(queue.shift());
  })
);
process.stdout.write("\n");

console.log("图片就位：新增 " + added + " · 已有跳过 " + skipped + " · 失败 " + failed + " · 新增体积 " + fmtMB(bytes));
if (failures.length) {
  console.log("失败前 15 条（这些图在站上仍会走加速通道，不影响阅读）：");
  failures.slice(0, 15).forEach((f) => console.log("  " + f));
}