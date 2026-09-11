---
source_id: SRC-ANTHROPIC-COOKBOOK
title: Anthropic Cookbook
publisher: Anthropic
author: Anthropic
source_tier: T1
source_type: official_recipe_library
canonical_url: https://github.com/anthropics/anthropic-cookbook
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5（2026-09-03）
status: accepted
license: MIT
rights_status: code=mit; notebook=mit; media=unverified
language: en
---

# Source Record：Anthropic Cookbook

## 身份核验

- 官方/原始身份依据：Anthropic 官方 GitHub 组织下的 recipe 仓库，与官方文档、Claude Agent SDK 同步维护。
- 版本或发布日期：commit `a97b9a2`（2026-09-03）。
- 是否仍维护：是。
- 替代/迁移关系：与 `anthropics/courses`（教学课程）互补；本仓库面向可运行实现。

## 本地快照

- 本地路径：`upstream/08-agents/anthropic-cookbook/`
- 迁入范围：整仓 600 文件（97 Markdown + notebook 与脚本；排除 `*/images/*`）
- 迁入方式：`gh api` tarball；`LICENSE` Git blob 校验通过
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：给出可直接运行的官方示例，覆盖模型能力（capabilities）、Claude Agent SDK、managed agents、skills、tool use、成本与上下文优化、多模态与第三方集成。
- 主要概念：Tool Use、Agent SDK、Managed Agents、Skills、Context Engineering、Cost Optimization、Evaluation。
- 结构：`capabilities/`、`claude_agent_sdk/`、`managed_agents/`、`skills/`、`tool_use/`、`cost_optimization/`、`misc/`、`third_party/`。
- 真实案例与资产：notebook 与 `promptfooconfig.yaml` 等可运行资产。
- 不覆盖的内容：不提供系统化教学顺序（那是 courses 的职责）。

## 权利与复用

- 正文/代码许可：MIT。
- 图片/GIF/视频许可：未迁入，需逐项核验。
- Attribution 要求：保留版权与许可声明。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：08、09、10、12。
- 映射 Concepts：Tool Use、Agent SDK、Managed Agent、Skill、Context、Cost。
- 结构复用 S1：中——recipe 分类方式可作卷 09“实现对照”的组织参考。
- 知识复用 S2：高——官方实现细节可校准正文中的机制描述（保留来源视角）。
- 案例/资产复用 S3：中——notebook 可复现为自有案例（须标注来源与许可）。
- 建议处理：CURATE + 受限 ADAPT。

## 质量与风险

- Authority：T1 官方一手来源。
- Freshness：随 SDK 与模型版本更新，引用需带版本与日期。
- Educational Value：高——实现细节与最佳实践的权威参照。
- Reproducibility：高——notebook 可运行（需 API Key 与额度）。
- Maintenance：活跃。
- 已知错误/过时项：未逐篇运行验证。
- 厂商 Claim 与独立证据的区别：官方示例反映的是官方实践，性能与效果宣称需独立复现。

## 提取的 Claims

1. 仓库为 Anthropic 官方 recipe 集合，覆盖 tool use、Agent SDK、skills、managed agents 等。位置：仓库目录结构与 README。
2. 许可为 MIT。位置：仓库 `LICENSE`。
3. 内容包含可运行 notebook 与配置文件。位置：`tool_use/`、`skills/`、`capabilities/` 等目录。

