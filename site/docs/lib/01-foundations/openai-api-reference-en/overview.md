---
title: "快照信息：OpenAI API 端点参考（developers.openai.com/api/reference）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "_快照信息.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/_快照信息.md"
sourceSha256: "9c8b1db6568490c64b8a22dbe98832f403db478282b189e04420174d0d4bdad5"
pageSha256: "9c8b1db6568490c64b8a22dbe98832f403db478282b189e04420174d0d4bdad5"
contentMode: "local-full"
zh: ""
---

# 快照信息：OpenAI API 端点参考（developers.openai.com/api/reference）

- 站点：`https://developers.openai.com/api/reference`（OpenAI 官方 API 端点参考）
- 抓取日期：2026-09-10
- 抓取方式：`api/reference/llms.txt`（216 条）→ 逐页 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://developers.openai.com/api/reference/llms.txt` | **200**（36,011 B，216 条） |
| `https://developers.openai.com/api/llms-full.txt` | **200**（4,840,749 B，含 guides + reference） |

## 文件清单

```text
api/reference/**/*.md       211 份官方 Markdown 全文
_llms.txt                   官方索引（216 条）
```

## ★ 有意排除：4 个机器生成的 schema 转储页

以下 4 个页面为**自动生成的完整类型 schema 转储**（含 `HttpDeclReference` / `HttpTypeReference` 等内部类型引用 JSON），单体 15–23 MB、单项可达 57 万行，**对人类阅读与教学无实际价值**，且会显著拖慢全文检索。按「质量优先于数量」原则**有意不迁入**：

| URL | 体量 |
|---|---|
| `/api/reference/resources/responses/websocket-events.md` | 16.7 MB |
| `/api/reference/resources/responses/streaming-events.md` | 15.0 MB |
| `/api/reference/resources/beta/subresources/responses/websocket-events.md` | 22.8 MB |
| `/api/reference/resources/beta/subresources/responses/streaming-events.md` | 18.4 MB |

→ 如需，按上表 URL 加 `.md` 现场重取即可。**除这 4 个之外，清单内其余 211 条全部落盘。**

其余体量在 1–5 MB 的 schema 页（`responses.md`、`live/primary-websocket.md`、`realtime/server-events.md` 等）**保留**，未做裁剪。

## 对本项目的价值

**跨卷的"精确事实"查询源。** 官方端点、请求/响应字段、流式事件、错误结构、限流与请求 ID 的权威定义。属于**查阅型来源（reference grade）**，不是教学编排素材。

使用建议：卷内需要写死字段名、参数名、事件名时引用本集；概念讲解仍以 `openai-api-docs-en`（指南）与 `openai-codex-docs-official` 为主。

## 权利与复用

- 官方文档，受 OpenAI 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE（reference grade）**：仅用于字段级事实核对，不进入 CURATE / ADAPT。
