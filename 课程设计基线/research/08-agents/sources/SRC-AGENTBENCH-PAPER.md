---
source_id: SRC-AGENTBENCH-PAPER
title: "AgentBench: Evaluating LLMs as Agents"
publisher: arXiv; ICLR 2024
author: Xiao Liu et al.
source_tier: T1
source_type: benchmark_paper
canonical_url: https://arxiv.org/abs/2308.03688
published_at: 2023-08-07
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: arXiv v3, 2025-10-04
status: accepted
license: paper and code licenses require separate recording
rights_status: link-and-paraphrase; benchmark-use-terms-pending
language: English
---

# Source Record：AgentBench

## 身份核验

- 官方/原始身份依据：论文 arXiv 记录与 `THUDM/AgentBench` 作者仓库。
- 版本或发布日期：初次提交 2023-08-07；本次可见 arXiv v3 修订于 2025-10-04；发表于 ICLR 2024。
- 是否仍维护：论文有后续修订；代码当前可访问，实际维护质量需复现时核验。
- 替代/迁移关系：不是唯一或通用 Agent benchmark；需与 GAIA、tau-bench 和任务级 eval 并列。

## 内容范围

- 解决的问题：在多个交互环境中评价 LLM 作为 Agent 的多轮推理与决策能力。
- 主要概念：interactive environment、multi-turn action、task score、failure analysis、benchmark aggregation。
- 实验范围：论文构造的八类环境及当时测试模型。
- 真实案例与资产：数据、环境和集成评测包。
- 不覆盖的内容：真实组织部署的权限、长期运维、用户满意度、全部安全与成本维度。

## 权利与复用

- 正文许可：论文具体许可待登记。
- 代码/数据许可：复现前分别核验仓库与各环境数据条款。
- 图片/GIF/视频许可：不直接镜像论文图，优先自绘评测维度图。
- Attribution 要求：作者、论文、版本、环境与仓库。
- 允许操作：Link / Paraphrase；运行 benchmark、改编数据和镜像待许可与环境审计。

## 教材价值

- 映射卷册：08、12，部分映射 02。
- 映射 Concepts：Agent Evaluation、Interactive Environment、Trajectory、Failure Category。
- 映射 Tasks：操作系统、数据库、知识图谱、卡牌游戏、网页购物等交互任务。
- 结构复用 S1：中。
- 知识复用 S2：高，适合说明“模型 benchmark ≠ Agent benchmark”。
- 案例/资产复用 S3：中，环境搭建和旧 API 依赖可能较重。
- 建议处理：CURATE + selective reproduction。

## 质量与风险

- Authority：原始 benchmark 论文与开放评测包。
- Freshness：论文有 2025 修订，但模型排行榜本身已动态过时。
- Educational Value：高，覆盖多环境与失败分析。
- Reproducibility：中；环境异质、模型/API 版本变化会影响复现。
- 已知限制：总分聚合会遮蔽任务差异；八个环境不代表全部 Agent 能力；训练污染和工具基础设施差异需另审。
- 厂商 Claim 与独立证据的区别：可用于讲评测设计，不把历史模型排名写入稳定正文。

## 提取的 Claims

1. AgentBench 面向多轮开放生成和交互环境，而不是只评分单次静态答案。位置：[Abstract](https://arxiv.org/abs/2308.03688)。
2. 首版覆盖八个不同环境，并公开数据、环境与集成评测包。位置同上及[官方仓库](https://github.com/THUDM/AgentBench)。
3. 论文识别长程推理、决策和指令遵循等失败，但这些是其测试集中的观察，不应写成所有 Agent 失败的完整 taxonomy。

