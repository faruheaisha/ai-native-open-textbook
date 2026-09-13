// 把 site/docs/mirror-index.json 里记录的扩展名，同步成磁盘上实际存在的那个文件。
//
// 背景：scripts/deploy/optimize-images.sh 把 PNG/JPG/GIF 原地换成了同名 .webp，
// 但索引里还写着原来的 .png。不同步的话，build-site-content.mjs 里那句
// fs.existsSync 校验会落空，整站图片悄悄退化成走加速通道（国内基本打不开）。
//
// 用法：node scripts/deploy/rewrite-mirror-ext.mjs [--check]
//   --check  只报告差异，不写回文件
//
// 幂等：反复跑没有副作用。找不到本地文件的条目原样保留，
// 让构建流程按原逻辑退回加速通道。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..");
const DOCS = path.join(REPO, "site", "docs");
const PUBLIC_DIR = path.join(DOCS, "public");
const MIRROR_DIR = path.join(PUBLIC_DIR, "mirror");
const INDEX_FILE = path.join(DOCS, "mirror-index.json");

const checkOnly = process.argv.includes("--check");

if (!fs.existsSync(INDEX_FILE)) {
  console.error("找不到 " + INDEX_FILE);
  process.exit(1);
}

// 目录扫描一次就够了：1993 条索引逐个 readdirSync 太慢。
const dirCache = new Map();
function filesIn(bucket) {
  if (!dirCache.has(bucket)) {
    let names = [];
    try {
      names = fs.readdirSync(path.join(MIRROR_DIR, bucket));
    } catch {
      /* 目录不存在就当作空 */
    }
    dirCache.set(bucket, new Map(names.map((n) => [n.slice(0, n.lastIndexOf(".")), n])));
  }
  return dirCache.get(bucket);
}

// 同名多个扩展名同时存在时，优先挑 .webp（优化脚本的产物），其余按固定顺序兜底。
const PREFER = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".avif"];

const raw = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));
const next = {};
const stat = { total: 0, local: 0, changed: 0, missing: 0, remote: 0 };
const changes = [];
const missing = [];

for (const [url, val] of Object.entries(raw)) {
  stat.total += 1;
  if (typeof val !== "string" || !val.startsWith("/mirror/")) {
    stat.remote += 1;
    next[url] = val;
    continue;
  }
  stat.local += 1;

  const m = /^\/mirror\/([^/]+)\/(.+)\.([A-Za-z0-9]+)$/.exec(val);
  if (!m) {
    next[url] = val;
    continue;
  }
  const [, bucket, hash] = m;
  const dir = path.join(MIRROR_DIR, bucket);
  const known = filesIn(bucket)[hash];

  let picked = null;
  if (known && fs.existsSync(path.join(dir, known))) {
    picked = known;
  } else {
    // 索引里记的扩展名和实际文件对不上时，把该哈希下所有扩展名都试一遍。
    for (const ext of PREFER) {
      if (fs.existsSync(path.join(dir, hash + ext))) {
        picked = hash + ext;
        break;
      }
    }
  }

  if (!picked) {
    stat.missing += 1;
    missing.push(val);
    next[url] = val;
    continue;
  }

  const want = "/mirror/" + bucket + "/" + picked;
  if (want !== val) {
    stat.changed += 1;
    changes.push(val + "  ->  " + want);
  }
  next[url] = want;
}

console.log("索引条目 " + stat.total + " 条：站内 " + stat.local + " 条，外部/替代地址 " + stat.remote + " 条");
console.log("扩展名需更新 " + stat.changed + " 条");
console.log("本地文件缺失 " + stat.missing + " 条（这些会按原逻辑回退到加速通道）");

if (changes.length) {
  console.log("\n---- 扩展名变化（前 8 条）----");
  for (const c of changes.slice(0, 8)) console.log("  " + c);
  const byExt = {};
  for (const c of changes) {
    const e = c.slice(c.lastIndexOf(".")).trim();
    byExt[e] = (byExt[e] || 0) + 1;
  }
  console.log("  按目标扩展名汇总：" + JSON.stringify(byExt));
}
if (missing.length) {
  console.log("\n---- 缺文件（前 8 条）----");
  for (const c of missing.slice(0, 8)) console.log("  " + c);
}

if (checkOnly) {
  console.log("\n--check 模式，未写回。");
} else if (stat.changed > 0) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(next, null, 0) + "\n");
  console.log("\n已写回 " + path.relative(REPO, INDEX_FILE));
} else {
  console.log("\n无需改动。");
}
