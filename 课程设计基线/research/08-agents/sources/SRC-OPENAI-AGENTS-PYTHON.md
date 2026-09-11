---
source_id: SRC-OPENAI-AGENTS-PYTHON
title: OpenAI Agents SDK（Python）
publisher: OpenAI
author: OpenAI
source_tier: T1
source_type: official_sdk
canonical_url: https://github.com/openai/openai-agents-python
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit 83c737fd0b8d9a53bd39fa2a0856070417bb0bd3（2026-09-09）
status: accepted
license: MIT
rights_status: code=mit; docs=mit; media=unverified
language: en
---

# Source Record：OpenAI Agents SDK（Python）

## 身份核验

- 官方/原始身份依据：OpenAI 官方 GitHub 组织下的 Agents SDK 实现仓库。
- 版本或发布日期：commit `83c737f`（2026-09-09）。
- 是否仍维护：是，活跃迭代。
- 替代/迁移关系：同族还有 TypeScript 版本与 Agents 文档站；本仓库为 Python 主实现。

## 本地快照

- 本地路径：`upstream/08-agents/openai-agents-python/`
- 迁入范围：整仓 1588 文件（源码、`docs/`、`examples/`、测试）
- 迁入方式：`gh api` tarball；`LICENSE` Git blob 校验通过
- 已知缺失：`CLAUDE.md`（Windows 路径限制，1 个文件）
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：提供 Agent 运行时与编排的官方实现参考。
- 主要概念：Agent、Handoff、Guardrail、Tracing、Session、Tool、MCP、Runner 循环。
- 结构：`src/`（核心实现）、`docs/`（文档与概念说明）、`examples/`（可运行示例）、`tests/`。
- 真实案例与资产：`examples/` 下按主题组织的可运行样例。
- 不覆盖的内容：不提供从零教学顺序（卷 08 首章由课程类来源承担）。

## 权利与复用

- 正文/代码许可：MIT。
- 图片/GIF/视频许可：仓库基本无媒体资产。
- Attribution 要求：保留版权与许可声明。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：08、09、10。
- 映射 Concepts：Agent Loop、Handoff、Guardrail、Tracing、Session、MCP。
- 结构复用 S1：中——`docs/` 的概念组织方式可作实现对照章节参考。
- 知识复用 S2：高——官方实现对“框架如何实现同一知识骨架”是权威证据。
- 案例/资产复用 S3：中——examples 可复现为自有案例。
- 建议处理：CURATE + 受限 ADAPT。

## 质量与风险

- Authority：T1 官方一手来源。
- Freshness：SDK 迭代快，接口与示例随版本变化；引用必须带版本。
- Educational Value：高。
- Reproducibility：高——示例可运行（需 API Key）。
- Maintenance：活跃。
- 已知错误/过时项：未逐例运行。
- 厂商 Claim 与独立证据的区别：官方示例属官方实践，不替代独立评测。

## 提取的 Claims

1. 仓库为 OpenAI 官方 Agents SDK（Python）实现。位置：仓库 README 与 `pyproject.toml`。
2. 提供 Agent、handoff、guardrails、tracing、sessions 等能力。位置：`docs/` 与 `src/agents/`。
3. 许可为 MIT。位置：仓库 `LICENSE`。

