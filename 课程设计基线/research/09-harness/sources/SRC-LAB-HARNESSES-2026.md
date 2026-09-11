---
source_id: SRC-LAB-HARNESSES-2026
title: 四家厂商的一手 Harness 实现：DeepSeek dsh / xAI grok-build / LangChain deepagents / Strands harness-sdk
publisher: DeepSeek AI / xAI / LangChain / Strands Agents
source_tier: T1
source_type: vendor_official_repository
canonical_url: https://github.com/deepseek-ai/deepseek-harness
published_at: 持续更新（快照 2026-09-10）
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 首次收录
status: accepted
license: MIT（DeepSeek / LangChain）、Apache-2.0（xAI / Strands）
rights_status: reusable_with_attribution
language: 英文（dsh 含中文 README 与中文文档）
---

# Source Record：四家厂商的一手 Harness 实现

## 为什么重要

卷 09 此前的一手样本实际上只有一条半：Codex 与 Claude Code 的使用侧材料，加大量社区对二者的逆向分析。**本批一次性拿到四家厂商各自发布的 harness 实现**，使"harness 是厂商级抽象"这一判断第一次可以在同一层级上并列比较，而不是从单一产品的社区分析里反推通则。

## 对照表（全部实读仓库文件确认）

| 项目 | 本地目录 | Stars | 许可 | 定位（仓库自述） | 关键设计信号 |
|---|---|---|---|---|---|
| DeepSeek Harness（`dsh`） | `09-harness/deepseek-harness/` | 219,002 | **MIT**（实读 `LICENSE`：`MIT License / Copyright (c) 2026 DeepSeek`） | "Everything is a Plugin" | 由 Cordis 驱动；挂靠论文 arXiv 2608.25512 *A Programming Paradigm for Spatiotemporal Composability*；README 明示处于 **developer preview** 且"未来将出现破坏兼容性的变更"；发布物含 `SAFETY.md` |
| xAI `grok-build` | `09-harness/grok-build/` | 26,649 | **Apache-2.0**（实读 `LICENSE`：`Copyright 2023-2026 SpaceXAI`） | 编码 agent harness 与 TUI | 全屏、鼠标交互、可扩展 |
| LangChain `deepagents` | `09-harness/langchain-deepagents/` | 29,286 | **MIT**（实读 `LICENSE`：`Copyright (c) LangChain, Inc.`） | "the batteries-included agent harness" | 框架厂商把 harness 作为开箱即用层提供 |
| Strands `harness-sdk` | `09-harness/strands-harness-sdk/` | 7,194 | **Apache-2.0**（实读根 `LICENSE.APACHE`；子包 `strands-py` / `strands-ts` / `strands-mcp` 各自带 LICENSE） | "Build an agent harness and control it end-to-end" | 以 SDK 形态交付；同一仓库多语言子包各自许可 |

## 1. DeepSeek Harness：本批最高价值样本

**可教的独特之处不在功能，而在它把"设计过程"一起发布了。**

仓库 `deepseek-ai/deepseek-harness` 共 **10,319 个 blob**（`git/trees` 实读），顶层为 TypeScript 单仓（`apps/`、`packages/`、`benchmarks/`、`docs/`）。真正稀缺的是 `.agents/`：

```text
.agents/notes/
  proposed/      63  个文件   —— 尚未采纳的设计提案
  implemented/  926  个文件   —— 已落地的提案
  archived/    1,886 个文件   —— 已归档
  rejected/      42  个文件   —— 被明确否决的提案
```

- **`rejected/` 是其他 harness 仓库里几乎不存在的材料。** 卷 09 讲"为什么这样设计"时，通常只能靠作者事后叙述；这里有 42 份**当时写下、后来被否决**的一手记录，可以支撑"设计空间是被排除法收敛出来的"这一论点。
- `.agents/notes/README[.zh].md` 与 `.agents/notes/AGENTS.md` 说明该目录自身就是**给 agent 读的上下文**——即"harness 用 harness 管理自己的设计文档"。

**本快照的边界（必须如实标注）**：本地快照是 `.agents/notes/**` 子集（上限 900 文件），**不含** `apps/`、`packages/`、`docs/`、`benchmarks/`。引用架构细节前须先补取对应目录。

## 2. 四者差异的教学用法

同一抽象层上的四种答案，恰好构成一组对比题：

| 问题 | dsh | grok-build | deepagents | harness-sdk |
|---|---|---|---|---|
| 交付形态 | CLI + Web UI（`npx @deepseek-ai/dsh web`，默认 127.0.0.1:3080） | TUI | 开箱即用框架 | SDK |
| 扩展机制 | **一切皆插件**（插件有独立话题 `dsh-plugin`） | 可扩展 | 内置能力 | 端到端可控制 |
| 对用户的承诺 | developer preview，允许破坏性变更 | 交互体验 | 少配置 | 可控性 |

## 3. 事实与推断的边界

- **已验证**：上表的 Stars、许可、描述、分支、commit、目录结构，均来自 2026-09-10 的 `gh api` 与实读仓库文件。
- **已验证**：dsh 的论文引用、preview 声明、插件话题约定，来自实读 `README.zh.md`。
- **推断（需标注）**："四家厂商的差异构成设计空间"是本项目的分析框架，不是任何一方的自述。
- **未知**：grok-build 与 harness-sdk 的实际架构主张未逐份实读，仅据仓库自述与外层结构；引用前需回到仓库。

## 4. 复用约束

| 项目 | 许可 | 可做什么 | 不可做什么 |
|---|---|---|---|
| deepseek-harness | MIT | 链接、引用、改编、Fork；保留版权声明 | — |
| grok-build | Apache-2.0 | 同上；注意 NOTICE 与专利条款 | — |
| deepagents | MIT | 同上 | — |
| harness-sdk | Apache-2.0 | 同上；**注意子包各自许可** | 不可只按根目录许可概括全仓 |

## 5. 关联

- 卷 09 调研设计：`课程设计基线/research/09-harness/`
- 同类对照：`09-harness/learn-claude-code`、`09-harness/claude-code-book-yuyu`、`09-harness/claude-code-from-scratch`
- 检索记录：`课程设计基线/research/检索记录/GitHub课程与Agent产品-第五批-2026-09-10.md`
