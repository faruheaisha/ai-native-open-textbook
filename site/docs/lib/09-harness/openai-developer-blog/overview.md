---
title: "快照信息：OpenAI 开发者博客（developers.openai.com/blog）"
sourceId: "09-harness/openai-developer-blog"
sourceTitle: "openai-developer-blog"
sourceKind: "官方博客"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://developers.openai.com/blog"
entryUrl: "https://developers.openai.com/blog"
sourceRel: "_快照信息.md"
rawUrl: "/raw/09-harness/openai-developer-blog/_快照信息.md"
sourceSha256: "9dd822d37c501cf9272cb676c55b1c168b06099cdac764a0a4cf6c8843de68cb"
pageSha256: "9dd822d37c501cf9272cb676c55b1c168b06099cdac764a0a4cf6c8843de68cb"
contentMode: "local-full"
zh: ""
---

# 快照信息：OpenAI 开发者博客（developers.openai.com/blog）

- 站点：`https://developers.openai.com/blog`（OpenAI 官方开发者博客）
- 抓取日期：2026-09-10
- 抓取方式：`blog/llms.txt`（29 条）→ 逐篇 `.md` 端点

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://developers.openai.com/blog/llms.txt` | **200**（6,263 B，29 条） |
| `https://developers.openai.com/blog/llms-full.txt` | **200**（388,811 B，单文件全量导出） |
| `https://developers.openai.com/blog/harness-engineering.md` | 404（该篇不在开发者博客域） |

## 文件清单

```text
blog/*.md             27 篇官方 Markdown 全文
_llms.txt             官方索引（29 条）
_llms-full.txt        官方单文件全量导出（388 KB）
```

## 对本项目最重要的三篇

**1. `codex-as-a-platform.md`《Codex as a platform: build on the open agent harness》**

这是 `openai.com` 主站 403 之后，本项目**第一次拿到的 OpenAI 官方 harness 定义原文**：

> "A capable agent is more than a prompt and a model response. It needs a way to understand a task, maintain context over time, inspect relevant information, call tools, expose progress, handle failures, request human approval when necessary, and return a useful result. **That surrounding execution system is the harness.**"

> "It helps models gather context, reason through tasks, use tools, **operate within configured boundaries, request approval**, and carry work forward."

并给出量化效果：ARC-AGI-3 上 retained reasoning + context compaction 把 GPT-5.6 Sol 从 **13.3% 提到 38.3%**，同时输出 token 降至六分之一。

→ 用途：卷 09 概念章的 harness 定义句；「harness 隐喻」读法 B 的第一手证据。

**2. `skills-shell-tips.md`《Shell + Skills + Compaction: Tips for long-running agents that do real work》**

Responses API 侧 skills / hosted shell / server-side compaction 的实践模式 → 卷 10。

**3. `run-long-horizon-tasks-with-codex.md`《Run long horizon tasks with Codex》**

长期任务的 Codex 侧做法 → 卷 09 / 10 的长期执行章节，与 Anthropic 的 context reset 方案形成对照。

其余与教学相关的还有：`eval-skills.md`（用 Evals 系统化测试 Agent Skills）、`skills-agents-sdk.md`（用 skills 加速开源维护）、`custom-code-review-rules-for-codex.md`、`automating-repetitive-work-at-openai-with-codex.md`、`codex-for-documentation-dagster.md`、`connect-private-mcp-servers-to-openai-products.md`、`15-lessons-building-chatgpt-apps.md`。

## 权利与复用

- 官方博客，受 OpenAI 站点条款约束，无开源许可。
- 复用级别 **INDEX / CITE**：可引用（注明篇名 + URL + 抓取日期），不进入 CURATE / ADAPT。
- 文章内配图（`/images/blog/*.webp`）未镜像、未单独核权。
