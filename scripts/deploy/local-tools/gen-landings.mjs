// 为 9 门缺落地页的课程补生成 index.md（复刻 build-site-content 的落地页逻辑，
// 导航树直接用构建器写入 catalog.ts 的 c.nav）。只写缺失的文件，其它一概不动。
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "site", "docs");
const LIB = path.join(DOCS, "lib");
const NEED = [
  "01-foundations/anthropic-platform-docs-en", "01-foundations/openai-api-docs-en",
  "04-work/coze-studio", "04-work/qwenwork-official-help",
  "07-coding/ai-engineering-from-scratch", "07-coding/ai-engineering-from-scratch-zh",
  "07-coding/easy-vibe", "07-coding/fufan-vibe-coding-course", "07-coding/liyupi-ai-guide",
];

const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "catalog/catalog.json"), "utf8"));
const src = fs.readFileSync(path.join(ROOT, "site/docs/.vitepress/theme/generated/catalog.ts"), "utf8");
const i0 = src.indexOf("export const courses: Course[] = ");
const j0 = src.indexOf("\nexport const ", i0 + 10);
const courses = JSON.parse(src.slice(i0 + "export const courses: Course[] = ".length, j0));
const byId = new Map(courses.map((c) => [c.volume + "/" + c.local, c]));

function splitBlocksPara(text) {
  // firstParagraph 的取段规则：首个 ≥20 字符、非图片/HTML 开头的段落，超 320 截断
  const blocks = [];
  let cur = [];
  let fence = null;
  const flush = () => {
    if (!cur.length) return;
    const raw = cur.join("\n"); cur = [];
    const t = raw.trim();
    if (!t) return;
    let type = "para";
    if (/^(```|~~~)/.test(t)) type = "fence";
    else if (/^#{1,6}\s/.test(t)) type = "heading";
    else if (/^</.test(t)) type = "html";
    else if (/^([-*+]|\d+\.)\s/.test(t)) type = "list";
    else if (/^>/.test(t)) type = "quote";
    else if (/^\|/.test(t)) type = "table";
    else if (/^!\[/.test(t)) type = "image";
    blocks.push({ type, text: raw });
  };
  for (const line of text.split("\n")) {
    if (/^(```|~~~)/.test(line.trim())) { flush(); fence = fence ? null : true; continue; }
    if (fence) { cur.push(line); continue; }
    if (!line.trim()) flush(); else cur.push(line);
  }
  flush();
  return blocks;
}
function firstParagraph(text) {
  for (const b of splitBlocksPara(text)) {
    if (b.type !== "para") continue;
    const t = b.text.trim();
    if (t.length < 20) continue;
    if (/^\[?!\[/.test(t)) continue;
    if (/<[A-Za-z/]/.test(t)) continue;
    return t.length > 320 ? t.slice(0, 320).replace(/\s+\S*$/, "") + "…" : t;
  }
  return "";
}
function navToMarkdown(items, indent) {
  const pad = "  ".repeat(indent);
  const out = [];
  for (const it of items) {
    const head = it.link ? `[${it.text}](${it.link}.md)` : `**${it.text}**`;
    out.push(pad + "- " + head);
    if (it.items && it.items.length) out.push(...navToMarkdown(it.items, indent + 1));
  }
  return out;
}
const leaves = (items, out = []) => {
  for (const it of items || []) {
    if (it.items && it.items.length) leaves(it.items, out);
    else if (it.link) out.push(it);
  }
  return out;
};

let made = 0;
for (const id of NEED) {
  const outPath = path.join(LIB, id, "index.md");
  if (fs.existsSync(outPath)) { console.log("已存在，跳过:", id); continue; }
  const s = catalog.sources.find((x) => x.id === id);
  const c = byId.get(id);
  if (!s || !c) throw new Error("catalog 缺条目: " + id);
  const firstLeaf = leaves(c.nav || [])[0];
  if (!firstLeaf) throw new Error("导航无叶子: " + id);
  const mdFile = path.join(LIB, id, (firstLeaf.link.replace("/lib/" + id + "/", "")) + ".md");
  const raw = fs.readFileSync(mdFile, "utf8");
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  const intro = firstParagraph(body);
  const hasZh = fs.existsSync(path.join(ROOT, "translations", s.volume, s.local + ".json"));
  const lessons = leaves(c.nav || []);
  const fm = {
    title: s.title,
    landing: true,
    tier: c.tier,
    sourceId: s.id,
    sourceTitle: s.title,
    sourceKind: s.kind,
    licenseLabel: s.licenseLabel,
    lang: s.lang,
    volume: s.volume,
    sourceUrl: s.repo ? `https://github.com/${s.repo}` : (s.site || ""),
    entryUrl: s.entry && s.repo && s.commit
      ? `https://github.com/${s.repo}/blob/${s.commit}/${s.entry}`
      : (s.repo ? `https://github.com/${s.repo}` : (s.site || "")),
    sourceRel: "",
    contentMode: "local-full",
    zh: hasZh ? "on" : "",
  };
  const landing = [
    "---",
    Object.entries(fm).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n"),
    "---",
    "",
    `# ${s.title}`,
    "",
    intro,
    "",
    "## 课时",
    "",
    ...navToMarkdown(c.nav || [], 0),
    "",
    lessons.length ? `开始学习 → [${lessons[0].text}](${lessons[0].link}.md)` : "",
    "",
  ].filter((x, i, a) => x !== "" || a[i - 1] !== "");
  fs.writeFileSync(outPath, landing.join("\n") + "\n", "utf8");
  made++;
  console.log("生成:", id, "| 课时叶子:", lessons.length);
}
console.log("共生成", made, "个落地页");
