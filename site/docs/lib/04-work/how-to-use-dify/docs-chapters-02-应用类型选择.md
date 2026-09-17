---
title: "02 应用类型选择"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/02-应用类型选择.md"
sourceRel: "docs/chapters/02-应用类型选择.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/02-应用类型选择.md"
sourceSha256: "fe1385eaa4127f792994267dd9c74af792ef885bb412bd26e0be9dad14d7fa9d"
pageSha256: "fe1385eaa4127f792994267dd9c74af792ef885bb412bd26e0be9dad14d7fa9d"
contentMode: "local-full"
zh: ""
---

# 02 应用类型选择

## 学习目标

你将学会根据任务选择 Chatflow、Workflow、Chatbot、Agent 或 Text Generator。

选错应用类型，会导致后面越做越乱。很多 Dify 项目失败，不是因为模型不够强，而是因为一开始把固定流程做成聊天，把聊天场景做成单轮任务，或者把简单任务过度设计成 Agent。

## 应用类型总览

| 类型 | 适合场景 | 关键词 |
| --- | --- | --- |
| Workflow | 单轮任务、固定流程、批量 API | 稳定、可控、流程 |
| Chatflow | 多轮对话、客服、顾问 | 对话、上下文、记忆 |
| Chatbot | 快速做简单聊天助手 | 快速、简单 |
| Agent | 需要模型选择工具和行动 | 工具、自主、多步 |
| Text Generator | 表单输入后生成文本 | 生成、模板、单次 |

## Workflow

Workflow 适合单轮任务。用户提交一次输入，系统完成一系列步骤，然后返回结果。

适合：

- 文章总结。
- 简历筛选。
- 客诉分类。
- 表单信息抽取。
- 批量内容生成。
- 自动审核。

不适合：

- 需要连续追问的客服。
- 需要长期上下文的顾问。
- 需要模型自由选择工具的探索任务。

## Chatflow

Chatflow 是面向多轮对话的流程。每一轮用户输入都会触发流程，同时可以处理对话变量、记忆和流式输出。

适合：

- 客服机器人。
- 学习助教。
- 产品顾问。
- 内部知识库助手。
- 需要追问和澄清的场景。

不适合：

- 大量批处理任务。
- 完全固定的审批流程。
- 不需要上下文的单次文本处理。

## Agent

Agent 适合让模型根据问题选择工具、检索资料、执行多步操作。它的优势是灵活，风险也是灵活。

适合：

- 查询多个工具后汇总。
- 需要根据用户问题决定是否调用工具。
- 信息来源不固定的研究型任务。

不适合：

- 流程必须完全可控的任务。
- 工具调用成本很高的任务。
- 一步就能完成的简单问答。

## 选择规则

先不要问“哪个更高级”，而要问“任务是否固定”。

- 如果步骤固定，用 Workflow。
- 如果多轮对话，用 Chatflow。
- 如果工具选择需要模型判断，用 Agent。
- 如果只是快速验证想法，用 Chatbot。
- 如果只是表单生成文本，用 Text Generator。

## 常见错误

### 错误 1：所有东西都用 Agent

Agent 看起来高级，但它会带来不确定性、延迟和成本。固定流程应该优先用 Workflow。

### 错误 2：用 Chatbot 做复杂业务流程

聊天入口很容易开始，但复杂业务需要变量、分支、节点、错误处理。此时应迁移到 Chatflow 或 Workflow。

### 错误 3：忽略发布方式

如果你要通过 API 批量调用，Workflow 往往更清晰。如果你要嵌入客服窗口，Chatflow 更自然。

## 本章练习

为下面任务选择应用类型：

1. 上传一段文案，自动改成小红书风格。
2. 用户连续咨询产品价格、限制和售后。
3. 输入客户反馈，自动判断紧急程度并生成工单摘要。
4. 查询天气、日历和公司知识库后安排会议。

参考答案：

1. Workflow 或 Text Generator。
2. Chatflow。
3. Workflow。
4. Agent。
