// 恢复 v2（合并模式）：硬杀后同一课程的文件可能同时存在于 lib 与暂存区（切片课程）。
// 策略：把暂存区内容逐文件并回 lib；同路径文件字节一致则丢弃暂存副本，不一致则报错停止。
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const LIB = path.join(ROOT, "site", "docs", "lib");
const STASH = path.join(ROOT, "site", ".batch-stash");
const CATALOG = path.join(ROOT, "site", "docs", ".vitepress", "theme", "generated", "catalog.ts");
const BAK = CATALOG + ".full-bak";

if (fs.existsSync(BAK)) {
  fs.rmSync(CATALOG, { force: true });
  fs.renameSync(BAK, CATALOG);
  console.log("catalog.ts 已还原");
}
const batchTs = path.join(path.dirname(CATALOG), "catalog-batch.ts");
if (fs.existsSync(batchTs)) {
  fs.rmSync(batchTs, { force: true });
  console.log("残留 catalog-batch.ts 已删除");
}

const sha = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
let moved = 0, dupOk = 0, conflict = 0;

const mergeTree = (src, dst) => {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      mergeTree(s, d);
    } else {
      if (fs.existsSync(d)) {
        if (sha(s) === sha(d)) { fs.rmSync(s, { force: true }); dupOk++; }
        else { console.error("字节不一致:", s, "vs", d); conflict++; }
      } else {
        fs.mkdirSync(path.dirname(d), { recursive: true });
        fs.renameSync(s, d);
        moved++;
      }
    }
  }
};

if (fs.existsSync(STASH)) {
  for (const vol of fs.readdirSync(STASH, { withFileTypes: true })) {
    if (!vol.isDirectory()) continue;
    for (const course of fs.readdirSync(path.join(STASH, vol.name), { withFileTypes: true })) {
      if (!course.isDirectory()) continue;
      const from = path.join(STASH, vol.name, course.name);
      const to = path.join(LIB, vol.name, course.name);
      fs.mkdirSync(to, { recursive: true });
      mergeTree(from, to);
      fs.rmSync(from, { recursive: true, force: true });
    }
  }
  for (const vol of fs.readdirSync(STASH, { withFileTypes: true })) {
    if (vol.isDirectory() && !fs.readdirSync(path.join(STASH, vol.name)).length) fs.rmdirSync(path.join(STASH, vol.name));
  }
  if (fs.existsSync(STASH) && !fs.readdirSync(STASH).length) fs.rmdirSync(STASH);
}

let n = 0;
for (const v of fs.readdirSync(LIB)) n += fs.readdirSync(path.join(LIB, v)).length;
console.log(`合并完成: 移动 ${moved} 文件, 去重 ${dupOk} 文件, 冲突 ${conflict}`);
console.log(`lib 卷数 = ${fs.readdirSync(LIB).length}, 课程数 = ${n}`);
if (conflict || n !== 136) process.exit(1);
