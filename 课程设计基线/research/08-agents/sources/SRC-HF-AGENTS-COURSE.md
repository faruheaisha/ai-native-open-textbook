---
source_id: SRC-HF-AGENTS-COURSE
title: Hugging Face Agents Course
publisher: Hugging Face
author: Ben Burtenshaw; Joffrey Thomas; Thomas Simonini; Sergio Paniego; contributors
source_tier: T2
source_type: open_course
canonical_url: https://huggingface.co/learn/agents-course/en/unit0/introduction
published_at: 2025
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: living-course/main
status: accepted
license: Apache-2.0 repository license
rights_status: text-and-code-reusable-with-attribution; third-party-media-needs-item-check
language: English; community translations available
---

# Source Record：Hugging Face Agents Course

## 身份核验

- 官方/原始身份依据：课程位于 Hugging Face Learn 与 `huggingface/agents-course` 官方仓库。
- 版本或发布日期：仓库引用信息标注 2025；课程明确声明为持续演进项目。
- 是否仍维护：是；本次核验可访问现行课程和 GitHub 主分支。
- 替代/迁移关系：无已确认替代关系；课程内容随框架生态更新。

## 本地快照

- 本地路径：`upstream/08-agents/huggingface-agents-course/`
- Pinned commit：`b3946b1d09d29c65736e219d48a8a736a2c52154`（2026-09-09，main）
- 上一快照：`8c0832eae634ebb34541c65265caa6da4c5d2c57`（2026-06-28）
- 迁入日期：2026-09-10；迁入方式：浅克隆整仓，7 种语言全部就位
- 中文状态：`units/zh-CN/` 与英文逐文件对齐，仅 `bonus-unit2` 目录命名差异
- 台账：`upstream/08-agents/上游课程台账.md`

## 内容范围

- 解决的问题：从概念、工具与 Agent 循环入门，进阶到框架、Agentic RAG、用例作业、最终评测与证书。
- 主要概念：Agent、LLM、Messages、Tools、Thought/Action/Observation、Agent Loop、Frameworks、Evaluation。
- 教学结构：Onboarding → Fundamentals → Frameworks → Use Cases/Agentic RAG → Final Project/Evaluation。
- 真实案例与资产：Python 工具、smolagents、LlamaIndex、LangGraph、Hugging Face Spaces、挑战与排行榜。
- 不覆盖的内容：不负责给出跨学术史与所有工业架构一致接受的唯一 Agent 定义；中文生产环境与中国产品生态覆盖有限。

## 权利与复用

- 正文许可：仓库整体标注 Apache-2.0；复用时保留许可证和 attribution。
- 代码许可：Apache-2.0 仓库许可，仍需检查第三方依赖。
- 图片/GIF/视频许可：逐项检查；课程已注明部分背景图来自第三方生成服务，不能仅凭仓库许可假设所有媒体均可镜像。
- Attribution 要求：保留版权与许可证通知，明确来源和改编。
- Share-alike / Noncommercial：Apache-2.0 本身无 NC/SA；第三方资产另议。
- 允许操作：Link / Quote / Adapt / Fork；Mirror 仅限权利清楚的仓库内容与资产。

## 教材价值

- 映射卷册：08 为主，10/14 为辅。
- 映射 Concepts：Agent、Tool、Action、Observation、Agent Loop、Evaluation。
- 映射 Tasks：从函数工具完成简单目标；基于 benchmark 检验 Agent。
- 结构复用 S1：高——理论 → Hands-on → Use Case → Challenge/Evaluation。
- 知识复用 S2：中高——适合承担首章行为循环与工具基础。
- 案例/资产复用 S3：中——需做环境和版本复现。
- 建议处理：ADAPT。

## 质量与风险

- Authority：官方开放课程，课程工程质量高。
- Freshness：Living course；框架和页面会变化。
- Educational Value：高，学习目标、动手、评测闭环清楚。
- Reproducibility：中高，代码公开但依赖模型、服务和框架版本。
- Maintenance：本次核验为活跃。
- 已知错误/过时项：课程目录与框架版本会漂移，引用必须固定页面与核验日期。
- 厂商 Claim 与独立证据的区别：课程对 Hugging Face 生态和 smolagents 的呈现属于厂商/维护方视角；不能据此证明其优于其他框架。

## 提取的 Claims

1. Unit 1 将 Agent 基础组织为 LLM、Messages、Tools 与 Think/Act/Observe 循环。位置：[Unit 1 Introduction](https://huggingface.co/learn/agents-course/en/unit1/introduction)。
2. 课程把 Agent 描述为使用 AI 模型与环境交互、实现用户目标的系统，并用“brain + body”解释模型与能力/工具。位置：[What are Agents?](https://huggingface.co/learn/agents-course/en/unit1/what-are-agents)。
3. 课程包含实践、用例作业与最终评测，而非只有概念讲解。位置：[Course Introduction](https://huggingface.co/learn/agents-course/en/unit0/introduction)。
