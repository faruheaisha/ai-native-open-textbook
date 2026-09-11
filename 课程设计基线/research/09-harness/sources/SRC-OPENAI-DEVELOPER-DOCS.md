---
source_id: SRC-OPENAI-DEVELOPER-DOCS
title: OpenAI 开发者文档全域（Codex 文档 / 开发者博客 / Cookbook / API 指南与参考 / 插件）
publisher: OpenAI
source_tier: T1
source_type: official_documentation_site
canonical_url: https://developers.openai.com/
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照 2026-09-10（6 个文档集，约 690 份 Markdown）
status: accepted
license: 官方文档（站点条款，无开源许可；Cookbook 代码样例须逐篇核许可）
rights_status: cite_only
language: 英文
snapshot: upstream/09-harness/openai-codex-docs-official/ · upstream/09-harness/openai-developer-blog/ · upstream/08-agents/openai-cookbook-docs/ · upstream/11-personal-agents/openai-plugins-docs/ · upstream/01-foundations/openai-api-docs-en/ · upstream/01-foundations/openai-api-reference-en/
---

# Source Record：OpenAI 开发者文档全域

## 为什么重要

这是本项目**第一次拿到 OpenAI 官方技术文档原文**。此前长期阻断：`openai.com`、`platform.openai.com`、`help.openai.com` 对本机**持续 403**，导致：

- 术语时间线里 OpenAI 的 `harness-engineering` 一文只能靠中文社区转述（登记为 P0-E 的一部分）；
- 卷 09 的 Codex 侧只能用社区材料（`codex-orange-book`、`codex-cli-best-practice`）。

本轮找到可行替代通道：**`developers.openai.com` 与 `learn.chatgpt.com` 是全站 Markdown 化的文档站**——任意页面 URL 追加 `.md` 即得纯 Markdown；且分产品线各自暴露 `llms.txt` 与 `llms-full.txt`。

## 1. 通道清单（实测，2026-09-10）

| 端点 | 状态 | 用途 |
|---|---|---|
| `https://developers.openai.com/llms.txt` | **200**（5,850 B） | 站点总索引：11 个文档集入口 + 常用任务 |
| `https://developers.openai.com/codex/llms.txt` | **200**（26,065 B，160 条） | Codex 文档 |
| `https://learn.chatgpt.com/llms.txt` | **200**（同内容） | Codex 文档（镜像域） |
| `https://developers.openai.com/blog/llms.txt` | **200**（6,263 B，29 条） | 开发者博客 |
| `https://developers.openai.com/cookbook/llms.txt` | **200**（12,425 B，51 条） | Cookbook |
| `https://developers.openai.com/api/llms.txt` | **200**（794 B） | API 路由索引（guides / reference 两支） |
| `https://developers.openai.com/api/docs/llms.txt` | **200**（41,838 B，227 条） | API 指南 |
| `https://developers.openai.com/api/reference/llms.txt` | **200**（36,011 B，216 条） | API 端点参考 |
| `https://developers.openai.com/plugins/llms.txt` | **200**（4,942 B，30 条） | 插件 / Apps SDK |
| `https://developers.openai.com/learn/llms.txt` | **200**（22,694 B，138 条） | 学习资源（本次仅取索引与单文件导出） |
| `https://developers.openai.com/showcase/llms.txt` | **200**（33,240 B，78 条） | 展示馆（**仅登记，未抓正文**：项目画廊，教学价值低） |
| `https://openai.com/llms.txt` | **403** | 主站仍不可达 |
| `https://platform.openai.com/docs/overview` | **403** | 旧文档域仍不可达 |

## 2. 六套落盘内容

