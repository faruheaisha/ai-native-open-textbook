---
title: "04 Chatflow 对话流"
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

# 04 Chatflow 对话流

## 学习目标

你将理解 Chatflow 为什么适合多轮对话，以及如何把聊天拆成稳定流程。

## Chatflow 的核心特点

Chatflow 是每轮对话都会触发的流程。它比简单 Chatbot 更适合复杂对话，因为你可以控制：

- 输入变量。
- 对话记忆。
- 知识库检索。
- 条件分支。
- 工具调用。
- 最终输出。

## 什么时候用 Chatflow

用 Chatflow 的典型信号：

- 用户可能连续追问。
- 用户的问题一开始不完整。
- 需要根据上下文继续回答。
- 需要先判断意图，再决定查不查知识库。
- 需要在对话中收集多个信息。

## 基础结构

一个常见 Chatflow 可以这样设计：

1. Start：接收用户问题。
2. LLM：判断用户意图。
3. IF/ELSE：分支到不同处理路径。
4. Knowledge Retrieval：查询知识库。
5. LLM：基于资料生成回答。
6. Answer：输出给用户。

## 意图判断

意图判断节点不要做太多事情。它只负责分类。

示例输出：

```json
{
  "intent": "pricing_question",
  "need_knowledge": true,
  "need_clarification": false
}
```

让下游节点依赖结构化字段，而不是依赖一段自然语言。

## 澄清问题

当用户问题太模糊时，Chatflow 应该先追问，而不是硬答。

用户：

```text
这个多少钱？
```

更好的回答：

```text
你想了解哪个产品或套餐的价格？请提供产品名称，我再帮你查询。
```

## 常见错误

- 在一个 LLM 节点里完成所有事情。
- 不做意图判断，所有问题都查知识库。
- 用户问题不清楚时仍然强行回答。
- 输出格式每次都变，下游无法处理。

## 本章练习

设计一个“课程顾问 Chatflow”：

- 用户咨询课程。
- 系统判断是价格、内容、时间、报名还是售后。
- 信息不足时追问。
- 有明确资料时回答。
- 无资料时提示人工确认。
