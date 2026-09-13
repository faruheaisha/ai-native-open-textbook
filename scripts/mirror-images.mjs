#!/usr/bin/env node
// 站内图片本地镜像：把课程正文里指向 raw.githubusercontent.com 的插图落到站内，
// 让读者不再直连被墙的 raw 域名。
//
// 两种产出，写进同一张表 site/docs/mirror-index.json，生成器按同一张表取值：
//   1. 本地镜像：site/docs/public/mirror/<xx>/<sha1>.<ext>  ->  "/mirror/<xx>/<sha1>.<ext>"
//   2. 地址核实：上游把图片放进 VitePress 的 public/ 目录、正文却写成仓库根相对路径时，
//      原地址在 raw 上是 404（站内因此是破图）。这里用 GitHub 文件树定位真实位置，
//      逐条按字节验证后写成可用地址。不落盘、零字节，只修断链。
//
// 用法：
//   node scripts/mirror-images.mjs --survey          只量体积（Range 请求，不落盘）
//   node scripts/mirror-images.mjs                   量体积 -> 超预算中止 -> 下载 -> 写索引
//   node scripts/mirror-images.mjs --resolve-only    只修断链（零字节）
//   node scripts/mirror-images.mjs --repos=datawhalechina/easy-vibe --max-bytes=60MB
//   node scripts/mirror-images.mjs --limit=30 --dest=scripts/tmp/mirror-sample --index=scripts/tmp/mirror-index.sample.json
//
// 环境变量：TB_MIRROR_PRIMARY=<前缀> 换主通道；TB_MIRROR_FALLBACK=<前缀模板> 换备用通道。

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "site", "docs", "lib");
const DOCS = path.join(ROOT, "site", "docs");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  })
);

const PRIMARY = process.env.TB_MIRROR_PRIMARY || args.primary || "https://gh-proxy.com/";
const FALLBACK_TPL = process.env.TB_MIRROR_FALLBACK || "https://gcore.jsdelivr.net/gh/{owner}/{repo}@{ref}/{path}";
const DEST = path.resolve(ROOT, args.dest || path.join("site", "docs", "public", "mirror"));
const INDEX_FILE = path.resolve(ROOT, args.index || path.join("site", "docs", "mirror-index.json"));
const MAX_BYTES = parseSize(args["max-bytes"] || "400MB");
const LIMIT = Number(args.limit || 0);
const CONC = Number(args.concurrency || 6);
const ONLY_REPOS = args.repos ? new Set(String(args.repos).split(",")) : null;
const FORCE = args.force === "true";
const SURVEY_ONLY = args.survey === "true";
const RESOLVE_ONLY = args["resolve-only"] === "true";
const SKIP_RESOLVE = args["no-resolve"] === "true";

const RAW_HOST = "https://raw.githubusercontent.com/";
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif", ".bmp", ".ico", ".mp4", ".webm"]);
const CT_EXT = {
  "image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif", "image/webp": ".webp",
  "image/svg+xml": ".svg", "image/avif": ".avif", "image/bmp": ".bmp", "image/x-icon": ".ico",
  "video/mp4": ".mp4", "video/webm": ".webm",
};

function parseSize(v) {
  const s = String(v).trim();
  const m = s.match(/^([\d.]+)\s*(b|kb|mb|gb)?$/i);
  if (!m) return 400 * 1024 * 1024;
  const n = Number(m[1]);
  const unit = (m[2] || "b").toLowerCase();
  const mul = unit === "gb" ? 1024 ** 3 : unit === "mb" ? 1024 ** 2 : unit === "kb" ? 1024 : 1;
  return Math.round(n * mul);
}

const fmtMB = (b) => (b / 1048576).toFixed(1) + "MB";

// ---------- 扫描：只认图片语境的 raw 地址，与生成器同一套语法 ----------

function walkMd(dir, out) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== ".vitepress") walkMd(p, out); }
    else if (/\.(md|mdx)$/i.test(e.name)) out.push(p);
  }
  return out;
}

// 代码围栏里的地址是正文示例（curl 命令、示例语法），不能动。
function mapOutsideCode(text, fn) {
  const lines = text.split("\n");
  let fence = null;
  const out = [];
  let buf = [];
  const flush = () => { if (buf.length) { out.push(fn(buf.join("\n"))); buf = []; } };
  for (const line of lines) {
    const m = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      out.push(line);
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
      continue;
    }
    if (m) { flush(); fence = m[1]; out.push(line); continue; }
    buf.push(line);
  }
  flush();
  return out.join("\n");
}

