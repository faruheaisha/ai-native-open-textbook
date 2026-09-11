// 把「网站导出」类上游（JSON / 单文件 HTML）转成站内 markdown。
// 只做结构搬运，不改写文字；镜像不到的资源（图片、视频）整行去掉，避免站内出现裂图。
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_BASE = path.join(ROOT, "derived");
const SITE_PUBLIC = path.join(ROOT, "site", "docs", "public");

function slugify(title) {
  return String(title)
    .trim()
    .replace(/[\\/:*?"<>|#%{}]+/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 60);
}

// 正文里指向未镜像媒体的图片语法一并清除；正文文字保持原样。
// 站点渲染器还会吐出 <grid>/<column> 这类纯排版容器（多为空壳），
// 它们没有语义、站内也渲染不了，留着只会让整段被当成无意义标记，所以整对去掉。
function stripUnmirroredMedia(md) {
  return md
    .replace(/<grid>\s*/gi, "")
    .replace(/<\/grid>\s*/gi, "")
    .replace(/<column\b[^>]*>\s*/gi, "")
    .replace(/<\/column>\s*/gi, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/^\s*<img[^>]*>\s*$/gim, "")
    .replace(/^\s*<video[\s\S]*?<\/video>\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// 目录里有一层「使用篇 / 场景篇 / 金融场景」这样的分组节点，它们本身不是文章，
// 正文只有一行标题。判据用「去掉首行标题后还剩多少字」，而不是靠 depth 猜。
function articleBody(doc) {
  const raw = stripUnmirroredMedia(doc.content || "");
  return raw.replace(/^#\s.*\n?/, "").trim();
}

function collect(doc, childrenOf, out) {
  const kids = childrenOf.get(doc.nodeToken) || [];
  if (articleBody(doc).length >= 80) out.push(doc);
  for (const k of kids) collect(k, childrenOf, out);
}

function importDoubaowork() {
  const src = path.join(ROOT, "upstream", "04-work", "doubaowork-bluebook", "site-content.json");
  const data = JSON.parse(fs.readFileSync(src, "utf8"));
  const docs = data.documents;
  const childrenOf = new Map();
  for (const d of docs) {
    const p = d.parentToken || "";
    if (!childrenOf.has(p)) childrenOf.set(p, []);
    childrenOf.get(p).push(d);
  }
  for (const [, arr] of childrenOf) arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const roots = childrenOf.get("") || [];
  const ordered = [];
  for (const r of roots) collect(r, childrenOf, ordered);

  const outDir = path.join(OUT_BASE, "04-work", "doubaowork-bluebook");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const toc = ["# 豆包工作蓝皮书 · 目录", ""];
  let n = 0;
  for (const d of ordered) {
    n += 1;
    const name = String(n).padStart(2, "0") + "-" + slugify(d.title) + ".md";
    let body = stripUnmirroredMedia(d.content);
    // 上游正文首行已是同名标题，这里只保证标题存在。
    if (!/^#\s/.test(body)) body = "# " + d.title + "\n\n" + body;
    fs.writeFileSync(path.join(outDir, name), body + "\n", "utf8");
    toc.push(`${n}. ${d.title}`);
  }
  fs.writeFileSync(path.join(outDir, "README.md"), toc.join("\n") + "\n", "utf8");
  console.log("doubaowork → " + n + " 篇");
  return { outDir, count: n };
}

importDoubaowork();
console.log("派生目录：" + path.relative(ROOT, path.join(OUT_BASE, "04-work", "doubaowork-bluebook")));


// ---------- 智见 AI《WorkBuddy Harness》单文件 HTML 书 ----------
// 上游是一份自包含的导出版式（正文 + 内联截图），这里按 <section class="book-section"> 切章，
// 把语义标签翻成 markdown；内联的 base64 截图落成 public 下的真实文件，避免把 50MB base64 塞进页面。

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", times: "×", middot: "·", ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", copy: "©" };

function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => (n in ENTITIES ? ENTITIES[n] : m));
}

// 行内标签：加粗、斜体、行内代码、链接
function inlineMd(s) {
  let x = String(s);
  x = x.replace(/<br\s*\/?>/gi, "\n");
  x = x.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => "**" + t.trim() + "**");
  x = x.replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => "**" + t.trim() + "**");
  x = x.replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => "*" + t.trim() + "*");
  x = x.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, t) => "`" + decodeEntities(t).trim() + "`");
  x = x.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, txt) => {
    const label = decodeEntities(txt.replace(/<[^>]+>/g, "")).trim();
    const url = decodeEntities(href);
    if (!label) return "";
    return url.startsWith("#") ? label : "[" + label + "](" + url + ")";
  });
  x = x.replace(/<[^>]+>/g, "");
  return decodeEntities(x).replace(/[ \t]+\n/g, "\n").trim();
}

function htmlTableToMd(html) {
  const rows = [];
  for (const tr of html.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || []) {
    const cells = (tr.match(/<t[hd]\b[^>]*>[\s\S]*?<\/t[hd]>/gi) || []).map((c) =>
      inlineMd(c.replace(/^<t[hd]\b[^>]*>/i, "").replace(/<\/t[hd]>$/i, "")).replace(/\|/g, "\\|").replace(/\n/g, " ")
    );
    if (cells.length) rows.push(cells);
  }
  if (!rows.length) return "";
  const cols = Math.max(...rows.map((r) => r.length));
  const pad = (r) => { const c = r.slice(); while (c.length < cols) c.push(""); return c; };
  const head = pad(rows[0]);
  const out = ["| " + head.join(" | ") + " |", "|" + head.map(() => "-").join("|") + "|"];
  for (const r of rows.slice(1)) out.push("| " + pad(r).join(" | ") + " |");
  return "\n\n" + out.join("\n") + "\n";
}

