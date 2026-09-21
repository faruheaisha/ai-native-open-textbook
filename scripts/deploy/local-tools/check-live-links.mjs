// 拉取线上 library + paths 页面，提取全部 /lib/ 链接，必须恰好等于 117 门上线集
import fs from "node:fs";

const live = new Set(fs.readFileSync("tmp/live-ids.txt", "utf8").split(/\r?\n/).filter(Boolean));
const pages = ["/library/", ...fs.readdirSync("site/docs/paths").filter(f => f.endsWith(".md")).map(f => "/paths/" + f.replace(/\.md$/, ""))];
const found = new Map();
let bad = 0;
for (const p of pages) {
  const res = await fetch("https://aibook.faruheaisha.me" + p);
  const html = await res.text();
  const hrefs = [...html.matchAll(/href="(\/lib\/[^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    const id = h.replace(/^\/lib\//, "").replace(/\/(index)?\/?$/, "");
    const courseId = h.split("/").filter(Boolean).slice(1, 3).join("/");
    found.set(courseId, (found.get(courseId) || 0) + 1);
    if (!live.has(courseId)) { console.log("  DEAD-LINK", p, "->", h); bad++; }
  }
}
const missing = [...live].filter(id => !found.has(id));
console.log(`页面引用课程数: ${found.size} / 上线 ${live.size}`);
for (const id of missing) { console.log("  NOT-LISTED", id); bad++; }
process.exit(bad ? 1 : 0);
