---
source_id: SRC-OPENAI-AGENTS-SDK
title: OpenAI Agents SDK Documentation
publisher: OpenAI
author: OpenAI and contributors
source_tier: T1
source_type: official_sdk_documentation
canonical_url: https://openai.github.io/openai-agents-python/
published_at: null
retrieved_at: 2026-09-08
last_verified: 2026-09-08
version: current Python documentation
status: accepted-as-implementation-source
license: MIT repository license
rights_status: code-and-repository-docs-reusable-with-license; product-assets-separate
language: English
---

# Source Record：OpenAI Agents SDK Documentation

## 身份核验

- 官方/原始身份依据：OpenAI 官方 GitHub Pages 文档与 `openai/openai-agents-python` 仓库。
- 版本或发布日期：使用本次核验的当前 Python 文档；API 版本需在案例锁定依赖时另记。
- 是否仍维护：是；文档覆盖 Agent、Runner、Tools、Handoffs、Guardrails、Sessions、Tracing 与 Human-in-the-loop。
- 替代/迁移关系：具体历史 SDK 关系不在本 Source Record 推断，迁移事实需按官方文档单独核验。

## 内容范围

- 解决的问题：用 SDK 构建和运行 agentic applications。
- 主要概念：Agent、Runner/Loop、Tools、Handoffs、Agents-as-tools、Guardrails、Sessions、RunState、Human Approval。
- 文档结构：概念/API 文档与示例。
- 真实案例与资产：Python 示例、工具调用、多 Agent 编排、审批和状态恢复。
- 不覆盖的内容：SDK 对象模型不是跨厂商 Agent 的唯一理论定义；默认不承担 Agent 历史、社会影响或独立效果评测。

## 权利与复用

- 正文许可：官方开源仓库采用 MIT；引用文档时保留来源与许可。
- 代码许可：MIT。
- 图片/GIF/视频许可：逐项检查；OpenAI 商标与产品素材另受品牌规则约束。
- Attribution 要求：保留版权和许可通知。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork；第三方依赖与产品素材单独处理。

## 教材价值

- 映射卷册：08、09、10、12。
- 映射 Concepts：Agent runtime、loop、tool call、handoff、orchestration、guardrail、HITL。
- 映射 Tasks：实现单 Agent 循环、多 Agent 协作、敏感工具审批。
- 结构复用 S1：中。
- 知识复用 S2：高，适合作为“具体运行时实现”而不是通用定义来源。
- 案例/资产复用 S3：中高，依赖 API 与 SDK 版本。
- 建议处理：ADAPT as comparative implementation。

## 质量与风险

- Authority：OpenAI SDK 一手文档。
- Freshness：活跃且变化快，案例需锁定版本。
- Educational Value：高，可把抽象 loop 映射到可运行状态机。
- Reproducibility：中高，需 API 凭证、固定依赖与可控模型输出。
- Maintenance：本次核验为活跃。
- 已知错误/过时项：无已确认错误；接口与 Hosted Tools 会变化。
- 厂商 Claim 与独立证据的区别：文档能证明 SDK 如何工作，不能单独证明 Agent 的业务效果、可靠性或优越性。

## 提取的 Claims

1. SDK 中的 Agent 是配置了 instructions、tools 和可选 runtime behavior 的 LLM。位置：[Agents](https://openai.github.io/openai-agents-python/agents/)。
2. Runner 循环根据 final output、handoff 或 tool calls 决定结束、切换 Agent 或继续迭代。位置：[Running agents](https://openai.github.io/openai-agents-python/running_agents/)。
3. Tools 用于获取数据、运行代码、调用 API 或操作计算机；Agent 也可作为工具。位置：[Tools](https://openai.github.io/openai-agents-python/tools/)。
4. 多 Agent 编排可以由模型驱动，也可以由代码驱动。位置：[Multi-agent orchestration](https://openai.github.io/openai-agents-python/multi_agent/)。
5. 敏感工具调用可以暂停等待人工批准或拒绝，并序列化状态后恢复。位置：[Human-in-the-loop](https://openai.github.io/openai-agents-python/human_in_the_loop/)。

