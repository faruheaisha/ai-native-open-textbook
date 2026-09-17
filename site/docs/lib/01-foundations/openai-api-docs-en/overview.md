---
title: "快照信息：OpenAI API 指南文档（developers.openai.com/api/docs）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "_快照信息.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/_快照信息.md"
sourceSha256: "b26072e54ec6a2aacebe465c8fdd46d89b25f38f8ca623bb2c699f840c53ab9c"
pageSha256: "b26072e54ec6a2aacebe465c8fdd46d89b25f38f8ca623bb2c699f840c53ab9c"
contentMode: "local-full"
zh: ""
---

# 快照信息：OpenAI API 指南文档（developers.openai.com/api/docs）

- 站点：`https://developers.openai.com/api/docs`（OpenAI 官方 API 指南与概念文档）
- 抓取日期：2026-09-10
- 抓取方式：`api/docs/llms.txt`（227 条）→ 逐页 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://developers.openai.com/api/llms.txt` | **200**（794 B，路由索引：guides / reference 两支） |
| `https://developers.openai.com/api/docs/llms.txt` | **200**（41,838 B，227 条） |
| `https://developers.openai.com/api/docs/llms-full.txt` | **200**（4,840,749 B，单文件全量） |
| `https://platform.openai.com/docs/overview` | **403**（旧文档域不可达） |

> `platform.openai.com/docs` 对本机持续 403，但 `developers.openai.com/api/docs` 提供同一批文档的 Markdown 端点。本快照即为该替代通道的产物。

## 文件清单

```text
api/**/*.md           226 份官方 Markdown 全文
_llms.txt             官方索引（227 条）
_llms-full.txt        官方单文件全量导出（4.84 MB）
_openai-developers-root-llms.txt     站点总索引（11 个文档集入口）
_showcase-index-llms.txt             showcase 索引（仅登记，未抓取正文）
```

## 覆盖范围

按 `api/docs/` 一级路径组织，主要包含：

- **能力指南**：Responses API、文本生成、图像生成、音频与 Realtime（WebRTC / WebSocket / SIP）、语音、工具与函数调用、结构化输出、Embeddings
- **工程实践**：评估（Evals）、微调（Fine-tuning）、模型选择、错误码、限流、请求 ID、流式
- **Actions 体系**：`api/docs/actions/**`（认证、数据检索、Actions 库、入门）
- **平台集成**：Amazon Bedrock、Workload Identity Federation、支持国家/地区
- **模型与库**：官方客户端库、模型页

## 对本项目的价值

| 卷 | 用到的部分 |
|---|---|
| 01 / 02 / 03 | 模型选择、能力边界、访问与计费机制 |
| 08 / 09 | 工具与函数调用、Responses API、Actions |
| 10 | 会话与状态、结构化输出 |
| 11 | 评估、Realtime 与语音 Agent |

## 权利与复用

- 官方文档，受 OpenAI 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE**：可引用（注明 URL + 抓取日期），不进入 CURATE / ADAPT。
- 模型名、价格、限流阈值属 **Live Facts**，引用前回原站核验。