| 目录 | 内容 | 规模 |
|---|---|---|
| `09-harness/openai-codex-docs-official/` | Codex 文档 149 篇 + llms-full（1.8 MB） | 153 文件 |
| `09-harness/openai-developer-blog/` | 开发者博客 27 篇 + llms-full（388 KB） | 30 文件 |
| `08-agents/openai-cookbook-docs/` | Cookbook 49 篇 + llms-full（2.15 MB） | 53 文件 |
| `11-personal-agents/openai-plugins-docs/` | 插件文档 26 篇 | 29 文件 |
| `01-foundations/openai-api-docs-en/` | API 指南 226 篇 + llms-full（4.84 MB） | 230 文件 |
| `01-foundations/openai-api-reference-en/` | API 端点参考 211 篇（**有意排除 4 个 15–23 MB 机器生成 schema 转储页**） | 212 文件 |

## 3. 决定性内容

### 3.1 OpenAI 官方 harness 定义（`blog/codex-as-a-platform.md`）

主站 `openai.com/index/harness-engineering/` 仍 403，但这篇官方博客提供了 OpenAI 对 harness 的**直接定义**：

> "A capable agent is more than a prompt and a model response. It needs a way to understand a task, maintain context over time, inspect relevant information, call tools, expose progress, handle failures, request human approval when necessary, and return a useful result. **That surrounding execution system is the harness.**"

> "It helps models gather context, reason through tasks, use tools, **operate within configured boundaries, request approval**, and carry work forward."

> "Because the harness is open source, you can inspect **the layer between your application and the model**."

量化效果：**ARC-AGI-3 上 retained reasoning + context compaction 把 GPT-5.6 Sol 从 13.3% 提升到 38.3%，同时输出 token 降至六分之一。**

→ 用途：卷 09 概念章的 harness 定义句；「harness 隐喻」两读并列的读法 B 一手证据。

### 3.2 长期任务的 OpenAI 侧做法（与 Anthropic 方案形成对照）

- `blog/skills-shell-tips.md`《Shell + Skills + Compaction》——Responses API 的 skills / hosted shell / server-side compaction。
- `blog/run-long-horizon-tasks-with-codex.md`
- `cookbook/examples/codex/using_goals_in_codex.md`——用 Goals 跨轮次维持"evidence-checked outcome"。
- `cookbook/examples/codex/iterating-development-workflows-with-codex.md`——**repository harness**、分阶段实施计划、审批门、可复用 skills。

> 对照价值：Anthropic 的解法是 **context reset（清空 + 交接）**；OpenAI 的公开做法偏向 **compaction + 持久目标**。两者对"长期任务如何不失控"给出不同答案，是卷 09/10 的高质量辨析素材。

### 3.3 跨厂商概念映射（`cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme.md`）

OpenAI 官方撰写的「从 Claude Agent SDK 迁移到 OpenAI Agents SDK」——逐项对应 tool / guardrails / handoffs / approvals / sandbox 边界。这是**厂商自己做的术语对照表**，比第三方对比更可靠。

### 3.4 Codex 文档的机制章节（卷 09 用）

`sandboxing` / `permissions` / `permission-modes` / `agent-approvals-security`（权限管线）、`hooks`（钩子事件）、`build-skills`（技能）、`mcp-server`（MCP）、`config-file`（配置层级）、`app-server` + `codex-sdk`（作为平台的 harness）、`long-running-work` / `automations`（长期任务）。

## 4. 使用约束

- **未取得书面再分发许可** → 复用级别 **INDEX / CITE**；API 参考集为 **reference grade**，仅用于字段级事实核对。均不进入 CURATE / ADAPT。
- Cookbook 的代码样例**须逐篇核对该篇的许可标注**后再考虑引用。
- 模型名、价格、限额、标志位默认值属 **Live Facts**，引用前回原站核验。
- `showcase` 与 `learn` 的逐页正文**未抓取**（画廊/视频为主，教学价值低）——仅在 `_llms.txt` 层面登记。

## 5. 关联

- 「harness 隐喻」两读并列：`research/09-harness/harness隐喻-两读并列.md`
- 术语时间线：`research/09-harness/sources/SRC-HARNESS-ENGINEERING-ORIGIN.md`（OpenAI 条目状态需更新）
- 对照来源：`research/09-harness/sources/SRC-ANTHROPIC-ENGINEERING.md`
