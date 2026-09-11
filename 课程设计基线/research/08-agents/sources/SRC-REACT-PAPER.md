---
source_id: SRC-REACT-PAPER
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
publisher: arXiv; ICLR 2023
author: Shunyu Yao et al.
source_tier: T1
source_type: research_paper
canonical_url: https://arxiv.org/abs/2210.03629
published_at: 2022-10-06
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: arXiv record; paper version must be pinned before quotation
status: accepted
license: paper reuse license not yet recorded
rights_status: link-and-paraphrase; figures-and-long-excerpts-pending-license-check
language: English
---

# Source Record：ReAct

## 身份核验

- 官方/原始身份依据：作者论文的 arXiv 记录；论文提供项目站与代码入口。
- 版本或发布日期：初次提交 2022-10-06；发表于 ICLR 2023。
- 是否仍维护：论文为稳定研究来源；代码和依赖维护状态需另核。
- 替代/迁移关系：不是现代 Agent runtime 或 function-calling API 的替代文档。

## 内容范围

- 解决的问题：把语言模型生成的 reasoning traces 与环境 actions 交错起来，使行动获得推理支持、推理获得外部观察。
- 主要概念：Thought、Action、Observation、trajectory、environment feedback、few-shot prompting。
- 实验范围：HotpotQA、FEVER、ALFWorld、WebShop 等论文设定。
- 真实案例与资产：论文轨迹、提示、项目代码。
- 不覆盖的内容：现代隐藏推理模型、标准化 tool schema、生产权限、持久执行和完整 Agent safety。

## 权利与复用

- 正文许可：待记录论文具体许可；当前只链接、有限短引和转述。
- 代码许可：进入案例前单独核验项目仓库许可证与依赖。
- 图片/GIF/视频许可：论文图暂不镜像；优先制作教材自绘行为图。
- Attribution 要求：作者、论文名、版本和链接。
- 允许操作：Link / Paraphrase；Quote / Adapt figures / Mirror 待核权。

## 教材价值

- 映射卷册：08 为主；09、12、14 为辅。
- 映射 Concepts：Agent Loop、Reasoning/Acting、Observation、Trajectory、Failure Analysis。
- 映射 Tasks：检索问答、事实验证、交互决策。
- 结构复用 S1：中。
- 知识复用 S2：高。
- 案例/资产复用 S3：中，需在现代模型和工具接口上重做实验。
- 建议处理：CURATE + ADAPT。

## 质量与风险

- Authority：奠基性原始论文。
- Freshness：机制有历史价值，具体模型和提示设置已老化。
- Educational Value：高，适合解释 action–observation feedback。
- Reproducibility：中；代码公开，但原始模型/环境和现代运行环境有差异。
- 已知限制：论文自身记录 ReAct 会误读轨迹上下文、生成幻觉动作，在部分 QA 任务上不总优于 CoT；不能写成“ReAct 总会提高准确率”。
- 厂商 Claim 与独立证据的区别：它是研究实验，不是生产普遍效果保证。

## 提取的 Claims

1. ReAct 研究的是 reasoning traces 与 task-specific actions 的交错生成，并让外部观察进入后续决策。位置：[Abstract and §1](https://arxiv.org/abs/2210.03629)。
2. 原论文按任务让 thoughts 稠密或稀疏出现，而不是要求每个 action 前都有固定格式的显式 Thought。位置：[§2](https://arxiv.org/html/2210.03629)。
3. 论文同时分析成功与失败轨迹，因此适合作为 Failure Atlas 来源。位置：[§3–4](https://arxiv.org/html/2210.03629)。

