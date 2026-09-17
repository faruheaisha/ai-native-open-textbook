---
title: "Introduction to Agentic Frameworks"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/introduction.mdx"
sourceRel: "units/en/unit2/introduction.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/en/unit2/introduction.mdx"
sourceSha256: "d6d9f0b3bf4f9cb0502f3da4374639568b41f23d4191457a0b27d1d567b7185a"
pageSha256: "d6d9f0b3bf4f9cb0502f3da4374639568b41f23d4191457a0b27d1d567b7185a"
contentMode: "local-full"
zh: ""
---

# Introduction to Agentic Frameworks

<img src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/thumbnail.jpg" alt="Thumbnail"/>

Welcome to this second unit, where **we'll explore different agentic frameworks** that can be used to build powerful agentic applications. 

We will study:

- In Unit 2.1: [smolagents](https://huggingface.co/docs/smolagents/en/index)  
- In Unit 2.2: [LlamaIndex](https://www.llamaindex.ai/)
- In Unit 2.3: [LangGraph](https://www.langchain.com/langgraph)

Let's dive in! 🕵

## When to Use an Agentic Framework

An agentic framework is **not always needed when building an application around LLMs**. They provide flexibility in the workflow to efficiently solve a specific task, but they're not always necessary. 

Sometimes, **predefined workflows are sufficient** to fulfill user requests, and there is no real need for an agentic framework. If the approach to build an agent is simple, like a chain of prompts, using plain code may be enough. The advantage is that the developer will have **full control and understanding of their system without abstractions**.

However, when the workflow becomes more complex, such as letting an LLM call functions or using multiple agents, these abstractions start to become helpful.

Considering these ideas, we can already identify the need for some features:

* An *LLM engine* that powers the system.
* A *list of tools* the agent can access.  
* A *parser* for extracting tool calls from the LLM output.
* A *system prompt* synced with the parser.
* A *memory system*.
* *Error logging and retry mechanisms* to control LLM mistakes.

We'll explore how these topics are resolved in various frameworks, including `smolagents`, `LlamaIndex`, and `LangGraph`.

## Agentic Frameworks Units

| Framework  | Description | Unit Author |
|------------|----------------|----------------|
| [smolagents](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/smolagents/introduction/README.md) | Agents framework developed by Hugging Face. | Sergio Paniego - [HF](https://huggingface.co/sergiopaniego) - [X](https://x.com/sergiopaniego) - [Linkedin](https://www.linkedin.com/in/sergio-paniego-blanco) |
| [Llama-Index](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/llama-index/introduction/README.md) | End-to-end tooling to ship a context-augmented AI agent to production | David Berenstein - [HF](https://huggingface.co/davidberenstein1957) - [X](https://x.com/davidberenstei) - [Linkedin](https://www.linkedin.com/in/davidberenstein) |
| [LangGraph](https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/unit2/langgraph/introduction/README.md) | Agents allowing stateful orchestration of agents | Joffrey THOMAS - [HF](https://huggingface.co/Jofthomas) - [X](https://x.com/Jthmas404) - [Linkedin](https://www.linkedin.com/in/joffrey-thomas) |
