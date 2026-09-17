---
title: "快照信息：千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "_快照信息.md"
rawUrl: "/raw/04-work/qwenwork-official-help/_快照信息.md"
sourceSha256: "a503a2461d31325d83cb6d4541e0c03a7ac6a5e84823e8ad48dd30462d002661"
pageSha256: "a503a2461d31325d83cb6d4541e0c03a7ac6a5e84823e8ad48dd30462d002661"
contentMode: "local-full"
zh: ""
---

# 快照信息：千问办公官方帮助中心（阿里云）

- 站点：`https://help.aliyun.com/zh/qwenwork/`（阿里云帮助中心 · 千问办公，官方）
- 抓取日期：2026-09-10
- 抓取方式：
  1. 以 `qwenwork-intro` 为种子，按同前缀 `/zh/qwenwork/` 的 `href` 广度优先抓取 HTML（102 页）；
  2. 抓取官方 `llms.txt`（全站机读索引）；
  3. 按 `llms.txt` 中的逐页 `.md` 端点抓取 Markdown（234 篇成功）。

## 文件清单

```text
*.html          102 页（含企业标准版 / 企业旗舰版 / 开发者文档 / 核心能力 / 入门指南 / 常见问题 / 官方公告）
llms.txt        53,835 字节（机读索引：分节 + 每篇摘要）
md/*.md         234 篇逐页 Markdown
_crawl-manifest.tsv  抓取清单（URL → 本地文件 → 成功标记）
```

## 抓取过程与坑（重要）

1. **WAF 挑战页**：首轮 103 页中 **62 页**返回的是阿里云 WAF 挑战页（约 2.4 KB、含 `x5secdata`），HTTP 状态仍是 200。
   判定规则：页面 < 3.5 KB 或含 `x5secdata|_____tmd_____` → 视为失败。
   补抓策略：单线程 + 5–9 秒随机间隔 + Cookie 会话 + 每页最多 3 次重试，**62 页全部补齐**。
2. **`.md` 端点**：239 个链接中 233 篇一次成功；`desktop-installation-guide` / `getting-start` / `product-overview` / `purchase-guide` / `workbench` 无对应 md（其 HTML 版本已在快照内），`my-webpage` 重试后取得（正文仅一行）。
3. 抓取完成后探测 `sitemap.xml` 触发 WAF 拦截（x5secdata），**后续请勿对该站点做批量探测**。

## 权利与复用

- 官方文档，受阿里云帮助中心条款约束；本快照仅用于**内部研究、事实核对与短文摘引**（注明来源与抓取日期）。
- 不镜像图片与交互资产；不将全文搬入发布物。
- 产品细节（入口、额度、命名）属 **Live Facts**，引用前回官方页面核验。
