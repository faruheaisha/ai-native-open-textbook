---
title: "08 Agent 和工具调用"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/08-agent-和工具调用.md"
sourceRel: "docs/chapters/08-agent-和工具调用.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/08-agent-和工具调用.md"
sourceSha256: "db3b43e03d14dcd6dce2f87ca73ea47107b0c6d653fcaff3ffcd27f3289991f7"
pageSha256: "db3b43e03d14dcd6dce2f87ca73ea47107b0c6d653fcaff3ffcd27f3289991f7"
contentMode: "local-full"
zh: ""
---

# 08 Agent 和工具调用

## 学习目标

你将理解 Agent 的适用边界，以及如何让工具调用更可控。

## Agent 是什么

Agent 的核心是让模型根据目标和上下文，决定下一步要不要调用工具、调用哪个工具、如何解释结果。

这适合信息来源不固定、步骤不完全固定的任务。但它也意味着成本、延迟和不确定性更高。

## 什么时候用 Agent

适合：

- 用户问题差异很大。
- 需要查询多个外部来源。
- 工具调用顺序无法提前完全确定。
- 需要模型做一定规划。

不适合：

- 固定审批流程。
- 严格合规流程。
- 可以用 Workflow 清楚表达的任务。
- 工具调用错误会造成严重后果的任务。

## Prompt 要写清楚工具边界

官方 Agent 文档强调，Prompt 应说明角色、输出格式、限制、工具使用方式和工作流程。对 Agent 来说，工具说明尤其重要。

示例：

```text
你是内部运营助手。

你可以使用以下工具：
- search_docs：查询公司公开制度。
- create_ticket：创建工单。

规则：
1. 只有当用户明确要求提交问题时，才调用 create_ticket。
2. 涉及制度问题时，先调用 search_docs。
3. 如果 search_docs 没有找到依据，不要编造。
4. 创建工单前，必须向用户确认标题、描述和紧急程度。
```

## 工具类型

Dify 支持多种工具形态：

- 插件工具：由 Dify 或社区提供，常见服务可直接安装。
- OpenAPI 工具：通过标准 OpenAPI 描述接入内部或第三方服务。
- Workflow as Tool：把以 User Input 开始的 Workflow 封装成工具，供其他应用复用。
- MCP 工具：通过 Model Context Protocol 接入外部资源和工具。

## 最大迭代次数

Agent 可能多次“思考、调用工具、处理结果”。最大迭代次数越高，复杂任务能力越强，但延迟和成本也会上升。

新手建议：

- 简单工具任务：2 到 3 次。
- 多源查询任务：3 到 5 次。
- 复杂研究任务：谨慎提高，并观察成本。

## 工具描述

工具描述不要只写“查询数据”。要说明：

- 工具能做什么。
- 什么时候用。
- 输入参数是什么。
- 不能用于什么场景。
- 失败时怎么处理。

## 常见错误

- 工具描述太模糊，Agent 不知道何时调用。
- 没有限制敏感操作。
- 没有确认步骤就创建、删除或提交。
- 用 Agent 代替本来固定的 Workflow。
- 最大迭代次数过高导致成本不可控。

## 本章练习

设计一个“会议安排 Agent”：

- 能查询日历。
- 能查询同事资料。
- 能生成会议议程。
- 创建会议前必须向用户确认。
