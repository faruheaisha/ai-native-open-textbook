---
source_id: SRC-ANTHROPIC-ENGINEERING
title: Anthropic 工程博客（含 harness 两篇关键文与上下文工程一手文本）
publisher: Anthropic
source_tier: T1
source_type: official_engineering_blog
canonical_url: https://www.anthropic.com/engineering
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 站点快照 2026-09-10（25 篇 + 索引页）
status: accepted
license: 未声明（站点文章，无开源许可）
rights_status: cite_only
language: 英文
snapshot: upstream/09-harness/anthropic-engineering-blog/
---

# Source Record：Anthropic 工程博客

## 为什么重要

本项目对 Anthropic 工程实践的理解长期受限：**2026-09-10 之前，Anthropic 全站在本机不可达**，卷 09 关于「上下文重置」「评估者分离」「initializer + coding agent 两段式」的全部内容只能来自中文社区转述（见 `SRC-HARNESS-CONTEXT-BOUNDARY-CN.md` §5），并因此被登记为阻断项 **P0-E**。

本轮通道打通（`www.anthropic.com/engineering/*` 全部 200），**转述链解除**。

## 1. 通道与抓取

| 项 | 值 |
|---|---|
| 机读端点 | 无 `llms.txt`（404）；使用 `www.anthropic.com/sitemap.xml`（529 URL，其中 `/engineering` 27 条） |
| 正文形态 | 无官方 `.md` 孪生地址 → HTML + 提取文本（`*.html` 与 `*.txt` 成对） |
| 并发限制 | **对并发敏感**：4 线程全失败；降至 2 线程 + 1500 ms 间隔后全部通过 |
| 覆盖 | 25 篇文章（中文）

## 2. 关键内容（原文实读）

### 2.1 `effective-harnesses-for-long-running-agents`（术语断代最早来源，2025-11-26）

- **问题设定**：长时间运行的 agent 必须在离散会话中工作，而每个新会话开始时对之前发生的事没有记忆——"Imagine a software project staffed by engineers working in shifts, where each new engineer arrives with no memory of what happened on the previous shift."
- **两段式解法**：an **initializer agent** that sets up the environment on the first run + a **coding agent** tasked with incremental progress, leaving clear artifacts for the next session。
- **环境管理三要素**：
  - **Feature list**：initializer 写出完整特性清单（claude.ai 克隆示例中 200+ 条），每条初始 `passes: false`；**用 JSON 而非 Markdown**——"the model is less likely to inappropriately change or overwrite JSON files compared to Markdown files"；并给出强措辞指令 "It is unacceptable to remove or edit tests"。
  - **Incremental progress**：一次只做一个特性；每次改动后 commit + 写 progress file，使模型能用 git 回滚。
  - **Testing**：不给工具时 Claude 会用单测或 curl 但不做端到端验证；明确要求使用浏览器自动化工具后改善明显。遗留问题：Puppeteer MCP 看不到浏览器原生的 alert 模态框。
- **每会话固定动作**：`pwd` → 读 git log 与 progress 文件 → 读特性清单 → 起 dev server → 端到端测一个特性 → 更新 progress。

### 2.2 `harness-design-long-running-apps`

- **架构**：**Planner → Generator → Evaluator** 三 Agent（GAN 式生成器/评估器结构的迁移）。
- **两类失败模式**：
  1. 上下文填满后失去连贯性；部分模型出现 **"context anxiety"**（接近自认为上限时提前收尾，原文点名 Sonnet 4.5）→ **context reset**（完全清空 + 结构化交接）。
  2. **自评宽松**：agent 评估自己产物时"confidently praising the work—even when, to a human observer, the quality is obviously mediocre"→ **评估者与执行者分离**；原文直言 "Out of the box, Claude is a poor QA agent."
- **context reset vs compaction 的辨析**（卷 10 可直接用）："While compaction preserves continuity, it doesn't give the agent a clean slate, which means context anxiety can still persist."
- **sprint contract**（读法 B 的关键证据）："Before each sprint, the generator and evaluator negotiated a sprint contract: agreeing on what 'done' looked like for that chunk of work **before any code was written**."
- **验证手段**：Evaluator 用 Playwright MCP 像用户一样点击应用，测 UI、API、数据库状态；每一项有硬阈值，任一项低于阈值则该 sprint 失败。
- **成本-质量**：完整 harness 跑 6 小时 / $200；"The harness was over 20x more expensive, but the difference in output quality was immediately apparent."
- **部件会退役**："Opus 4.5 largely removed that behavior on its own, so I was able to drop context resets from this harness entirely."

### 2.3 其他 A 级文章

- `building-effective-agents`：workflow（prompt chaining / routing / parallelization / orchestrator-workers / evaluator-optimizer）vs agent 的经典谱系。
- `effective-context-engineering-for-ai-agents`：卷 10 的核心厂商文本。
- `writing-tools-for-agents`：工具设计原则（面向 agent 的工具描述、命名空间、token 效率）。
- `equipping-agents-for-the-real-world-with-agent-skills`：Skills 机制一手说明。
- `claude-code-sandboxing`、`claude-code-best-practices`、`claude-code-auto-mode`：Claude Code 官方机制说明（与 `09-harness/claude-code-docs-official` 互补）。

## 3. 使用约束

- **正文为 HTML 提取文本**，非官方 Markdown，可能含少量导航噪声；**引用原句前必须回原文核对措辞**。
- 无开源许可 → **cite_only**。可引用原句（注明篇名 + URL + 抓取日期），不得改编或大段转载。
- 文章内图片、图表、代码块未单独核权。

## 4. 关联

- 「harness 隐喻」两读并列：`research/09-harness/harness隐喻-两读并列.md`
- 解除的转述链：`sources/SRC-HARNESS-CONTEXT-BOUNDARY-CN.md` §5
- 术语时间线更新：`sources/SRC-HARNESS-ENGINEERING-ORIGIN.md` 第 1 条
- Claude Code 产品文档（另一套）：`upstream/09-harness/claude-code-docs-official/`
