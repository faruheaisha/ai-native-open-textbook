---
title: "05 Prompt 和变量"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/chapters/05-prompt-和变量.md"
sourceRel: "docs/chapters/05-prompt-和变量.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/chapters/05-prompt-和变量.md"
sourceSha256: "3740c6d38a6dc9933db5b7f7628f3312eccefe8165ad9aa683d020db5d715def"
pageSha256: "3740c6d38a6dc9933db5b7f7628f3312eccefe8165ad9aa683d020db5d715def"
contentMode: "local-full"
zh: ""
---

# 05 Prompt 和变量

## 学习目标

你将学会写可维护的 Prompt，并理解变量如何让应用适配不同用户和场景。

## Prompt 的作用

Prompt 不是一句“你是专家”就结束。一个可用 Prompt 至少要说明：

- 角色。
- 任务。
- 输入。
- 规则。
- 输出格式。
- 错误处理。

官方 Agent 文档也强调，Prompt 要说明模型要做什么、如何响应、遵守哪些限制，以及什么时候使用工具。

## 推荐结构

```text
你是{{角色}}。

任务：
1. {{任务一}}
2. {{任务二}}

输入：
- 用户问题：{{query}}
- 用户背景：{{profile}}
- 检索资料：{{context}}

规则：
1. {{规则一}}
2. {{规则二}}

输出格式：
{{格式}}
```

## 变量是什么

变量是给 Prompt 和节点使用的信息容器。

常见变量：

- 用户输入。
- 用户身份。
- 业务类型。
- 知识库检索结果。
- 上游节点输出。
- 外部 API 返回值。

官方文档中，变量可以是短文本、段落、选择、数字、复选框、API-based Variable 等类型。选择合适类型能减少用户乱填。

## 变量设计原则

- 变量名要短而清晰。
- 一个变量只表达一个含义。
- 变量说明要告诉用户怎么填。
- 选择项优先于自由文本。
- 数字就用数字类型，不要让用户输入文字数字。

## 输出格式

如果下游节点要继续处理，输出应尽量结构化。

适合：

```json
{
  "category": "refund",
  "urgency": "high",
  "summary": "用户申请退款，原因是重复扣费"
}
```

不适合：

```text
这个用户好像是退款问题，可能比较急，你可以处理一下。
```

## 常见错误

- Prompt 太长，但没有明确输出格式。
- 变量名混乱，例如 input1、text2、aaa。
- 让用户填写太多不必要字段。
- 没有规定资料不足时怎么回答。
- 在 Prompt 中写了和知识库冲突的规则。

## 本章练习

把下面模糊 Prompt 改成结构化 Prompt：

```text
你是客服，帮用户回答问题，回答得好一点。
```

要求：

- 指定角色。
- 指定资料来源。
- 指定不能编造。
- 指定输出格式。
- 指定什么时候转人工。
