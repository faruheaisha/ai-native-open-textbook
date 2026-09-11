---
source_id: SRC-CONTEXT-ENGINEERING-INTRO
title: Context Engineering Intro（Context Engineering Template）
publisher: 个人开源（Cole Medin）
author: Cole Medin
source_tier: T2
source_type: template_and_method_guide
canonical_url: https://github.com/coleam00/context-engineering-intro
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ a2d84b021cee1e2f4e77ba854bba0be8cb319035
status: accepted
license: MIT（`LICENSE`，Copyright (c) 2025 Cole Medin）
rights_status: mit
language: 英文
---

# Source Record：Context Engineering Intro

## 身份核验

- 原始身份依据：仓库自述为一个“上手 Context Engineering 的完整模板”，把上下文工程定义为“为 AI 编码助手工程化上下文，使其能端到端完成任务的学科”。
- 版本或发布日期：`main @ a2d84b021c`；快照内含 `claude-code-full-guide/`（Windows 安装、并行执行、hooks、devcontainer）。
- 是否仍维护：需按后续提交复核（README 自述“还有更多内容即将发布”）。
- 替代/迁移关系：无；为 PRP（Product Requirements Prompt）工作流的代表实现。

## 本地快照

- 本地路径：`upstream/10-context-memory/context-engineering-intro/`
- Pinned commit：`a2d84b021cee1e2f4e77ba854bba0be8cb319035`
- 迁入范围：仓库全部文本与代码（235 个文本文件；逐路径比对 missing=0）
- 校验：文件数比对通过（`ok=72 skip=163 fail=0`，即断点续传后全量齐备）
- 媒体未镜像：仓库图片资源未抓取

## 内容范围

- 解决的问题：把「提示词工程」升级为「上下文工程」——不只换措辞，而是提供完整上下文系统（文档、示例、规则、模式、验证）。
- 快照实读结构：
  - 根模板：`CLAUDE.md`（全局规则）、`INITIAL.md` / `INITIAL_EXAMPLE.md`（功能请求）、`PRPs/templates/prp_base.md`（PRP 基础模板）、`PRPs/EXAMPLE_multi_agent_prp.md`（完整示例）
  - 斜杠命令：`.claude/commands/generate-prp.md`、`.claude/commands/execute-prp.md`
  - 扩展指南：`claude-code-full-guide/`（含 `.claude/agents/`（documentation-manager、validation-gates）、`.claude/commands/`（execute-parallel、fix-github-issue、prep-parallel、primer）、`.claude/hooks/`（log-tool-usage.sh、example-hook-config.json）、`.devcontainer/`（Dockerfile、init-firewall.sh））
  - 用例：`use-cases/agent-factory-with-subagents/`（含 5 个 subagent 定义：planner / prompt-engineer / tool-integrator / validator / dependency-manager，以及 `agents/rag_agent/` 的完整代码）
- 核心工作流（README 实读）：写 `INITIAL.md` → `/generate-prp INITIAL.md` 生成 PRP → `/execute-prp PRPs/<name>.md` 执行实现。
- 自述的价值主张：降低 AI 失败率（“多数 Agent 失败不是模型失败，而是上下文失败”）、保证一致性、支持复杂多步实现、通过验证循环自纠正。
- 不覆盖的内容：README 明确本期不聚焦 RAG 与工具类上下文工程。

## 权利与复用

- 正文许可：MIT。
- 代码许可：MIT（模板、命令、hooks、subagent 定义均可复用，需保留版权声明）。
- 图片/视频许可：未镜像，需单独核验。
- Attribution 要求：标注 Cole Medin 与仓库链接。
- 处理建议：模板与命令结构可 ADAPT；README 中的方法论表述为作者主张，需与卷 10 的 Canonical Concept Registry 对齐后再进正文。

## 教材价值

- 映射卷册：10（主）；07（Vibe Coding 到工程化）；09（Harness 的 rules/commands/hooks 形态）。
- 映射 Concepts：Context Engineering、PRP、Prompt、Rule、Hook、Subagent、Validation Loop、Slash Command。
- 映射 Tasks：Code、Verification、Automation。
- 结构复用 S1：高——"规约先行 + 验证循环"的目录形态是卷 07/10 练习的现成脚手架。
- 知识复用 S2：中——"多数失败是上下文失败而非模型失败"是可引用的**作者主张**，需标注为观点而非结论。
- 案例/资产复用 S3：中高——`agent-factory-with-subagents` 是完整的 subagent 协作样例，可作为卷 09/10 的对照实验。
- 建议处理：CURATE（工作流结构）+ ADAPT（模板）+ INDEX（作者观点）。

## 质量与风险

- Authority：个人开源项目（作者为活跃的 AI 工程内容创作者），非官方规范。
- Freshness：以单一工具（Claude Code）为示例；跨工具（Codex / 其他 Harness）迁移时需另找证据。
- Educational Value：高——PRP 工作流是「spec-driven development」的早期代表形态，具备教学对照价值。
- Reproducibility：中——模板本身可跑，但效果依赖模型与工具版本。
- Maintenance：需复核最近提交。
- 已知错误/过时项：`.claude/settings.local.json` 等配置随工具版本变化；未实测其 hooks 脚本。
- 厂商 Claim 与独立证据的区别：README 的“10x / 100x”对比为营销式表述，**不可作为教材结论**，只能作为作者立场的记录。

## 提取的 Claims

1. 仓库定位为 Context Engineering 的上手模板，工作流为 INITIAL.md → /generate-prp → /execute-prp。位置：`README.md` Quick Start。
2. 作者主张“Context Engineering 比 prompt engineering 好 10 倍、比 vibe coding 好 100 倍”（营销式表述，需标注为作者观点）。位置：`README.md` 首段引用。
3. 作者主张“多数 Agent 失败不是模型失败，而是上下文失败”。位置：`README.md` Why Context Engineering Matters。
4. 模板包含 `.claude/commands`（generate-prp、execute-prp）、`PRPs/templates`、`use-cases/agent-factory-with-subagents`。位置：仓库目录结构与 README Template Structure。
5. 仓库许可为 MIT，版权人 Cole Medin。位置：`LICENSE`。
