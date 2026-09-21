// 临时核对：生成目录（站点侧栏数据源）与 site/docs/lib 课程目录的覆盖关系
import fs from "node:fs";

const src = fs.readFileSync("site/docs/.vitepress/theme/generated/catalog.ts", "utf8");
const re = /export const courses(?::\s*Course\[\])?\s*=\s*/;
const m = re.exec(src);
if (!m) { console.error("courses export not found"); process.exit(1); }
const start = m.index + m[0].length;
// 找到这段数组的结尾：下一个顶格的 export，或文件尾
const rest = src.slice(start);
const endMatch = /\nexport const /.exec(rest);
const jsonText = endMatch ? rest.slice(0, endMatch.index) : rest;
const courses = JSON.parse(jsonText);

console.log("generated catalog courses:", courses.length);
const onSite = new Set();
for (const v of fs.readdirSync("site/docs/lib")) {
  for (const c of fs.readdirSync("site/docs/lib/" + v)) onSite.add(v + "/" + c);
}
const inNav = new Set(courses.map((c) => c.volume + "/" + c.local));
const d1 = [...onSite].filter((x) => !inNav.has(x));
const d2 = [...inNav].filter((x) => !onSite.has(x));
console.log("on-site but no sidebar:", d1.length ? d1.join(",") : "none");
console.log("sidebar but no site dir:", d2.length ? d2.join(",") : "none");

const noNav = courses.filter((c) => !c.nav || !c.nav.length).map((c) => c.volume + "/" + c.local);
console.log("courses with empty nav tree:", noNav.length ? noNav.slice(0, 10).join(",") + (noNav.length > 10 ? ` (+${noNav.length - 10} more)` : "") : "none");

// 侧栏树的叶子链接是否都指向真实存在的 md 文件
const ROOT = process.cwd();
let leafTotal = 0, leafMissing = [];
const walkItems = (items, courseId) => {
  for (const it of items || []) {
    if (it.items?.length) { walkItems(it.items, courseId); continue; }
    if (!it.link) continue;
    leafTotal++;
    const mdPath = "site/docs" + it.link.replace(/\.html$/, "") + ".md";
    if (!fs.existsSync(mdPath)) leafMissing.push(courseId + " -> " + it.link);
  }
};
for (const c of courses) walkItems(c.nav || [], c.volume + "/" + c.local);
console.log("sidebar leaf links:", leafTotal, "missing md:", leafMissing.length);
for (const x of leafMissing.slice(0, 15)) console.log("  LEAF-MISSING", x);

// 反向抽查：站点 md 页是否都能被侧栏或落地页引用到（抽样每门课第一层文件）
const sample = courses[0];
console.log("sample nav[0..2]:", JSON.stringify((sample.nav || []).slice(0, 3)).slice(0, 400));
