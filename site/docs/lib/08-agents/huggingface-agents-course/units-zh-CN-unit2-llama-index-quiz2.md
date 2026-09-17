---
title: "快速自测（不计分）[[quiz2]]"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/quiz2.mdx"
sourceRel: "units/zh-CN/unit2/llama-index/quiz2.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/llama-index/quiz2.mdx"
sourceSha256: "5fc0f04ad2ddac60ad46b2e4d31fb3f09ff29d6145460f8d29c6b6cd09b145d8"
pageSha256: "5fc0f04ad2ddac60ad46b2e4d31fb3f09ff29d6145460f8d29c6b6cd09b145d8"
contentMode: "local-full"
zh: ""
---

# 快速自测（不计分）[[quiz2]]

什么？！又是测验？我们知道，我们知道...😅但这个简短的不计分测验是为了**帮助您巩固刚学到的关键概念**。

本测验涵盖智能体工作流程和交互——这些是构建高效AI智能体的核心组件。

### Q1: AgentWorkflow 在 LlamaIndex 中的主要作用是什么？


**选项**

- A. 运行一个或多个带有工具的智能体
- B. 创建没有记忆功能的单一数据查询智能体
- C. 自动为智能体构建工具
- D. 管理智能体记忆和状态

**答案解析**

- **A（正确答案）** — 正确，AgentWorkflow 是快速创建包含一个或多个智能体的系统的主要方式。
- **B** — 错误，AgentWorkflow 的功能远不止于此，QueryEngine 才是用于简单数据查询的组件。
- **C** — AgentWorkflow 不负责构建工具，这是开发者的职责。
- **D** — 管理记忆和状态并非 AgentWorkflow 的主要功能。


---

### Q2: 哪个对象用于跟踪工作流的状态？


**选项**

- A. State
- B. Context
- C. WorkflowState
- D. Management

**答案解析**

- **A** — State 不是用于管理工作流状态的正确对象。
- **B（正确答案）** — Context 是用于跟踪工作流状态的正确对象。
- **C** — WorkflowState 不是正确对象。
- **D** — Management 不是有效的工作流状态管理对象。


---

### Q3: 如果希望智能体记住之前的交互，应该使用哪个方法？


**选项**

- A. run(query_str)
- B. chat(query_str, ctx=ctx)
- C. interact(query_str)
- D. run(query_str, ctx=ctx)

**答案解析**

- **A** — .run(query_str) 不会维护对话历史记录。
- **B** — chat() 不是工作流的有效方法。
- **C** — interact() 不是智能体交互的有效方法。
- **D（正确答案）** — 通过传入并维护上下文，我们可以保持状态！


---

### Q4: Agentic RAG 的关键特性是什么？


**选项**

- A. 只能使用基于文档的工具在 RAG 工作流中回答问题
- B. 像聊天机器人一样无需工具自动回答问题
- C. 可以决定使用任何工具（包括 RAG 工具）来回答问题
- D. 仅适用于函数调用智能体

**答案解析**

- **A** — Agentic RAG 可以使用不同的工具，包括基于文档的工具。
- **B** — Agentic RAG 确实使用工具来回答问题。
- **C（正确答案）** — Agentic RAG 具有使用不同工具回答问题的灵活性。
- **D** — Agentic RAG 不局限于函数调用智能体。


---


明白了吗？太棒了！现在让我们**简要回顾一下本单元！**
