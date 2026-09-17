---
title: "智能体框架介绍"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/introduction.mdx"
sourceRel: "units/zh-CN/unit2/introduction.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/introduction.mdx"
sourceSha256: "80c035dbf96370c9e7878c9fd489e8fdd240efa963dabfa314a2b389afaea661"
pageSha256: "80c035dbf96370c9e7878c9fd489e8fdd240efa963dabfa314a2b389afaea661"
contentMode: "local-full"
zh: ""
---

# 智能体框架介绍

<img src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/thumbnail.jpg" alt="Thumbnail"/>

欢迎来到第二单元，在这里**我们将探索不同的智能体框架（agentic frameworks）**，这些框架可用于构建强大的智能体应用。

我们将学习：

- 在单元 2.1：[smolagents](https://huggingface.co/docs/smolagents/en/index)  
- 在单元 2.2：[LlamaIndex](https://www.llamaindex.ai/)
- 在单元 2.3：[LangGraph](https://www.langchain.com/langgraph)

让我们开始吧！🕵

## 何时使用智能体框架

**构建围绕大语言模型（LLMs）的应用时，并不总是需要智能体框架**。它们在工作流中提供了灵活性，可以高效地解决特定任务，但并非总是必需的。

有时，**预定义的工作流足以满足用户请求**，并且没有真正需要智能体框架。如果构建智能体的方法很简单，比如一系列提示，使用纯代码可能就足够了。优势在于开发者将**完全控制和理解他们的系统，没有抽象层**。

然而，当工作流变得更加复杂时，例如让大语言模型调用函数或使用多个智能体，这些抽象开始变得有用。

考虑到这些想法，我们已经可以确定对一些功能的需求：

* 一个驱动系统的*大语言模型引擎*。
* 智能体可以访问的*工具列表*。
* 用于从大语言模型输出中提取工具调用的*解析器*。
* 与解析器同步的*系统提示*。
* 一个*记忆系统*。
* *错误日志和重试机制*以控制大语言模型的错误。

我们将探讨这些主题在各种框架中如何解决，包括 `smolagents`、`LlamaIndex` 和 `LangGraph`。

## 智能体框架单元

| 框架  | 描述 | 单元作者 |
|------------|----------------|----------------|
| [smolagents](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/smolagents/introduction/README.md) | 由 Hugging Face 开发的智能体框架。 | Sergio Paniego - [HF](https://huggingface.co/sergiopaniego) - [X](https://x.com/sergiopaniego) - [Linkedin](https://www.linkedin.com/in/sergio-paniego-blanco) |
| [Llama-Index](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/llama-index/introduction/README.md) | 将上下文增强智能体带至生产端的端到端工具 | David Berenstein - [HF](https://huggingface.co/davidberenstein1957) - [X](https://x.com/davidberenstei) - [Linkedin](https://www.linkedin.com/in/davidberenstein) |
| [LangGraph](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/langgraph/introduction/README.md) | 允许对智能体进行有序协调的智能体 | Joffrey THOMAS - [HF](https://huggingface.co/Jofthomas) - [X](https://x.com/Jthmas404) - [Linkedin](https://www.linkedin.com/in/joffrey-thomas) |
