#!/usr/bin/env node
// 把 site/docs/mirror-index.json 倒过来，生成给服务器用的取图清单。
//
// 索引的方向是「上游地址 -> 站内路径」，服务器需要的是「按站内路径去哪个地址取」，
// 所以这里翻转一次，输出 TSV：上游地址 \t 站内路径。
// 只有值为站内路径（以 / 开头）的条目才算数 —— 其余是「上游换过位置」的记录，
// 那些地址本身还在外网，由生成器回退到加速通道处理。
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.argv[2] || ".");
const INDEX = path.join(ROOT, "site", "docs", "mirror-index.json");
const OUT = path.join(ROOT, "scripts", "deploy", "mirror-manifest.tsv");

if (!fs.existsSync(INDEX)) {
  console.error("找不到镜像索引：" + INDEX);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(INDEX, "utf8"));
const lines = [];
let missing = 0;

for (const [url, rel] of Object.entries(index)) {
  if (typeof rel !== "string" || !rel.startsWith("/")) continue;
  const onDisk = path.join(ROOT, "site", "docs", "public", rel.replace(/^\//, ""));
  if (!fs.existsSync(onDisk)) {
    missing++;
    continue;
  }
  lines.push(url + "\t" + rel);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join("\n") + "\n", "utf8");

const mb = lines.reduce((sum, l) => {
  const rel = l.slice(l.indexOf("\t") + 1);
  const f = path.join(ROOT, "site", "docs", "public", rel.replace(/^\//, ""));
  try {
    return sum + fs.statSync(f).size;
  } catch {
    return sum;
  }
}, 0);

console.log("清单写入 " + path.relative(ROOT, OUT));
console.log("  条目 " + lines.length + " · 合计 " + (mb / 1048576).toFixed(1) + "MB");
if (missing) console.log("  索引里有 " + missing + " 条指向本地并不存在的文件，已跳过");