function normalizeRaw(u) {
  let s = u.split("#")[0].split("?")[0];
  // 站内生成结果里的地址可能套着加速前缀，先剥掉，拿原始 raw 地址当索引键
  if (PRIMARY && s.startsWith(PRIMARY)) s = s.slice(PRIMARY.length);
  else s = s.replace(/^https?:\/\/gh-proxy\.com\//i, "");
  // 路径里的空格被生成器编码成了 %20，解码回来才能和原始地址对齐
  if (/%[0-9A-Fa-f]{2}/.test(s)) {
    try {
      s = decodeURIComponent(s);
    } catch {
      /* 解不开就按原样当键 */
    }
  }
  return s;
}

function collectImageUrls() {
  const found = new Map();
  const note = (u, file) => {
    const k = normalizeRaw(u);
    if (!k.startsWith(RAW_HOST)) return;
    if (!found.has(k)) found.set(k, file);
  };
  for (const f of walkMd(LIB, [])) {
    const text = fs.readFileSync(f, "utf8");
    mapOutsideCode(text, (chunk) => {
      for (const m of chunk.matchAll(/!\[[^\]]*\]\(\s*<?(https?:\/\/[^\s)>"']+)/g)) note(m[1].replace(/[.,;]+$/, ""), f);
      for (const m of chunk.matchAll(/<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi)) note(m[1], f);
      for (const m of chunk.matchAll(/\b(?:srcset|poster)\s*=\s*["']([^"']+)["']/gi)) {
        for (const part of m[1].split(",")) {
          const seg = part.trim().split(/\s+/)[0];
          if (seg) note(seg, f);
        }
      }
      for (const m of chunk.matchAll(/<source\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi)) note(m[1], f);
      return chunk;
    });
  }
  return found;
}

// ---------- 地址换算 ----------

function splitRaw(u) {
  if (!u.startsWith(RAW_HOST)) return null;
  const rest = u.slice(RAW_HOST.length);
  const seg = rest.split("/");
  if (seg.length < 4) return null;
  const owner = seg[0], repo = seg[1];
  let ref = seg[2], p = seg.slice(3).join("/");
  // raw.githubusercontent 也接受 refs/heads/<branch>/<path> 这种写法，按真实 ref 归一。
  const rh = p.match(/^refs\/heads\/([^/]+)\/(.+)$/);
  const rt = p.match(/^refs\/tags\/([^/]+)\/(.+)$/);
  if (rh) { ref = rh[1]; p = rh[2]; }
  else if (rt) { ref = rt[1]; p = rt[2]; }
  return { owner, repo, ref, path: decodeURIComponent(p) };
}

function fallbackUrl(u) {
  const p = splitRaw(u);
  if (!p) return null;
  return FALLBACK_TPL.replace("{owner}", p.owner).replace("{repo}", p.repo).replace("{ref}", p.ref).replace("{path}", p.path.split("/").map(encodeURIComponent).join("/"));
}

function extOf(u) {
  const clean = u.split("#")[0].split("?")[0];
  const m = clean.match(/(\.[A-Za-z0-9]{2,5})$/);
  const ext = m ? m[1].toLowerCase() : "";
  return IMG_EXT.has(ext) ? ext : "";
}

function relFor(u) {
  const h = crypto.createHash("sha1").update(u).digest("hex");
  return { hash: h, dir: path.join(DEST, h.slice(0, 2)), file: h };
}

function localPathFor(u, ext) {
  const r = relFor(u);
  return { abs: path.join(r.dir, r.file + ext), rel: "/mirror/" + r.hash.slice(0, 2) + "/" + r.hash + ext };
}

// 已下过的文件可能带别的扩展名（URL 里没有扩展名时按 content-type 定），
// 所以按 hash 前缀找，找到就当已存在，重复运行不会重复下载。
function existingPathFor(u) {
  const r = relFor(u);
  let names;
  try { names = fs.readdirSync(r.dir); } catch { return null; }
  const hit = names.find((n) => n.startsWith(r.file + "."));
  if (!hit) return null;
  const abs = path.join(r.dir, hit);
  try {
    return fs.statSync(abs).size > 0 ? { abs, rel: "/mirror/" + r.hash.slice(0, 2) + "/" + hit } : null;
  } catch {
    return null;
  }
}

// ---------- 网络 ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWith(url, opt) {
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), opt.timeoutMs || 30000);
  try {
    return await fetch(url, { signal: ctl.signal, redirect: "follow", headers: opt.headers });
  } finally {
    clearTimeout(to);
  }
}

// 主通道优先，失败退备用通道；每次失败等待后重试，共 attempts 次。
async function fetchResilient(u, { attempts = 3, headers, timeoutMs = 30000 } = {}) {
  const alt = fallbackUrl(u);
  let last = null;
  for (let i = 0; i < attempts; i++) {
    const target = i === 0 ? PRIMARY + u : i === 1 && alt ? alt : PRIMARY + u;
    try {
      const r = await fetchWith(target, { headers, timeoutMs });
      if (r.status === 404) {
        try { await r.arrayBuffer(); } catch {}
        return { status: 404, via: target === alt ? "fallback" : "primary" };
      }
      if (r.ok || r.status === 206) {
        const buf = Buffer.from(await r.arrayBuffer());
        return {
          status: r.status,
          buf,
          ct: r.headers.get("content-type") || "",
          cr: r.headers.get("content-range") || "",
          via: target === alt ? "fallback" : "primary",
        };
      }
      try { await r.arrayBuffer(); } catch {}
      last = String(r.status);
    } catch (e) {
      last = e.name + ":" + String(e.message || "").slice(0, 40);
    }
    await sleep(500 + i * 700);
  }
  return { fail: last || "unknown" };
}

// Range 只取 1 字节，完整长度在 content-range 里（"bytes 0-0/156284"），
// 这样量体积不会把几百 MB 拉一遍。服务端不支持 Range 时退回整体长度。
function sizeFromCr(cr) {
  const m = String(cr || "").match(/\/(\d+)\s*$/);
  return m ? Number(m[1]) : 0;
}

async function probeSize(u) {
  const r = await fetchResilient(u, { attempts: 2, headers: { Range: "bytes=0-0" }, timeoutMs: 20000 });
  if (r.fail) return { fail: r.fail };
  if (r.status === 404) return { status: 404 };
  const size = sizeFromCr(r.cr) || (r.buf ? r.buf.length : 0);
  return { size, ct: r.ct };
}

async function runPool(items, worker, concurrency = 6) {
  if (!Number.isFinite(concurrency) || concurrency < 1) concurrency = 6;
  if (!items.length) return;
  let i = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(workers);
}

// ---------- 索引 ----------

function readIndex() {
  try {
    const j = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));
    return j && typeof j === "object" ? j : {};
  } catch {
    return {};
  }
}

