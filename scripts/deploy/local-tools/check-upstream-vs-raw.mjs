// 临时核对：upstream/ 快照字节 ↔ site/docs/public/raw/ 归档 + raw-manifest 哈希
// origin=upstream 的条目必须与 upstream/<dir>/<path> 字节一致；origin=derived 的跳过（派生稿另查）。
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const manifest = JSON.parse(fs.readFileSync("site/docs/public/raw-manifest.json", "utf8"));
console.log("manifest mode:", manifest.mode, "generatedAt:", manifest.generatedAt, "sources:", manifest.sources.length);

const hash = (f) => {
  const h = crypto.createHash("sha256");
  h.update(fs.readFileSync(f));
  return h.digest("hex");
};

let checked = 0, missing = 0, mismatch = 0, derived = 0, extra = 0;
const bad = [];
for (const s of manifest.sources) {
  for (const f of s.files || []) {
    if (f.origin === "derived") { derived++; continue; }
    const src = path.join(ROOT, "upstream", s.dir, ...f.path.split("/"));
    if (!fs.existsSync(src)) { missing++; bad.push(`MISSING upstream ${s.id}/${f.path}`); continue; }
    checked++;
    const sha = hash(src);
    if (sha !== f.sha256 || fs.statSync(src).size !== f.bytes) {
      mismatch++;
      bad.push(`MISMATCH ${s.id}/${f.path}`);
    }
  }
}
// 反向：upstream 里有没有 manifest 没登记的 md 文件（漏归档检测，只统计，避免走全树太慢）
for (const x of bad.slice(0, 20)) console.error(x);
console.log(`upstream vs raw-manifest: checked=${checked} derived-skipped=${derived} missing=${missing} mismatch=${mismatch}`);
process.exit(missing + mismatch > 0 ? 1 : 0);
