---
title: "快照信息：扣子（Coze）官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "_快照信息.md"
rawUrl: "/raw/04-work/coze-official-docs/_快照信息.md"
sourceSha256: "cecd1060406af3d179de3e6dca305e83a052dfc81215bd2e42fad19c0245d159"
pageSha256: "cecd1060406af3d179de3e6dca305e83a052dfc81215bd2e42fad19c0245d159"
contentMode: "local-full"
zh: ""
---

# 快照信息：扣子（Coze）官方文档

- 站点：`https://docs.coze.cn/`
- 抓取日期：2026-09-10
- 抓取方式：取官方 `llms.txt`（129,702 字符，958 条索引），再按索引抓取核心 `.md` 页面 100 篇

## 文件清单

```text
llms.txt        129,702 字符   全量文档索引（含每篇摘要）
docs/*.md       100 篇          按关键词（办公/文档/技能/工作流/知识库/智能体/快速开始/日程/记忆/会议…）选取的核心文档
```

## 覆盖范围（示例）

- 快速开始：注册登录、开始使用、网页端/移动端上手
- 工作方式：对话、记忆、日程、会议旁听、深度截图
- 项目与协作、套餐与定价、常见问题、产品动态（2026-01 ~ 06）
- 订阅套餐（个人/团队/企业）、工作空间与权限

## 权利与复用

- 官方文档，受扣子站点条款约束；快照仅用于内部研究与引用。
- 未抓取的部分可通过 `llms.txt` 中的 URL 补取（每页都有 `.md` 端点）。

## 备注

- `www.coze.cn/open/docs/llms.txt` 返回的是 SPA HTML（无效），真实端点在 `docs.coze.cn`。
  该现象已写入检索纪律（"llms.txt 也可能是 SPA 回退"）。
