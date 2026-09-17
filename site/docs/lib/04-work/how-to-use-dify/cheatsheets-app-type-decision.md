---
title: "Dify 应用类型选择速查表"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/cheatsheets/app-type-decision.md"
sourceRel: "cheatsheets/app-type-decision.md"
rawUrl: "/raw/04-work/how-to-use-dify/cheatsheets/app-type-decision.md"
sourceSha256: "fabcc7b6c8e5140e5c66d9add73c49d3f58795986c93621755fec1368252e187"
pageSha256: "fabcc7b6c8e5140e5c66d9add73c49d3f58795986c93621755fec1368252e187"
contentMode: "local-full"
zh: ""
---

# Dify 应用类型选择速查表

## 先问自己 5 个问题

1. 用户是连续对话，还是提交一次任务就结束？
2. 任务是否需要多个步骤？
3. 是否需要知识库？
4. 是否需要调用外部工具或 API？
5. 是否需要通过 API 批量执行？

## 推荐选择

| 需求 | 推荐类型 | 原因 |
| --- | --- | --- |
| 单轮任务，例如总结、改写、分类 | Workflow | 输入清楚、流程固定、适合 API 调用 |
| 多轮聊天，例如客服、顾问、问答 | Chatflow | 每轮对话触发，适合上下文和记忆 |
| 简单聊天机器人 | Chatbot | 上手快，但复杂编排能力较弱 |
| 需要模型自己决定是否调用工具 | Agent | 适合探索型、多步工具任务 |
| 固定文本生成，例如标题、广告语 | Text Generator | 表单式输入，输出结构稳定 |

## 简单判断

- 能画成固定流程：优先 Workflow。
- 需要多轮聊天：优先 Chatflow。
- 需要模型自主选择工具：考虑 Agent。
- 只是新手试用：先 Chatbot，再迁移到 Chatflow。

## 常见错误

- 一开始就用 Agent 做所有事，结果不可控。
- 明明是固定审批流程，却用聊天机器人承载。
- 知识库问答没有写清楚知识库描述。
- 工作流没有错误分支，任何节点失败都会让用户困惑。
