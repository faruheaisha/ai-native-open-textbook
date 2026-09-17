---
title: "01 认识 Dify"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/01-认识-dify.md"
sourceRel: "docs/chapters/01-认识-dify.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/01-认识-dify.md"
sourceSha256: "3e6991c81aa84087efaf6b7c4f6d2ec6d33c3da5ef89a9fe9196e6a85bb12c08"
pageSha256: "3e6991c81aa84087efaf6b7c4f6d2ec6d33c3da5ef89a9fe9196e6a85bb12c08"
contentMode: "local-full"
zh: ""
---

# 01 认识 Dify

## 学习目标

读完本章，你应该能说清楚：

- Dify 是什么，不是什么。
- Dify 适合解决哪些问题。
- Dify 的核心对象有哪些。
- 为什么不要一上来就追求复杂 Agent。

## Dify 是什么

Dify 是一个用于构建 AI 应用的平台。你可以把它理解成三层能力的组合：

1. **应用层**：给用户使用的聊天入口、表单入口、API 入口。
2. **编排层**：通过 Chatflow、Workflow、Agent、节点和变量组织任务。
3. **能力层**：大模型、知识库、工具、插件、外部 API、自部署基础设施。

官方文档中，Dify App 可以通过拖拽方式构建 agentic workflows，并发布为 Web、API 或 MCP Server。Dify 主要应用类型包括 Workflow 和 Chatflow，同时也提供 Chatbot、Agent、Text Generator 等更基础的应用类型。

## Dify 不是什么

Dify 不是一个“自动把所有事情做好”的魔法工具。

它不能替你自动完成：

- 判断业务流程是否合理。
- 清洗质量很差的知识库资料。
- 修复含糊、冲突、过期的文档。
- 保证模型永远不犯错。
- 替代权限、审计、备份和上线流程。

Dify 的价值是让你更快地把模型、知识库、流程和工具组合成一个可用应用。但应用是否可靠，仍然取决于你的设计。

## 核心概念

| 概念 | 解释 |
| --- | --- |
| App | 用户最终使用的 AI 应用 |
| Model | 负责理解、推理、生成的大模型 |
| Prompt | 告诉模型角色、任务、边界和输出格式 |
| Variable | 存储输入、中间结果和上下文 |
| Knowledge | 用你自己的资料增强回答 |
| Workflow | 适合单轮、固定步骤、可批量执行的任务 |
| Chatflow | 适合多轮对话，每一轮都触发流程 |
| Agent | 让模型在一定边界内自主选择工具和行动 |
| Tool | 让应用访问外部能力，例如搜索、API、数据库 |
| DSL | Dify 应用导出的 YAML 格式，可迁移和分享 |

## Dify 适合的场景

- 企业知识库问答。
- 客服助手。
- 内容生成和改写。
- 表单信息抽取。
- 内部运营自动化。
- 报告生成。
- 多工具查询助手。
- 面向用户的 AI Web App。

## Dify 不适合直接承载的场景

- 高风险医疗、法律、金融决策的最终判断。
- 强事务一致性的核心业务系统。
- 必须 100% 确定的规则执行。
- 完全没有资料来源的事实型问答。
- 对延迟极端敏感的高频请求。

这些场景可以用 Dify 辅助，但必须有人审、规则兜底或外部系统校验。

## 最小心智模型

设计 Dify 应用时，永远先问：

1. 用户输入是什么？
2. 系统需要查什么资料？
3. 模型应该做什么判断？
4. 哪些步骤必须固定？
5. 哪些地方允许模型自由发挥？
6. 输出给谁看？
7. 错了会有什么后果？

这 7 个问题比“选哪个模型”更重要。

## 本章练习

找一个你身边的小任务，例如“根据公司 FAQ 回答客户问题”，填写：

- 用户是谁。
- 用户会问什么。
- 资料在哪里。
- 哪些问题不能回答。
- 成功回答长什么样。

完成后进入下一章：[02 应用类型选择](/lib/04-work/how-to-use-dify/docs-chapters-02-应用类型选择)。
