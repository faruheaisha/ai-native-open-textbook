---
source_id: SRC-ANTHROPIC-EFFECTIVE-AGENTS
title: Building Effective Agents
publisher: Anthropic
author: Anthropic Engineering
source_tier: T1
source_type: official_engineering_article
canonical_url: https://www.anthropic.com/engineering/building-effective-agents
published_at: 2024-12-19
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: web article
status: accepted-with-age-note
license: no course-reuse license confirmed
rights_status: link-and-limited-quotation; adaptation-rights-unconfirmed
language: English
---

# Source Record：Anthropic — Building Effective Agents

## 身份核验

- 官方/原始身份依据：Anthropic 官方 Engineering 文章。
- 版本或发布日期：2024-12-19。
- 是否仍维护：文章仍可访问；它是基础工程文章，不应假设内容随产品同步更新。
- 替代/迁移关系：未发现明确替代页；应结合后续 Anthropic 工程文档使用。

## 内容范围

- 解决的问题：如何选择和构建有效的 LLM agentic systems。
- 主要概念：Workflow、Agent、Augmented LLM、Prompt Chaining、Routing、Parallelization、Orchestrator–Workers、Evaluator–Optimizer、Tool/ACI。
- 文档结构：定义与选型原则 → 基础构件 → 多种工作流 → Agent → 实践原则与场景。
- 真实案例与资产：客户支持、Coding Agent 等工程场景和架构图。
- 不覆盖的内容：不是完整课程，不提供跨厂商统一标准，也不代表 2026 年所有产品命名。

## 权利与复用

- 正文许可：未确认允许课程整体改编的开放许可证。
- 代码许可：页面示例需按页面条款处理，不能自动继承其他 Anthropic 仓库许可。
- 图片/GIF/视频许可：未确认重分发权；先采用链接或自绘综合图。
- Attribution 要求：短引/转述时清楚标注 Anthropic 和原文链接。
- Share-alike / Noncommercial：未知。
- 允许操作：Link / limited Quote / Synthesis with citation；Adapt / Mirror / Fork 暂不执行。

## 教材价值

- 映射卷册：08、09、10、12。
- 映射 Concepts：Agentic System、Workflow、Agent、Tool、Orchestration、Evaluation、Human Oversight。
- 映射 Tasks：判断何时用 workflow、何时用 agent；选择最小复杂度。
- 结构复用 S1：中高。
- 知识复用 S2：高，但需转述和标明 Source View。
- 案例/资产复用 S3：低至中，需另建可复现案例。
- 建议处理：CURATE + INDEX；关键分类进入 Source View。

## 质量与风险

- Authority：一手厂商工程经验。
- Freshness：基础原则仍有价值，但文章发布于 2024；产品/API 事实不得从此文推到 2026。
- Educational Value：高，尤其适合解释 Workflow 与 Agent 的工程边界。
- Reproducibility：中，主要是设计模式而非完整实验包。
- Maintenance：静态文章。
- 已知错误/过时项：没有已确认错误；框架和产品名称可能演进。
- 厂商 Claim 与独立证据的区别：“最成功实现倾向简单、可组合模式”来自 Anthropic 客户经验，不是跨行业统计定律。

## 提取的 Claims

1. Anthropic 用 `agentic systems` 作上位概念，并区分预定义代码路径的 workflows 与由模型动态指导过程/工具使用的 agents。位置：[What are agents?](https://www.anthropic.com/engineering/building-effective-agents#what-are-agents)。
2. Augmented LLM 将模型与 retrieval、tools、memory 等能力结合，但这些能力并不等于每个 Agent 都必须全部具备。位置：[The building block: The augmented LLM](https://www.anthropic.com/engineering/building-effective-agents#the-building-block-the-augmented-llm)。
3. 应先寻找最简单可行方案，复杂性只有在能改善结果时才合理。位置：[When (and when not) to use agents](https://www.anthropic.com/engineering/building-effective-agents#when-and-when-not-to-use-agents)。
4. 有效 Agent 任务通常需要明确成功标准、环境反馈与合适的人类监督。位置：[Agents](https://www.anthropic.com/engineering/building-effective-agents#agents)。

