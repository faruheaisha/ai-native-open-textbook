---
source_id: SRC-CLAUDE-CODE-BEST-PRACTICE
title: claude-code-best-practice — from vibe coding to agentic engineering
publisher: shanraisshan（个人维护）
author: shanraisshan 及社区贡献者
source_tier: T2
source_type: best_practice_collection_with_working_config
canonical_url: https://github.com/shanraisshan/claude-code-best-practice
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ 2d6ea151c0d7189c3eaf364809c5574bd210e545（2026-09-10 更新）
status: accepted
license: MIT
rights_status: texts-and-configs-mit; external-videos-and-sponsor-assets-need-item-check
language: 英文
---

# Source Record：claude-code-best-practice

## 身份核验

- 官方/原始身份依据：仓库 `shanraisshan/claude-code-best-practice`，README 顶部标注“updated with Claude Code Sep 10, 2026”，含完整的 `.claude/` 可运行配置与“best-practice / implementation”成对文档。
- 版本或发布日期：`main @ 2d6ea151`（2026-09-10 抓取时点）。
- 是否仍维护：是，近乎每日更新。
- 替代/迁移关系：不是官方文档；与官方 Claude Code 文档互补，价值在“实践约束 + 可运行配置”。

## 本地快照

- 本地路径：`upstream/09-harness/claude-code-best-practice/`
- Pinned commit：`2d6ea151c0d7189c3eaf364809c5574bd210e545`
- 迁入范围：全部文本文件（198 个 / 4.56 MB），含 `best-practice/`、`implementation/`、`tutorial/`、`development-workflows/`、`orchestration-workflow/`、`agent-teams/`、`changelog/`、`tips/`、`reports/`、`.claude/`（agents / commands / hooks / rules / skills / agent-memory）、`.codex/`、`.mcp.json`、`CLAUDE.md`、`README.md`
- 媒体未镜像：`!/` 目录下 SVG/GIF 品牌图与视频缩略图未抓取

## 内容范围

- 解决的问题：把 Claude Code 的每个机制（Subagents、Commands、Skills、Workflows、Hooks、MCP、Plugins、Settings、Status Line、Memory、Checkpointing 等）写成“最佳实践 + 实现示例”两份对照。
- 结构：`best-practice/<机制>.md` 与 `implementation/<机制>-implementation.md` 成对；另有教程、开发工作流、编排工作流、Agent 团队、变更日志与专题报告。
- 不覆盖的内容：不是官方 API 参考；不含企业级治理与合规方案。
- 特性：`.claude/` 目录本身是一套可直接运行的个人配置，可作为“配置即教材”的样本。

## 权利与复用

- 正文与配置许可：MIT。
- 图片/GIF/视频许可：README 中的赞助商素材、外部视频缩略图未镜像，需单独核验。
- Attribution 要求：保留版权与许可声明。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：09（主）；10（Memory、Rules、Skills 的落地形态）；07（从 vibe coding 到 agentic engineering 的过渡）。
- 映射 Concepts：Subagent、Command、Skill、Hook、MCP、Plugin、Settings、Memory、Checkpointing、Orchestration。
- 映射 Tasks：Code、Automation、Verification。
- 结构复用 S1：高——“机制 → 最佳实践 → 实现示例”的三段式可迁移为卷 09/10 的章节模板。
- 知识复用 S2：中高——实践约定的理由说明值得提炼；具体版本敏感项按 INDEX 处理。
- 案例/资产复用 S3：中——`.claude/` 配置可作对照样本，需在本地验证后引用。
- 建议处理：CURATE（文档结构与实践约定）+ INDEX（版本敏感配置）。

## 质量与风险

- Authority：个人维护的高热度仓库，含赞助商内容；实践建议未经过官方评审。
- Freshness：更新极快（README 标注到 2026-09-10），引用必须带 commit 与日期。
- Educational Value：高——机制覆盖全面，且有可运行配置。
- Reproducibility：中高——配置可直接试用，但效果依赖具体项目与模型版本。
- Maintenance：非常活跃。
- 已知错误/过时项：未逐项复现；README 中的宣传语与赞助内容须与正文分开。
- 厂商 Claim 与独立证据的区别：仓库对 Claude Code 的评价属社区经验，产品能力断言须回官方文档。

## 提取的 Claims

1. 仓库以“best-practice + implementation”成对文档覆盖 Claude Code 主要机制。位置：`best-practice/`、`implementation/` 目录。
2. 仓库包含可运行的 `.claude/` 配置（agents、commands、hooks、rules、skills、agent-memory）。位置：`.claude/`。
3. 仓库许可为 MIT。位置：`LICENSE`。