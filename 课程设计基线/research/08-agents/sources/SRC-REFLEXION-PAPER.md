---
source_id: SRC-REFLEXION-PAPER
title: "Reflexion: Language Agents with Verbal Reinforcement Learning"
publisher: arXiv
author: Noah Shinn et al.
source_tier: T1
source_type: research_paper
canonical_url: https://arxiv.org/abs/2303.11366
published_at: 2023-03-20
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: arXiv record
status: accepted-as-source-view
license: paper reuse license not yet recorded
rights_status: link-and-paraphrase; figures-and-long-excerpts-pending-license-check
language: English
---

# Source Record：Reflexion

## 身份核验

- 官方/原始身份依据：作者论文的 arXiv 记录与同行评审版本。
- 版本或发布日期：初次提交 2023-03-20。
- 是否仍维护：研究论文稳定；实现仓库与依赖另核。
- 替代/迁移关系：不是模型权重更新意义上的 reinforcement learning 教程。

## 内容范围

- 解决的问题：Agent 如何把任务反馈转为语言反思，并在后续尝试中利用这些经验，而不更新模型权重。
- 主要概念：feedback signal、verbal reflection、episodic memory buffer、trial、self-evaluation。
- 实验范围：sequential decision-making、coding、language reasoning。
- 真实案例与资产：论文实验、消融和不同反馈源比较。
- 不覆盖的内容：生产长期记忆、事实冲突治理、无限自我改进或安全保证。

## 权利与复用

- 正文许可：待记录具体论文许可；当前只链接、有限短引和转述。
- 代码许可：进入复现实验前单独核验。
- 图片/GIF/视频许可：暂不直接复制论文图。
- Attribution 要求：作者、论文名、版本和链接。
- 允许操作：Link / Paraphrase；Quote / Adapt figures / Mirror 待核权。

## 教材价值

- 映射卷册：08、10、12、14。
- 映射 Concepts：Reflection、Feedback、Episodic Memory、Repeated Trial、Self-evaluation。
- 映射 Tasks：失败后修订策略、编程测试反馈、交互任务。
- 结构复用 S1：低至中。
- 知识复用 S2：高，适合作为 Reflection 的原始 Source View。
- 案例/资产复用 S3：中，需与无 reflection baseline 复现。
- 建议处理：CURATE；复现后再 ADAPT。

## 质量与风险

- Authority：原始研究来源。
- Freshness：概念仍重要，具体基准和模型已有年代性。
- Educational Value：高，可纠正“反思就是再问模型一次”的粗糙解释。
- Reproducibility：中；需反馈 oracle、尝试边界和 memory 管理。
- 已知限制：自评可能错误；语言反思会增加 token 与延迟；论文效果不能跨任务、模型和运行时直接外推。
- 厂商 Claim 与独立证据的区别：论文报告的 HumanEval 数字只在其设置内成立，进入正文必须连同 baseline、模型和测法呈现。

## 提取的 Claims

1. Reflexion 不通过更新模型权重学习，而是把反馈转成语言反思存入 episodic memory，影响后续尝试。位置：[Abstract](https://arxiv.org/abs/2303.11366)。
2. 反馈可以来自标量或自由文本，也可以来自外部或模拟来源；来源质量决定反思可信度。位置同上及论文方法部分。
3. Reflection 必须和 trial、feedback 与后续行为变化一起讲，不能只呈现一段“自我批评”文字。

