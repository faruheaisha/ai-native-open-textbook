// 74 门存量课程补全部署驱动（确定性版）：
//   每组 ≤500 页：物理换库（lib 只装组内课程）→ 过滤目录（本卷课程）→ 渲染
//   → WSL 推送（tar 追加 + assets + hashmap）→ 删产物 → 下一组
// 用法：node tmp/volpush.mjs            （跑全部卷）
//       node tmp/volpush.mjs 09-harness （只跑指定卷）
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "site", "docs");
const LIB = path.join(DOCS, "lib");
const LIBALL = path.join(ROOT, "site", "lib-all-volpush");
const GEN = path.join(DOCS, ".vitepress", "theme", "generated");
const LOG = (m) => console.log(`[volpush ${new Date().toISOString().slice(11, 19)}] ${m}`);

const only = process.argv.slice(2).filter(Boolean);
const vols = fs.readFileSync(path.join(ROOT, "tmp", process.env.TB_VOLFILE || "redeploy-vols.txt"), "utf8")
  .split(/\r?\n/).filter(Boolean)
  .map((l) => { const i = l.indexOf("|"); return { vol: l.slice(0, i), courses: l.slice(i + 1).split(",") }; })
  .filter((v) => !only.length || only.includes(v.vol));

// 组页数上限：读 lib 各课程 md 数
const mdCount = (dir) => {
  let n = 0;
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.isDirectory()) walk(path.join(d, e.name)); else if (e.name.endsWith(".md")) n++; } };
  walk(dir);
  return n;
};

// 加载全量目录并按卷过滤
const { courses, volumes, sources, byKind, categoryOrder, kindOrder, tierLabel, totals, generatedAt } =
  await import(pathToFileURL(path.join(GEN, "catalog.ts")).href);
const serial = (v) => JSON.stringify(v, null, 2);
const writeCatalog = (keep) => {
  const fc = courses.filter((c) => keep.has(c.volume + "/" + c.local));
  const kc = new Map();
  for (const c of fc) kc.set(c.kind, (kc.get(c.kind) || 0) + 1);
  const text = [
    `export const generatedAt = ${serial(generatedAt)}`,
    `export const volumes = ${serial(volumes)}`,
    `export const courses = ${serial(fc)}`,
    `export const sources = ${serial(sources)}`,
    `export const byKind = ${serial(byKind.map((k) => ({ ...k, count: kc.get(k.kind) || 0 })))}`,
    `export const categoryOrder = ${serial(categoryOrder)}`,
    `export const kindOrder = ${serial(kindOrder)}`,
    `export const tierLabel = ${serial(tierLabel)}`,
    `export const totals = ${serial(totals)}`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(GEN, "catalog.ts"), text, "utf8");
  fs.writeFileSync(path.join(GEN, "catalog-batch.ts"), text, "utf8");
};

const wsl = (script) => spawnSync("wsl.exe", ["-e", "bash", "-lc", script], { stdio: "inherit" });
let wslSeq = 0;
const pushGroup = async (vol, dist) => {
  wslSeq++;
  const cmd = `set -e; KEY="$HOME/.ssh/deploy_key"; OPTS="-i $KEY -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15"; cd "/mnt/e/claude code/开发者第一课/tmp/${dist}" && tar czf - lib/${vol} | ssh $OPTS root@168.144.137.102 "tar xzf - -C /var/www/ai-native-textbook" && rsync -az -e "ssh $OPTS" assets/ root@168.144.137.102:/var/www/ai-native-textbook/assets/ && ssh $OPTS root@168.144.137.102 "cat /var/www/ai-native-textbook/hashmap.json" > /tmp/hm-s.json && node "/mnt/e/claude code/开发者第一课/tmp/merge-hashmap.mjs" /tmp/hm-s.json "/mnt/e/claude code/开发者第一课/tmp/${dist}/hashmap.json" /tmp/hm-m.json && rsync -az -e "ssh $OPTS" /tmp/hm-m.json root@168.144.137.102:/var/www/ai-native-textbook/hashmap.json && echo PUSH-OK`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = wsl(cmd);
    if (r.status === 0) return;
    LOG(`  推送第 ${attempt} 次失败（wsl#${wslSeq}），${attempt < 3 ? "45 秒后重试" : "放弃"}`);
    if (attempt < 3) await new Promise((res) => setTimeout(res, 45000));
  }
  throw new Error(`推送失败 (wsl#${wslSeq})`);
};

