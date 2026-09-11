---
source_id: SRC-MS-GENERATIVE-AI-BEGINNERS
title: Microsoft Generative AI for Beginners
publisher: Microsoft（Cloud Advocates）
author: Microsoft Cloud Advocates 与社区贡献者
source_tier: T2
source_type: open_course
canonical_url: https://github.com/microsoft/generative-ai-for-beginners
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07（2026-09-10）
status: accepted
license: MIT
rights_status: text=mit; media=unverified
language: en（仓库含 50+ 语言翻译，未迁入）
---

# Source Record：Microsoft Generative AI for Beginners

## 身份核验

- 官方/原始身份依据：Microsoft 官方 GitHub 组织下的开放课程仓库，Cloud Advocates 维护。
- 版本或发布日期：commit `c9657f3`（2026-09-10 仍有提交，持续维护）。
- 是否仍维护：是；课程数量、语言数持续扩展（历史上长期写“12 Lessons”，实际已扩展到 20+）。
- 替代/迁移关系：与 `microsoft/ai-agents-for-beginners`（卷 08）互补——本课程打生成式 AI 基础，那门课讲 Agent 工程。

## 本地快照

- 本地路径：`upstream/01-foundations/microsoft-generative-ai-for-beginners/`
- 迁入范围：各课英文 Markdown 正文与代码样例；排除 `translations/`、`translated_images/`、`images/`
- 迁入方式：`gh api` 按 pinned commit 逐文件下载（仓库 6.4GB，不做整仓克隆）
- 台账：`upstream/01-foundations/上游资源台账.md`

## 内容范围

- 解决的问题：把生成式 AI 从概念、提示工程、应用构建（文本、聊天、搜索、图像、低代码、函数调用）到负责任 AI 与安全串成一条可上手路径。
- 主要概念：Prompt、Token、模型选择与比较、RAG、Function Calling、向量数据库、低代码、AI 应用安全与负责任 AI。
- 课程结构：`00-course-setup` 起，按主题分为 20+ 课；每课含讲解、视频、代码样例与作业。
- 真实案例与资产：各课 `code_samples/`（Python / TypeScript / JavaScript / notebook）与作业。
- 不覆盖的内容：不深入模型架构与训练（卷 02 覆盖）；不覆盖 Agent 工程（卷 08）。

## 权利与复用

- 正文许可：MIT。代码许可：MIT。
- 图片/GIF/视频许可：未迁入；进入发布物前需逐项核验。
- Attribution 要求：保留版权与许可声明。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：01（主）、02、03。
- 映射 Concepts：Prompt、RAG、Function Calling、Model Selection、Responsible AI。
- 结构复用 S1：高——课程工程（多语言、视频、作业、CI）是卷 01–03 的结构对照。
- 知识复用 S2：中——作为 T2 综合课程，用于校准教学顺序与练习设计，不作为事实终裁。
- 案例/资产复用 S3：中——代码样例可复现为自有示例，媒体另行核权。
- 建议处理：CURATE + 参考性 ADAPT。

## 质量与风险

- Authority：厂商官方课程，事实以官方文档与代码为准；对自家产品的能力陈述需标注来源视角。
- Freshness：课程内容按月级更新；界面、模型名与价格属动态事实。
- Educational Value：高——面向零基础到应用构建的完整路径，且有多语言与作业体系。
- Reproducibility：中高——代码样例可运行，但依赖 Azure/OpenAI 环境。
- Maintenance：活跃。
- 已知错误/过时项：课程中模型名称与 SDK 版本会过期，引用时必须带核验日期。
- 厂商 Claim 与独立证据的区别：把“课程宣称的能力”与“本项目复现结果”分开记录。

## 提取的 Claims

1. 仓库为 Microsoft 官方开放课程并持续维护。位置：仓库元数据与提交历史（`c9657f3`，2026-09-10）。
2. 课程覆盖生成式 AI 基础到应用构建，并含代码样例与多语言翻译。位置：仓库 README 与目录结构。
3. 许可为 MIT。位置：仓库 `LICENSE`。

