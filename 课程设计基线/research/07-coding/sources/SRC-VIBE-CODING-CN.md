---
source_id: SRC-VIBE-CODING-CN
title: Vibe Coding CN（vibe-coding-cn）
publisher: 社区项目（2025Emma）
author: Nicolas Zullo, tukuaiai, 123olp 等社区贡献者
source_tier: T3
source_type: community_guide
canonical_url: https://github.com/2025Emma/vibe-coding-cn
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit 9b42dd10ddf3fff58f8c7a4d347175db107d7bf9（2025-12-16）
status: accepted
license: MIT
rights_status: text=mit; media=unverified
language: zh-CN / en（另有 27 种语言 README）
---

# Source Record：Vibe Coding CN

## 身份核验

- 官方/原始身份依据：社区维护的 Vibe Coding 中文教程与提示词库仓库。
- 版本或发布日期：commit `9b42dd1`（2025-12-16）；仓库 2025-12-17 后未见更新（快照时点）。
- 是否仍维护：不确定；最近提交距今约 9 个月。
- 替代/迁移关系：与 Datawhale `easy-vibe`、`vibe-vibe` 属同类中文 Vibe Coding 教程，互为对照。

## 本地快照

- 本地路径：`upstream/07-coding/vibe-coding-cn/`
- 迁入范围：整仓（1122 文件 / 985 Markdown；`i18n/zh` 161 篇、`i18n/en` 200 篇）
- 迁入方式：`gh api` tarball 整仓下载；`README.md` Git blob 校验通过
- 台账：`upstream/07-coding/上游资源台账.md`

## 内容范围

- 解决的问题：把“用自然语言驱动 AI 写代码”的经验整理成方法论、提示词与模板。
- 主要概念：Vibe Coding、胶水编程、递归自我优化、系统提示词构建、代码组织模板、提示词工程。
- 文档结构：`documents/Methodology and Principles`、`Templates and Resources`、`Tutorials and Guides`、`prompts/coding_prompts`、`skills/`。
- 真实案例与资产：大量可直接复制的提示词（含 CLAUDE.md 记忆、任务描述补全、架构分析、代码组织模板）。
- 不覆盖的内容：没有可运行项目与评测；提示词质量依赖个人经验，缺系统性验证。

## 权利与复用

- 正文许可：MIT。代码许可：MIT。
- 图片/GIF/视频许可：未单独核验。
- Attribution 要求：保留版权与许可声明（MIT）。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：07（主）。
- 映射 Concepts：Vibe Coding、Task Specification、Prompt 模板、代码组织。
- 结构复用 S1：中——提示词的分类方式可作卷 07“规约与模板”章节的对照。
- 知识复用 S2：低——经验型内容，须经项目复现后进入正文。
- 案例/资产复用 S3：低——提示词可作为“反面/正面样本”研究，不直接作为规范。
- 建议处理：CURATE + INDEX。

## 质量与风险

- Authority：社区实践集合，证据等级低（EVL-1 级线索）。
- Freshness：与具体 CLI 工具版本相关，工具更新后部分提示词可能失效。
- Educational Value：中高——可直接观察中文社区如何写 Vibe Coding 规约。
- Reproducibility：低。
- Maintenance：不确定。
- 已知错误/过时项：未核验；文件命名含历史快照与重复项。
- 厂商 Claim 与独立证据的区别：提示词中的效果宣称一律未经独立验证。

## 提取的 Claims

1. 仓库为 MIT 许可的中文 Vibe Coding 教程与提示词库。位置：`LICENSE` 与仓库 README。
2. 内容分方法论、模板资源、教程指南、提示词集合等板块。位置：`i18n/zh/documents` 与 `i18n/zh/prompts` 目录结构。
3. 仓库提供 27 种语言 README 与中英双份正文。位置：`i18n/` 目录。