function htmlToMarkdown(html, onImage) {
  let s = String(html);
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, "");
  // 纯排版容器不承载语义，直接拆掉，避免残留标签把整段判成「界面骨架」
  s = s.replace(/<\/?div\b[^>]*>/gi, "\n");
  s = s.replace(/<\/?span\b[^>]*>/gi, "");
  s = s.replace(/<\/?section\b[^>]*>/gi, "\n");

  // 代码块：先把内容封起来，后面的行内替换不会碰到它
  const fences = [];
  s = s.replace(/<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi, (_, attrs, body) => {
    const lang = (/language-([\w-]+)/i.exec(attrs) || [])[1] || "";
    const code = decodeEntities(body.replace(/<[^>]+>/g, "")).replace(/\s+$/, "");
    fences.push("```" + lang + "\n" + code + "\n```");
    return "\u0000FENCE" + (fences.length - 1) + "\u0000";
  });

  const tables = [];
  s = s.replace(/<table\b[\s\S]*?<\/table>/gi, (m) => {
    tables.push(htmlTableToMd(m));
    return "\u0000TABLE" + (tables.length - 1) + "\u0000";
  });

  s = s.replace(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi, (_, inner) => {
    const src = (/<img\b[^>]*src="([^"]+)"/i.exec(inner) || [])[1] || "";
    const cap = (/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i.exec(inner) || [])[1] || "";
    const label = inlineMd(cap).replace(/\n/g, " ");
    const url = src && onImage ? onImage(src, label) : "";
    if (!url) return "\n";
    return "\n\n![" + label.replace(/[\[\]]/g, "") + "](" + url + ")\n";
  });

  s = s.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) =>
    "\n\n" + (inner.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) || []).map((li) => "- " + inlineMd(li.replace(/^<li\b[^>]*>/i, "").replace(/<\/li>$/i, ""))).join("\n") + "\n"
  );
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) =>
    "\n\n" + (inner.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) || []).map((li, i) => i + 1 + ". " + inlineMd(li.replace(/^<li\b[^>]*>/i, "").replace(/<\/li>$/i, ""))).join("\n") + "\n"
  );
  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) =>
    "\n\n" + inlineMd(inner).split("\n").map((l) => "> " + l).join("\n") + "\n"
  );

  s = s.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_, x) => "\n\n# " + inlineMd(x) + "\n");
  s = s.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_, x) => "\n\n## " + inlineMd(x) + "\n");
  s = s.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_, x) => "\n\n### " + inlineMd(x) + "\n");
  s = s.replace(/<hr\s*\/?>/gi, "\n\n---\n");
  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, x) => {
    const v = inlineMd(x);
    return v ? "\n\n" + v + "\n" : "";
  });

  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  s = s.replace(/\u0000FENCE(\d+)\u0000/g, (_, i) => "\n\n" + fences[Number(i)] + "\n");
  s = s.replace(/\u0000TABLE(\d+)\u0000/g, (_, i) => tables[Number(i)]);
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function importWorkbuddyBook() {
  const src = path.join(ROOT, "upstream", "04-work", "zhijian-ai-bluebook-workbuddy-harness", "book.html");
  const html = fs.readFileSync(src, "utf8");
  const parts = html.split(/<section class="book-section/).slice(1);
  const outDir = path.join(OUT_BASE, "04-work", "zhijian-ai-bluebook-workbuddy-harness");
  const imgDir = path.join(SITE_PUBLIC, "workbuddy-harness");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.rmSync(imgDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  let imgN = 0;
  const used = new Set();
  const onImage = (dataUri, label) => {
    const m = /^data:image\/(\w+);base64,(.+)$/s.exec(dataUri.trim());
    if (!m) return "";
    imgN += 1;
    const ext = m[1].toLowerCase() === "jpeg" ? "jpg" : m[1].toLowerCase();
    const name = "fig-" + String(imgN).padStart(2, "0") + "." + ext;
    fs.writeFileSync(path.join(imgDir, name), Buffer.from(m[2], "base64"));
    return "/workbuddy-harness/" + name;
  };

  const toc = ["# WorkBuddy Harness · 目录", ""];
  let n = 0;
  for (const raw of parts) {
    const body = raw.slice(raw.indexOf(">") + 1);
    const h1 = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(body);
    if (!h1) continue;
    const title = decodeEntities(h1[1].replace(/<[^>]+>/g, "")).trim();
    if (!title) continue;
    let md = htmlToMarkdown(body, onImage);
    // 章首的英文栏目条（CHAPTER 01 · ZJBB-003）是排版装饰，不进正文
    md = md.replace(/^[A-Z][A-Z \d]*·\s*ZJBB-003\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
    if (md.replace(/[#>*\-\s|:]/g, "").length < 40) continue;
    n += 1;
    let base = String(n).padStart(2, "0") + "-" + slugify(title);
    while (used.has(base)) base += "-2";
    used.add(base);
    fs.writeFileSync(path.join(outDir, base + ".md"), md + "\n", "utf8");
    toc.push(n + ". " + title);
  }
  fs.writeFileSync(path.join(outDir, "README.md"), toc.join("\n") + "\n", "utf8");
  console.log("workbuddy harness → " + n + " 篇 · 插图 " + imgN + " 张");
}

importWorkbuddyBook();
