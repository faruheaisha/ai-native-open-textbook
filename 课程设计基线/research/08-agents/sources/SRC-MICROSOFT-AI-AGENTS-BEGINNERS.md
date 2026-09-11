---
source_id: SRC-MICROSOFT-AI-AGENTS-BEGINNERS
title: AI Agents for Beginners
publisher: Microsoft
author: Microsoft Cloud Advocates and contributors
source_tier: T2
source_type: open_course
canonical_url: https://github.com/microsoft/ai-agents-for-beginners
published_at: null
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: main branch; living curriculum
status: accepted
license: MIT
rights_status: reusable-with-license; media-and-trademarks-need-item-check
language: multilingual
---

# Source Record：Microsoft AI Agents for Beginners

## 身份核验

- 官方/原始身份依据：`microsoft/ai-agents-for-beginners` 官方 GitHub 仓库。
- 版本或发布日期：Living curriculum；本次核验主分支。
- 是否仍维护：是；主分支包含课程、代码、测试、Study Guide 与更新记录。
- 替代/迁移关系：框架示例正在随 Microsoft Agent Framework / Foundry 生态演进，必须按章节核验。

## 本地快照

- 本地路径：`upstream/08-agents/microsoft-ai-agents-for-beginners/`
- Pinned commit：`25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595`（2026-09-10，main）
- 迁入日期：2026-09-10；迁入方式：blobless 克隆 + 非锥形稀疏检出（排除媒体目录）
- 目标范围：19 课正文与代码样例 + `translations/` 中文变体（zh-CN / zh-HK / zh-MO / zh-TW）
- 当前状态：完整（19 课正文与代码样例 + 四种中文翻译共 411 个文件；媒体目录未迁入）
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：面向初学者解释 Agent 概念、用例、设计模式、工具、规划、RAG、多 Agent、生产、安全等。
- 主要概念：Environment、Sensors、Actuators、Actions、Tools、Memory/Knowledge、Agentic Patterns、Frameworks。
- 教学结构：每课正文、短视频、Python 示例、额外资源；多语言翻译。
- 真实案例与资产：示例 notebooks/code、框架实现和生产主题。
- 不覆盖的内容：不是厂商中立 benchmark；Microsoft 服务和框架的演示比例较高。

## 权利与复用

- 正文许可：MIT 仓库许可。
- 代码许可：MIT；第三方包仍遵守各自许可。
- 图片/GIF/视频许可：逐项核验；视频平台和品牌素材不能仅依据代码仓库许可证推定可镜像。
- Attribution 要求：保留版权与 MIT 许可证通知。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork；Mirror 前清点第三方媒体与商标。

## 教材价值

- 映射卷册：08、10、12、13。
- 映射 Concepts：传统 Agent 模型、LLM Agent 组件、Use-case Selection、Patterns、Production/Security。
- 映射 Tasks：识别是否适合 Agent；画出基本 agentic solution。
- 结构复用 S1：高——文字、视频、代码和延伸阅读组合。
- 知识复用 S2：中高——传统 Agent 与现代 LLM Agent 的桥接有价值。
- 案例/资产复用 S3：中——需要脱离 Azure 凭证或另做可复现路径。
- 建议处理：ADAPT。

## 质量与风险

- Authority：Microsoft 官方开源课程。
- Freshness：活跃，但变化快。
- Educational Value：高；第一课明确包含“何时用/何时不用”。
- Reproducibility：中；部分代码依赖云服务、密钥和框架版本。
- Maintenance：本次核验为活跃。
- 已知错误/过时项：仓库简介仍称“12 Lessons”，但主分支已出现编号到 18 的课程目录。章数属于动态元数据，正文不可写死。
- 厂商 Claim 与独立证据的区别：Microsoft 框架/服务的能力描述按厂商资料处理；不转化为市场领先结论。

## 提取的 Claims

1. 第一课的学习目标包括解释 Agent 与普通 AI 方案的差异、判断何时适用，以及草拟基础 agentic solution。位置：[Lesson 1](https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md)。
2. 第一课以环境、传感器、执行器为传统 Agent 基础，并将 LLM、Actions、Tools、Memory/Knowledge 接到现代实现。位置同上。
3. 课程采用正文、视频、代码和延伸资料组合。位置：[Repository README](https://github.com/microsoft/ai-agents-for-beginners)。
4. 仓库采用 MIT 许可证。位置：[LICENSE](https://github.com/microsoft/ai-agents-for-beginners/blob/main/LICENSE)。