let failed = 0;
fs.rmSync(LIBALL, { recursive: true, force: true });
fs.renameSync(LIB, LIBALL);
try {
  for (const { vol, courses: ids } of vols) {
    LOG(`卷 ${vol} 开始（${ids.length} 门）`);
    // 只擦除本次要重推的课程目录：卷级擦除会把清单外已完整的课一起删掉
    const wipeList = ids.map((id) => `/var/www/ai-native-textbook/lib/${id}`).join(" ");
    wsl(`ssh -i "$HOME/.ssh/deploy_key" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 root@168.144.137.102 "rm -rf ${wipeList}"`);
    // 卷内分组
    const withPages = ids.map((id) => ({ id, pages: mdCount(path.join(LIBALL, id)) }));
    const groups = [];
    let cur = [], curPages = 0;
    for (const c of withPages) {
      if (curPages + c.pages > 500 && cur.length) { groups.push(cur); cur = []; curPages = 0; }
      cur.push(c); curPages += c.pages;
    }
    if (cur.length) groups.push(cur);
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const pages = group.reduce((s, x) => s + x.pages, 0);
      LOG(`  组 ${gi + 1}/${groups.length}（${group.length} 门 / ${pages} 页）构建开始`);
      // 换库
      for (const c of group) fs.cpSync(path.join(LIBALL, c.id), path.join(LIB, c.id), { recursive: true });
      writeCatalog(new Set(group.map((c) => c.id)));
      const distName = `dist-vol-${vol.replace(/[^a-z0-9]/gi, "_")}-${gi + 1}`;
      const distWin = path.join(ROOT, "tmp", distName);
      fs.rmSync(distWin, { recursive: true, force: true });
      const r = spawnSync("npx", ["vitepress", "build", "docs"], {
        cwd: path.join(ROOT, "site"), stdio: "inherit", shell: true,
        env: Object.assign({}, process.env, {
          NODE_OPTIONS: "--max-old-space-size=8192",
          DOCS_HOST: "aibook.faruheaisha.me",
          TB_BATCH_BUILD: "1", TB_BATCH_CATALOG: "1", TB_SKIP_MIRROR: "1",
          TB_OUT_DIR: distWin,
        }),
      });
      // 还原目录与正典目录数据
      fs.rmSync(LIB, { recursive: true, force: true });
      fs.mkdirSync(LIB, { recursive: true });
      spawnSync("git", ["checkout", "--", "site/docs/.vitepress/theme/generated/catalog.ts"], { cwd: ROOT, shell: true });
      fs.rmSync(path.join(GEN, "catalog-batch.ts"), { force: true });
      if (r.status !== 0) {
        LOG(`  组 ${gi + 1} 构建失败，跳过推送（继续下一组）`);
        failed++;
        continue;
      }
      LOG(`  组 ${gi + 1} 构建完成，推送中`);
      await pushGroup(vol, distName);
      fs.rmSync(distWin, { recursive: true, force: true });
      LOG(`  组 ${gi + 1} 推送完成`);
    }
    LOG(`卷 ${vol} 完成`);
  }
} finally {
  // 还原现场
  if (fs.existsSync(LIBALL)) {
    fs.rmSync(LIB, { recursive: true, force: true });
    fs.renameSync(LIBALL, LIB);
    LOG("lib 已还原");
  }
  spawnSync("git", ["checkout", "--", "site/docs/.vitepress/theme/generated/catalog.ts"], { cwd: ROOT, shell: true });
  fs.rmSync(path.join(GEN, "catalog-batch.ts"), { force: true });
  LOG(`全部结束，失败组数 ${failed}`);
}
