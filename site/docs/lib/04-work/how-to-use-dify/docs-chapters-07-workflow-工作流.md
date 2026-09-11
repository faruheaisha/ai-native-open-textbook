---
title: "07 Workflow 工作流"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/README.md"
zh: ""
---

# 07 Workflow 工作流

## 学习目标

你将学会把复杂任务拆成可调试、可复用、可上线的节点流程。

## Workflow 适合什么

Workflow 适合单轮、固定步骤的任务。官方文档中，Workflow 可以通过 User Input 或 Trigger 启动；其中 User Input 启动的 Workflow 可以发布为 Web App、API、MCP Server，或者作为其他 Dify 应用中的工具使用。

适合：

- 文本总结。
- 信息抽取。
- 内容生成。
- 审核流程。
- 批处理任务。
- 外部 API 串联。

## 设计原则

### 一个节点只做一件事

不要让一个 LLM 节点同时判断意图、查资料、写答案、做格式转换。拆开后更容易调试。

### 结构化输出

下游节点需要稳定输入，所以关键节点尽量输出 JSON 或固定字段。

### 先做主路径，再做异常路径

主路径跑通后，再补：

- 空输入。
- 资料不足。
- API 失败。
- 模型输出格式错误。
- 用户输入违规。

## 常见流程

### 内容改写工作流

1. Start：用户输入原文、目标平台、语气。
2. LLM：分析原文重点。
3. LLM：生成改写版本。
4. LLM：检查是否符合平台风格。
5. Answer：输出最终版本和修改说明。

### 客诉分类工作流

1. Start：用户输入反馈。
2. LLM：抽取问题、情绪、诉求。
3. IF/ELSE：判断紧急程度。
4. HTTP Request：创建工单。
5. Answer：返回处理结果。

## 节点命名

节点名称要表达业务动作：

- 不推荐：LLM 1、LLM 2、Node 3。
- 推荐：判断用户意图、生成退款摘要、检查输出格式。

## 调试方法

- 每次只改一个节点。
- 保存测试输入。
- 对比节点输入输出。
- 把失败案例写进测试表。
- 不要在没记录的情况下随意调多个参数。

## 常见错误

- 节点太少，所有逻辑塞进一个 Prompt。
- 节点太多，每一步都没有必要。
- 分支条件依赖自然语言。
- 没有错误提示。
- 没有最终验收标准。

## 本章练习

做一个“用户反馈处理 Workflow”：

- 输入用户反馈。
- 判断问题类型。
- 判断紧急程度。
- 生成客服回复。
- 输出工单摘要。
