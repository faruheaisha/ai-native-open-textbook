// 分批构建：整站一次构建会在渲染到一万两千多页时把 8GB 堆撑爆
// （实测 486 秒处 FATAL ERROR: Ineffective mark-compacts near heap limit）。
// VitePress 是单进程把整站页面都放进内存里渲染的，页数一多就只能分批：
// 一批只留一部分课程在 docs/lib 下（其余临时挪走），构建完再合并产物。
//
// 用法：node scripts/deploy/build-batches.mjs
//   MAX_PAGES=400    单批页数上限（按页数与历史体量估算，避免 6GB 堆溢出）
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "site", "docs");
const LIB = path.join(DOCS, "lib");
const STASH = path.join(ROOT, "site", ".batch-stash");
// E 盘只剩 1GB，整站产物 5GB 起步，构建直接 ENOSPC。产物目录可以用环境变量指到别的盘。
const DIST = process.env.TB_DIST || path.join(DOCS, ".vitepress", "dist");
const BATCHDIR = process.env.TB_BATCHDIR || path.join(DOCS, ".vitepress", "dist-batch");
const MAX_PAGES = Number(process.env.MAX_PAGES || 400);
const HOST = process.env.DOCS_HOST || "aibook.faruheaisha.me";
const NODE_OPTIONS = process.env.TB_NODE_OPTIONS || "--max-old-space-size=6144";
const BATCH_START = Math.max(0, Number(process.env.BATCH_START || 0));

function listCourses() {
  const out = [];
  for (const v of fs.readdirSync(LIB, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (!v.isDirectory()) continue;
    for (const c of fs.readdirSync(path.join(LIB, v.name), { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      if (!c.isDirectory()) continue;
      const dir = path.join(LIB, v.name, c.name);
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
      // 单门课可能本身就超过 MAX_PAGES（例如 1,000+ 页）。按课程整目录
      // 移动会让该批次再次 OOM，因此把超大课程拆成可恢复的文件切片。
      if (process.env.TB_SPLIT_LARGE_COURSES !== "0" && files.length > MAX_PAGES) {
        for (let i = 0; i < files.length; i += MAX_PAGES) {
          out.push({
            vol: v.name,
            course: c.name,
            dir,
            files: files.slice(i, i + MAX_PAGES),
            slice: Math.floor(i / MAX_PAGES),
            pages: Math.min(MAX_PAGES, files.length - i),
          });
        }
      } else {
        out.push({ vol: v.name, course: c.name, dir, files: null, slice: null, pages: files.length });
      }
    }
  }
  return out;
}

const unitKey = (c) => `${c.vol}/${c.course}${c.slice == null ? "" : `#${c.slice}`}`;

const all = listCourses();
console.log("课程目录", all.length, "页数合计", all.reduce((s, x) => s + x.pages, 0));

const batches = [];
let cur = [];
let curPages = 0;
for (const c of all) {
  if (curPages + c.pages > MAX_PAGES && cur.length) {
    batches.push(cur);
    cur = [];
    curPages = 0;
  }
  cur.push(c);
  curPages += c.pages;
}
if (cur.length) batches.push(cur);
// 试跑/流式部署：BATCH_START 选择起始批次，BATCH_LIMIT 控制本次批次数。
// 批次编号从 0 开始，便于外部脚本逐批构建后立即上传并清理本地产物。
const batchStart = Math.min(BATCH_START, batches.length);
if (batchStart) batches.splice(0, batchStart);
if (process.env.BATCH_LIMIT) batches.length = Math.min(batches.length, Number(process.env.BATCH_LIMIT));
console.log("批次数", batches.length, batches.map((b) => b.reduce((s, x) => s + x.pages, 0)).join(" / "));

function stash(list, to) {
  // to=true 挪进暂存区，to=false 挪回 docs/lib。
  // 之前还原时拿的还是 lib 里的路径，等于让目录改名到自己身上，
  // 报 ENOENT 之外还把 94 门课留在了暂存区。
  for (const c of list) {
    if (c.files) {
      const sliceRoot = path.join(to ? STASH : LIB, c.vol, c.course, `.slice-${c.slice}`);
      if (to) {
        fs.mkdirSync(sliceRoot, { recursive: true });
        for (const file of c.files) fs.renameSync(path.join(c.dir, file), path.join(sliceRoot, file));
      } else {
        for (const file of c.files) fs.renameSync(path.join(sliceRoot, file), path.join(c.dir, file));
        fs.rmSync(sliceRoot, { recursive: true, force: true });
      }
      continue;
    }
    const from = path.join(to ? LIB : STASH, c.vol, c.course);
    const target = path.join(to ? STASH : LIB, c.vol, c.course);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.renameSync(from, target);
  }
}

function mergeDir(src, dest) {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name === "mirror") continue; // 图片镜像最后一次性拷，不然每批都复制 1.2GB
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      mergeDir(s, d);
      continue;
    }
    if (e.name === "hashmap.json" && fs.existsSync(d)) {
      const a = JSON.parse(fs.readFileSync(d, "utf8"));
      const b = JSON.parse(fs.readFileSync(s, "utf8"));
      fs.writeFileSync(d, JSON.stringify(Object.assign(a, b), null, 1), "utf8");
      continue;
    }
    fs.copyFileSync(s, d);
  }
}

