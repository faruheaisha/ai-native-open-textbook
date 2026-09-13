#!/usr/bin/env node
// 在服务器上按清单补齐图片镜像。
//
// 为什么不从本地推图片：镜像有 570MB，国内到新加坡的跨境上行是瓶颈；
// 而服务器在新加坡拉 GitHub 基本是本地速度，让它自己下快一个数量级。
// 本地只推一份几百 KB 的清单（远程地址 -> 站内路径）。
//
// 清单里的站内路径是 .webp —— 和 scripts/deploy/optimize-images.sh 的产物一致。
// 上游只有 PNG/JPG/GIF，所以这里下完要就地转一次 WebP，否则会把 PNG 字节
// 写进 .webp 文件名，站上引用得到一张打不开的图。
//
// 用法（在服务器上）：
//   node fetch-mirror.mjs /var/www/ai-native-textbook
//   node fetch-mirror.mjs /var/www/ai-native-textbook --refetch   # 忽略已有文件重下
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

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
// 转换参数必须和 optimize-images.sh 一致：站上同一张图，
// 无论从哪条通道落到服务器，都该是同一个规格。
const MAX_W = Number(process.env.MAX_W || 1600);
const QUALITY = Number(process.env.QUALITY || 82);
const GIF_MAX_W = Number(process.env.GIF_MAX_W || 1200);
const GIF_QUALITY = Number(process.env.GIF_QUALITY || 70);
// ffmpeg 是纯 CPU 活，并发开高了只会互相抢核。
const CONVERT_JOBS = Number(process.env.CONVERT_JOBS || Math.max(1, Math.min(2, os.cpus().length)));
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
let saved = 0;
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

// 目标名是 .webp 就说明这张图必须转码；上游只有 PNG/JPG/GIF。
function needsWebp(rel) {
  return rel.toLowerCase().endsWith(".webp");
}

function sourceExt(url) {
  const clean = url.split("?")[0].split("#")[0];
  const base = clean.slice(clean.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot === -1 ? "" : base.slice(dot + 1).toLowerCase();
}

// ffmpeg 的 -vf 里带逗号就得处理转义，容易在 argv 直传时踩坑。
// 先量出宽度，只在确实超限时才挂 scale，参数就是几个纯数字。
function probeWidth(file) {
  try {
    const out = execFileSync(
      "ffprobe",
      ["-v", "quiet", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", file],
      { encoding: "utf8" }
    ).trim();
    const n = Number(out.split(/[^0-9]/)[0]);
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0; // 量不出来就不缩放，交给 ffmpeg 原样转码
  }
}

function probeFrames(file) {
  try {
    const out = execFileSync(
      "ffprobe",
      ["-v", "quiet", "-select_streams", "v:0", "-count_frames",
       "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", file],
      { encoding: "utf8" }
    ).trim();
    const n = Number(out.split(/[^0-9]/)[0]);
    return Number.isFinite(n) && n > 0 ? n : 1;
  } catch {
    return 1;
  }
}

// 名额直接转交，不做先减后加 —— 否则唤醒间隙会有第三个任务挤进来，
// 实际并发数超出上限。
let convertActive = 0;
const convertWaiters = [];
function acquireConvert() {
  if (convertActive < CONVERT_JOBS) {
    convertActive += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => convertWaiters.push(resolve));
}
function releaseConvert() {
  const next = convertWaiters.shift();
  if (next) {
    next();
    return;
  }
  convertActive -= 1;
}

async function toWebp(part, url) {
  const ext = sourceExt(url);
  const dst = part + ".webp";
  await acquireConvert();
  try {
    const animated = ext === "gif" && probeFrames(part) > 1;
    const limit = animated ? GIF_MAX_W : MAX_W;
    const quality = animated ? GIF_QUALITY : QUALITY;
    const args = ["-nostdin", "-y", "-v", "error", "-i", part];
    if (animated) {
      args.push("-c:v", "libwebp_anim", "-loop", "0");
    } else {
      args.push("-c:v", "libwebp", "-preset", "picture");
    }
    args.push("-quality", String(quality), "-compression_level", "6");
    const w = probeWidth(part);
    if (w > limit) args.push("-vf", "scale=" + limit + ":-2:flags=lanczos");
    args.push(dst);
    execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    const st = fs.statSync(dst, { throwIfNoEntry: false });
    if (!st || st.size === 0) throw new Error("转码后是空文件");
    return dst;
  } finally {
    releaseConvert();
  }
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
    // 先写临时文件、转码完再改名：中途被打断也不会留下半张图。
    const part = out + ".part";
    fs.writeFileSync(part, buf);
    let converted = null;
    try {
      if (needsWebp(row.rel)) {
        if (sourceExt(row.url) === "svg") {
          // 矢量图不转码，原样落盘（正常情况下清单不会给出这种组合）。
        } else {
          converted = await toWebp(part, row.url);
        }
      }
      fs.renameSync(converted || part, out);
      added++;
      bytes += buf.length;
      if (converted) {
        const after = fs.statSync(out).size;
        saved += Math.max(0, buf.length - after);
      }
    } finally {
      fs.rmSync(part, { force: true });
      if (converted) fs.rmSync(converted, { force: true });
    }
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

if (rows.some((r) => needsWebp(r.rel))) {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error("清单要求输出 WebP，但这台机器上没有 ffmpeg。");
    console.error("先装：apt-get update && apt-get install -y ffmpeg");
    process.exit(1);
  }
}

console.log("待补 " + rows.length + " 张 · 下载并发 " + CONCURRENCY + " · 转码并发 " + CONVERT_JOBS);
console.log("WebP 参数：MAX_W=" + MAX_W + " QUALITY=" + QUALITY + " GIF_MAX_W=" + GIF_MAX_W + " GIF_QUALITY=" + GIF_QUALITY);

const queue = rows.slice();
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) await one(queue.shift());
  })
);
process.stdout.write("\n");

console.log("图片就位：新增 " + added + " · 已有跳过 " + skipped + " · 失败 " + failed + " · 下载 " + fmtMB(bytes) + " · 落盘后省下 " + fmtMB(saved));
if (failures.length) {
  console.log("失败前 15 条（这些图在站上仍会走加速通道，不影响阅读）：");
  failures.slice(0, 15).forEach((f) => console.log("  " + f));
}