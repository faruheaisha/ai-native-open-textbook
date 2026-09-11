---
source_id: SRC-TAU-BENCH-PAPER
title: "tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains"
publisher: arXiv; ICLR 2025
author: Shunyu Yao; Noah Shinn; Pedram Razavi; Karthik Narasimhan
source_tier: T1
source_type: benchmark_paper
canonical_url: https://arxiv.org/abs/2406.12045
published_at: 2024-06-17
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: arXiv record; current benchmark implementation has evolved
status: accepted
license: paper, code and data licenses require separate recording
rights_status: link-and-paraphrase; benchmark-use-terms-pending
language: English
---

# Source Record：tau-bench

## 身份核验

- 官方/原始身份依据：作者论文 arXiv/OpenReview 记录与作者 benchmark 仓库。
- 版本或发布日期：初次提交 2024-06-17；发表于 ICLR 2025。
- 是否仍维护：当前公开实现生态已演进到 `tau2-bench` 仓库并提供兼容说明；具体迁移关系在复现前再次核验。
- 替代/迁移关系：原始论文、原始任务 split 和后续仓库版本必须分开记录，不能混报分数。

## 内容范围

- 解决的问题：评价语言 Agent 在与用户多轮交互、调用领域 API 和遵守政策规则时能否可靠完成任务。
- 主要概念：simulated user、domain APIs、policy compliance、database goal state、repeated-trial reliability、pass^k。
- 实验范围：论文中的零售、航空等领域设定。
- 真实案例与资产：数据库、API、政策文档、用户任务和 ground truth。
- 不覆盖的内容：所有现实业务、真实用户行为、安全攻击面或长期 Agent 运行。

## 权利与复用

- 正文许可：论文具体许可待登记。
- 代码/数据许可：使用前分别核验 `tau2-bench` 仓库、任务数据和第三方内容条款。
- 图片/GIF/视频许可：暂不直接复制。
- Attribution 要求：论文、作者、版本、任务 split、实现仓库。
- 允许操作：Link / Paraphrase；运行、改编或再分发数据待许可审计。

## 教材价值

- 映射卷册：08、12，部分映射 04。
- 映射 Concepts：Tool-Agent-User Interaction、Policy、State-based Oracle、Consistency、pass^k。
- 映射 Tasks：需要对话澄清、调用业务工具并遵守规则的客户服务任务。
- 结构复用 S1：中。
- 知识复用 S2：高，适合说明“完成结果 + 遵守规则 + 多次一致性”。
- 案例/资产复用 S3：高潜力，但必须锁定版本与数据条款。
- 建议处理：CURATE + selective reproduction。

## 质量与风险

- Authority：原始 benchmark 论文。
- Freshness：研究问题仍重要；实现和任务版本已演进。
- Educational Value：很高，直接连接工具、用户、政策、数据库状态和重复运行。
- Reproducibility：中高潜力，需固定模型、模拟用户、任务 split 和仓库版本。
- 已知限制：模拟用户不等同真实用户；pass^k 对独立重复假设和采样方式敏感；论文历史分数不可直接代表当前模型。
- 厂商 Claim 与独立证据的区别：benchmark 结果只对指定任务、规则、工具和运行设置有效。

## 提取的 Claims

1. tau-bench 将用户对话、领域工具和政策规则放进同一 Agent 评测环境。位置：[Abstract](https://arxiv.org/abs/2406.12045)。
2. 评测比较最终数据库状态与标注目标状态，使部分任务可以使用比文本相似度更直接的 oracle。位置同上。
3. `pass^k` 用于考察多次运行的一致可靠性；正文必须解释其定义和局限，不只展示数字。
4. 当前实现信息需从[维护仓库](https://github.com/sierra-research/tau2-bench)锁定版本，不能把后续仓库结果与原论文默认混合。

