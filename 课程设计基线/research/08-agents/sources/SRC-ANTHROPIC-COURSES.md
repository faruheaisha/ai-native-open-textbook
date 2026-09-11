---
source_id: SRC-ANTHROPIC-COURSES
title: Anthropic Courses（tool_use / prompt_evaluations）
publisher: Anthropic
author: Anthropic and contributors
source_tier: T2
source_type: open_course
canonical_url: https://github.com/anthropics/courses
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: master @ f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77（2025-11-13）
status: accepted
license: CC BY-NC 4.0
rights_status: noncommercial; code-and-third-party-assets-need-item-check
language: English
---

# Source Record：Anthropic Courses

## 身份核验

- 官方/原始身份依据：Anthropic 官方 GitHub 组织仓库 `anthropics/courses`。
- 版本或发布日期：主线 HEAD 为 `f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77`（2025-11-13）。
- 是否仍维护：仓库未归档；主线课程内容最近一次可见提交为 2025-11，使用前按需核验。
- 替代/迁移关系：与 Anthropic 官方文档、工程博客互补，无替代关系。

## 本地快照

- 本地路径：`upstream/08-agents/anthropics-courses/`
- Pinned commit：`f4dbb137d7b02dddaf3cc73e32e20a702d3b5e77`（2025-11-13，master）
- 迁入日期：2026-09-10；迁入方式：blobless 克隆 + 非锥形稀疏检出
- 迁入范围：`tool_use/`、`prompt_evaluations/`
- 暂不迁入：`anthropic_api_fundamentals/`、`prompt_engineering_interactive_tutorial/`、`real_world_prompting/`，需要时按稀疏模式追加
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：工具使用（工具定义、多工具循环）与提示/模型评测方法的教学课程。
- 主要概念：Tool Definition、Tool Choice、Multi-tool Chatbot、Workflow、Prompt Evaluation、Code Grading、Model Grading、Custom Graders。
- 教学结构：Notebook 驱动；每个主题以可运行 notebook 组织，配有说明与练习。
- 真实案例与资产：Jupyter notebooks、示例数据、评测示例。
- 不覆盖的内容：不是综合的 Agent 工程课程；不覆盖多 Agent、长期记忆与生产部署。

## 权利与复用

- 正文许可：CC BY-NC 4.0（LICENSE 文件实测）。
- 代码许可：随仓库 CC BY-NC 4.0；第三方依赖单独核验。
- 图片/GIF/视频许可：逐项核验；本轮未迁入媒体文件。
- Attribution 要求：署名并注明来源与是否改编。
- Share-alike / Noncommercial：非商业；无 ShareAlike。
- 允许操作：Link / Quote / noncommercial Adapt / Fork under CC terms。

## 教材价值

- 映射卷册：08（tool_use → 第 4、5 章；prompt_evaluations → 第 12 章）；其余课程按需映射卷 01–04。
- 映射 Concepts：Tool、Tool Schema、Tool Choice、Evals、Grader。
- 映射 Tasks：为 Agent 定义工具；为输出设计评分器。
- 结构复用 S1：高——notebook 递进式教学。
- 知识复用 S2：中——tool use 与 evals 方法可吸收。
- 案例/资产复用 S3：中——notebook 需锁定依赖版本后复现。
- 建议处理：ADAPT。

## 质量与风险

- Authority：Anthropic 官方教学仓库。
- Freshness：主线内容更新至 2025-11；2026 年新能力需回官方文档核验。
- Educational Value：高，方法递进清楚。
- Reproducibility：中——依赖 Anthropic API key 与模型版本。
- Maintenance：仓库未归档，但主线更新缓慢。
- 已知错误/过时项：API 用法可能随版本变化，引用须带核验日期。
- 厂商 Claim 与独立证据的区别：内容代表 Anthropic 官方观点与示例，不构成跨厂商比较结论。

## 提取的 Claims

1. 仓库包含独立的 tool_use 课程，覆盖工具定义与多工具聊天机器人。位置：`tool_use/` 目录（含 `06_chatbot_with_multiple_tools.ipynb` 等）。
2. 仓库包含 prompt_evaluations 课程，覆盖代码评分、模型评分与自定义评分器。位置：`prompt_evaluations/` 下 `03_code_graded_evals`、`07_prompt_foo_custom_graders`、`08_prompt_foo_model_graded` 等目录。
3. 仓库许可为 CC BY-NC 4.0。位置：`LICENSE` 文件（经 GitHub API 实测文本为 Attribution-NonCommercial 4.0 International）。

