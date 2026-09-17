---
title: "快照信息：OpenAI Cookbook 文档版（developers.openai.com/cookbook）"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "_快照信息.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/_快照信息.md"
sourceSha256: "c9905916860f9ff1804b9c8d70e21d1907fe034ae027e3b17b50bff7dcb8f5e4"
pageSha256: "c9905916860f9ff1804b9c8d70e21d1907fe034ae027e3b17b50bff7dcb8f5e4"
contentMode: "local-full"
zh: ""
---

# 快照信息：OpenAI Cookbook 文档版（developers.openai.com/cookbook）

- 站点：`https://developers.openai.com/cookbook`（OpenAI 官方 Cookbook 的文档站形态）
- 抓取日期：2026-09-10
- 抓取方式：`cookbook/llms.txt`（51 条）→ 逐篇 `.md` 端点

> 与已落盘的 `08-agents/openai-cookbook` 的区别：**那是 GitHub 仓库快照（源码形态），本集是文档站形态**。文档站版本更新、且有统一 Markdown 端点；两者互补，不是重复。

## 机读端点探测结果

| 端点 | 结果 |
|---|---|
| `https://cookbook.openai.com/llms.txt` | **200**（12,425 B，51 条） |
| `https://developers.openai.com/cookbook/llms.txt` | **200**（同上） |
| `https://developers.openai.com/cookbook/llms-full.txt` | **200**（2,154,572 B 单文件全量） |
| `https://cookbook.openai.com/sitemap.xml` | 404 |
| `https://cookbook.openai.com/robots.txt` | 404 |

## 文件清单

```text
cookbook/**/*.md      49 篇官方 Markdown 全文
_llms.txt             官方索引（51 条）
_llms-full.txt        官方单文件全量导出（2.15 MB）
_learn-llms-full.txt  附带：learn 文档集单文件导出（69,559 B）
```

## 对本项目最重要的条目

**上下文 / 记忆 / 压缩（卷 10 直接可用）**

- `Context Engineering - Short-Term Memory Management with Sessions`
- `Context Engineering for Personalization - State Management with Long-Term Memory Notes`
- `Building Reliable Agents with Memory and Compaction`
- `Enabling Long-Term Agent Memory with Oracle AI Agent Memory`
- `Temporal Agents with Knowledge Graphs`

**评估（卷 08 / 11）**

- `Macro Evals for Agentic Systems`（把 trace 级 eval 信号聚类成行为模式再下钻）
- `Build an Agent Improvement Loop with Traces, Evals, and Codex`
- `Image Evals for Image Generation and Editing Use Cases`
- `Realtime Eval Guide`、`GPT-Live evaluation guide`
- `Moving from OpenAI Evals to Promptfoo`

**Codex 工程工作流（卷 07 / 09）**

- `Iterating Development Workflows with Codex`（repository harness、分阶段实施计划、审批门、可复用 skills）
- `Modernizing your Codebase with Codex`、`Automating Code Quality and Security Fixes with Codex CLI on GitLab`
- `Build iterative repair loops with Codex`、`Using Goals in Codex`
- `Migrate a Legacy Codebase with Sandbox Agents`

**迁移与对照（有辨析价值）**

- `Migrate from the Claude Agent SDK to the OpenAI Agents SDK` —— 跨厂商概念映射（tool / guardrail / handoff / approval / sandbox 边界）
- `Migrate from Whisper to GPT-Transcribe and GPT-Live-Transcribe`

**办公 Agent（卷 04）**

- `Building workspace agents in ChatGPT to complete repeatable, end-to-end work`
- `Trigger a Workspace Agent from the API`
- `Manage SharePoint site access with the ChatGPT Admin API`
- `ChatGPT Enterprise Prompting Guide`

## 权利与复用

- 官方文档，受 OpenAI 站点条款约束。Cookbook 代码样例通常另有许可声明，**逐篇引用代码前须核对该篇的许可标注**。
- 复用级别 **CITE**（正文引用与事实核对）；代码如确需进入教材，须逐条核对许可并标注出处。