fs.mkdirSync(DIST, { recursive: true });
fs.mkdirSync(STASH, { recursive: true });

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  const inBatch = new Set(batch.map(unitKey));
  const out = all.filter((c) => !inBatch.has(unitKey(c)));
  const pages = batch.reduce((s, x) => s + x.pages, 0);
  const t0 = Date.now();
  console.log("\n== 批次 " + (i + 1) + "/" + batches.length + " · " + pages + " 页 · 挪走 " + out.length + " 门 ==");
  stash(out, true);
  fs.rmSync(BATCHDIR, { recursive: true, force: true });
  let ok = true;
  // 镜像约 1.2GB，Vite 会在每个批次临时复制一份，低磁盘时会在构建尚未开始前 ENOSPC。
  // 批次产物最后统一用 junction 指向 public/mirror，因此构建阶段可以安全地暂时移开它。
  const mirrorPublic = path.join(DOCS, "public", "mirror");
  const mirrorHold = path.join(DOCS, "public", ".mirror-build-stash");
  const skipMirror = process.env.TB_SKIP_MIRROR === "1" && fs.existsSync(mirrorPublic);
  if (skipMirror) {
    fs.renameSync(mirrorPublic, mirrorHold);
    // Markdown 中的 /mirror/... 仍需能被 Vite 解析；junction 不复制数据。
    fs.symlinkSync(mirrorHold, mirrorPublic, "junction");
  }
  try {
    const r = spawnSync("npx", ["vitepress", "build", "docs"], {
      cwd: path.join(ROOT, "site"),
      stdio: ["ignore", "inherit", "inherit"],
      shell: true,
      env: Object.assign({}, process.env, {
        NODE_OPTIONS,
        DOCS_HOST: HOST,
        TB_BATCH_BUILD: "1",
        // 产物目录走环境变量：路径里有空格，命令行参数会被 shell 拆开（曾把产物写进 E:\claude）。
        TB_OUT_DIR: BATCHDIR,
      }),
    });
    ok = r.status === 0;
    if (!ok) console.log("批次失败，退出码", r.status);
  } finally {
    if (skipMirror) {
      if (fs.existsSync(mirrorPublic) && fs.lstatSync(mirrorPublic).isSymbolicLink()) fs.unlinkSync(mirrorPublic);
      if (fs.existsSync(mirrorHold)) fs.renameSync(mirrorHold, mirrorPublic);
    }
    stash(out, false);
  }
  if (!ok) process.exit(1);
  mergeDir(BATCHDIR, DIST);
  fs.rmSync(BATCHDIR, { recursive: true, force: true });
  console.log("批次 " + (i + 1) + " 完成，用时 " + ((Date.now() - t0) / 1000).toFixed(0) + "s");
}

// 图片镜像一次性拷进最终产物（本地预览要用；部署时服务器自己下，见 deploy.sh）。
fs.mkdirSync(DIST, { recursive: true });
const mirrorSrc = path.join(DOCS, "public", "mirror");
const mirrorDst = path.join(DIST, "mirror");
if (fs.existsSync(mirrorSrc) && !fs.existsSync(mirrorDst)) {
  // E 盘只剩几个 GB，镜像 1.25GB 再来一份会把盘写满（ENOSPC 已经发生过一次）。
  // 本地预览用目录联接（junction）指过去，不占额外空间；服务器上是自己下载镜像，见 deploy.sh。
  if (process.env.TB_MIRROR_JUNCTION === "1") {
    console.log("\n图片镜像用目录联接指向 public/mirror……");
    fs.symlinkSync(mirrorSrc, mirrorDst, "junction");
  } else {
    console.log("\n拷贝图片镜像到产物……");
    fs.cpSync(mirrorSrc, mirrorDst, { recursive: true });
  }
}
console.log("\n分批构建完成");