function writeIndex(map) {
  const sorted = {};
  for (const k of Object.keys(map).sort()) sorted[k] = map[k];
  fs.mkdirSync(path.dirname(INDEX_FILE), { recursive: true });
  fs.writeFileSync(INDEX_FILE, JSON.stringify(sorted, null, 1) + "\n", "utf8");
  return Object.keys(sorted).length;
}

// 本地条目必须真有文件；地址核实条目必须还是 raw 地址。
const isLocalValue = (v) => typeof v === "string" && v.startsWith("/");
function pruneIndex(map) {
  const out = {};
  for (const [k, v] of Object.entries(map)) {
    if (typeof v !== "string" || !v) continue;
    if (isLocalValue(v)) {
      const abs = path.join(DOCS, v.replace(/^\//, "").split("/").join(path.sep));
      try { if (fs.statSync(abs).size > 0) out[k] = v; } catch {}
    } else if (v.startsWith(RAW_HOST)) out[k] = v;
  }
  return out;
}

// ---------- 断链定位（零字节） ----------

const treeCache = new Map();
let rateLimited = false;

async function githubTree(owner, repo, ref) {
  const key = owner + "/" + repo + "@" + ref;
  if (treeCache.has(key)) return treeCache.get(key);
  if (rateLimited) return null;
  let result = null;
  try {
    const r = await fetchWith("https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + encodeURIComponent(ref) + "?recursive=1", {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "ai-native-open-textbook-mirror" },
      timeoutMs: 30000,
    });
    if (r.status === 403 || r.status === 429) { rateLimited = true; console.log("  ! GitHub API 限流，停止定位"); }
    else if (r.ok) {
      const j = JSON.parse(await r.text());
      result = { paths: (j.tree || []).filter((t) => t.type === "blob").map((t) => t.path), truncated: !!j.truncated };
    } else { try { await r.arrayBuffer(); } catch {} }
  } catch {}
  treeCache.set(key, result);
  return result;
}

function candidatesFor(relPath, paths) {
  const out = [];
  const seen = new Set();
  const push = (p) => { if (p && !seen.has(p)) { seen.add(p); out.push(p); } };
  if (paths.includes(relPath)) push(relPath);
  for (const p of paths) if (p.endsWith("/" + relPath)) push(p);
  const base = relPath.split("/").pop();
  for (const p of paths.filter((x) => x.split("/").pop() === base).sort((a, b) => a.length - b.length)) push(p);
  return out.slice(0, 4);
}

function encodePath(p) {
  return p.split("/").map((s) => encodeURIComponent(s)).join("/");
}

async function resolveBroken(urls, index) {
  const byRepo = new Map();
  for (const u of urls) {
    const p = splitRaw(u);
    if (!p) continue;
    if (ONLY_REPOS && !ONLY_REPOS.has(p.owner + "/" + p.repo)) continue;
    const key = p.owner + "/" + p.repo + "@" + p.ref;
    if (!byRepo.has(key)) byRepo.set(key, { p, items: [] });
    byRepo.get(key).items.push(u);
  }
  let fixed = 0, unresolved = 0;
  console.log("定位断链：", urls.length, "条 /", byRepo.size, "个仓库快照");
  for (const [key, group] of byRepo) {
    const { p, items } = group;
    const tree = await githubTree(p.owner, p.repo, p.ref);
    if (!tree) { unresolved += items.length; console.log("  -", key, "取不到文件树，跳过", items.length, "条"); continue; }
    console.log("  -", key, tree.paths.length, "个文件" + (tree.truncated ? "（截断）" : "") + "，待修", items.length, "条");
    await runPool(items, async (u) => {
      const rel = splitRaw(u).path;
      const cands = candidatesFor(rel, tree.paths);
      for (const c of cands) {
        const candidateRaw = RAW_HOST + p.owner + "/" + p.repo + "/" + p.ref + "/" + encodePath(c);
        const size = await probeSize(candidateRaw);
        if (size.size > 0) {
          index[u] = candidateRaw;
          fixed++;
          console.log("    ✓", rel.slice(0, 60), "->", c.slice(0, 80));
          return;
        }
      }
      unresolved++;
      console.log("    ✗ 未找到", rel.slice(0, 100));
    }, 6);
    if (rateLimited) break;
  }
  return { fixed, unresolved };
}

// ---------- 主流程 ----------

const fmtProgress = (done, total, extra) => "  " + String(done).padStart(4) + "/" + total + " " + (extra || "");

async function main() {
  const t0 = Date.now();
  const found = collectImageUrls();
  let urls = [...found.keys()];
  if (ONLY_REPOS) urls = urls.filter((u) => { const p = splitRaw(u); return p && ONLY_REPOS.has(p.owner + "/" + p.repo); });
  if (LIMIT > 0) urls = urls.slice(0, LIMIT);
  console.log("扫描：" + urls.length + " 个待处理图片地址（去重后，来自 " + new Set([...found.values()]).size + " 个文档）");

  const index = pruneIndex(readIndex());
  const before = Object.keys(index).length;

  if (RESOLVE_ONLY) {
    const probe = await runPoolSurvey(urls, 10);
    const broken = probe.filter((x) => x.status === 404).map((x) => x.url);
    console.log("直连检查：" + probe.length + " 条中 " + broken.length + " 条在源站即为 404");
    const { fixed, unresolved } = broken.length ? await resolveBroken(broken, index) : { fixed: 0, unresolved: 0 };
    const n = writeIndex(index);
    console.log("索引：" + before + " -> " + n + " 条（新增核实地址 " + fixed + " 条，仍未定位 " + unresolved + " 条）");
    console.log("写入 " + path.relative(ROOT, INDEX_FILE) + "，用时 " + ((Date.now() - t0) / 1000).toFixed(1) + "s");
    return;
  }

  console.log("量体积中（Range 请求，不落盘）……");
  const probe = await runPoolSurvey(urls, 10);
  const okList = probe.filter((x) => x.size > 0);
  const broken = probe.filter((x) => x.status === 404).map((x) => x.url);
  const failed = probe.filter((x) => x.fail).map((x) => x.url);
  const totalBytes = okList.reduce((a, x) => a + x.size, 0);
  console.log("可下载 " + okList.length + " 张 · 源站 404 " + broken.length + " 条 · 探测失败 " + failed.length + " 条 · 合计 " + fmtMB(totalBytes) + "（均值 " + (okList.length ? Math.round(totalBytes / okList.length / 1024) + "KB" : "-") + "）");

  const byRepo = {};
  for (const x of okList) { const p = splitRaw(x.url); const k = p ? p.owner + "/" + p.repo : "?"; byRepo[k] = byRepo[k] || { n: 0, b: 0 }; byRepo[k].n++; byRepo[k].b += x.size; }
  for (const [k, v] of Object.entries(byRepo).sort((a, b) => b[1].b - a[1].b).slice(0, 8)) console.log("    " + fmtMB(v.b).padStart(9) + "  " + v.n + " 张  " + k);

  if (!SKIP_RESOLVE && broken.length) {
    const { fixed, unresolved } = await resolveBroken(broken, index);
    console.log("断链定位：修复 " + fixed + " 条，未找到 " + unresolved + " 条");
  }

  if (SURVEY_ONLY) {
    const n = writeIndex(index);
    console.log("--survey：只量体积、不下载。索引 " + before + " -> " + n + " 条（本次只写断链核实结果）");
    return;
  }

  if (totalBytes > MAX_BYTES && !FORCE) {
    console.log("! 预计 " + fmtMB(totalBytes) + "，超过预算 " + fmtMB(MAX_BYTES) + "，未落盘。");
    console.log("  可选：--max-bytes=600MB 放开预算；--repos=owner/repo 只镜像部分仓库；--limit=N 先试跑；");
    console.log("  或维持不落盘：生成器已把未镜像的 raw 地址改写为加速通道。");
    const n = writeIndex(index);
    console.log("索引 " + before + " -> " + n + " 条（本次只写了断链核实结果）");
    return;
  }

  let done = 0, ok = 0, skip = 0, fail = 0, bytes = 0;
  const failures = [];
  await runPool(okList.map((x) => x.url), async (u) => {
    const ext0 = extOf(u);
    const already = existingPathFor(u);
    if (already) { skip++; done++; index[u] = already.rel; return; }
    const r = await fetchResilient(u, { attempts: 3 });
    done++;
    if (r.buf && r.buf.length > 0) {
      const ext = ext0 || CT_EXT[(r.ct || "").split(";")[0].trim().toLowerCase()] || ".png";
      const target = localPathFor(u, ext);
      fs.mkdirSync(path.dirname(target.abs), { recursive: true });
      fs.writeFileSync(target.abs, r.buf);
      index[u] = target.rel;
      ok++; bytes += r.buf.length;
    } else {
      fail++; failures.push(u + "  " + (r.fail || r.status));
    }
    if (done % 100 === 0) console.log(fmtProgress(done, okList.length, "ok " + ok + " skip " + skip + " fail " + fail + " " + fmtMB(bytes)));
  }, CONC);

  const n = writeIndex(index);
  console.log("下载完成：成功 " + ok + " · 跳过（已存在）" + skip + " · 失败 " + fail + " · 新增 " + fmtMB(bytes));
  console.log("镜像表： " + path.relative(ROOT, INDEX_FILE) + " 共 " + n + " 条");
  if (failures.length) {
    console.log("失败前 20 条：");
    failures.slice(0, 20).forEach((f) => console.log("  " + f.slice(0, 160)));
  }
  console.log("用时 " + ((Date.now() - t0) / 1000).toFixed(1) + "s");
}

// 体积普查：Range 命中 206 时从 content-range 取全长
async function runPoolSurvey(urls, concurrency) {
  const out = new Array(urls.length);
  let done = 0;
  await runPool(urls, async (u, i) => {
    const r = await fetchResilient(u, { attempts: 2, headers: { Range: "bytes=0-0" }, timeoutMs: 20000 });
    if (r.fail) out[i] = { url: u, fail: r.fail };
    else if (r.status === 404) out[i] = { url: u, status: 404 };
    else out[i] = { url: u, size: sizeFromCr(r.cr) || (r.buf ? r.buf.length : 0), ct: r.ct };
    done++;
    if (done % 200 === 0) console.log(fmtProgress(done, urls.length, ""));
  }, concurrency);
  return out;
}

main().catch((e) => {
  console.error("镜像流程失败：", e && e.stack || e);
  process.exitCode = 1;
});
