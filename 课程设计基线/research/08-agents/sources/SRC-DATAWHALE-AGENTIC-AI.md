---
source_id: SRC-DATAWHALE-AGENTIC-AI
title: Agentic AI 中文翻译与知识梳理（DeepLearning.AI Agentic AI 系列）
publisher: Datawhale（社区）
author: 陈辅元、杨若朴等（README 项目规划署名的模块负责人）
source_tier: T2
source_type: course_translation_with_labs
canonical_url: https://github.com/datawhalechina/agentic-ai
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: main @ a93ab1d8546cca8b508a72f0f2c385777d5f1403
status: accepted
license: Apache-2.0（仓库）；原课程内容版权归 DeepLearning.AI 与授课方
rights_status: repo-apache2-but-upstream-course-content-copyright-retained-by-original
language: zh-CN / en（中英对照标题）
---

# Source Record：Datawhale Agentic AI 中文翻译

## 身份核验

- 原始身份依据：README 指向 DeepLearning.AI 官方课程 `learn.deeplearning.ai/courses/agentic-ai/`，自述为“课程内容翻译 + 知识梳理 + 概念解析 + 示例代码解读”。
- 版本或发布日期：`main @ a93ab1d8`；README 项目规划表列 5 个 Module，全部标记完成（✅）。
- 是否仍维护：README 称“随课程迭代同步更新”，但需按提交时间复核实际节奏。
- 替代/迁移关系：中文衍生；事实与术语核验以 DeepLearning.AI 原课程为准。

## 本地快照

- 本地路径：`upstream/08-agents/datawhale-agentic-ai/`
- Pinned commit：`a93ab1d8546cca8b508a72f0f2c385777d5f1403`
- 迁入范围：仓库全部文本与代码（57 个文本文件 = 该仓库全部文本类 blob；逐文件比对无缺失）
- 校验：Git tree 逐路径 `[IO.File]::Exists` 比对，missing=0
- 媒体未镜像：仓库文本文件外的 75 个 blob（图片等）未抓取

## 内容范围

- 解决的问题：把「如何构建自主、协作、推理型 AI 应用」按“概念 → 原理 → 架构 → 代码”四层拆开教学。
- 快照实读结构（5 个 Module，含无评分实验）：
  1. Agentic 工作流简介：欢迎、什么是 Agentic AI、自主性等级、益处、应用、任务分解、评估（evals）、设计模式
  2. 反思设计模式：用反思提升输出、为何不只用迭代、图表生成工作流、评估反思的影响、使用外部反馈（含 2 个 lab）
  3. 工具使用：什么是工具、创建工具、工具语法、代码执行、MCP（含 2 个 lab）
  4. 构建 Agentic AI 的实用技巧：评估、错误分析与优先级、更多错误分析示例、组件级评估、解决问题、延迟与成本优化、开发过程总结（含 1 个 lab）
  5. 高度自治智能体的模式：工作流规划、创建与执行 LLM 计划、结合代码执行的规划、多智能体工作流、通信模式、总结（含 2 个 lab）
- 实验资产：每个 lab 目录含 `.ipynb` + 依赖脚本（`utils.py`、`tools.py`、`email_tools.py`、`inventory_utils.py`、`store_db.json` 等），具备本地复现基础。
- 不覆盖的内容：不含原课程视频与完整讲义；不含模型训练内容。

## 权利与复用

- 正文许可：`LICENSE` 为 Apache-2.0，但内容为原课程的中文翻译，**原课程表述的版权不因本仓库许可转移**。
- 代码许可：Apache-2.0，可复用，需保留 NOTICE 与修改声明。
- 图片/视频许可：未镜像，需单独核验。
- Attribution 要求：同时标注 Datawhale 翻译项目与 DeepLearning.AI 原课程。
- 处理建议：作为**结构与练习设计参照**与术语中文译名来源；引用课程原文时回到原课程来源。

## 教材价值

- 映射卷册：08（主）；10（工具、MCP、上下文）；12（评估与错误分析）。
- 映射 Concepts：Agent、Agentic Workflow、Reflection、Tool Use、MCP、Planning、Multi-Agent、Evaluation、Autonomy Level。
- 映射 Tasks：Code、Analysis、Verification、Automation。
- 结构复用 S1：高——"每个模式配一个可跑 lab"的编排可直接对照本项目卷 08 的练习设计。
- 知识复用 S2：中高——evals / error analysis / component-level evaluation 这一组（Module 4）是本轮少见的高质量「工程验收」教学内容，建议优先吸收。
- 案例/资产复用 S3：中——lab 依赖外部模型与 API，须核验可运行性。
- 建议处理：CURATE（评估与错误分析单元、练习结构）+ INDEX（术语中文译名）。

## 质量与风险

- Authority：社区翻译项目，内容来源为知名课程；翻译一致性由社区保证。
- Freshness：依赖原课程迭代节奏；MCP 与多智能体部分演进快。
- Educational Value：高——评估与错误分析单元填补了同类教程的普遍空白。
- Reproducibility：中——lab 需外部 API；依赖版本未锁定。
- Maintenance：需按提交时间复核。
- 已知错误/过时项：未实测全部 lab。
- 厂商 Claim 与独立证据的区别：课程中的产品实践属教学示例，不作为产品能力背书。

## 边界与去重

- **必须与** Datawhale 同组织的其他 Agent 课程区分：`hello-agents`（本项目已收录，卷 08）、`agentic-ai`（本来源）、`ai-prompting-for-everyone`（卷 10 候选）、`easy-vibe` / `vibe-vibe` / `hello-claw`（未声明许可，卷 07/11 INDEX）。
- 与 `hello-agents` 的分工建议：`hello-agents` 走“从零实现 Agent”的技术主线，本来源走“设计模式 + 工程验收”的方法主线。

## 提取的 Claims

1. 项目为 DeepLearning.AI Agentic AI 系列的中文翻译与知识梳理。位置：`README.md` 项目简介。
2. 项目规划包含 5 个 Module，状态均为完成。位置：`README.md` 项目规划表。
3. 正文结构为“概念 → 原理 → 架构 → 代码”四层。位置：`README.md` 项目亮点。
4. 仓库许可为 Apache-2.0。位置：`LICENSE`。
