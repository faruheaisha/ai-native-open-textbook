---
title: "智能体增强检索生成（Agentic RAG）"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit3/agentic-rag/agentic-rag.mdx"
sourceRel: "units/zh-CN/unit3/agentic-rag/agentic-rag.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit3/agentic-rag/agentic-rag.mdx"
sourceSha256: "5bad7886b1ec32af202ecaeb09612ecb9fe61ea6846e574eb6c3cc16e815fc3d"
pageSha256: "5bad7886b1ec32af202ecaeb09612ecb9fe61ea6846e574eb6c3cc16e815fc3d"
contentMode: "local-full"
zh: ""
---

# 智能体增强检索生成（Agentic RAG）

在本单元中，我们将探讨如何利用智能体增强检索生成（Agentic RAG）帮助 Alfred 筹备精彩的晚会。

> [!TIP]
> 提示：我们已在先前单元讨论过检索增强生成（RAG）和智能体增强 RAG，如果您已熟悉这些概念可跳过本节。

大语言模型（LLMs）通过海量数据训练获得通用知识。
但其世界知识模型可能包含过时或不相关信息。
**RAG 通过从您的数据中检索相关信息并传递给大语言模型，有效解决了这个问题。**

![RAG 示意图](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/llama-index/rag.png)

思考 Alfred 的工作流程：

1. 我们要求 Alfred 协助策划晚会
2. Alfred 需要获取最新新闻和天气信息
3. Alfred 需要整理和检索宾客信息

正如 Alfred 需要搜索家庭信息才能提供有效帮助，任何智能体都需要理解和检索相关数据的能力。
**智能体增强 RAG 是帮助智能体解答数据问题的强大工具**，我们可以为 Alfred 提供多种工具来辅助问题解答。
与传统文档自动问答不同，Alfred 可以自主决定使用任何工具或流程来回答问题。

![智能体增强 RAG 架构](https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/llama-index/agentic-rag.png)

现在让我们开始**构建智能体增强 RAG 工作流**！

首先创建用于检索最新受邀者详情的 RAG 工具，接着开发网络搜索、天气更新和 Hugging Face Hub 模型下载统计等工具，最终整合所有组件实现我们的智能体增强 RAG 智能体！
